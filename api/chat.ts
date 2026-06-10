import OpenAI from "openai";
import { buildPortfolioAssistantSystemPrompt } from "../shared-data/chatContext";

type ChatRole = "user" | "assistant";

type ChatMessage = {
    role: ChatRole;
    content: string;
};

type ChatRequestBody = {
    message?: unknown;
    history?: unknown;
};

type RequestLike = {
    method?: string;
    body?: ChatRequestBody | string | null;
    headers?: Record<string, string | string[] | undefined>;
};

type ResponseLike = {
    setHeader: (name: string, value: string) => void;
    status: (code: number) => ResponseLike;
    json: (body: unknown) => void;
};

const MAX_MESSAGE_LENGTH = 1200;
const MAX_HISTORY_ITEMS = 8;
const DEFAULT_MODEL = process.env.OPENAI_MODEL || "gpt-4.1-mini";

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 8;
const RATE_LIMIT_MAX_TRACKED_IPS = 5_000;

const buildAllowedOrigins = () => {
    const origins = new Set(["https://www.saiii.in", "https://saiii.in"]);
    if (process.env.VERCEL_URL) origins.add(`https://${process.env.VERCEL_URL}`);
    if (process.env.VERCEL_BRANCH_URL) origins.add(`https://${process.env.VERCEL_BRANCH_URL}`);
    return origins;
};

const ALLOWED_ORIGINS = buildAllowedOrigins();
const IS_PRODUCTION = process.env.VERCEL_ENV === "production";

const headerValue = (req: RequestLike, name: string): string | undefined => {
    const raw = req.headers?.[name];
    return Array.isArray(raw) ? raw[0] : raw;
};

const isAllowedOrigin = (origin: string | undefined): boolean => {
    if (!origin) return false;
    if (ALLOWED_ORIGINS.has(origin)) return true;
    return !IS_PRODUCTION && /^http:\/\/localhost(:\d+)?$/.test(origin);
};

const clientIp = (req: RequestLike): string => {
    const forwarded = headerValue(req, "x-forwarded-for");
    if (forwarded) return forwarded.split(",")[0].trim();
    return headerValue(req, "x-real-ip") ?? "unknown";
};

// Best-effort limiter: state lives per warm function instance, so it caps
// burst abuse rather than guaranteeing a global ceiling. Pair with a spend
// limit on the OpenAI account.
type RateBucket = { count: number; resetAt: number };
const rateBuckets = new Map<string, RateBucket>();

const isRateLimited = (ip: string): boolean => {
    const now = Date.now();
    const bucket = rateBuckets.get(ip);

    if (!bucket || bucket.resetAt <= now) {
        if (rateBuckets.size >= RATE_LIMIT_MAX_TRACKED_IPS) rateBuckets.clear();
        rateBuckets.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
        return false;
    }

    bucket.count += 1;
    return bucket.count > RATE_LIMIT_MAX_REQUESTS;
};

const normalizeBody = (body: RequestLike["body"]): ChatRequestBody => {
    if (!body) return {};
    if (typeof body === "string") {
        try {
            return JSON.parse(body) as ChatRequestBody;
        } catch {
            return {};
        }
    }

    return body;
};

const normalizeHistory = (value: unknown): ChatMessage[] => {
    if (!Array.isArray(value)) return [];

    return value
        .filter((entry): entry is ChatMessage => {
            if (!entry || typeof entry !== "object") return false;

            const role = "role" in entry ? entry.role : undefined;
            const content = "content" in entry ? entry.content : undefined;

            return (
                (role === "user" || role === "assistant") &&
                typeof content === "string" &&
                content.trim().length > 0
            );
        })
        .slice(-MAX_HISTORY_ITEMS)
        .map((entry) => ({
            role: entry.role,
            content: entry.content.trim().slice(0, MAX_MESSAGE_LENGTH),
        }));
};

const sendJson = (res: ResponseLike, status: number, body: unknown) => {
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.setHeader("Cache-Control", "no-store");
    return res.status(status).json(body);
};

export default async function handler(req: RequestLike, res: ResponseLike) {
    if (req.method !== "POST") {
        return sendJson(res, 405, { error: "Method not allowed." });
    }

    if (!isAllowedOrigin(headerValue(req, "origin"))) {
        return sendJson(res, 403, { error: "Forbidden." });
    }

    if (isRateLimited(clientIp(req))) {
        res.setHeader("Retry-After", String(Math.ceil(RATE_LIMIT_WINDOW_MS / 1000)));
        return sendJson(res, 429, {
            error: "You're sending messages too quickly. Please wait a minute and try again.",
        });
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
        return sendJson(res, 503, {
            error: "Chat is temporarily unavailable because the AI backend is not configured.",
        });
    }

    const body = normalizeBody(req.body);
    const message =
        typeof body.message === "string" ? body.message.trim().slice(0, MAX_MESSAGE_LENGTH) : "";

    if (!message) {
        return sendJson(res, 400, { error: "Please send a message." });
    }

    const history = normalizeHistory(body.history);
    const openai = new OpenAI({ apiKey });

    try {
        const response = await openai.responses.create({
            model: DEFAULT_MODEL,
            instructions: buildPortfolioAssistantSystemPrompt(),
            input: [
                ...history.map((entry) => ({
                    role: entry.role,
                    content: [{ type: "input_text" as const, text: entry.content }],
                })),
                {
                    role: "user" as const,
                    content: [{ type: "input_text" as const, text: message }],
                },
            ],
            temperature: 0.4,
            max_output_tokens: 320,
        });

        const reply = response.output_text?.trim();

        if (!reply) {
            return sendJson(res, 502, {
                error: "The assistant did not return a response. Please try again.",
            });
        }

        return sendJson(res, 200, { reply });
    } catch (error) {
        console.error("Chat API error:", error);
        return sendJson(res, 500, {
            error: "The assistant is temporarily unavailable. Please try again shortly.",
        });
    }
}
