# Local Development — Portfolio Version 1

This portfolio is a **React + Vite + Express + tRPC** application. The development server serves the public website and its server routes together on `http://localhost:3000`.

> **Security rule:** use the checked-in `LOCAL_ENV_TEMPLATE.md` only as a template. Create `.env` manually, supply your own values, and never share or commit the resulting `.env` file. It contains credentials for services such as Gmail and Sanity.

## 1. Get the complete source project

Use the project checkpoint attached to this handoff to open the exact version in the project workspace. To download the complete source locally, open the **Code** panel and choose **Download as ZIP**, then extract it on your computer. If the connected GitHub repository is preferred, clone it and use the same steps below.

## 2. Install prerequisites

Install **Node.js 20 or newer** and enable Corepack so the repository’s pinned `pnpm` version is used. In PowerShell, Terminal, or a Linux shell, run:

```bash
corepack enable
node --version
pnpm --version
```

## 3. Configure local environment values

From the project root, create an untracked local configuration file and copy the placeholder block from `LOCAL_ENV_TEMPLATE.md` into it:

```bash
touch .env
```

On Windows PowerShell, use:

```powershell
New-Item .env -ItemType File
```

The table below identifies the values that matter for the current public portfolio.

| Variable group | Needed locally | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET` | Yes, for live CMS content | Reads your existing projects, skills, and posts from Sanity. |
| `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, `CONTACT_RECIPIENT_EMAIL` | Yes, for deployed contact-form delivery | Sends contact messages through Resend's HTTPS API. Use a verified sending domain, or Resend's onboarding sender during initial testing. |
| `GMAIL_SMTP_USER`, `GMAIL_APP_PASSWORD` | Optional local fallback | Sends contact messages through Gmail SMTP locally. Use a Gmail **App Password**, not your normal password. |
| `VITE_CONTACT_EMAIL`, `VITE_WHATSAPP_URL`, `VITE_GITHUB_URL`, `VITE_LINKEDIN_URL`, `VITE_CV_URL` | Recommended | Supplies public contact and social destinations. |
| `JWT_SECRET`, `DATABASE_URL`, OAuth, and Forge variables | Optional for the current public site | They support template-level auth, database, or platform services. Leave them blank unless you intentionally run those capabilities locally. |

## 4. Start the portfolio locally

Install the locked dependencies and start the development server:

```bash
pnpm install
pnpm dev
```

Then open **http://localhost:3000** in a browser. If the port is occupied, stop the process using port `3000` before starting again.

## 5. Validate or run a production build

Before a local release check, run:

```bash
pnpm test
pnpm check
pnpm build
pnpm start
```

The production server uses the generated `dist/` output and still runs on port `3000` unless the host environment assigns a different port.

## Version 1 publishing

The ready-to-publish version is saved as a checkpoint. To release it through the managed hosting workflow, open the project workspace, review the preview, and click **Publish** in the top-right interface. Publishing is a user-controlled action; configure the domain in the project’s **Settings → Domains** section after publication.

## What not to copy into a public repository

Do not commit `.env`, real Gmail app passwords, database URLs, OAuth values, owner identifiers, or Forge keys. The checked-in `LOCAL_ENV_TEMPLATE.md` deliberately contains only placeholders and safe public defaults.

## Troubleshooting: missing `./routers/portfolio`

The main router file is named `server/routers.ts`, and its import is correct. A complete source copy must include this module:

```text
server/routers/portfolio.ts
```

If TypeScript reports that `./routers/portfolio` cannot be found, the local folder is incomplete or came from an older download. Do not rename the import. Instead, download the latest source ZIP from the current project checkpoint, replace the incomplete local folder, run `pnpm install`, and then run `pnpm check`. Git users can update their clean working copy with `git pull --ff-only` before installing dependencies again.
