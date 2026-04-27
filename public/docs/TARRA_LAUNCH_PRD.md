# PRD: Tarra Launch Landing Page
**Version:** 1.0  
**Date:** April 17, 2026  
**Author:** Samuel Ezekiel (SAMKIEL)  
**Status:** Ready for Implementation

---

## 1. Overview

Tarra is launching. The current homepage (tarra.ng) is a waitlist page that has served its purpose — 2,500+ students are already signed up. We now need to transform the homepage into a **launch landing page** that signals the product is live and drives app downloads.

The waitlist system is not being deleted. It moves to a dedicated route.

---

## 2. Objective

- Replace the waitlist homepage with a **product launch landing page**
- Preserve the waitlist system at `/waitlist`
- Drive a single conversion action: **Download the App**
- Maintain existing brand identity (colors, fonts, tone, aesthetic)

---

## 3. Scope of Changes

### 3.1 Route Changes

| Route | Before | After |
|---|---|---|
| `/` | Waitlist signup page | Launch landing page |
| `/waitlist` | Does not exist | Full waitlist system (moved here) |
| `/status/[USER_ID]` | User dashboard | Unchanged |
| `/admin` | Admin panel | Unchanged |

### 3.2 What Moves to `/waitlist`
Everything currently on the homepage:
- Waitlist signup form
- Referral contest details (₦300,000 prize pool)
- Leaderboard (Top 20)
- Check Status flow
- Official contest rules
- Prize pool distribution table

---

## 4. New Homepage (`/`) — Launch Landing Page

### 4.1 Page Goal
Single goal: get a visitor to tap **"Download the App"**

### 4.2 Sections (in order)

#### **Section 1 — Hero**
- Bold launch headline (e.g. *"OAU's Marketplace is Live."* or *"Tarra is Here."*)
- Short subtext (1–2 lines max) explaining what Tarra is
- Primary CTA button: **"Download the App"** (link TBD, placeholder for now)
- Secondary CTA (optional): **"Join the Waitlist →"** linking to `/waitlist`
- Tarra logo at top (same as current nav)

#### **Section 2 — App Screenshots**
- Visual showcase of the actual app UI
- 3–5 screenshots provided by SAMKIEL (to be uploaded)
- Mobile-first presentation — phone mockup frames or clean floating cards
- Subtle scroll animation or fade-in on load

#### **Section 3 — Core Features**
- Three pillars, same as current site:
  - 🛍 **Marketplace** — Buy and sell within the OAU community
  - 🏪 **Brands** — Discover verified campus businesses
  - 🛠 **Services** — Book trusted student service providers
- Clean icon + title + one-line description layout

#### **Section 4 — Social Proof / Traction**
- "2,500+ OAU students already on the waitlist"
- Optional: a couple of short testimonials or excitement quotes if available

#### **Section 5 — Final CTA**
- Repeat the Download CTA
- Tagline: *"OAU Commerce. Without the Chaos."*

#### **Section 6 — Footer**
- Same footer as current site
- Add link to `/waitlist` for contest participants

---

## 5. Design Constraints

- **Framework:** Next.js (existing codebase)
- **Styling:** Tailwind CSS (existing)
- **Hosting:** Vercel (no changes)
- **Colors/Fonts:** Unchanged — match current tarra.ng exactly
- **No red / no harsh error states** — maintain positive UX tone
- **Mobile-first** — majority of OAU users are on mobile
- **Performance:** Keep it fast, minimal heavy assets, optimize screenshots

---

## 6. Assets Required from SAMKIEL

| Asset | Status |
|---|---|
| App screenshots (3–5) | ✅ Ready |
| Play Store / App Store link | ⏳ TBD (placeholder button for now) |
| Launch headline copy | ⏳ Confirm or approve suggestion |
| Testimonials / quotes | ⏳ Optional |

---

## 7. Out of Scope

- Any changes to `/status/[USER_ID]` dashboard
- Any changes to `/admin` panel
- Backend or database changes
- New features beyond what's listed above

---

## 8. Success Criteria

- Homepage clearly communicates Tarra is **live**
- Visitor can tap "Download the App" within 3 seconds of landing
- Waitlist contest participants can still find `/waitlist` easily
- Page loads fast on mobile (target: < 2s on 4G)
- Zero broken links or missing assets at launch

---

## 9. Timeline

| Milestone | Date |
|---|---|
| PRD approved | April 17, 2026 |
| Implementation begins | April 17, 2026 |
| Review & iterate | April 18–19, 2026 |
| Go live | Before April 24, 2026 (before prize winners announced) |
