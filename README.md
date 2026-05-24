# Love in Motion

A digital wedding invitation built with Nuxt 4 and Vue 3. Features a full-page cover animation, scroll-triggered GSAP animations, countdown timer, RSVP form via EmailJS, and a responsive layout that works on both desktop and mobile.

Live demo: [sha-wrks.github.io/Love-in-Motion](https://sha-wrks.github.io/Love-in-Motion/)

---

## Tech Stack

- [Nuxt 4](https://nuxt.com/) - Vue meta-framework (SSG mode for deployment)
- [Vue 3](https://vuejs.org/) - Composition API with TypeScript
- [Pinia](https://pinia.vuejs.org/) - State management with localStorage persistence
- [GSAP + ScrollTrigger](https://gsap.com/) - Scroll-driven animations
- [Lenis](https://lenis.darkroom.engineering/) - Smooth scroll
- [Tailwind CSS](https://tailwindcss.com/) - Utility styling
- [Lucide Vue Next](https://lucide.dev/) - Icon set
- [EmailJS](https://www.emailjs.com/) - Client-side RSVP email delivery

---

## Prerequisites

- Node.js 20 or later
- npm 10 or later

---

## Getting Started

```bash
# Clone the repository
git clone https://github.com/sha-wrks/Love-in-Motion.git
cd Love-in-Motion

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env
# Fill in your EmailJS credentials in .env

# Start the development server
npm run dev
```

The dev server runs at `http://localhost:3000` by default.

---

## Environment Variables

Create a `.env` file at the project root with the following keys:

| Variable | Description |
|---|---|
| `VITE_EMAILJS_PUBLIC_KEY` | Your EmailJS public key |
| `VITE_EMAILJS_SERVICE_ID` | Your EmailJS service ID |
| `VITE_EMAILJS_TEMPLATE_ID` | Your EmailJS template ID |

Register at [emailjs.com](https://www.emailjs.com/) to get these values.

---

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Build for SSR (server-side) |
| `npm run generate` | Generate static site for deployment |
| `npm run preview` | Preview the production build locally |

---

## Deployment

The project deploys automatically to GitHub Pages on every push to `main` via the CI/CD workflow in [`.github/workflows/ci.yml`](.github/workflows/ci.yml).

### First-time GitHub Pages setup

1. Go to your repository **Settings > Pages**.
2. Under **Build and deployment**, set **Source** to **GitHub Actions**.
3. Add the three EmailJS secrets under **Settings > Secrets and variables > Actions**:
   - `VITE_EMAILJS_PUBLIC_KEY`
   - `VITE_EMAILJS_SERVICE_ID`
   - `VITE_EMAILJS_TEMPLATE_ID`
4. Push to `main`. The workflow will build and deploy automatically.

### CI workflow summary

| Trigger | Jobs |
|---|---|
| Push to `main` | Build check, then deploy to GitHub Pages |
| Pull request to `main` | Build check only |

---

## Project Structure

```
Love-in-Motion/
  app/
    assets/css/       # Global styles and Tailwind base
    components/       # Vue single-file components (one per section)
    stores/           # Pinia stores (guestStore for RSVP state)
    utils/            # EmailJS config helper
    app.vue           # Root component and section orchestration
  public/
    images/           # Static images
    music/            # Background music file
  nuxt.config.ts      # Nuxt configuration
  tailwind.config.js  # Tailwind theme (colors, fonts, keyframes)
```

---

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines on submitting pull requests and issues.
