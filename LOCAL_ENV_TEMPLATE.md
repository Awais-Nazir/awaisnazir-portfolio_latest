# Local Environment Template

Copy the following placeholder block into a new, untracked `.env` file in the project root. Replace only the values you need for your local workflow. Do **not** commit the resulting `.env` file.

```dotenv
# Public portfolio identity and destination links
VITE_APP_TITLE=Awais Nazir Portfolio
VITE_APP_LOGO=
VITE_CONTACT_EMAIL=your-email@example.com
VITE_WHATSAPP_URL=https://wa.me/your-number
VITE_GITHUB_URL=https://github.com/your-account
VITE_LINKEDIN_URL=https://www.linkedin.com/in/your-profile
VITE_CV_URL=https://example.com/your-cv.pdf

# Sanity content source — required for live projects, skills, and blog content
NEXT_PUBLIC_SANITY_PROJECT_ID=your-sanity-project-id
NEXT_PUBLIC_SANITY_DATASET=production

# Contact form via Resend HTTPS API — recommended for Render deployment
RESEND_API_KEY=re_your-resend-api-key
RESEND_FROM_EMAIL=Awais Nazir Portfolio <onboarding@resend.dev>

# Gmail SMTP fallback — useful locally when RESEND_API_KEY is not set
CONTACT_RECIPIENT_EMAIL=your-inbox@example.com
GMAIL_SMTP_USER=your-gmail-address@gmail.com
GMAIL_APP_PASSWORD=your-16-character-gmail-app-password

# Optional template-level auth/database support
JWT_SECRET=replace-with-a-long-random-secret
DATABASE_URL=mysql://user:password@localhost:3306/portfolio

# Leave blank unless you intentionally configure these managed platform services locally
VITE_APP_ID=
OAUTH_SERVER_URL=
VITE_OAUTH_PORTAL_URL=
OWNER_OPEN_ID=
OWNER_NAME=
BUILT_IN_FORGE_API_URL=
BUILT_IN_FORGE_API_KEY=
VITE_FRONTEND_FORGE_API_URL=
VITE_FRONTEND_FORGE_API_KEY=
```
