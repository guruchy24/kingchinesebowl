# KING CHINESE BOWL CINEMATIC RESTAURANT PLATFORM

## 1. LANGUAGE
- **TypeScript** (End-to-End: Frontend, Backend, API, Database Schema, Validation, Workers, Tests)

## 2. FRONTEND
- **Next.js 16**
- **React 19**
- **App Router**
- **Tailwind CSS 4**
- **Native CSS**

## 3. MOTION & CINEMATICS
- **GSAP** & **ScrollTrigger** (Primary animation engine)
- **Canvas** (For high-performance image-sequence timelines, e.g., Wok sequence)
- **CSS Scroll-Driven Animations** (For lightweight transitions)
- *Three.js only when strictly justified.*

## 4. BACKEND
- **Cloudflare Workers** (Primary runtime)
- **Next.js Route Handlers & Server Actions**
- *Server Components for data fetching + Client Motion Islands for GSAP/Canvas.*

## 5. DATABASE
- **Neon PostgreSQL** (Serverless DB)
- **Drizzle ORM**
- **node-postgres (pg)**
- **Cloudflare Hyperdrive** (Connection pooling at the edge)
- *Single database for all locations (Chandigarh, Mohali, Zirakpur).*

## 6. MEDIA ARCHITECTURE
- **Cloudflare R2**: Master media vault (Originals, Archives, Raw Sequences).
- **Cloudflare Image Transformations**: For optimized photos and progressive AVIF/WebP image sequences (Canvas).
- **Cloudflare Stream**: For major cinematic videos (adaptive bitrate delivery).
- **R2 + CDN**: For lightweight/simple looping clips.
- *Media Manager limits preload buffers to bound memory.*

## 7. CACHE STRATEGY
- **Next.js Cache Components** (Server-rendered content with revalidation/tagging)
- **Cloudflare CDN Cache** (Public static assets)
- **Hyperdrive** (Query caching for eligible reads)

## 8. BACKGROUND JOBS
- **Cloudflare Queues** (Analytics, notifications, search indexing, cache updates)

## 9. SECURITY
- **Cloudflare WAF**
- **Turnstile** (Bot protection for forms)
- **Cloudflare Access** (Identity-aware proxy for private admin)
- **RBAC, CSP, HSTS, Rate limiting**

## 10. MONITORING & TESTING
- **Cloudflare Workers Metrics**
- **Sentry** (JS errors, slow pages, DB latency)
- **Playwright** (E2E)
- **Lighthouse / PageSpeed / WebPageTest** (Performance profiles)

## 11. DEPLOYMENT & RUNTIME
- **Cloudflare Workers** via **vinext** (OpenNext as fallback)
- **Node.js 24 LTS & pnpm** (Development only)
