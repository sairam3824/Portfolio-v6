// Icon creation helpers — icons are passed during component usage
// This file exports raw data without JSX; icons are mapped in components.
export interface ProjectData {
    title: string;
    description: string;
    tech: string[];
    github?: string;
    link?: string;
    category: string;
    iconName: string;
    featured?: boolean;
    tagline?: string;
}

export const projectsData: ProjectData[] = [

    // ═══════════════════════════════════════════════════════════════════════════
    // LIVE & DEPLOYED — Production projects with live URLs
    // ═══════════════════════════════════════════════════════════════════════════

    {
        title: "AI Research Platform (Orravyn)",
        description:
            "Enterprise-grade collaborative research platform with LLM orchestration, multi-agent workflows, real-time collaboration, and AI-driven paper recommendations. Research paper on this platform was submitted to and accepted at ICISML 2026 (International Conference on Intelligent Systems, Machine Learning) — conference completed.",
        tech: ["Django", "Python", "LangGraph", "Redis", "ChromaDB", "OpenAI", "Celery", "AWS", "Docker"],
        github: "https://github.com/sairam3824/Orravyn-Research-Platform-with-LLM",
        link: "https://orravyn.cloud",
        category: "AI Research Platform",
        iconName: "Brain",
        featured: true,
        tagline: "ICISML 2026 Published · Enterprise LLM Research Orchestration Platform",
    },
    {
        title: "VidyAI: AI Test Generator",
        description:
            "EdTech SaaS platform generating curriculum-aligned MCQs from textbook PDFs using RAG and GPT-4o. Students select a chapter and receive a 10-question test with difficulty-distributed explanations in seconds.",
        tech: ["FastAPI", "Next.js", "pgvector", "OpenAI", "Supabase", "Celery", "Redis", "Docker"],
        github: "https://github.com/sairam3824/vidyai",
        link: "https://vidyaiedtech.saiii.in",
        category: "AI Search & RAG",
        iconName: "Search",
        featured: true,
        tagline: "Built SaaS Product in 2 Days with Claude Code.",
    },
    {
        title: "AI Competitive Analysis Agent",
        description:
            "Autonomous multi-agent system that researches and analyzes competitive landscapes in real time. Agents crawl company data, news, and market signals to generate structured competitor profiles, SWOT analyses, positioning maps, and strategic recommendations — delivered as interactive reports.",
        tech: ["Python", "LangGraph", "OpenAI", "FastAPI", "Next.js", "Tavily", "Docker"],
        github: "https://github.com/sairam3824/AI-Competitive-Analysis-Agent",
        link: "https://analysisagent.saiii.in",
        category: "AI Agent",
        iconName: "Zap",
        featured: true,
        tagline: "Autonomous Competitive Intelligence • SWOT & Positioning Analysis",
    },
    {
        title: "System Design Simulator",
        description:
            "Master-level platform for system design interviews. Features privacy-first local LLM integration via Ollama, RAG-powered assistants, and automated ATS resume analysis.",
        tech: ["Next.js", "Ollama", "Python", "Prisma", "FastAPI"],
        github: "https://github.com/sairam3824/system-design-simulator",
        link: "https://systemdesign.saiii.in",
        category: "AI Platform",
        iconName: "Brain",
        featured: true,
        tagline: "Built with Claude Code under 6hrs.",
    },
    {
        title: "Advanced Orravyn Research Platform",
        description:
            "A comprehensive research ecosystem featuring a LangGraph-powered RAG chatbot, multi-agent research orchestration, and real-time collaborative tools. Includes AI-driven paper recommendations, peer review workflows, and automated citation management.",
        tech: ["Django", "LangGraph", "Python", "Redis", "ChromaDB", "OpenAI", "Celery", "Bootstrap"],
        github: "https://github.com/sairam3824/advanced-orravyn-research-platform",
        link: "https://orravyn.saiii.in",
        category: "AI Research Platform",
        iconName: "Brain",
        featured: true,
        tagline: "AI-Powered Research Hub • LangGraph Chatbot • Multi-Agent Workflows",
    },
    {
        title: "HireMind",
        description:
            "Automated job crawler and matching platform. Features intelligent resume matching, company insights, and real-time data integration to connect seekers with ideal roles.",
        tech: ["Next.js", "Supabase", "Python", "AWS EC2", "Docker"],
        github: "https://github.com/sairam3824/job-cloud",
        link: "https://hiremind.saiii.in",
        category: "AI Agent",
        iconName: "Zap",
        featured: true,
        tagline: "Automated AI Career Agent • Built with Antigravity under 10hrs.",
    },
    {
        title: "PrepLoop: Gamified Interview Prep",
        description:
            "Gamified daily interview preparation platform delivering curated questions with AI coaching (GPT-4o-mini), XP/leveling system (Beginner→Elite), daily streaks, topic mastery tracking, and achievement missions to build sharper interview skills through consistent practice.",
        tech: ["Next.js", "TypeScript", "React", "Supabase", "PostgreSQL", "OpenAI", "Vercel"],
        github: "https://github.com/sairam3824/preploop",
        link: "https://dailyquestion.saiii.in",
        category: "AI Platform",
        iconName: "Terminal",
        featured: true,
        tagline: "Gamified Interview Prep • AI Coaching & XP Progression",
    },
    {
        title: "Portfolio V6 (Current)",
        description:
            "The 6th iteration of my personal portfolio, featuring a premium redesign focused on a modern aesthetic with a high-performance technical foundation. Includes an AI-powered chat widget, serverless backend, and advanced SEO optimization.",
        tech: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Supabase", "OpenAI", "Vercel"],
        github: "https://github.com/sairam3824/Portfolio-v6",
        link: "https://saiii.in",
        category: "Web Development",
        iconName: "Globe",
        featured: true,
        tagline: "Premium Design • AI Chat • High-Performance Framework",
    },
    {
        title: "GitStory",
        description:
            "A full-stack app that turns any public GitHub profile into a beautiful, shareable developer story page. Users enter a GitHub username, the Express backend fetches public profile data, OpenAI GPT-4o generates a narrative, and the React frontend renders an interactive career story at a unique shareable URL — with Replit DB caching, Open Graph meta tags, and a dark UI with explore page.",
        tech: ["React", "Vite", "Tailwind CSS", "Express", "Node.js", "OpenAI", "Replit DB"],
        github: "https://github.com/sairam3824/GitStory",
        category: "Web Development",
        iconName: "Globe",
        featured: true,
        tagline: "GitHub Profile → AI Story Page • GPT-4o Narrative • Shareable URLs",
    },
    {
        title: "APIProbe: AI Key Guard",
        description:
            "Professional dashboard for validating and stress-testing API keys across 9 AI providers (OpenAI, Anthropic, Gemini, Groq, Mistral, Perplexity, OpenRouter, DeepSeek, Together AI). All validation runs server-side via Next.js Server Actions — keys never leave the browser. Features model stress testing with latency benchmarks, searchable audit logs, JSON export, and 15-second timeout protection.",
        tech: ["Next.js 15", "React 19", "TypeScript", "Framer Motion", "Server Actions"],
        github: "https://github.com/sairam3824/APIProbe",
        link: "https://apitester.saiii.in/",
        category: "Infrastructure",
        iconName: "Key",
        featured: true,
        tagline: "9-Provider API Key Validator • Server-Side Security • Stress Testing",
    },
    {
        title: "Traffic Congestion Prediction",
        description:
            "Hybrid deep learning system (LSTM-CNN-GRU) for real-time traffic forecasting. Features Graph Neural Networks for spatial city-wide analysis and interactive Google Maps routing.",
        tech: ["PyTorch", "LSTM-CNN-GRU", "Next.js", "Google Maps API", "Flask"],
        github: "https://github.com/sairam3824/Traffic-prediction",
        link: "https://traffic.saiii.in",
        category: "Deep Learning",
        iconName: "Activity",
        featured: true,
        tagline: "LSTM-CNN-GRU Ensemble • 92% Prediction Accuracy",
    },
    {
        title: "BadmintonHub: Match Management SaaS",
        description:
            "Production-ready multi-tenant SaaS platform for managing badminton matches across teams. Features real-time scoring with official rules (first to 21, best of 3), AI-powered doubles pairing, player leaderboards, venue management, and mobile-first courtside UX.",
        tech: ["Next.js", "TypeScript", "Prisma", "SQLite", "NextAuth.js", "Recharts", "Tailwind CSS"],
        github: "https://github.com/sairam3824/Badminton-hub",
        link: "https://badminton.saiii.in",
        category: "Web Development",
        iconName: "Globe",
        featured: true,
        tagline: "Multi-Tenant Sports SaaS • Real-time Scoring & Leaderboards",
    },
    {
        title: "DevDNA",
        description:
            "AI-powered analysis that scans your GitHub repositories, languages, and contribution patterns to reveal your unique developer identity — visualized as an interactive 3D DNA helix.",
        tech: ["Next.js", "TypeScript", "Three.js", "Tailwind CSS", "React Three Fiber"],
        github: "https://github.com/sairam3824/DevDNA",
        category: "AI Platform",
        iconName: "Activity",
        featured: true,
        tagline: "Decode your Developer DNA from your GitHub profile",
    },


    {
        title: "Stocks AI Platform",
        description:
            "A local-first, SaaS-style stock analytics platform with AI-powered forecasting, live streaming, sentiment analysis, and paper-trading workflows. Features auto-selection of ML models (LSTM, TFT, Stat) and a robust Python/Flask backend.",
        tech: ["Python", "Flask", "Redis", "Kafka", "Docker", "Plotly", "Ollama"],
        github: "https://github.com/sairam3824/Stocks-AI-Platform",
        category: "AI Platform",
        iconName: "Activity",
        featured: true,
        tagline: "AI-Powered Stock Forecasting • Live Streaming • Paper Trading",
    },
    {
        title: "Voice AI Agent",
        description:
            "A Next.js 14 starter kit for building conversational voice agents in the browser. Features voice input with Web Speech API, live waveform visualization, streaming LLM responses for low latency, and optional ElevenLabs TTS integration. Supports function calling tools (weather, web search, math) and persists conversation memory across sessions.",
        tech: ["Next.js 14", "TypeScript", "Tailwind CSS", "Framer Motion", "Web Speech API", "Web Audio API", "Vercel AI SDK", "OpenAI", "Anthropic"],
        github: "https://github.com/sairam3824/Voice-Ai-Agent",
        category: "AI Agent",
        iconName: "Mic",
        featured: true,
        tagline: "Conversational Voice Interface • Low-Latency Streaming • Function Calling",
    },
    {
        title: "A2A Startup Builder",
        description:
            "Autonomous multi-agent system that takes a single startup idea and produces a complete startup blueprint — market research, competitor analysis, PRD, system architecture, MVP code, go-to-market strategy, and investor pitch deck. Built on Google's A2A protocol with 8 specialized agents (Perplexity, Claude, GPT-4.1, Gemini) and real-time SSE streaming.",
        tech: ["Python", "FastAPI", "A2A Protocol", "OpenRouter", "Claude", "GPT-4.1", "Gemini", "Perplexity", "SQLite", "SSE"],
        github: "https://github.com/sairam3824/A2A-startup-builder",
        category: "AI Agent",
        iconName: "Rocket",
        featured: true,
        tagline: "8-Agent A2A Pipeline • Startup Blueprint in Minutes",
    },
    {
        title: "Autonomous AI DevOps Agent Platform",
        description:
            "A comprehensive multi-agent system for autonomous infrastructure management, log analysis, and CI/CD optimization. Features specialized agents for remediation, orchestrating complex workflows with zero cloud dependencies using local LLMs.",
        tech: ["Next.js 15", "FastAPI", "Python", "TypeScript", "Ollama", "FAISS", "Docker", "Kubernetes", "Redis"],
        github: "https://github.com/sairam3824/Autonomous-AI-DevOps-Agent-Platform",
        category: "AI Agent",
        iconName: "Zap",
        featured: true,
        tagline: "Autonomous Infrastructure • Multi-Agent Orchestration • Self-Healing CI/CD",
    },
    {
        title: "Guardian Agent Framework",
        description:
            "Python framework that wraps any AI agent with production-grade safety guardrails — compatible with LangChain, LangGraph, CrewAI, or custom callables. Features prompt injection detection, PII/secrets filtering, cost budget controls, hallucination reduction, human escalation workflows, and full observability via Prometheus metrics and a Streamlit dashboard.",
        tech: ["Python", "LangChain", "LangGraph", "CrewAI", "Redis", "Prometheus", "Docker", "Streamlit"],
        github: "https://github.com/sairam3824/Guardian-Agent-Framework",
        category: "AI Agent",
        iconName: "Shield",
        featured: true,
        tagline: "Production AI Safety Guardrails • 12 Configurable Rules • Prometheus Observability",
    },
    {
        title: "Agentic RAG Engine",
        description:
            "Intelligent RAG system where an LLM agent autonomously decides when retrieval is needed, what to query, which sources to consult, and when to re-query. Implements a retrieve → evaluate → refine → re-retrieve production loop with multi-source retrieval (vector, web, SQL), relevance evaluation, and optional fact-checking — orchestrated by LangGraph.",
        tech: ["Python", "LangGraph", "FastAPI", "Chroma", "Tavily", "OpenAI", "Streamlit"],
        github: "https://github.com/sairam3824/Agentic-RAG-Engine",
        category: "AI Search & RAG",
        iconName: "Search",
        featured: true,
        tagline: "Agentic Retrieve → Evaluate → Refine Loop • Multi-Source RAG",
    },
    {
        title: "Nexus RAG",
        description:
            "Multimodal RAG application for uploading documents and images into knowledge bases and chatting with grounded, citation-backed answers. Features knowledge-base organization, OCR and semantic extraction for image uploads, Celery-based async ingestion, pgvector semantic search, persistent conversation history, and a Next.js dashboard with authentication and upload workflows — all packaged as a Docker-based local stack.",
        tech: ["Next.js 15", "FastAPI", "TypeScript", "Python", "PostgreSQL", "pgvector", "Celery", "Redis", "OpenAI", "Docker"],
        github: "https://github.com/sairam3824/Nexus-RAG",
        category: "AI Search & RAG",
        iconName: "Search",
        featured: true,
        tagline: "Multimodal RAG • Knowledge Bases • Citation-Backed Chat",
    },
    {
        title: "RAG Quality Studio",
        description:
            "Local-first full-stack debugging workspace for retrieval-augmented generation systems. Runs queries against a bundled corpus, compares BM25 and vector retrieval side-by-side, builds extractive grounded answers with sentence-level attribution back to supporting chunks, assigns a hallucination-risk heuristic based on sentence support, and tracks every run in SQLite — visualized as a debugging dashboard with retriever panels, hallucination signals, and an experiment history stream. No external LLM API key required.",
        tech: ["FastAPI", "Next.js 14", "React 18", "TypeScript", "LangChain", "Chroma", "BM25", "SQLite"],
        github: "https://github.com/sairam3824/RAG-Quality-Studio",
        category: "AI Search & RAG",
        iconName: "Search",
        featured: true,
        tagline: "RAG Debugging Workspace • BM25 vs Vector • Sentence-Level Attribution",
    },
    {
        title: "Multi-Modal RAG Engine",
        description:
            "Production-ready RAG pipeline processing PDFs with text, images, tables, and charts. Uses GPT-4o Vision for visual understanding, generates semantic descriptions for indexing, and provides unified hybrid retrieval across all content modalities with page-level source attribution.",
        tech: ["Python", "FastAPI", "GPT-4o Vision", "Qdrant", "PyMuPDF", "Streamlit", "Docker"],
        github: "https://github.com/sairam3824/multi-modal-engine",
        category: "AI Search & RAG",
        iconName: "Search",
        featured: true,
        tagline: "Multimodal PDF RAG • GPT-4o Vision • Hybrid Retrieval",
    },
    {
        title: "Agent Code Reviewer",
        description:
            "Multi-agent PR review system deploying 5 specialized AI agents in parallel: code quality, security vulnerability scanning, performance bottlenecks, test coverage, and an orchestrator that synthesizes results. Features LangGraph orchestration, SHA-256 caching, and GitHub PR commenting.",
        tech: ["Python", "LangGraph", "LangChain", "OpenAI", "PyGithub", "Click"],
        github: "https://github.com/sairam3824/agent-code-reviewer",
        category: "AI Agent",
        iconName: "Zap",
        featured: true,
        tagline: "5-Agent PR Review • LangGraph Orchestration • Security Scanning",
    },
    {
        title: "A2A Task Marketplace",
        description:
            "One of the first open-source implementations of Google's Agent-to-Agent (A2A) protocol. A marketplace where specialized AI agents discover and collaborate on complex tasks via natural language decomposition. Features 6 agents (code, content, data, research, translation, design), dependency-aware execution, and real-time SSE progress tracking.",
        tech: ["Python", "FastAPI", "Next.js", "Redis", "OpenAI", "Anthropic", "Docker"],
        github: "https://github.com/sairam3824/a2a-task-marketplace",
        category: "AI Agent",
        iconName: "Zap",
        featured: true,
        tagline: "First Open-Source A2A Protocol • 6 Specialized Agents",
    },
    {
        title: "Agent Research Assistant",
        description:
            "Autonomous research assistant with FastAPI backend and Next.js frontend. Processes research questions through multi-step LangGraph agent workflows, delivering markdown reports, extracted findings, credibility-scored sources, and quality critiques — all streamed live via Server-Sent Events.",
        tech: ["FastAPI", "LangGraph", "LangChain", "Tavily", "Next.js", "OpenAI", "arXiv API"],
        github: "https://github.com/sairam3824/agent-research-assistant",
        category: "AI Agent",
        iconName: "Zap",
        featured: true,
        tagline: "Multi-Step Research Agent • LangGraph + SSE Streaming",
    },
    {
        title: "Red Team Simulator",
        description:
            "A full-stack AI red team platform for testing LLM applications against prompt injection, jailbreaks, data exfiltration, and tool misuse. Features a plugin-based attack engine and async execution pipeline.",
        tech: ["FastAPI", "Next.js", "PostgreSQL", "Docker", "Tailwind CSS", "OpenRouter"],
        github: "https://github.com/sairam3824/Red-Team-Simulator",
        category: "AI Security",
        iconName: "Shield",
        featured: true,
        tagline: "Full-Stack AI Red Team Platform",
    },
    {
        title: "Prompt Injection Detector (Prompt Shield)",
        description:
            "A robust detection engine safeguarding LLM applications against prompt injections, jailbreaks, and system prompt leaks. Features rule-based heuristics, statistical analysis, and LLM-powered classification, complete with an interactive Next.js dashboard.",
        tech: ["Python", "Next.js", "OpenAI", "React", "pytest", "Tailwind CSS"],
        github: "https://github.com/sairam3824/Prompt-Injection-Detector",
        category: "AI Security",
        iconName: "Shield",
        featured: true,
        tagline: "LLM Security Engine • Rule-based + LLM Detection",
    },
    {
        title: "Multi-LLM Debate Arena",
        description:
            "A production-ready Next.js app for running adversarial debates between two LLMs, scoring each round with a judge model, saving debate history, and exporting full transcripts. Features live streamed debates, third-model judge scoring, and a CLI evaluation mode for batch experiments.",
        tech: ["Next.js", "TypeScript", "Tailwind CSS", "Prisma", "SQLite", "OpenAI SDK", "Anthropic SDK", "OpenRouter SDK"],
        github: "https://github.com/sairam3824/Multi-LLM-Debate-Arena",
        category: "AI Platform",
        iconName: "Activity",
        featured: true,
        tagline: "Adversarial LLM Debates • Round-by-Round Scoring • Batch Evaluation CLI",
    },
    {
        title: "Vectorless RAG Studio",
        description:
            "A production-style Retrieval-Augmented Generation (RAG) application that answers questions over uploaded documents WITHOUT using a vector database. Implements lexical search (BM25 + TF-IDF) with page-aware and section-aware retrieval, hybrid fusion ranking, and grounded citations for verifiable answers.",
        tech: ["FastAPI", "Python", "Next.js 15", "TypeScript", "SQLite", "BM25", "TF-IDF", "OpenAI"],
        github: "https://github.com/sairam3824/Vectorless-RAG-Studio",
        category: "AI Search & RAG",
        iconName: "Search",
        featured: true,
        tagline: "Lexical RAG (No Vector Store) • BM25 + TF-IDF Fusion • Grounded Citations",
    },
    {
        title: "AI SQL Copilot",
        description:
            "A full-stack AI database assistant for natural-language analytics. Connects to PostgreSQL, SQLite, and DuckDB to provide schema-aware SQL generation, query plan explanation, and index optimization suggestions with read-only safety guardrails.",
        tech: ["Next.js 15", "FastAPI", "TypeScript", "PostgreSQL", "SQLite", "DuckDB", "OpenRouter", "SQLAlchemy"],
        github: "https://github.com/sairam3824/Ai-SQL",
        category: "AI Agent",
        iconName: "Zap",
        featured: true,
        tagline: "Natural Language to SQL • Multi-DB Support • Query Optimization",
    },
    {
        title: "LLM-Powered SQL Query Optimizer",
        description:
            "A closed-loop SQL optimization assistant for PostgreSQL and DuckDB. Profiles a read-only query, asks an LLM for a safer rewrite and index ideas, reruns the candidate, verifies practical result equivalence via row counts and bounded samples, and reports measured timing differences. Advisory by design — it never applies indexes automatically and refuses non-read-only SQL.",
        tech: ["Python", "FastAPI", "PostgreSQL", "DuckDB", "psycopg", "OpenAI"],
        github: "https://github.com/sairam3824/LLM-Powered-SQL-Query-Optimizer",
        category: "AI Agent",
        iconName: "Zap",
        featured: true,
        tagline: "Closed-Loop Query Rewrites • Equivalence Checks • Read-Only Safe",
    },
    {
        title: "PDF Knowledge Graph Builder",
        description:
            "Builds an evidence-backed Neo4j knowledge graph from a folder of PDFs, then lets you query it via natural language or hand-written Cypher in the browser. Extracts text with PyMuPDF, asks Claude for structured entities and relations with evidence quotes, resolves duplicate mentions with local embeddings, and serves a FastAPI + vis-network graph explorer.",
        tech: ["Python", "FastAPI", "Neo4j", "Anthropic Claude", "PyMuPDF", "Sentence-Transformers", "HDBSCAN", "Docker"],
        github: "https://github.com/sairam3824/PDF-Knowledge-Graph-Builder",
        category: "AI Search & RAG",
        iconName: "Search",
        featured: true,
        tagline: "Evidence-Backed Knowledge Graphs • NL-to-Cypher • Neo4j Visualization",
    },
    {
        title: "CacheForge: Cache-Augmented Generation",
        description:
            "Retrieval-free document Q&A system using Cache-Augmented Generation (CAG) as a faster alternative to RAG. Preloads the complete knowledge base into GPT-4o's KV cache, eliminating vector search latency entirely — achieving 50–200ms response times vs RAG's 200–600ms with 50% cost savings on cached tokens.",
        tech: ["Next.js", "TypeScript", "FastAPI", "Python", "OpenAI", "Redis", "SQLite", "Docker"],
        github: "https://github.com/sairam3824/CacheForge-CAG",
        category: "AI Search & RAG",
        iconName: "Search",
        featured: true,
        tagline: "Cache-Augmented Generation • 50–200ms Latency • 50% Cost Savings vs RAG",
    },
    {
        title: "Graph RAG",
        description:
            "Knowledge Graph-Enhanced RAG that combines vector search with graph traversal for deeper question answering. Extracts entities and relationships from documents, builds a NetworkX knowledge graph, and traverses entity connections to discover context that vector-only search misses — with interactive pyvis visualization.",
        tech: ["Python", "LangChain", "ChromaDB", "NetworkX", "OpenAI", "Streamlit", "pyvis"],
        github: "https://github.com/sairam3824/graph-rag",
        category: "AI Search & RAG",
        iconName: "Search",
        featured: true,
        tagline: "Knowledge Graph + Vector Search • Entity Relationships • Graph Traversal",
    },
    {
        title: "Codebase RAG Assistant",
        description:
            "RAG system for querying any GitHub repo or local codebase via natural language. Uses Tree-sitter for semantic code chunking (functions/classes), ChromaDB for vector storage, cross-encoder reranking, and dependency graphs for impact analysis. Supports 15+ languages with CLI and REST API interfaces.",
        tech: ["Python", "FastAPI", "ChromaDB", "OpenAI", "Tree-sitter", "Sentence-Transformers"],
        github: "https://github.com/sairam3824/codebase-rag-assistant",
        category: "AI Search & RAG",
        iconName: "Search",
        featured: true,
        tagline: "Semantic Code Search • 15+ Languages • Dependency Graphs",
    },
    {
        title: "Legal Doc Analyzer (RAG)",
        description:
            "AI-powered contract review system with clause extraction, risk scoring, and document-grounded Q&A. Features hybrid retrieval (semantic 70% + BM25 30%), risk classification (Low/Medium/High), streaming chat, and markdown report export across PDF, DOCX, and TXT formats.",
        tech: ["Next.js", "TypeScript", "OpenAI", "Tailwind CSS", "pdf-parse", "Vercel AI SDK"],
        github: "https://github.com/sairam3824/legal-doc-analyzer-rag",
        category: "AI Search & RAG",
        iconName: "Search",
        featured: true,
        tagline: "Contract Review AI • Hybrid Retrieval • Risk Scoring",
    },
    {
        title: "Personal Email Triage Agent",
        description:
            "AI-powered Gmail inbox triage system that classifies messages, drafts replies, archives low-priority mail, and automates unsubscribe flows. Features local preference learning through a rules engine, Playwright-based automation, and a SQLite audit log for decision tracking.",
        tech: ["Python", "OpenAI", "Gmail API", "SQLite", "Playwright", "CLI"],
        github: "https://github.com/sairam3824/Personal-Email-Triage-Agent",
        category: "AI Agent",
        iconName: "Zap",
        featured: true,
        tagline: "Autonomous Gmail Triage • Local Preference Learning • Automated Unsubscribe",
    },
    {
        title: "Insight RAG - AI Search Engine",
        description:
            "Sophisticated knowledge-base search engine using OpenAI's Agent SDK and o1 models. Features intelligent PDF processing, vector-based semantic search, and reasoning-driven retrieval.",
        tech: ["FastAPI", "OpenAI", "Agent SDK", "Streamlit", "Node.js"],
        github: "https://github.com/sairam3824/Insight-RAG",
        category: "AI Search & RAG",
        iconName: "Search",
        featured: true,
        tagline: "o1 Reasoning • Agentic Knowledge Discovery",
    },
    {
        title: "DevOps Agent Platform",
        description:
            "Self-hosted multi-agent system for infrastructure management, CI/CD optimization, and automated diagnostics. Features 4 autonomous agents — Infrastructure (Docker/K8s/Terraform generation), Pipeline (CI/CD analysis & optimization), Heal (CrashLoopBackOff/OOMKilled diagnosis with remediation), and Orchestrator (sequential & parallel workflows). Powered by Ollama (Llama3 + CodeLlama) with FAISS-based RAG. Zero cloud dependencies.",
        tech: ["Next.js 15", "FastAPI", "Python", "TypeScript", "Ollama", "FAISS", "Redis", "Docker", "Kubernetes", "SQLite"],
        github: "https://github.com/sairam3824/devops-agent-platform",
        category: "AI Agent",
        iconName: "Zap",
        featured: true,
        tagline: "4 Autonomous Agents • Self-Hosted DevOps • Zero Cloud Dependencies",
    },
    {
        title: "K-AgriRisk",
        description:
            "Interpretable multimodal crop risk prediction platform using Kolmogorov-Arnold Networks (KAN) — telling farmers not just what will happen, but why and what they can do about it. Features native spline-based explainability, constrained algorithmic recourse over mutable features (NPK, soil pH, area), multi-dataset validation across Indian and UK agricultural datasets, and a FastAPI + React dashboard with SHAP, KAN spline charts, and model comparison across XGBoost, CatBoost, RF, MLP, and KAN.",
        tech: ["Python", "FastAPI", "KAN", "XGBoost", "CatBoost", "SHAP", "React", "Vite", "Tailwind CSS", "Pydantic", "scikit-learn"],
        github: "https://github.com/sairam3824/K-AgriRisk",
        category: "Machine Learning",
        iconName: "Leaf",
        featured: true,
        tagline: "KAN-Powered Crop Risk • Algorithmic Recourse • Interpretable AI",
    },
    {
        title: "Brain Tumor Multimodal Classifier",
        description:
            "A comprehensive multimodal deep learning system for brain tumor classification and analysis. Features a modern React frontend and a robust Flask backend for real-time inference, with advanced diagnostic capabilities including probability distribution visualization, and XAI (Grad-CAM) for model interpretability.",
        tech: ["Python", "Flask", "React", "Vite", "Deep Learning", "Grad-CAM"],
        github: "https://github.com/sairam3824/Brain-Tumor-Multimodal-Classifier",
        category: "Deep Learning",
        iconName: "Brain",
        featured: true,
        tagline: "Multimodal AI • Real-time Classification • XAI Interpretability",
    },
    {
        title: "NeuroLens: Brain Tumor Classifier",
        description:
            "Research-grade web app for explainable brain tumor classification from MRI scans. Fuses Topological Data Analysis (TDA), Tucker/Tensor Train decomposition, and classical ML — achieving 92.45% accuracy (SVM-RBF) with GradCAM++ heatmaps, TDA-derived ROI masks via persistent homology, and quantitative IoU/Dice explainability metrics across 4 tumor classes.",
        tech: ["Python", "PyTorch", "Flask", "scikit-learn", "TensorLy", "ripser", "XGBoost", "LightGBM", "OpenCV"],
        github: "https://github.com/sairam3824/NeuroLens",
        category: "Computer Vision",
        iconName: "Cpu",
        featured: true,
        tagline: "TDA + Tensor Fusion • 92.45% Accuracy • GradCAM++ Explainability",
    },
    {
        title: "RecForge Recommendation Engine",
        description:
            "Production-grade recommendation platform demonstrating end-to-end personalization with collaborative filtering, content retrieval, hybrid ranking, explainable recommendations, deterministic A/B/C experimentation, and admin analytics for model operations.",
        tech: ["FastAPI", "Next.js 14", "PostgreSQL", "Redis", "PyTorch", "FAISS", "Surprise SVD", "Docker"],
        github: "https://github.com/sairam3824/RecForge-recommendation-engine",
        category: "Machine Learning",
        iconName: "Activity",
        featured: true,
        tagline: "Hybrid Recommender • FAISS + SVD • A/B Experimentation",
    },
    {
        title: "RL Arena",
        description:
            "A local-first reinforcement learning playground for training and comparing RL agents. Supports multi-algorithm training (PPO, DQN, A2C), classic control environments, and custom GridWorlds with real-time WebSocket-based monitoring and visualization.",
        tech: ["Python", "Stable-Baselines3", "WebSockets", "Next.js", "Docker", "TypeScript", "Gymnasium"],
        github: "https://github.com/sairam3824/RL-Arena",
        category: "Machine Learning",
        iconName: "Rocket",
        featured: true,
        tagline: "Local RL Playground • Multi-Algorithm Support • Real-time Monitoring",
    },
    {
        title: "Multimodal Disaster Intelligence",
        description:
            "A comprehensive disaster management platform that integrates IoT sensor data, social media analytics, and satellite imagery (xBD dataset) for real-time intelligence and AI-driven resource allocation. Features DeepLabV3+ for damage assessment and real-time social media processing.",
        tech: ["Python", "PyTorch", "IoT", "Deep Learning", "NLP", "Flask"],
        github: "https://github.com/sairam3824/Multimodal-diaster-management",
        category: "Deep Learning",
        iconName: "Activity",
        featured: true,
        tagline: "Multimodal AI • IoT Integration • Disaster Response",
    },

    {
        title: "Sentinel-AI: Autonomous QA",
        description:
            "AI-powered test automation system leveraging RAG to generate comprehensive test cases and executable Selenium scripts. Features semantic search with ChromaDB.",
        tech: ["FastAPI", "Selenium", "ChromaDB", "OpenAI", "Streamlit"],
        github: "https://github.com/sairam3824/sentinel-ai",
        category: "AI Automation",
        iconName: "Shield",
        featured: true,
        tagline: "Autonomous Testing • RAG-Powered QA Agent",
    },
    {
        title: "AstraFlow: AI Intelligence Platform",
        description:
            "Comprehensive microservices-based AI platform featuring RAG knowledge bases, real-time stock market analysis with Kafka, and autonomous agent workflows.",
        tech: ["Microservices", "Kafka", "Redis", "ChromaDB", "Docker"],
        github: "https://github.com/sairam3824/astraflow",
        category: "AI Platform",
        iconName: "Brain",
        featured: true,
        tagline: "Microservices Architecture • Real-time Intelligence",
    },
    {
        title: "AI Interview Platform",
        description:
            "AI-powered recruitment system using Django, Google Gemini, and OpenAI GPT. Features automated technical question generation, intelligent candidate evaluation, and resume parsing.",
        tech: ["Django", "Google Gemini", "OpenAI", "REST Framework", "Python"],
        github: "https://github.com/sairam3824/django-ai-interview-platform",
        category: "AI Platform",
        iconName: "Terminal",
        featured: true,
        tagline: "AI-Powered Hiring • Automated Evaluation",
    },
    {
        title: "AI Resume Tailor",
        description:
            "AI-powered resume customization tool that analyzes skill gaps between your resume and a job description, rewrites bullet points to match JD keywords, scores your ATS fit, and generates a fully tailored resume — powered by GPT-4o-mini with spaCy NER and scikit-learn keyword extraction.",
        tech: ["Next.js", "TypeScript", "FastAPI", "OpenAI", "spaCy", "Scikit-learn", "Tailwind CSS", "shadcn/ui"],
        github: "https://github.com/sairam3824/AI-Resume-Tailor",
        category: "AI Agent",
        iconName: "Zap",
        featured: true,
        tagline: "ATS Scoring • Skill Gap Analysis • Auto-Tailored Resume",
    },
    {
        title: "CareerBlueprint: AI Career Bot",
        description:
            "Intelligent career assistant using semantic skill analysis and GPT-powered matching. Features multi-source job fetching, skill gap identification, and application tracking.",
        tech: ["Flask", "Transformers", "OpenAI", "React", "Adzuna API"],
        github: "https://github.com/sairam3824/CareerBlueprint-",
        category: "AI Agent",
        iconName: "Zap",
        featured: true,
        tagline: "Semantic Career Matching • Skill Gap Analysis",
    },
    {
        title: "Context Engineering Playground",
        description:
            "A browser-based devtool for building, reordering, and compressing LLM context windows visually. Features drag-and-drop context blocks, real-time token counts, and automated optimization.",
        tech: ["Next.js 14", "Tailwind CSS", "TypeScript", "GPT-Tokenizer", "Recharts", "Framer Motion"],
        github: "https://github.com/sairam3824/Context-Engineering-Playground",
        category: "AI Platform",
        iconName: "Brain",
        featured: true,
        tagline: "LLM Context Visualizer • Drag-and-Drop Building • Token Optimization",
    },
    {
        title: "Synthetic Data Factory",
        description:
            "A modular framework for generating high-quality synthetic datasets using Large Language Models (LLMs) via OpenRouter. Includes automated quality evaluation, customizable generation templates, and a Streamlit monitoring dashboard for data curation.",
        tech: ["Python", "OpenRouter", "LLMs", "Docker", "Streamlit", "Pandas"],
        github: "https://github.com/sairam3824/Synthetic-Data-Factory",
        category: "AI Platform",
        iconName: "Cpu",
        featured: true,
        tagline: "LLM-Powered Data Generation • Quality Assurance • Streamlit Dashboard",
    },
    {
        title: "AI Data Pipeline Builder",
        description:
            "A full-stack monorepo for architecting and managing AI data pipelines. Features a robust Next.js web interface, Prisma ORM for lineage tracking, and Python-based worker services for scalable data ingestion and processing.",
        tech: ["Next.js", "Prisma", "Tailwind CSS", "Python", "Docker", "TypeScript", "FastAPI"],
        github: "https://github.com/sairam3824/AI-Data-Pipeline-Builder",
        category: "AI Platform",
        iconName: "Terminal",
        featured: true,
        tagline: "Scalable Data Engineering • Full-Stack Monorepo • Next.js + Python",
    },
    {
        title: "VoiceGen Pro",
        description:
            "Full-stack text-to-speech SaaS platform built with FastAPI and React. Supports multi-speaker scripts using voice tags, optional duration control, and downloadable WAV audio — powered by Coqui TTS with a modern glassmorphism UI.",
        tech: ["FastAPI", "React", "Vite", "Coqui TTS", "Python", "CSS"],
        github: "https://github.com/sairam3824/voicegen-pro",
        category: "AI Platform",
        iconName: "Brain",
        featured: true,
        tagline: "Multi-Speaker TTS SaaS • Coqui TTS Engine",
    },
    {
        title: "AI Flashcard Generator",
        description:
            "Transform documents into study-ready flashcards with AI. Supports PDF/TXT/MD uploads, URL ingestion, and manual text entry. Configurable quantity, question types, difficulty, and focus areas — with an interactive study mode, keyboard shortcuts, and Anki CSV export.",
        tech: ["Next.js", "TypeScript", "OpenAI", "Tailwind CSS", "Framer Motion", "pdf-parse"],
        github: "https://github.com/sairam3824/ai-flashcard-generator",
        category: "AI Platform",
        iconName: "Brain",
        featured: true,
        tagline: "Multi-Source Ingestion • Anki Export • GPT-4o-mini",
    },
    {
        title: "AI-Powered Portfolio",
        description:
            "Next-generation AI portfolio featuring intelligent chat assistance. Built with agentic search and dynamic AI-driven interactions for personalized user experiences.",
        tech: ["React", "TypeScript", "Tailwind CSS", "n8n", "AI APIs"],
        github: "https://github.com/sairam3824/Ai-Portfolio",
        category: "Web Development",
        iconName: "Rocket",
        featured: true,
        tagline: "AI-Native Interaction",
    },
    {
        title: "ShopInsight: Shopify Analytics",
        description:
            "Multi-tenant analytics dashboard for Shopify merchants. Features secure OAuth integration, real-time webhook processing, and interactive revenue/product insights.",
        tech: ["Next.js", "Node.js", "PostgreSQL", "Prisma", "Shopify API"],
        github: "https://github.com/sairam3824/ShopInsight",
        category: "Enterprise Software",
        iconName: "Activity",
        featured: true,
        tagline: "Multi-Tenant Analytics • Real-time Data Sync",
    },
    {
        title: "LLM Token Debugger",
        description:
            "An interactive, client-side developer tool that visualizes exactly how LLMs and embedding models tokenize your text. Supports 50 models across 8 providers, featuring side-by-side comparison and real-time stats without sending any data to a backend.",
        tech: ["Next.js", "React", "TypeScript", "Tailwind CSS", "gpt-tokenizer"],
        github: "https://github.com/sairam3824/LLM-Token-Debugger",
        category: "Infrastructure",
        iconName: "Terminal",
        featured: true,
        tagline: "Interactive Tokenizer Visualizer • 50 Models • 8 Providers",
    },
    {
        title: "Alzheimer's Audio & Image Screening",
        description:
            "A comprehensive Flask-based research platform for multimodal Alzheimer's screening. Features a dual-branch transformer architecture (WavLM + RoBERTa) for speech and transcript analysis, automated MMSE severity estimation, and SHAP-based explainability. Includes extensive pipelines for acoustic, linguistic, and pause-feature extraction, alongside experimental MRI image inference modules.",
        tech: ["Python", "Flask", "PyTorch", "XGBoost", "Transformers", "scikit-learn", "WavLM", "SHAP"],
        github: "https://github.com/sairam3824/Alzheimers-Audio-Image-Screening",
        category: "Deep Learning",
        iconName: "Brain",
        featured: true,
        tagline: "Multimodal Alzheimer's Screening • Speech Biomarkers • MRI Inference",
    },
    {
        title: "macOS Agent Platform",
        description:
            "A local-first macOS desktop agent that runs AI entirely on your machine via Ollama (Gemma 3, Llama, Mistral) with optional cloud fallback (OpenAI, Anthropic). Features macOS automation via AppleScript — opening apps, reading files, inspecting Finder, drafting emails — plus screenshot capture with Tesseract OCR, a risk-leveled permission system, global Cmd+Shift+Space shortcut for instant text analysis, dry-run mode, and a full React dashboard served at localhost:8000 with chat console, action logs, and settings.",
        tech: ["Python", "FastAPI", "React", "TypeScript", "Ollama", "AppleScript", "Tesseract OCR", "SQLite", "Zustand"],
        github: "https://github.com/sairam3824/macOS-Agent-Platform",
        category: "AI Agent",
        iconName: "Zap",
        featured: true,
        tagline: "Local-First macOS Agent • Ollama + AppleScript Automation • Privacy-First",
    },
    {
        title: "LLM Ops Monitor",
        description:
            "Production-grade observability platform for LLM-powered applications. Monitor throughput, latency, cost, quality, prompt drift, and hallucination signals across your entire AI estate from a single dashboard. Features a live KPI dashboard backed by ClickHouse rollups, a trace explorer for drilling into individual LLM requests, a threshold-based alert engine with webhook delivery, prompt governance with drift scoring, a hybrid hallucination detection evaluator pipeline (lexical heuristics + LLM judge via OpenRouter), a Python SDK with sync/async instrumentation, real-time SSE updates via Redis pub/sub, and pre-provisioned Grafana dashboards.",
        tech: ["Next.js 15", "TypeScript", "FastAPI", "Python", "ClickHouse", "PostgreSQL", "Redis", "Docker", "Grafana", "OpenRouter"],
        github: "https://github.com/sairam3824/LLM-Ops-Monitor",
        category: "Infrastructure",
        iconName: "Activity",
        featured: true,
        tagline: "LLM Observability Platform • ClickHouse Analytics • Hallucination Detection",
    },
    {
        title: "Sentinel: Self-Hostable LLM Gateway",
        description:
            "OpenAI-compatible proxy that drops in as a self-hosted middleware layer for LLM requests — point your SDK at a new base_url and route every call through the gateway with no code changes. Implements a multi-stage request pipeline (auth → rate limiting → semantic cache → backend routing → cost logging) with FAISS + sentence-transformers semantic caching (~200× faster retrieval at ~4ms vs ~820ms), Redis token-bucket rate limiting via atomic Lua scripts, ordered fallback routing with retries and exponential backoff, per-request token/USD cost tracking, virtual API keys with scoped limits, PII redaction in logs, and a Next.js admin dashboard for usage visualization — all deployable with one Docker command.",
        tech: ["Python", "FastAPI", "FAISS", "Sentence-Transformers", "Redis", "SQLAlchemy", "PostgreSQL", "tiktoken", "Next.js 14", "TypeScript", "Docker"],
        github: "https://github.com/sairam3824/Sentinel-Self-Hostable-LLM-Gateway",
        category: "Infrastructure",
        iconName: "Shield",
        featured: true,
        tagline: "OpenAI-Compatible LLM Gateway • Semantic Caching • Rate Limiting & Cost Tracking",
    },
    {
        title: "Vibe Coder",
        description:
            "Local-first autonomous AI coding agent platform that transforms natural-language tasks into production-ready code. It features a sophisticated multi-agent workflow orchestrated by LangGraph, isolated execution via Git worktrees, and a secure Docker-based validation sandbox. The system handles the entire development lifecycle: repository scanning, symbol extraction with Tree-sitter, automated planning, multi-file editing with self-healing repair loops, and live progress streaming via SSE—complete with diff approvals and commit artifacts.",
        tech: ["FastAPI", "React", "LangGraph", "Docker", "OpenRouter", "Tree-sitter", "SQLite", "Vite", "Pydantic"],
        github: "https://github.com/sairam3824/Vibe-Coder",
        category: "AI Agent",
        iconName: "Zap",
        featured: true,
        tagline: "Autonomous AI Coding Agent • Docker-Based Validation • Self-Healing Repair Loops",
    },
    {
        title: "LLMScope",
        description:
            "Local-first observability platform for LLM-powered applications. A Python SDK wraps OpenAI, Anthropic, Ollama, and custom calls to capture latency, tokens, cost, errors, and metadata — backed by local SQLite storage with export. Features ChromaDB-powered semantic search over captured calls, regex-based PII redaction with allowlisting, model-pricing cost estimation, embedding-based drift detection, OpenTelemetry span exports, and a Next.js dashboard for browsing, comparing, and analyzing requests.",
        tech: ["Python", "FastAPI", "SQLite", "ChromaDB", "Sentence-Transformers", "OpenTelemetry", "Next.js", "TypeScript"],
        github: "https://github.com/sairam3824/LLMScope",
        category: "Infrastructure",
        iconName: "Activity",
        featured: true,
        tagline: "Local-First LLM Observability • Semantic Call Search • PII Redaction & Cost Tracking",
    },
    {
        title: "DocuMind",
        description:
            "Schema-driven document extraction tool that converts PDFs and scanned images into structured, validated JSON/CSV. Users upload a document and select or define a Pydantic schema; the system constrains LLM output to that shape, validates results, and runs automated self-repair retries (up to 3 attempts). Features hybrid processing for native PDFs and scanned images with automatic Tesseract OCR fallback, per-field provenance (confidence scores, source text, page numbers, bounding boxes), and support for both OpenAI and local Ollama models.",
        tech: ["React 18", "TypeScript", "Vite", "Tailwind CSS", "FastAPI", "Python", "Pydantic", "PyMuPDF", "pdfplumber", "pytesseract", "OpenAI", "Ollama"],
        github: "https://github.com/sairam3824/DocuMind",
        category: "AI Platform",
        iconName: "Cpu",
        featured: true,
        tagline: "Schema-Driven Document Extraction • Validated JSON/CSV • Provenance & Self-Repair",
    },


    {
        title: "EdgeAI: Browser ML Playground",
        description:
            "Production-grade, browser-based machine learning inference playground that runs text generation, image classification, and text embeddings 100% client-side using WebGPU and Web Workers. Zero backend, zero API keys — your data never leaves your device. Features streaming token output with log probabilities, drag-and-drop image classification with webcam capture, NxN cosine similarity heatmaps with 2D PCA scatter plots, and a configurable benchmark suite with JSON/Markdown export.",
        tech: ["Next.js", "TypeScript", "WebGPU", "Web Workers", "Transformers.js", "Tailwind CSS", "Zustand", "Recharts"],
        github: "https://github.com/sairam3824/edgeai",
        category: "AI Platform",
        iconName: "Cpu",
        featured: true,
        tagline: "100% Client-Side ML • WebGPU Accelerated • Zero Server Calls",
    },
    {
        title: "JARVIS: Local AI Assistant",
        description:
            "A local-first AI assistant with a FastAPI backend, React + Vite frontend, WebSocket streaming, SQLite-backed memory, and a modular tool system. Features intent classification, tool planning with safety policies, workspace modules for analytics, vision, planning, QR workflows, and smart-home status. Includes a cinematic chat HUD with Three.js, voice chat via OpenRouter, and confirm-required desktop actions with scoped filesystem access.",
        tech: ["FastAPI", "React", "TypeScript", "Vite", "Three.js", "OpenRouter", "SQLite", "WebSocket", "Docker", "Zustand"],
        github: "https://github.com/sairam3824/JARVIS",
        category: "AI Agent",
        iconName: "Zap",
        featured: true,
        tagline: "Local-First AI Assistant • Tool Orchestration • Cinematic Three.js HUD",
    },
    {
        title: "TruthAgent",
        description:
            "Multi-model verification platform that fans a question out to a configurable set of LLMs via OpenRouter, extracts atomic claims from each response, clusters agreements and conflicts across models, and returns a verdict with a full audit trail. Optional deep verification adds Socratic follow-ups, semantic entropy sampling, and Tavily-backed web evidence. Tracks benchmark runs against a seeded hallucination corpus across multiple risk domains, with a Next.js dashboard and FastAPI backend streaming progress over NDJSON.",
        tech: ["FastAPI", "Next.js 14", "Python", "TypeScript", "OpenRouter", "Tavily", "Docker"],
        github: "https://github.com/sairam3824/TruthAgent",
        category: "AI Agent",
        iconName: "Shield",
        featured: true,
        tagline: "Multi-Model Hallucination Verification • Semantic Entropy • Benchmark Leaderboard",
    },
    {
        title: "RecForge",
        description:
            "Production-grade recommendation platform demonstrating end-to-end personalization on an Item-generic backend (movies today, products/articles tomorrow). Combines collaborative filtering (Surprise SVD), content-based retrieval (TF-IDF + FAISS ANN), a PyTorch weighted linear hybrid ranker, optional LLM reranking via OpenRouter, explainable recommendations, deterministic A/B/C experimentation, and an admin analytics surface for model operations.",
        tech: ["FastAPI", "Next.js", "PostgreSQL", "Redis", "PyTorch", "FAISS", "Surprise SVD", "OpenRouter", "Docker"],
        github: "https://github.com/sairam3824/RecForge",
        category: "Machine Learning",
        iconName: "Activity",
        featured: true,
        tagline: "End-to-End Personalization • Hybrid Ranker • LLM Reranking & A/B/C Experiments",
    },

    {
        title: "Paraphrase Detective",
        description:
            "Local-first plagiarism and paraphrase detection system that identifies copied passages, heavy paraphrasing, and cross-lingual content reuse by comparing documents against a known corpus. Features multilingual E5 embeddings for translation-laundered content, stylometric burst analysis to surface sudden writing-style shifts, multiple vector search backends (FAISS, hnswlib, scikit-learn), and dual CLI + Streamlit interfaces with HTML/PDF reports and side-by-side passage alignment across PDF, DOCX, TXT, Markdown, and HTML formats.",
        tech: ["Python", "Sentence-Transformers", "FAISS", "hnswlib", "spaCy", "Streamlit", "scikit-learn"],
        github: "https://github.com/sairam3824/Paraphrase-Detective",
        category: "Machine Learning",
        iconName: "Search",
        featured: true,
        tagline: "Local-First Plagiarism Detection • Multilingual E5 Embeddings • Stylometric Analysis",
    },
    {
        title: "RedTeam Rig",
        description:
            "Adversarial testing framework that runs deterministic prompt-attack suites against LLM applications and grades responses against a YAML behavior contract with explicit must/must-not clauses. Ships 12 attack families (jailbreaks, prompt injection, data extraction, refusal bypass, tool misuse, confabulation probes), pluggable endpoint adapters (HTTP, Anthropic, OpenAI, OpenRouter, custom Python callables), an Anthropic-based judge for clause-by-clause evaluation, rich console/JSON/HTML reports, and a pytest plugin with CI-friendly severity-based exit codes.",
        tech: ["Python", "Anthropic", "OpenAI", "OpenRouter", "Pydantic", "pytest", "YAML"],
        github: "https://github.com/sairam3824/redteam-rig",
        category: "AI Security",
        iconName: "Shield",
        featured: true,
        tagline: "Contract-Based LLM Red Teaming • 12 Attack Families • pytest + CI Integration",
    },
    {
        title: "RAGGuard",
        description:
            "Defensive security demonstration that defends RAG systems against indirect prompt injection — malicious instructions planted inside retrieved documents rather than user input. Plants harmful instructions in a poisoned corpus, shows how they hijack a local LLM, then activates a three-layer defense pipeline (spotlighting for data/instruction boundaries, a sanitizer that strips injection syntax, and an LLM-based classifier with quarantine) to drive attack success rate from 100% to 0%. Covers four attack scenarios — instruction override, canary exfiltration, link injection, and format abuse — with an interactive attack/defense visualization, ablation benchmarks, and a fully local stack via Ollama, local embeddings, and FAISS.",
        tech: ["Python", "FastAPI", "Ollama", "Sentence-Transformers", "FAISS", "Next.js", "TypeScript"],
        github: "https://github.com/sairam3824/RAGGuard",
        category: "AI Security",
        iconName: "Shield",
        featured: true,
        tagline: "RAG Indirect Prompt Injection Defense • Spotlighting + Sanitizer + Classifier • 100%→0% Attack Success",
    },
    {
        title: "RedProbe",
        description:
            "Defensive evaluation harness that tests LLM robustness against prompt injection and jailbreak attacks. Fires ~55 documented public attack payloads at a system prompt across five categories — direct injection, system prompt extraction, role-play jailbreaking, encoding obfuscation, and delimiter confusion — then scores resistance on a 0–100 robustness metric. Combines deterministic rule-based checks (canary tokens, regex, keywords) with an LLM-as-judge for fuzzy cases, supports before/after scoring to measure prompt hardening, severity-weighted scoring, and a YAML-based customizable payload library. Outputs JSON, Markdown, and a live Textual dashboard against Ollama or OpenAI-compatible endpoints.",
        tech: ["Python", "Ollama", "Textual", "pytest", "uv", "YAML"],
        github: "https://github.com/sairam3824/RedProbe",
        category: "AI Security",
        iconName: "Shield",
        featured: true,
        tagline: "LLM Robustness Harness • ~55 Attack Payloads • Rule-Based + LLM Judge Scoring",
    },
    {
        title: "Constitutional AI Self-Critique Loop",
        description:
            "Python library and CLI that wraps any LLM call in a configurable critique-and-revise loop inspired by Constitutional AI. Users define YAML constitutions of principles (with severity levels and examples); the system generates an answer, runs all principle critiques in parallel, and triggers automatic revision rounds on high or repeated medium-severity violations. Features multi-provider support (OpenAI, Anthropic, OpenRouter), full audit trails with token usage and cost accounting, and batch evaluation over JSONL datasets — built for rapid policy iteration before reaching for fine-tuning.",
        tech: ["Python", "asyncio", "Anthropic", "OpenAI", "OpenRouter", "pytest", "YAML"],
        github: "https://github.com/sairam3824/Constitutional-AI-Self-Critique-Loop",
        category: "AI Security",
        iconName: "Shield",
        featured: true,
        tagline: "Constitutional AI Critique-and-Revise Loop • Parallel Principle Checks • Audit Trails",
    },
    {
        title: "TempBench: Temporal Reasoning Benchmark",
        description:
            "Reproducible evaluation framework measuring how well LLMs handle temporal reasoning. Ships a 500-question dataset (plus a curated 120-question core set) across eight categories — relative time arithmetic, event ordering, duration calculation, timezone conversion, calendar reasoning, counterfactual history, temporal quantifier disambiguation, and tense implication. Features a multi-provider CLI evaluation harness (OpenAI, Anthropic, OpenRouter), judge-model grading with reproducible results, manual override templates for human review, dataset validation with inter-rater agreement analysis, and an interactive Streamlit leaderboard.",
        tech: ["Python", "Streamlit", "OpenAI", "Anthropic", "OpenRouter", "pytest"],
        github: "https://github.com/sairam3824/Temporal-Reasoning-Benchmark-for-LLMs",
        category: "AI Platform",
        iconName: "Activity",
        featured: true,
        tagline: "LLM Temporal Reasoning Benchmark • 8 Categories • Judge-Model Grading & Leaderboard",
    },
    {
        title: "Multi-Agent Code Review Crew",
        description:
            "Automated code review system that deploys specialized AI reviewer agents in parallel — each focused on security, performance, readability, test coverage, API design, accessibility, or commit hygiene — with a lead reviewer pass that deduplicates and ranks findings into a single Markdown report. Features a dual interface (CLI for local repos and a FastAPI webhook service for GitHub App PR automation), constrained safe tools for file listing, diff lookup, and code search, plus pre-execution token and cost budgeting to prevent overspend.",
        tech: ["Python", "FastAPI", "Anthropic", "asyncio", "GitHub API"],
        github: "https://github.com/sairam3824/Multi-Agent-Code-Review-Crew",
        category: "AI Agent",
        iconName: "Zap",
        featured: true,
        tagline: "Parallel Multi-Agent PR Review • GitHub App Integration • Cost-Budgeted Orchestration",
    },
    {
        title: "Tiny GPT on the Indian Constitution",
        description:
            "Educational MLX project that trains a small GPT-style decoder from scratch on Indian constitutional text and landmark Supreme Court judgments. Builds a configurable legal corpus, trains an 8,192-token byte-level BPE tokenizer, and implements a decoder-only transformer (6 layers, 6 heads, 384 hidden width, rotary embeddings) directly with mlx.core and mlx.nn. Features resumable checkpoints, ROUGE-L evaluation against a QA set, comparison against TinyLlama-1.1B, and a Streamlit app with live token streaming and final-layer attention heatmaps.",
        tech: ["Python", "Apple MLX", "BPE Tokenizer", "Transformers", "Streamlit", "ROUGE"],
        github: "https://github.com/sairam3824/Tiny-GPT-Trained-on-the-Indian-Constitution",
        category: "Deep Learning",
        iconName: "Brain",
        featured: true,
        tagline: "GPT From Scratch in MLX • Legal Corpus • Attention Heatmaps",
    },
    {
        title: "Tiny MoE from Scratch in MLX",
        description:
            "Educational MLX project that implements a decoder-only language model with Mixture-of-Experts (MoE) feed-forward layers entirely from scratch and trains it on TinyStories. Builds a 6-layer causal transformer (256 dim, 4 heads) with MoE blocks in alternating layers — 4 experts using top-2 noisy routing and a Switch-style load-balancing auxiliary loss — alongside a dense baseline for comparison. Ships two model sizes (~8.5M and ~30.6M params), a 4,096-token byte-level BPE tokenizer, checkpoint management, perplexity/throughput evaluation, and a Streamlit app for inspecting token-to-expert routing patterns.",
        tech: ["Python", "Apple MLX", "Mixture-of-Experts", "BPE Tokenizer", "SafeTensors", "Streamlit"],
        github: "https://github.com/sairam3824/Tiny-MoE-from-Scratch-in-MLX",
        category: "Deep Learning",
        iconName: "Cpu",
        featured: true,
        tagline: "MoE Transformer From Scratch in MLX • Top-2 Noisy Routing • Expert Routing Visualizer",
    },
    {
        title: "Streaming Speech-to-Intent Router",
        description:
            "Local, low-latency macOS voice command router that turns microphone audio into structured intents and runs Python action handlers — a privacy-first 'personal Siri' pipeline for Apple Silicon where audio never leaves the device. Captures 16 kHz mono audio with WebRTC VAD for speech boundary detection, transcribes utterances via local whisper.cpp (pywhispercpp) with partial-transcript callbacks, and routes commands into 12 built-in intents using local embeddings plus a scikit-learn LogisticRegression classifier with a keyword fallback. Ships both a CLI listener and a macOS menu bar app, optional Anthropic-generated training data, ONNX export, and latency metric logging.",
        tech: ["Python", "whisper.cpp", "WebRTC VAD", "scikit-learn", "ONNX", "Anthropic", "macOS"],
        github: "https://github.com/sairam3824/Streaming-Speech-to-Intent-Router",
        category: "AI Agent",
        iconName: "Mic",
        featured: true,
        tagline: "Local Voice-to-Intent Router • whisper.cpp + VAD • Privacy-First macOS",
    },
    {
        title: "Speculative Decoding Playground",
        description:
            "Interactive Streamlit playground for exploring speculative decoding with MLX-LM on Apple Silicon. Loads a small draft model and a larger target model, streams token-level accept/correct/extend decisions, and plots rolling acceptance-rate and tokens-per-second charts. Features draft/target model selection, a comparison mode for draft-only, target-only, and speculative generation, conservative memory estimates for a 14 GB budget, JSON run history, and a companion walkthrough notebook.",
        tech: ["Python", "Apple MLX", "MLX-LM", "Streamlit", "Jupyter", "Hugging Face"],
        github: "https://github.com/sairam3824/Speculative-Decoding-Playground",
        category: "Deep Learning",
        iconName: "Cpu",
        featured: true,
        tagline: "Speculative Decoding Visualizer • Draft + Target Models • Apple Silicon MLX",
    },
    {
        title: "Personal Finance Forecaster",
        description:
            "Local-first Python toolkit for importing bank statements, categorizing personal transactions, forecasting monthly spend, and reviewing model backtests. Imports CSV statements into SQLite with auto-detected bank schemas, categorizes transactions via configurable regex rules, forecasts category-level monthly spend with inverse-MAPE ensemble weighting and robust baseline fallbacks, runs walk-forward backtests, and explores scenarios, savings goals, and manual overrides in a Streamlit dashboard — with CSV and PDF report export.",
        tech: ["Python", "Prophet", "LightGBM", "PyTorch Forecasting", "pandas", "SQLite", "Streamlit"],
        github: "https://github.com/sairam3824/Personal-Finance-Forecaster",
        category: "Machine Learning",
        iconName: "Activity",
        featured: true,
        tagline: "Local-First Finance Forecasting • Ensemble Models • Walk-Forward Backtests",
    },
    {
        title: "MLX-Native Vision Transformer From Scratch",
        description:
            "Compact Vision Transformer for Apple Silicon, written around MLX and trained from scratch on CIFAR-10 with optional custom image classes. Implements patch embeddings, multi-head self-attention, and MLP blocks as a ViT-Tiny (12 layers, 192-dim embeddings, 3 heads) trained with AdamW, cosine warmup, mixed precision, label smoothing, mixup, and cutmix. Features top-1/top-5 and per-class evaluation, attention rollout visualization for interpretability, a Core ML export pipeline, and a SwiftUI macOS app with drag-and-drop inference.",
        tech: ["Python", "Apple MLX", "Swift", "SwiftUI", "Core ML", "coremltools", "PyTorch", "TensorBoard"],
        github: "https://github.com/sairam3824/MLX-Native-Vision-Transformer-From-Scratch",
        category: "Computer Vision",
        iconName: "Cpu",
        featured: true,
        tagline: "ViT From Scratch in MLX • CIFAR-10 • Attention Rollout & Core ML Export",
    },
    {
        title: "Personal Browser History RAG",
        description:
            "Local-first browser memory system pairing a Chrome MV3 extension with a FastAPI server so pages you read are indexed, searched, summarized, and cited entirely from your own machine. Captures full-page text after 10+ seconds of viewing, chunks and embeds it locally via ChromaDB, and answers queries with citations using hybrid retrieval (BM25 lexical + semantic with reranking). Features optional encrypted-at-rest storage with SQLCipher, passphrase-protected endpoints, a weekly timeline/topic view, incognito exclusion and site blocklists, plus local (Ollama Phi-3) or cloud (Anthropic) answer generation.",
        tech: ["FastAPI", "Python", "React", "Vite", "Chrome MV3", "ChromaDB", "SQLCipher", "BM25", "Ollama", "Anthropic"],
        github: "https://github.com/sairam3824/Personal-Browser-History-RAG",
        category: "AI Search & RAG",
        iconName: "Search",
        featured: true,
        tagline: "Local-First Browser Memory • Hybrid Retrieval • Cited Answers",
    },
    {
        title: "Self-Hosted Re-ranker for RAG",
        description:
            "End-to-end local workflow to fine-tune, evaluate, export, and serve a domain-specific cross-encoder re-ranker for RAG pipelines. Generates or mines query/passage triples, trains a compact re-ranker with pairwise MarginMSE, reports NDCG@10 and MRR@10, exports to ONNX, and serves a /rerank API from FastAPI with PyTorch and ONNX scoring backends. Ships LangChain and LlamaIndex integration examples and a click/log mining utility for production RAG logs.",
        tech: ["Python", "FastAPI", "PyTorch", "ONNX", "Cross-Encoder", "Sentence-Transformers", "LangChain", "LlamaIndex"],
        github: "https://github.com/sairam3824/Self-Hosted-Re-ranker-for-RAG",
        category: "AI Search & RAG",
        iconName: "Search",
        featured: true,
        tagline: "Domain Cross-Encoder Re-ranker • MarginMSE Training • ONNX + FastAPI Serving",
    },
    {
        title: "Real-time Indian Sign Language Translator",
        description:
            "Research prototype that recognizes isolated Indian Sign Language (ISL) glosses from webcam video. Extracts privacy-friendly MediaPipe hand and pose landmarks, trains a lightweight PyTorch BiLSTM classifier with temporal attention pooling, and runs live predictions in a Streamlit demo with gloss buffering, sentence smoothing, and speech output. Includes a full dataset/preprocess/train/eval CLI pipeline and a SwiftUI/CoreML scaffold for macOS experimentation.",
        tech: ["Python", "PyTorch", "MediaPipe", "BiLSTM", "Streamlit", "OpenCV", "Core ML", "SwiftUI"],
        github: "https://github.com/sairam3824/Real-time-Indian-Sign-Language-Translator",
        category: "Computer Vision",
        iconName: "Cpu",
        featured: true,
        tagline: "ISL Gloss Recognition • MediaPipe Landmarks + BiLSTM • Real-time Streamlit Demo",
    },

    // ═══════════════════════════════════════════════════════════════════════════
    // SUPPORTING WORK — Tools, experiments, and earlier projects
    // ═══════════════════════════════════════════════════════════════════════════

    {
        title: "LoRA Adapter Marketplace",
        description:
            "A self-hosted marketplace for PEFT-format LoRA adapters. Upload adapter bundles, browse searchable metadata, queue reproducible evaluation runs against a fixed prompt suite, compare leaderboard results by base model and task, and generate local merge/download artifacts — backed by a FastAPI service with local artifact storage and SQLite-persisted eval results.",
        tech: ["FastAPI", "Next.js", "Python", "SQLite", "Hugging Face PEFT", "Docker"],
        github: "https://github.com/sairam3824/LoRA-Adapter-Marketplace",
        category: "Infrastructure",
        iconName: "Code2",
        featured: false,
        tagline: "Self-Hosted LoRA Marketplace • PEFT Adapters • Eval Leaderboard",
    },
    {
        title: "Semantic Diff for Codebases",
        description:
            "A Python CLI (semdiff) that compares two Git refs at the function and class level instead of raw line ranges. It extracts code units with Tree-sitter, embeds them locally with sentence-transformers to detect semantic similarity, matches likely renames and moves, and classifies each unit as unchanged, renamed, refactored, behavior-changing, rewritten, added, or removed. Outputs terminal tables, JSON, or HTML reports, with --fail-on for CI and optional Anthropic-powered behavior-change summaries.",
        tech: ["Python", "Tree-sitter", "Sentence Transformers", "Anthropic", "CLI"],
        github: "https://github.com/sairam3824/Semantic-Diff-for-Codebases",
        category: "Infrastructure",
        iconName: "Code2",
        featured: false,
        tagline: "Function-Level Semantic Diff • Tree-sitter • Rename Detection",
    },
    {
        title: "MCP Orchestrator",
        description:
            "The 'Nginx for MCP servers' — a single meta-endpoint that manages and routes requests across multiple downstream MCP servers. Features dynamic tool discovery with namespace prefixing (e.g., arxiv.search_papers), hot-reload config, load balancing with failover, health-aware routing, rate limiting, and CLI monitoring — enabling any MCP client to access dozens of tool servers through one gateway.",
        tech: ["TypeScript", "Node.js", "MCP SDK"],
        github: "https://github.com/sairam3824/MCP-Orchestrator",
        category: "Infrastructure",
        iconName: "Code2",
        featured: false,
        tagline: "MCP Gateway • Dynamic Tool Discovery • Load Balancing & Failover",
    },
    {
        title: "LLM Eval Bench",
        description:
            "Comprehensive benchmarking tool for comparing LLMs across OpenAI, Anthropic, Google, Mistral, and Ollama. Uses GPT-4o as LLM-as-Judge to score responses (1–10) on quality, latency, cost, and consistency. Features 70 built-in tests across 5 categories, radar/scatter chart visualizations, CLI + web dashboard, and zero-infrastructure SQLite storage.",
        tech: ["Next.js", "TypeScript", "SQLite", "OpenAI", "Anthropic", "Recharts", "Framer Motion"],
        github: "https://github.com/sairam3824/llm-eval-bench",
        category: "Infrastructure",
        iconName: "Code2",
        featured: false,
        tagline: "LLM-as-Judge • 70 Built-in Tests • 5 Provider Comparison",
    },
    {
        title: "Agent Eval Framework",
        description:
            "Testing and evaluation framework for AI agents inspired by Anthropic's methodology. Supports LLM-as-Judge grading, deterministic validation, composite scoring, and parallel test suite execution with retry logic and JSON output for CI integration. Tracks performance over time in SQLite with a Next.js dashboard for regression detection.",
        tech: ["Python", "Next.js", "TypeScript", "SQLite", "OpenAI", "LangChain", "Pytest"],
        github: "https://github.com/sairam3824/Agent-Eval-Framework",
        category: "Infrastructure",
        iconName: "Code2",
        featured: false,
        tagline: "AI Agent Testing • LLM-as-Judge • CI/CD Integration",
    },
    {
        title: "LLM Cost Calculator",
        description:
            "Web app for comparing AI API costs across 6+ providers (OpenAI, Anthropic, Google, Mistral, DeepSeek, open-source). Calculates per-request to yearly costs, supports use-case presets (chat, code, RAG, agents), batch discount toggles, Recharts visualizations, shareable URLs, and CSV export.",
        tech: ["Next.js", "TypeScript", "React", "Tailwind CSS", "Recharts"],
        github: "https://github.com/sairam3824/llm-cost-calculator",
        category: "Infrastructure",
        iconName: "Code2",
        featured: false,
        tagline: "Multi-Provider Cost Compare • 6+ LLMs • CSV Export",
    },
    {
        title: "README Generator AI",
        description:
            "AI-powered tool generating high-quality README.md files from local codebases or GitHub repos. Offers web UI, CLI, and API interfaces with 3 README styles (minimal, detailed, enterprise), customizable sections, built-in caching, and support for JS/TS, Python, Go, Rust, and Java projects.",
        tech: ["Next.js", "TypeScript", "OpenAI", "GitHub API", "Node.js"],
        github: "https://github.com/sairam3824/readme-generator-ai",
        category: "Infrastructure",
        iconName: "Code2",
        featured: false,
        tagline: "Web + CLI + API • 3 README Styles • Multi-Language Support",
    },
    {
        title: "MCP Server Template",
        description:
            "Production-ready TypeScript framework for building MCP servers. Includes strict typing, Zod input validation, Pino structured logging, token-bucket rate limiting, Jest tests, GitHub Actions CI/CD, multi-stage Docker builds, and an interactive setup script for rapid project initialization.",
        tech: ["TypeScript", "MCP SDK", "Zod", "Jest", "Docker", "GitHub Actions"],
        github: "https://github.com/sairam3824/mcp-server-template",
        category: "Infrastructure",
        iconName: "Code2",
        featured: false,
        tagline: "Production MCP Boilerplate • TypeScript + Docker + CI/CD",
    },
    {
        title: "arXiv MCP Server",
        description:
            "TypeScript MCP server giving LLMs full access to arXiv research papers. Supports flexible search (title, author, category, abstract), PDF text extraction with chunking, citation parsing, similar-paper discovery, author-focused lookups, and side-by-side paper comparison — with rate limiting and 30-min caching.",
        tech: ["TypeScript", "MCP SDK", "arXiv API", "pdf-parse", "Node.js"],
        github: "https://github.com/sairam3824/mcp-arxiv-server",
        category: "Infrastructure",
        iconName: "Code2",
        featured: false,
        tagline: "LLM ↔ arXiv Bridge • PDF Extraction & Citation Parsing",
    },
    {
        title: "GitHub Analytics MCP",
        description:
            "MCP server enabling deep GitHub repository analysis via natural language. Covers commit patterns, contributor activity, PR velocity, issue response times, bus factor risk, technology stack detection, and repository comparison — powered by Octokit and surfaced through any MCP client.",
        tech: ["TypeScript", "MCP SDK", "Octokit", "GitHub API", "Node.js"],
        github: "https://github.com/sairam3824/github-analytics",
        category: "Infrastructure",
        iconName: "Code2",
        featured: false,
        tagline: "Natural Language Repo Insights • Bus Factor & PR Metrics",
    },
    {
        title: "LeetCode MCP Server",
        description:
            "TypeScript MCP server bridging LLMs with LeetCode via Model Context Protocol. Offers 10 tools: problem fetching, daily challenge, random selection with filters, progressive hint generation, approach validation, similar problem discovery, and AI-curated learning paths — with local practice history and intelligent caching.",
        tech: ["TypeScript", "MCP SDK", "LeetCode GraphQL", "Node.js"],
        github: "https://github.com/sairam3824/leetcode-server-mcp",
        category: "Infrastructure",
        iconName: "Code2",
        featured: false,
        tagline: "LLM ↔ LeetCode Bridge • 10 MCP Tools",
    },
    {
        title: "AI Open Source License Picker",
        description:
            "AI-powered tool that recommends the ideal open-source license for any project. Analyzes project goals, use cases, and requirements through a conversational interface to suggest the best-fit license from a curated library — with plain-language explanations of key terms, permissions, and restrictions.",
        tech: ["Python", "OpenAI", "Next.js", "TypeScript", "Tailwind CSS"],
        github: "https://github.com/sairam3824/AI-Open-Source-License-Picker",
        category: "Infrastructure",
        iconName: "Code2",
        featured: false,
        tagline: "AI License Recommender • Plain-Language Explanations",
    },
    {
        title: "AI Commit Messages",
        description:
            "CLI tool that generates conventional commit messages (feat, fix, chore, etc.) by analyzing staged git diffs with LLMs. Offers 3 interactive message choices, gitmoji support, auto language/framework detection, dry-run preview, and supports OpenAI, Claude, and Gemini providers.",
        tech: ["Node.js", "JavaScript", "OpenAI", "Anthropic Claude", "Google Gemini"],
        github: "https://github.com/sairam3824/ai-commit-messages",
        category: "Infrastructure",
        iconName: "Code2",
        featured: false,
        tagline: "Conventional Commits • Multi-LLM Provider CLI",
    },
    {
        title: "MCP Server Architecture",
        description:
            "Multi-server implementation of Model Context Protocol (MCP) using Groq. Features standardized tool discovery, secure request routing, and real-time service integration.",
        tech: ["MCP", "Python", "Groq API", "LangChain", "FastMCP"],
        github: "https://github.com/sairam3824/Basic-MCP-Server-Practice",
        category: "Infrastructure",
        iconName: "Code2",
        featured: false,
        tagline: "Standardized AI Tool Protocols • Multi-Server Routing",
    },
    {
        title: "BadClaude",
        description:
            "A hardened Electron tray app that sends Claude Code an interrupt (Ctrl-C) and a randomized motivational message whenever it's going too slow. Security-hardened fork with Electron sandbox, strict CSP, IPC sender validation, AppleScript-via-stdin injection prevention, and 18 CVE fixes — on top of a reliable macro delivery pipeline for macOS.",
        tech: ["Electron", "JavaScript", "Node.js", "macOS", "AppleScript"],
        github: "https://github.com/sairam3824/badclaude",
        category: "Infrastructure",
        iconName: "Code2",
        featured: false,
        tagline: "Whip Claude Code Into Shape • Electron Tray • Security-Hardened",
    },
    {
        title: "LangChain AI Agents",
        description:
            "Agentic AI application powered by Gemini-1.5-Flash and Wikipedia tools. Demonstrates intelligent chain architecture, tool selection, and complex reasoning workflows.",
        tech: ["LangChain", "Google Gemini", "Python", "Prompt Engineering"],
        github: "https://github.com/sairam3824/Langchain-LLM-PET-app",
        category: "AI Agent",
        iconName: "Brain",
        featured: false,
        tagline: "Agentic Reasoning Framework • Gemini 1.5 Flash",
    },
    {
        title: "Integrated AI Text Assistant",
        description:
            "Intelligent NLP assistant leveraging T5 and OpenAI for text generation, translation, and analysis. Features a robust FastAPI backend with Redis caching for performance.",
        tech: ["FastAPI", "T5", "OpenAI", "Redis", "Docker"],
        github: "https://github.com/sairam3824/Integrated-AI-Text-Assistant",
        category: "AI Agent",
        iconName: "Zap",
        featured: false,
        tagline: "T5-Powered NLP Engine • Generation & Analysis",
    },
    {
        title: "Portfolio V4",
        description:
            "The 4th iteration — a recruiter-first 'control room' UI that surfaces projects, skills, writing, proof metrics, and contact actions in a fast-scanning dashboard layout. Standalone build with proof-heavy cards, multi-page React Router experience, PWA support, compressed production builds, and a local chat widget for portfolio Q&A.",
        tech: ["React 18", "TypeScript", "Vite 5", "Tailwind CSS", "React Router", "React Helmet Async", "Lucide React"],
        github: "https://github.com/sairam3824/Portfolio-v4",
        category: "Web Development",
        iconName: "Globe",
        featured: false,
        tagline: "Recruiter-First Control Room • Built with Google Antigravity",
    },
    {
        title: "Portfolio V5",
        description:
            "The 5th iteration — a premium 'candidate briefing' UI surfacing project proof, coding depth, certifications, and contact shortcuts in a fast-scanning layout. Features standalone dummy data, multi-page React Router experience, PWA support, compressed production builds, and a local recruiter helper chat widget.",
        tech: ["React 18", "TypeScript", "Vite 5", "Tailwind CSS", "React Router", "React Helmet Async", "Lucide React"],
        github: "https://github.com/sairam3824/Portfolio-v5",
        category: "Web Development",
        iconName: "Globe",
        featured: false,
        tagline: "Candidate Briefing UI • Built with OpenAI Codex",
    },
    {
        title: "Portfolio V3",
        description:
            "The 3rd iteration focusing on extreme performance and minimalism. Achieved 95+ Lighthouse scores with a tiny bundle size, featuring route-based code splitting and sleek glassmorphism aesthetics.",
        tech: ["React 18", "TypeScript", "Vite 5", "Tailwind CSS", "React Router"],
        github: "https://github.com/sairam3824/Portfolio-v3",
        category: "Web Development",
        iconName: "Globe",
        featured: false,
        tagline: "Minimalist Performance-First Portfolio • 95+ Lighthouse",
    },
    {
        title: "Classic Personal Portfolio",
        description:
            "Clean, responsive personal portfolio built with vanilla web technologies. Features smooth Swiper.js animations, dark/light theme toggling, and optimized SEO structure.",
        tech: ["HTML5", "CSS3", "JavaScript", "MixItUp", "Swiper.js"],
        github: "https://github.com/sairam3824/Portfolio",
        category: "Web Development",
        iconName: "Globe",
        featured: false,
        tagline: "Responsive Vanilla Stack • Theme Switching",
    },
    {
        title: "Algorithm Solutions",
        description:
            "Optimized solutions for Codeforces and competitive programming challenges. Features advanced data structures and algorithms for high-performance problem solving.",
        tech: ["C++", "Java", "Python", "Algorithms", "Data Structures"],
        github: "https://github.com/sairam3824/Competitive-Programming",
        category: "Infrastructure",
        iconName: "Code2",
        featured: false,
        tagline: "Codeforces Specialist • 1000+ Solutions",
    },
    {
        title: "Lung Cancer Detection",
        description:
            "Advanced deep learning system using CSPDarkNet to classify lung CT scans into Benign, Malignant, and Normal cases. Features real-time predictions and Grad-CAM visual explanations.",
        tech: ["PyTorch", "CSPDarkNet", "Flask", "Grad-CAM", "Python"],
        github: "https://github.com/sairam3824/lungcancer",
        category: "Computer Vision",
        iconName: "Cpu",
        featured: false,
        tagline: "Automated CT Analysis • Grad-CAM Explainability",
    },
    {
        title: "Colorectal Histopathology Classifier",
        description:
            "Web app for colorectal histology image analysis using a TensorFlow/Keras CNN. Supports image upload, tissue classification across 8 classes, confidence scoring, top-k prediction breakdowns, and Grad-CAM heatmaps for visual explanation.",
        tech: ["TensorFlow", "Keras", "Flask", "Grad-CAM", "Python"],
        github: "https://github.com/sairam3824/Colorectal-Histopathology-Classifier",
        category: "Computer Vision",
        iconName: "Cpu",
        featured: false,
        tagline: "8 Tissue Classes • Confidence Scores • Grad-CAM",
    },
    {
        title: "Brain Tumor Classification (TDA & ML)",
        description:
            "ML pipeline classifying brain tumor MRI scans into 4 categories (Glioma, Meningioma, No Tumor, Pituitary). Uses PCA-based dimensionality reduction (62,500→1,031 features) with KNN achieving 93.75% accuracy across 7 classical ML models.",
        tech: ["Python", "Scikit-learn", "XGBoost", "LightGBM", "PCA", "KNN"],
        github: "https://github.com/sairam3824/Brain-Tumor-Classification-using-TDA-and-ML",
        category: "Computer Vision",
        iconName: "Cpu",
        featured: false,
        tagline: "4-Class MRI Diagnosis • 93.75% Accuracy",
    },
    {
        title: "Bone Fracture Classification",
        description:
            "Deep learning system using WideResNet to automate bone fracture detection from X-rays. Achieved 92% accuracy using transfer learning and optimized medical imaging pipelines.",
        tech: ["TensorFlow", "WideResNet", "Keras", "OpenCV", "Python"],
        github: "https://github.com/sairam3824/Bone-Fracture-Classification",
        category: "Computer Vision",
        iconName: "Cpu",
        featured: false,
        tagline: "Automated Medical Diagnostics • 92% Accuracy",
    },
    {
        title: "NutriVision: AI NutriDecode",
        description:
            "AI-powered food recognition system classifying 101 dish types with MobileNetV2. Features real-time macronutrient analysis (calories, protein, carbs) and a modern Flask interface.",
        tech: ["TensorFlow", "MobileNetV2", "Flask", "Pandas", "Python"],
        github: "https://github.com/sairam3824/NutriVision",
        category: "Computer Vision",
        iconName: "Cpu",
        featured: false,
        tagline: "101 Food Classes • Real-time Nutritional Analysis",
    },
    {
        title: "Customer Churn Prediction",
        description:
            "Advanced ML system utilizing Random Forest and XGBoost to predict customer attrition. Reached 99.9% precision with high-performance production-ready classification models.",
        tech: ["XGBoost", "Random Forest", "Scikit-learn", "Pandas", "Python"],
        github: "https://github.com/sairam3824/Customer-Churn-Prediction",
        category: "Machine Learning",
        iconName: "Activity",
        featured: false,
        tagline: "High-Precision Predictive Engine • 99.9% Recall",
    },
    {
        title: "SpaceX ML: Landing Success",
        description:
            "Predictive ML system analyzing Falcon 9 launch data to forecast booster landing success. Achieved 91% accuracy using XGBoost and interactive geographic mapping with Folium.",
        tech: ["XGBoost", "Scikit-learn", "Plotly", "Folium", "Python"],
        github: "https://github.com/sairam3824/SpaceX-Booster-Landing-Prediction",
        category: "Machine Learning",
        iconName: "Rocket",
        featured: false,
        tagline: "91% Prediction Accuracy • Aerospace Analytics",
    },
    {
        title: "Interactive Quiz Platform",
        description:
            "Full-stack quiz engine featuring real-time scoring, timers, and category randomization. Developed with a focus on responsive UI and performance optimization.",
        tech: ["JavaScript", "HTML5", "CSS3", "Vite", "Web APIs"],
        github: "https://github.com/sairam3824/Quiz-Website",
        category: "Web Development",
        iconName: "Globe",
        featured: false,
        tagline: "EdTech Platform • Real-time Scoring",
    },
    {
        title: "School Management System",
        description:
            "Enterprise-scale platform for academic administration built with Python and MySQL. Features automated student/teacher record management and graded course tracking.",
        tech: ["Python", "Tkinter", "MySQL", "Database Design"],
        github: "https://github.com/sairam3824/School-Management-System",
        category: "Enterprise Software",
        iconName: "Globe",
        featured: false,
        tagline: "Academic ERP • MySQL Backend",
    },
];
