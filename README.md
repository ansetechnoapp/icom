# iCome Hardware E-commerce Website

A modern e-commerce website for computer hardware built with Next.js, TypeScript, Tailwind CSS, and Shadcn UI.

## Features

- Next.js 15 with App Router
- TypeScript for type safety
- Tailwind CSS for styling
- Shadcn UI for components
- Prisma with PostgreSQL for database
- Next Auth for authentication
- Stripe for payment processing
- Framer Motion for animations

## Project Structure

- `app/` - App Router routes
- `src/components/` - UI components organized by category
- `src/lib/` - Utility functions and configuration
- `src/models/` - TypeScript types and interfaces
- `prisma/` - Database schema and migrations
- `public/` - Static assets

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- PostgreSQL database

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/icome.git
cd icome
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file based on `.env.example`:
```bash
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/icome"

# Next Auth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-nextauth-secret"

# OAuth Providers
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
FACEBOOK_CLIENT_ID="your-facebook-client-id"
FACEBOOK_CLIENT_SECRET="your-facebook-client-secret"

# Stripe
STRIPE_SECRET_KEY="your-stripe-secret-key"
STRIPE_WEBHOOK_SECRET="your-stripe-webhook-secret"
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="your-stripe-publishable-key"
```

4. Run database migrations:
```bash
npx prisma migrate dev
```

5. Start the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Main Features

- User authentication with email/password, Google, and Facebook
- Product browsing and filtering
- Shopping cart and checkout
- Order tracking
- User dashboard
- PC Builder tool for custom configurations
- Responsive design for mobile and desktop
- Admin panel for product management (coming soon)

## Deployment

This project is configured for deployment on Vercel.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/icome)

## License

This project is licensed under the MIT License.
