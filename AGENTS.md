# Repository Guidelines

## Project Structure & Module Organization
- `app/` contains the Next.js App Router entry points, including `layout.tsx` and `page.tsx`.
- `app/globals.css` houses global styles; component styling should live near the components or in global styles as appropriate.
- `public/` holds static assets served at the site root (e.g., `public/favicon.ico`).
- Configuration lives at the repo root: `next.config.ts`, `tsconfig.json`, `eslint.config.mjs`, and `postcss.config.mjs`.

## Build, Test, and Development Commands
- `npm run dev` starts the local development server at `http://localhost:3000`.
- `npm run build` creates a production build.
- `npm run start` runs the production server from the build output.
- `npm run lint` runs ESLint for code quality checks.

## Coding Style & Naming Conventions
- Use TypeScript for application code and follow Next.js App Router conventions.
- Follow ESLint guidance (`npm run lint`). There is no separate formatter configured; keep style consistent with nearby files.
- File naming: use lowercase file names for routes (e.g., `app/page.tsx`) and standard Next.js filenames like `layout.tsx`.

## Testing Guidelines
- No test framework is configured in this repository yet. If you add tests, document the framework and add scripts to `package.json`.
- Prefer colocating tests near the code or in a dedicated `tests/` directory; use clear naming like `*.test.ts` or `*.spec.ts`.

## Commit & Pull Request Guidelines
- Commit messages follow a Gitmoji-lite style. Examples: `✨ add dashboard`, `🐛 fix null guard`, `📝 update docs`.
- When submitting PRs, include a concise summary, testing notes (or a rationale for not testing), and screenshots for UI changes.

## Configuration & Security Notes
- Environment-specific configuration should use standard Next.js patterns (for example, `.env.local`). Do not commit secrets.
- If you add new configuration files, document them in this file and update `README.md` as needed.
- This project is intended for static hosting (e.g., GitHub Pages). Do not rely on Next.js API routes; they are not used.
- Data updates happen directly from the client to Supabase REST using `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_*` keys.

## Collaboration Rules
- Only change the code that is explicitly requested. Do not modify unrelated code.
- Before editing, propose solutions and ask clarifying questions if anything is unclear.
- Prefer minimal, targeted changes that touch as little code as possible.
- Look for existing implementations of similar tasks in the codebase and reuse their styles and patterns.
