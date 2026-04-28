# Project 001 AIMarketplace

Create a webapp to allow users to share AI Agents skills. You can use a frontend + backend app or fullstack app. Choose between [Tanstack Start](https://tanstack.com/start/latest) or [NextJS](https://nextjs.org/). Store the data into a cloud based database platform such as [Neon](https://neon.com/) or [Turso](https://turso.tech/). Give the app a unique design using [fonts](https://fontsource.org/), awesome [colors](https://tweakcn.com/) and personalized [assets](https://unsplash.com/es).

You can use other resources such as [Shadcn](https://ui.shadcn.com/), [DrizzleORM](https://orm.drizzle.team/), [BetterAuth](https://better-auth.com/) or [CodeRabbit](https://www.coderabbit.ai/). The project have 3 parts:

## Basic (The MVP)

These are the foundational features you need to get the platform off the ground and allow users to actually share and find skills.

- **User Authentication & Profiles:** Basic sign-up/login (OAuth via Google or GitHub is highly recommended for developer-focused platforms) and a profile page to showcase authored skills. User + Pass optional.
- **Skill CRUD (Create, Read, Update, Delete):** A builder interface where users can submit a skill. Essential fields should include:
  - **Title & Description:** What does the skill do?
  - **Target Agent:** Is this for Cursor, Gemini, etc.?
  - **Skill Payload:** The markdown text content.

- **Search, Tags, and Categorization:** Allow users to filter skills by use case (e.g., coding, copywriting, data analysis, web scraping) or framework.
- **One-Click Copy/Download:** A seamless way for users to grab the markdown code or download the .md file.

## Advanced

Once the core platform is built, these features will help build a community, ensure quality, and keep users coming back.

- **Social Validation:** Upvoting, downvoting, favoriting, and comment sections on each skill so the community can surface the best ones and suggest improvements.
- **Version Control & Forking:** Prompts and agent skills evolve. Allow creators to publish "v2" of a skill, and allow other users to "fork" an existing skill to tweak it for their own needs while giving credit to the original author.
- **Resume:** Integrate an AI model via API to resume the content of the skill.
- **Skill Collections / Playlists:** Allow users to bundle complementary skills together (e.g., a "Content Creation Pack" that includes a web-search skill, a writing skill, and an SEO optimization skill).
- **Platform API:** Provide an API so developers can dynamically fetch the latest version of a shared skill directly into their own applications at runtime, rather than hardcoding prompts.
