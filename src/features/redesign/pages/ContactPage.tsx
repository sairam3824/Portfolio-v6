import { FormEvent, useState } from "react";
import { ArrowRight } from "lucide-react";
import Seo from "@/shared/Seo";
import { PageHeader, contactLinks, profileDetails, ROUTE_PATHS } from "../shared";

const MAX_NAME_LENGTH = 120;
const MAX_EMAIL_LENGTH = 254;
const MAX_MESSAGE_LENGTH = 2000;

export default function ContactPage() {
    const [form, setForm] = useState({ name: "", email: "", message: "" });
    const [honeypot, setHoneypot] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [errorMessage, setErrorMessage] = useState("");

    const submit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        // Bots fill every field; humans never see this one.
        if (honeypot) {
            setStatus("success");
            return;
        }

        const name = form.name.trim().slice(0, MAX_NAME_LENGTH);
        const email = form.email.trim().slice(0, MAX_EMAIL_LENGTH);
        const message = form.message.trim().slice(0, MAX_MESSAGE_LENGTH);

        if (!name && !email && !message) {
            setStatus("error");
            setErrorMessage("Add at least one detail or message before sending.");
            return;
        }

        setStatus("loading");
        setErrorMessage("");

        try {
            const { supabase } = await import("@/lib/supabase");
            if (!supabase) {
                throw new Error("Messaging backend is not configured.");
            }

            const baseContent =
                message ||
                [
                    name ? `Name: ${name}` : null,
                    email ? `Email: ${email}` : null,
                    "Sent without a message body.",
                ]
                    .filter(Boolean)
                    .join("\n");

            const payload = {
                content: baseContent,
                timestamp: new Date().toISOString(),
                user_agent: navigator.userAgent,
                sender_name: name || null,
                sender_email: email || null,
                source: "anonymous_messenger",
            };

            let insertError: { message: string } | null = null;

            const firstAttempt = await supabase.from("portfolio_messages").insert([payload]);
            insertError = firstAttempt.error;

            if (insertError) {
                const fallbackContent = [
                    name ? `Name: ${name}` : null,
                    email ? `Email: ${email}` : null,
                    message ? `Message:\n${message}` : "Message: [empty]",
                ]
                    .filter(Boolean)
                    .join("\n\n");

                const fallbackAttempt = await supabase.from("portfolio_messages").insert([
                    {
                        content: fallbackContent,
                        timestamp: new Date().toISOString(),
                        user_agent: navigator.userAgent,
                    },
                ]);

                insertError = fallbackAttempt.error;
            }

            if (insertError) {
                throw new Error(insertError.message);
            }

            setStatus("success");
            setForm({ name: "", email: "", message: "" });
        } catch (error) {
            setStatus("error");
            setErrorMessage(
                error instanceof Error
                    ? error.message
                    : "Could not send the message right now.",
            );
        }
    };

    return (
        <>
            <Seo
                title={`Contact | ${profileDetails.name}`}
                description="Direct ways to reach MARURI SAI RAMA LINGA REDDY for collaboration, roles, or interesting builds."
                pageType="ContactPage"
                keywords={["contact Sairam Maruri", "hire AI Engineer", "hire ML Engineer", "GenAI Engineer India", "collaboration"]}
                breadcrumbs={[{ name: "Home", url: ROUTE_PATHS.home }, { name: "Contact", url: ROUTE_PATHS.contact }]}
            />
            <main className="rd-page rd-page-pad">
                <PageHeader
                    label="Contact"
                    title="Let's Build Something"
                    description="The quickest route is email, but the form below will also open a drafted message in your mail app."
                />
                <div className="rd-two-column">
                    <section>
                        <p className="rd-long-copy">
                            Reach out for AI products, agent workflows, full-stack engineering, writing collaborations, or interesting systems work.
                        </p>
                        <div className="rd-contact-list">
                            {contactLinks.map((item) => (
                                <a key={item.label} href={item.href} target="_blank" rel="noreferrer">
                                    <span className="rd-page-label">{item.label.includes("@") ? "Email" : item.label.includes("github") ? "GitHub" : item.label.includes("linkedin") ? "LinkedIn" : "Phone"}</span>
                                    <span>{item.label}</span>
                                </a>
                            ))}
                        </div>
                    </section>

                    <section>
                        {status === "success" ? (
                            <div className="rd-surface-card">
                                <span className="rd-service-dot" />
                                <h3>Message received.</h3>
                                <p>Your anonymous message has been stored successfully.</p>
                            </div>
                        ) : (
                            <form className="rd-contact-form" onSubmit={submit}>
                                <div className="rd-contact-form-header">
                                    <p className="rd-surface-label">Anonymous Messenger</p>
                                    <h3>Drop a note without friction.</h3>
                                    <p>All fields are optional. Share as much or as little context as you want.</p>
                                </div>
                                <label style={{ position: "absolute", left: "-9999px", height: 0, overflow: "hidden" }} aria-hidden="true">
                                    <span>Website</span>
                                    <input
                                        tabIndex={-1}
                                        autoComplete="off"
                                        value={honeypot}
                                        onChange={(event) => setHoneypot(event.target.value)}
                                    />
                                </label>
                                <label>
                                    <span>Name</span>
                                    <input
                                        maxLength={MAX_NAME_LENGTH}
                                        value={form.name}
                                        onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
                                    />
                                </label>
                                <label>
                                    <span>Email</span>
                                    <input
                                        type="email"
                                        maxLength={MAX_EMAIL_LENGTH}
                                        value={form.email}
                                        onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
                                    />
                                </label>
                                <label>
                                    <span>Message</span>
                                    <textarea
                                        rows={6}
                                        maxLength={MAX_MESSAGE_LENGTH}
                                        value={form.message}
                                        onChange={(event) => setForm((current) => ({ ...current, message: event.target.value }))}
                                    />
                                </label>
                                <button className="rd-button rd-button-primary" type="submit" disabled={status === "loading"}>
                                    Send Message <ArrowRight size={16} />
                                </button>
                                {status === "error" ? <p className="rd-contact-error">{errorMessage}</p> : null}
                            </form>
                        )}
                    </section>
                </div>
            </main>
        </>
    );
}
