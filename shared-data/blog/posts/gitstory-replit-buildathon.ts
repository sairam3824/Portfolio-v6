export const gitstoryReplitBuildathon = {
  id: "gitstory-replit-buildathon",
  title: "GitStory: Turning Any GitHub Profile Into an AI-Generated Career Narrative",
  excerpt:
    "GitStory is a full-stack project built for Replit's 10-year celebration Buildathon that transforms a public GitHub profile into a cinematic, AI-generated developer story. It pulls live profile data, uses GPT-5.4 for narrative generation, caches stories in PostgreSQL, and makes each story instantly shareable.",
  date: "May 3, 2026",
  readTime: "6 min read",
  tags: ["Replit", "Buildathon", "GPT-5.4", "GitHub", "Full-Stack", "AI Apps", "Developer Tools"],
  icon: "GitBranch",
  iconColor: "orange",
  content: `
<p class="mb-4 text-lg text-gray-900">
  GitStory is a full-stack web app that transforms any public GitHub profile into a beautiful, AI-generated career narrative page that can be shared in seconds. The idea is simple: your GitHub already contains the shape of your builder journey, but most people never turn that raw activity into a story. GitStory does that for you.
</p>

<p class="mb-6 text-gray-700">
  Enter a GitHub username, and GitStory fetches real public profile data: repositories, stars, followers, languages, first repo, top projects, and contribution signals. It then sends that grounded profile context to GPT-5.4, OpenAI's current frontier model for professional work, through Replit AI Integrations. The result is not a generic bio. It is a cinematic developer narrative with chapters, a superpower quote, fun stats, and a legacy statement that captures who you are as a builder.
</p>

<div class="bg-orange-50 border border-orange-200 rounded-2xl p-6 mb-8">
  <p class="text-gray-900 font-semibold mb-2">Live project</p>
  <a href="https://git-story-maker--sairammaruri.replit.app" class="text-orange-700 hover:text-orange-900 underline" target="_blank" rel="noopener noreferrer">
    git-story-maker--sairammaruri.replit.app
  </a>
</div>

<h4 class="text-xl font-semibold text-gray-900 mb-4 mt-8">Why I Built It</h4>
<p class="mb-4 text-gray-700">
  GitHub profiles are packed with signal, but they usually read like dashboards: repo counts, language bars, stars, followers, and pinned projects. Those metrics matter, but they rarely explain the person behind the work. GitStory turns those public signals into something more human: a page that feels like a career trailer for a developer.
</p>

<p class="mb-6 text-gray-700">
  For Replit's 10-year celebration Buildathon at <a href="https://buildathon.replit.com" class="text-blue-600 hover:text-blue-800 underline" target="_blank" rel="noopener noreferrer">buildathon.replit.com</a>, I wanted to build something that matched the spirit of Replit itself: fast creation, public sharing, and AI as a collaborator that helps people express what they have built. GitStory takes a profile that already exists and gives it a shareable narrative layer.
</p>

<h4 class="text-xl font-semibold text-gray-900 mb-4 mt-8">What GitStory Does</h4>
<ul class="mb-6 text-gray-700 list-disc list-inside space-y-2">
  <li>Pulls live GitHub data for any public profile.</li>
  <li>Generates a unique career story using GPT-5.4, grounded in real repos and profile history.</li>
  <li>Displays the output as a full-page cinematic story at <code>/story/:username</code>.</li>
  <li>Caches generated stories in PostgreSQL so repeat visits are instant.</li>
  <li>Lets users share their story on X with one click or copy the link directly from the nav bar.</li>
  <li>Includes an Explore page showing all stories generated so far.</li>
  <li>Shows a live animated counter for total stories generated on the home page.</li>
  <li>Rate limits story generation to 3 requests per IP every 5 minutes to prevent abuse.</li>
</ul>

<h4 class="text-xl font-semibold text-gray-900 mb-4 mt-8">The Product Experience</h4>
<p class="mb-4 text-gray-700">
  The home page starts with a GitHub-inspired dark interface and a direct input: type a username, generate a story, and get a shareable page. Once generated, the story is structured like a narrative profile rather than a stats card. It has chapters, personality, momentum, and a clear sense of what makes that developer's work distinctive.
</p>

<p class="mb-6 text-gray-700">
  Every story gets a permanent route, so the output can be shared like a portfolio page. That was important to the design: the app is not just a private generator. It creates public artifacts people can send to friends, recruiters, teammates, or the Buildathon community.
</p>

<h4 class="text-xl font-semibold text-gray-900 mb-4 mt-8">Tech Stack</h4>
<ul class="mb-6 text-gray-700 list-disc list-inside space-y-2">
  <li><strong>Frontend:</strong> React and Vite.</li>
  <li><strong>Backend:</strong> Express.</li>
  <li><strong>Database:</strong> PostgreSQL with Drizzle ORM.</li>
  <li><strong>AI generation:</strong> GPT-5.4 through the Replit AI Integrations proxy.</li>
  <li><strong>API workflow:</strong> OpenAPI-first contract with auto-generated React Query hooks.</li>
  <li><strong>Design:</strong> dark GitHub-inspired theme using <code>#0d1117</code> with Replit orange accents using <code>#f97316</code>.</li>
  <li><strong>Build process:</strong> built entirely with Replit Agent for Replit's 10-year celebration Buildathon.</li>
</ul>

<h4 class="text-xl font-semibold text-gray-900 mb-4 mt-8">Why the AI Layer Matters</h4>
<p class="mb-4 text-gray-700">
  The AI layer is not there to invent a fake identity. It is there to translate structured public activity into a story people can actually read. GitStory gives the model grounded facts from GitHub first, then asks it to shape those facts into a memorable narrative: where the builder started, what patterns appear in their work, what technologies they lean toward, and what their public projects suggest about their developer identity.
</p>

<p class="mb-6 text-gray-700">
  That grounding is the heart of the app. A good generated story should feel personal because it is attached to real public work, not because it is decorated with vague motivational language.
</p>

<h4 class="text-xl font-semibold text-gray-900 mb-4 mt-8">The Core Idea</h4>
<p class="mb-4 text-gray-700">
  Your GitHub has a story. Most people never tell it. GitStory tells it for you, powered by GPT-5.4 and built on Replit.
</p>

<div class="bg-blue-50 border border-blue-200 rounded-2xl p-6 mt-8">
  <div class="space-y-4">
    <p class="text-gray-700 text-base leading-relaxed">
      GitStory is my submission for Replit's 10-year celebration Buildathon at buildathon.replit.com. It is a small but complete product: live data, generated stories, persistent caching, shareable routes, an Explore page, abuse protection, and a visual identity built around GitHub's developer culture and Replit's orange energy.
    </p>
    <div class="space-y-2">
      <p class="text-gray-700">Try it here:</p>
      <a href="https://git-story-maker--sairammaruri.replit.app" class="text-blue-700 hover:text-blue-900 underline" target="_blank" rel="noopener noreferrer">
        Generate your GitStory
      </a>
    </div>
  </div>
</div>

<details class="mb-8 border border-gray-200 rounded-lg mt-8">
  <summary class="px-4 py-3 bg-gray-50 cursor-pointer hover:bg-gray-100 font-medium text-gray-900 rounded-t-lg">
    Sources & References
  </summary>
  <div class="p-4 space-y-3">
    <div class="grid gap-3">
      <a href="https://git-story-maker--sairammaruri.replit.app" class="text-blue-600 hover:text-blue-800 underline text-sm" target="_blank" rel="noopener noreferrer">
        GitStory live app
      </a>
      <a href="https://buildathon.replit.com" class="text-blue-600 hover:text-blue-800 underline text-sm" target="_blank" rel="noopener noreferrer">
        Replit 10-Year Celebration Buildathon
      </a>
      <a href="https://openai.com/index/introducing-gpt-5-4/" class="text-blue-600 hover:text-blue-800 underline text-sm" target="_blank" rel="noopener noreferrer">
        Introducing GPT-5.4 - OpenAI
      </a>
    </div>
  </div>
</details>

<div class="mt-6 text-sm text-gray-500">
  <p>Note: This article includes AI-assisted writing and manual curation.</p>
</div>
`,
};
