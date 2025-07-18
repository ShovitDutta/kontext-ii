# Kontext - AI-Powered News Blog

Transform complex technology news into engaging, personalized blog posts using AI.

## Features

- 🤖 **AI-Powered Content Generation** - Transform news into 3 different formats (Short, Medium, Explained)
- 🔐 **Google OAuth Authentication** - Secure sign-in with Google
- 📱 **Responsive Design** - Beautiful dark theme that works on all devices
- ⚡ **Real-time Updates** - Stay updated with the latest technology news
- 💾 **Data Persistence** - Save your reading history and generated blogs
- 🎨 **Smooth Animations** - Enhanced UX with Framer Motion

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Authentication**: NextAuth.js
- **Database**: PostgreSQL with Prisma ORM
- **AI**: Google Gemini API
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database
- Google OAuth credentials
- Gemini API key

### Installation

1. Clone the repository:
\`\`\`bash
git clone <your-repo-url>
cd kontext-ai-news-blog
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Set up environment variables:
\`\`\`bash
cp .env.example .env.local
\`\`\`

Fill in your environment variables in `.env.local`:
- `DATABASE_URL`: Your PostgreSQL connection string
- `GOOGLE_CLIENT_ID` & `GOOGLE_CLIENT_SECRET`: Google OAuth credentials
- `GEMINI_API_KEY`: Your Google Gemini API key
- `NEXTAUTH_SECRET`: Random secret for NextAuth

4. Set up the database:
\`\`\`bash
npx prisma db push
\`\`\`

5. Run the development server:
\`\`\`bash
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) to see the application.

## Deployment to Vercel

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

## Environment Variables

Make sure to set these environment variables in your Vercel dashboard:

- `DATABASE_URL`
- `NEXTAUTH_URL` (your production URL)
- `NEXTAUTH_SECRET`
- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`
- `GEMINI_API_KEY`

## License

MIT License - see LICENSE file for details.
