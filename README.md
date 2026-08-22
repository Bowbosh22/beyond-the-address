# BEYOND THE ADDRESS — Luxury Real Estate

A cinematic, scroll-driven luxury real estate website prototype.

## Stack

- **React 18** + **Vite 5**
- **GSAP 3 + ScrollTrigger** — scroll-controlled animations
- **Lenis** — smooth scrolling
- **React Router v6** — all routes wired

## Installation & Launch

```bash
npm install
npm run dev
```

Then open **http://localhost:5173**

## Pages & Routes

| Route | Description |
|-------|-------------|
| `/` | Home — Hero + Immersive House + Properties + Agency + CTA |
| `/properties` | Full property listing with filters |
| `/property/:slug` | Detailed property page |
| `/agency` | Agency story, team, numbers |
| `/services` | 4 service categories |
| `/contact` | Contact form |

---

## 1. How to Replace the Placeholder Video

The immersive scroll section works without a video (beautiful color backgrounds per room). To add a real walkthrough video:

1. Export your video as **MP4 (H.264)** at 1920×1080 or 4K
2. Compress it with ffmpeg for web:
   ```bash
   ffmpeg -i input.mp4 -vcodec h264 -acodec aac -crf 28 -preset slow -movflags faststart public/assets/house-walkthrough.mp4
   ```
3. Create a poster image for initial load:
   ```bash
   ffmpeg -i input.mp4 -ss 00:00:01 -frames:v 1 public/assets/house-poster.jpg
   ```
4. Place both files in `/public/assets/`
5. The video will automatically appear on top of the color backgrounds

**Important:** The video is scroll-controlled (`currentTime` driven) — do not make it autoplay.

---

## 2. How to Modify Properties

Edit `src/data/properties.js`. Each property has:

```js
{
  id: 1,
  slug: 'villa-emeraude',   // URL slug: /property/villa-emeraude
  name: 'Villa Émeraude',
  tagline: 'Where luxury meets the horizon.',
  location: 'Brazzaville, Congo',
  neighborhood: 'Plateaux',
  price: '480 000 000 FCFA',
  priceLabel: 'À partir de',
  surface: 420,              // m²
  bedrooms: 5,
  bathrooms: 6,
  garages: 2,
  year: 2022,
  status: 'available',      // 'available' | 'sold' | 'reserved'
  category: 'Villa',        // used by filters on /properties
  description: `...`,
  features: ['Piscine à débordement', ...],
  coverImage: 'https://...',  // shown in property cards
  images: ['https://...', 'https://...'],  // detail page gallery
}
```

---

## 3. How to Modify the Immersive Section Texts

Edit the `SECTIONS` array in `src/components/ImmersiveHouse.jsx`.

Each section object controls:
- `start` / `end` — scroll progress range (0 to 1)
- `bg` — background color when no video is loaded
- `content.type` — layout variant
- Text fields: `title`, `titleLine2`, `subtitle`, `details`, `tags`, `items`, etc.

---

## 4. How to Modify the Navigation, Hero, or Any Text

| What | Where |
|------|-------|
| Hero tagline / title | `src/pages/Home.jsx` → `Hero` function |
| Navbar logo name | `src/components/Navbar.jsx` |
| Agency section | `src/pages/Home.jsx` → `AgencySection` + `src/pages/Agency.jsx` |
| Services | `src/pages/Services.jsx` → `SERVICES` array |
| Contact info | `src/pages/Contact.jsx` |
| Footer | `src/components/Navbar.jsx` (bottom of file) |

---

## 5. Design Tokens

All colors and fonts are CSS variables in `src/styles/global.css`:

```css
:root {
  --black:      #0A0A0A;   /* background */
  --charcoal:   #1A1A1A;   /* dark sections */
  --cream:      #F5F3EE;   /* primary text */
  --stone:      #D8D0C4;   /* secondary text */
  --champagne:  #C4A882;   /* accent / gold */
  --dim:        #6B6560;   /* muted text */

  --font-serif: 'Cormorant Garamond', Georgia, serif;
  --font-sans:  'DM Sans', system-ui, sans-serif;
}
```

---

## 6. Replacing Unsplash Images with Real Photos

Replace the `https://images.unsplash.com/...` URLs in `properties.js` with:
- Local paths: Place images in `/public/images/` → use `/images/villa.jpg`
- CDN URLs: Your preferred image CDN

For best performance, use **WebP** format and include `?w=1400&q=80` params if using Unsplash.

---

## 7. Connecting a Backend / API

The architecture is ready for API integration:

1. Create `src/services/api.js` with your fetch logic
2. Replace `import { properties } from '../data/properties'` with API calls
3. Use `useEffect` + `useState` for loading states in pages
4. The contact form in `src/pages/Contact.jsx` has a `handleSubmit` function — replace the `console.log` with your API call

---

## Performance Notes

- Video: use ffmpeg compression (see above) — target < 20MB
- Images: use WebP with lazy loading (already implemented)
- The film grain effect (CSS) adds ~0kb overhead and no JS
- Lenis smooth scroll is GPU-accelerated

## License

Private client project. All rights reserved.
