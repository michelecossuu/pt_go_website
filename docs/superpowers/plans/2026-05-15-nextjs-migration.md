# Migrazione Next.js — Piano di Implementazione (Piano 1 di 3)

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Migrare il sito Giuliano Ortu PT da CDN-React a Next.js 15 App Router, mantenendo il design visivo invariato e preparando la struttura per Piano 2 (Supabase + Admin) e Piano 3 (Stripe).

**Architecture:** App Router con routing file-based sostituisce il routing hash. Le pagine diventano `'use client'`. Dati condivisi (PACKS, CYCLES) in `lib/`. Immagini in `public/`. I piani 2 e 3 si innestano in questa struttura senza modificare l'architettura di base.

**Tech Stack:** Next.js 15, React 19, TypeScript 5, CSS esistente (zero dipendenze extra)

**Struttura file finale:**
```
app/
  globals.css         ← styles.css migrato
  layout.tsx          ← root layout (Nav + Footer + font)
  page.tsx            ← Home
  esperienza/page.tsx
  pacchetti/page.tsx
  contatti/page.tsx
components/
  Icons.tsx
  Brand.tsx
  SectionHeader.tsx
  Nav.tsx
  Footer.tsx
lib/
  packs.ts            ← PACKS, CYCLES, types (usato da pacchetti + contatti)
public/
  business-card.png
  uploads/            ← immagini (verranno spostate su Supabase nel Piano 2)
```

---

## Task 1: Bootstrap Next.js

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `next.config.ts`
- Modify: `.gitignore`

- [ ] **Step 1: Crea package.json**

```json
{
  "name": "giuliano-ortu-pt",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start"
  },
  "dependencies": {
    "next": "^15.3.2",
    "react": "^19.0.0",
    "react-dom": "^19.0.0"
  },
  "devDependencies": {
    "@types/node": "^22",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "typescript": "^5"
  }
}
```

- [ ] **Step 2: Crea tsconfig.json**

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": { "@/*": ["./*"] }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

- [ ] **Step 3: Crea next.config.ts**

```typescript
import type { NextConfig } from 'next'

const config: NextConfig = {}

export default config
```

- [ ] **Step 4: Aggiorna .gitignore**

Aggiungi queste righe al `.gitignore` esistente:
```
node_modules/
.next/
```

- [ ] **Step 5: Installa dipendenze**

```bash
npm install
```

Output atteso: `added N packages` senza errori.

- [ ] **Step 6: Commit**

```bash
git add package.json package-lock.json tsconfig.json next.config.ts .gitignore
git commit -m "chore: bootstrap Next.js 15 project"
```

---

## Task 2: Sposta asset e migra CSS

**Files:**
- Create: `public/` (directory con immagini)
- Create: `app/globals.css`

- [ ] **Step 1: Sposta le immagini in public/**

```bash
mkdir -p public/uploads
cp assets/business-card.png public/business-card.png
cp uploads/pasted-1778571733082-0.png public/uploads/pasted-1778571733082-0.png
cp uploads/pasted-1778768289851-0.png public/uploads/pasted-1778768289851-0.png
```

- [ ] **Step 2: Crea app/globals.css**

```bash
mkdir -p app
cp styles.css app/globals.css
```

- [ ] **Step 3: Rimuovi l'@import Google Fonts da app/globals.css**

Trova e rimuovi questa riga da `app/globals.css` se presente (i font verranno caricati dal layout):
```css
@import url('https://fonts.googleapis.com/...');
```
(Il file `styles.css` originale non contiene questa riga — i font erano caricati da `index.html`, quindi questo step è già completato.)

- [ ] **Step 4: Commit**

```bash
git add public/ app/globals.css
git commit -m "chore: move assets to public/, create app/globals.css"
```

---

## Task 3: Crea lib/packs.ts

**Files:**
- Create: `lib/packs.ts`

- [ ] **Step 1: Crea lib/packs.ts con types e dati**

```bash
mkdir -p lib
```

```typescript
// lib/packs.ts
export type PackId = 'kick' | 'transformation' | 'elite'
export type CycleId = 'mensile' | 'trimestrale' | 'semestrale' | 'annuale'

export interface PackFeature {
  t: string
  s: boolean
  bold?: boolean
}

export interface Pack {
  id: PackId
  tier: string
  name: [string, string]
  desc: string
  monthly: number
  featured?: boolean
  features: PackFeature[]
}

export interface Cycle {
  id: CycleId
  label: string
  months: number
  discount: number
  badge: string | null
}

export const PACKS: Pack[] = [
  {
    id: 'kick',
    tier: '01 · Entry',
    name: ['Kick', 'Starter'],
    desc: 'Per chi inizia: una base solida con autonomia e metodo.',
    monthly: 50,
    features: [
      { t: 'Prima call per identificazione obiettivi', s: true },
      { t: 'Schede aggiornate ogni 6—8 settimane', s: true },
      { t: 'Check-in bi-settimanali', s: true },
      { t: 'Video e spiegazione esercizi', s: true },
      { t: 'Supporto WhatsApp limitato (entro 48h)', s: true },
      { t: 'Revisione esecuzione esercizi', s: false },
      { t: 'Adattamento scheda periodico', s: false },
      { t: 'Linee guida nutrizionali', s: false },
      { t: 'Piano alimentare completo', s: false },
    ],
  },
  {
    id: 'transformation',
    tier: '02 · Più scelto',
    name: ['Trans', 'formation'],
    desc: 'Il percorso più richiesto: accountability, ritmo e adattamenti continui.',
    monthly: 90,
    featured: true,
    features: [
      { t: 'Tutto del piano Kick Starter', s: true, bold: true },
      { t: 'Check-in settimanali', s: true },
      { t: 'Supporto WhatsApp (risposta entro 24h)', s: true },
      { t: 'Revisione esecuzione esercizi', s: true },
      { t: 'Adattamento scheda periodico', s: true },
      { t: 'Linee guida nutrizionali', s: true },
      { t: 'Piano alimentare completo', s: false },
      { t: '1:1 mensile di revisione', s: false },
    ],
  },
  {
    id: 'elite',
    tier: '03 · Premium',
    name: ['El', 'ite'],
    desc: "L'esperienza completa: piano alimentare, revisione 1:1 e priorità totale.",
    monthly: 120,
    features: [
      { t: 'Tutto del piano Transformation', s: true, bold: true },
      { t: 'Supporto WhatsApp prioritario', s: true },
      { t: 'Piano alimentare completo', s: true },
      { t: '1:1 mensile di revisione', s: true },
    ],
  },
]

export const CYCLES: Cycle[] = [
  { id: 'mensile',     label: 'Mensile',      months: 1,  discount: 0,    badge: null },
  { id: 'trimestrale', label: 'Trimestrale',  months: 3,  discount: 0.10, badge: '−10%' },
  { id: 'semestrale',  label: 'Semestrale',   months: 6,  discount: 0.15, badge: '−15%' },
  { id: 'annuale',     label: 'Annuale',      months: 12, discount: 0.20, badge: '−20%' },
]

export const fmtPrice = (n: number) => Math.round(n).toLocaleString('it-IT')
```

- [ ] **Step 2: Verifica TypeScript**

```bash
npx tsc --noEmit
```

Output atteso: nessun errore.

- [ ] **Step 3: Commit**

```bash
git add lib/packs.ts
git commit -m "feat: add shared PACKS/CYCLES data and types"
```

---

## Task 4: Componenti UI condivisi (Icons, Brand, SectionHeader)

**Files:**
- Create: `components/Icons.tsx`
- Create: `components/Brand.tsx`
- Create: `components/SectionHeader.tsx`

- [ ] **Step 1: Crea components/Icons.tsx**

```bash
mkdir -p components
```

```typescript
// components/Icons.tsx
type S = { s?: number }
type LogoProps = { size?: number }

export const Icons = {
  Logo: ({ size = 40 }: LogoProps) => (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      <path d="M 50 8 A 42 42 0 1 0 92 50" stroke="#e6122e" strokeWidth="9" strokeLinecap="round" fill="none"/>
      <path d="M 50 22 A 28 28 0 1 0 78 50" stroke="#1ec0b0" strokeWidth="4" strokeLinecap="round" fill="none"/>
      <text x="32" y="64" fontFamily="Cormorant Garamond, serif" fontSize="44" fontWeight="500" fill="#f4f4f6">G</text>
      <circle cx="72" cy="56" r="9" stroke="#e6122e" strokeWidth="3" fill="none"/>
    </svg>
  ),
  Phone: ({ s = 20 }: S) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.72 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.35 1.85.59 2.81.72A2 2 0 0 1 22 16.92z"/></svg>,
  Mail: ({ s = 20 }: S) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 5L2 7"/></svg>,
  Instagram: ({ s = 20 }: S) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>,
  Pin: ({ s = 20 }: S) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/></svg>,
  Check: ({ s = 14 }: S) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
  Dumbbell: ({ s = 24 }: S) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M6.5 6.5 17.5 17.5"/><path d="m21 21-1-1"/><path d="m3 3 1 1"/><path d="m18 22 4-4"/><path d="m2 6 4-4"/><path d="m3 10 7-7"/><path d="m14 21 7-7"/></svg>,
  Heart: ({ s = 24 }: S) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>,
  Award: ({ s = 24 }: S) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>,
  Cap: ({ s = 24 }: S) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6"/><path d="M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>,
  Activity: ({ s = 24 }: S) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>,
  Menu: ({ s = 22 }: S) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="3" y1="8" x2="21" y2="8"/><line x1="3" y1="16" x2="21" y2="16"/></svg>,
  Close: ({ s = 22 }: S) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="6" y1="6" x2="18" y2="18"/><line x1="6" y1="18" x2="18" y2="6"/></svg>,
}
```

- [ ] **Step 2: Crea components/Brand.tsx**

```typescript
// components/Brand.tsx
import Link from 'next/link'
import { Icons } from './Icons'

export function Brand() {
  return (
    <Link href="/" className="nav-brand">
      <Icons.Logo size={42} />
      <div className="wm">
        Giuliano<em>&nbsp;Ortu</em>
        <small>Personal Trainer</small>
      </div>
    </Link>
  )
}
```

- [ ] **Step 3: Crea components/SectionHeader.tsx**

```typescript
// components/SectionHeader.tsx
interface Props {
  eyebrow: string
  title: string
  meta?: string
}

export function SectionHeader({ eyebrow, title, meta }: Props) {
  return (
    <div className="section-header">
      <div>
        <div className="eyebrow"><span className="dot"></span>{eyebrow}</div>
        <h2 className="display" dangerouslySetInnerHTML={{ __html: title }} />
      </div>
      {meta && <div className="meta">{meta}</div>}
    </div>
  )
}
```

- [ ] **Step 4: Verifica TypeScript**

```bash
npx tsc --noEmit
```

Output atteso: nessun errore.

- [ ] **Step 5: Commit**

```bash
git add components/Icons.tsx components/Brand.tsx components/SectionHeader.tsx
git commit -m "feat: add Icons, Brand, SectionHeader components"
```

---

## Task 5: Nav component

**Files:**
- Create: `components/Nav.tsx`

- [ ] **Step 1: Crea components/Nav.tsx**

```typescript
// components/Nav.tsx
'use client'

import { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { Brand } from './Brand'
import { Icons } from './Icons'

const NAV = [
  { id: 'home',        label: 'Home',        href: '/' },
  { id: 'esperienza',  label: 'Esperienza',  href: '/esperienza' },
  { id: 'pacchetti',   label: 'Pacchetti',   href: '/pacchetti' },
  { id: 'contatti',    label: 'Contatti',    href: '/contatti' },
]

export function Nav() {
  const pathname = usePathname()
  const router = useRouter()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [pathname])

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href)

  return (
    <>
      <nav className={`nav ${scrolled ? 'scrolled' : ''}`}>
        <Brand />
        <div className="nav-links">
          {NAV.map((n) => (
            <button
              key={n.id}
              className={`nav-link ${isActive(n.href) ? 'active' : ''}`}
              onClick={() => router.push(n.href)}>
              {n.label}
            </button>
          ))}
        </div>
        <button className="nav-cta" onClick={() => router.push('/contatti')}>
          Prenota
        </button>
        <button
          className="nav-burger"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menu">
          {mobileOpen ? <Icons.Close /> : <Icons.Menu />}
        </button>
      </nav>

      {mobileOpen && (
        <div className="mobile-menu">
          {NAV.map((n) => (
            <button
              key={n.id}
              className={`nav-link ${isActive(n.href) ? 'active' : ''}`}
              onClick={() => router.push(n.href)}>
              {n.label}
            </button>
          ))}
          <button
            className="btn btn-primary"
            style={{ marginTop: 24, alignSelf: 'flex-start' }}
            onClick={() => router.push('/contatti')}>
            Prenota una consulenza <span className="arrow">→</span>
          </button>
        </div>
      )}
    </>
  )
}
```

- [ ] **Step 2: Verifica TypeScript**

```bash
npx tsc --noEmit
```

Output atteso: nessun errore.

- [ ] **Step 3: Commit**

```bash
git add components/Nav.tsx
git commit -m "feat: add Nav component with mobile menu and scroll state"
```

---

## Task 6: Footer component

**Files:**
- Create: `components/Footer.tsx`

- [ ] **Step 1: Crea components/Footer.tsx**

```typescript
// components/Footer.tsx
import Link from 'next/link'
import { Brand } from './Brand'

const NAV = [
  { id: 'home',       label: 'Home',       href: '/' },
  { id: 'esperienza', label: 'Esperienza', href: '/esperienza' },
  { id: 'pacchetti',  label: 'Pacchetti',  href: '/pacchetti' },
  { id: 'contatti',   label: 'Contatti',   href: '/contatti' },
]

export function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div>
          <Brand />
          <div className="footer-tagline">
            <em style={{ color: 'var(--red)', fontStyle: 'italic' }}>Forza, forma, fiducia.</em><br />
            Allenamento su misura, a Cagliari.
          </div>
        </div>
        <div>
          <h4>Naviga</h4>
          <ul>
            {NAV.map((n) => (
              <li key={n.id}><Link href={n.href}>{n.label}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h4>Contatti</h4>
          <ul>
            <li><a href="tel:+393331234567">+39 333 123 4567</a></li>
            <li><a href="mailto:giuliano@ortupt.it">giuliano@ortupt.it</a></li>
            <li><a href="https://instagram.com/" target="_blank" rel="noreferrer">@giuliano.ortu.pt</a></li>
          </ul>
        </div>
        <div>
          <h4>Studio</h4>
          <ul>
            <li>Via dei Giudicati 14</li>
            <li>09131 Cagliari (CA)</li>
            <li>P.IVA 03891450921</li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {year} Giuliano Ortu · Personal Trainer · Tutti i diritti riservati</span>
        <span>Privacy · Cookie · Termini</span>
      </div>
    </footer>
  )
}
```

- [ ] **Step 2: Verifica TypeScript**

```bash
npx tsc --noEmit
```

Output atteso: nessun errore.

- [ ] **Step 3: Commit**

```bash
git add components/Footer.tsx
git commit -m "feat: add Footer component"
```

---

## Task 7: Root layout

**Files:**
- Create: `app/layout.tsx`

- [ ] **Step 1: Crea app/layout.tsx**

```typescript
// app/layout.tsx
import type { Metadata } from 'next'
import './globals.css'
import { Nav } from '@/components/Nav'
import { Footer } from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Giuliano Ortu — Personal Trainer · Cagliari',
  description: 'Personal Trainer certificato a Cagliari. Allenamento su misura, programmazione, coaching nutrizionale. Tre pacchetti: Standard, Silver, Gold.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600&family=Space+Grotesk:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  )
}
```

- [ ] **Step 2: Verifica che Next.js compili correttamente**

```bash
npm run build
```

Output atteso: build completata senza errori (l'app non ha ancora pagine ma il layout è valido).

- [ ] **Step 3: Commit**

```bash
git add app/layout.tsx
git commit -m "feat: add root layout with Nav, Footer and Google Fonts"
```

---

## Task 8: Migra Home page

**Files:**
- Create: `app/page.tsx`

- [ ] **Step 1: Crea app/page.tsx**

```typescript
// app/page.tsx
'use client'

import { useRouter } from 'next/navigation'
import { Icons } from '@/components/Icons'
import { SectionHeader } from '@/components/SectionHeader'

export default function PageHome() {
  const router = useRouter()

  return (
    <div className="page" data-screen-label="Home">
      {/* HERO */}
      <section className="hero">
        <div>
          <div className="hero-eyebrow">
            <span className="brand-rule"><span></span><span></span></span>
            <span className="eyebrow">Personal Trainer · Cagliari</span>
          </div>
          <h1 className="display">
            <span className="first">Forza,</span><br/>
            <span className="first">forma,</span><br/>
            <span className="last">fiducia.</span>
          </h1>
          <p className="hero-sub">
            Allenamento su misura per chi vuole risultati reali, senza scorciatoie.
            Tu, i tuoi obiettivi, un metodo costruito intorno alla tua vita.
          </p>
          <div className="hero-ctas">
            <button className="btn btn-primary" onClick={() => router.push('/pacchetti')}>
              Scopri i Pacchetti <span className="arrow">→</span>
            </button>
            <button className="btn btn-ghost" onClick={() => router.push('/contatti')}>
              Prenota una consulenza
            </button>
          </div>
          <div className="hero-stats">
            <div className="hero-stat">
              <div className="n mono-num">12<span className="plus">+</span></div>
              <div className="l">Anni di esperienza</div>
            </div>
            <div className="hero-stat">
              <div className="n mono-num">340<span className="plus">+</span></div>
              <div className="l">Clienti seguiti</div>
            </div>
            <div className="hero-stat">
              <div className="n mono-num">98<span className="plus">%</span></div>
              <div className="l">Obiettivi raggiunti</div>
            </div>
          </div>
        </div>
        <div className="hero-visual">
          <div className="athlete"></div>
          <div className="silhouette">
            <svg width="62%" viewBox="0 0 200 280" fill="none" stroke="rgba(255,255,255,0.10)" strokeWidth="1.2">
              <circle cx="100" cy="40" r="22" />
              <path d="M100 62 L100 160" />
              <path d="M100 90 L40 110 M100 90 L160 110" strokeLinecap="round" />
              <rect x="20" y="100" width="22" height="22" rx="3" />
              <rect x="158" y="100" width="22" height="22" rx="3" />
              <path d="M85 160 L60 250 M115 160 L140 250" strokeLinecap="round" />
              <path d="M30 95 L30 130 M180 95 L180 130" />
            </svg>
          </div>
          <div className="frame-tag">
            <span className="pulse"></span> Live · Coaching
          </div>
          <div className="vital">
            <div>
              <div className="lab">Sessione</div>
              <div className="val">60<em>min</em></div>
            </div>
            <div>
              <div className="lab">BPM Medio</div>
              <div className="val">142</div>
            </div>
            <div>
              <div className="lab">Kcal</div>
              <div className="val">680</div>
            </div>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="marquee">
        <div className="marquee-track">
          {Array.from({ length: 2 }).map((_, k) => (
            <span key={k} style={{ display: 'contents' }}>
              <span className="marquee-item">Forza funzionale</span>
              <span className="marquee-item">Ipertrofia</span>
              <span className="marquee-item">Dimagrimento</span>
              <span className="marquee-item">Postura</span>
              <span className="marquee-item">Atletica</span>
              <span className="marquee-item">Recupero</span>
              <span className="marquee-item">Body recomp</span>
              <span className="marquee-item">Preparazione gare</span>
            </span>
          ))}
        </div>
      </div>

      {/* VALUE PROPS */}
      <section className="section">
        <SectionHeader
          eyebrow="Il metodo"
          title="Un approccio <em>completo</em>,<br/>non un programma standard."
          meta="Ogni piano nasce da una valutazione fisica e da una conversazione onesta. Niente copia-incolla, niente promesse vuote."
        />
        <div className="props">
          <div className="prop">
            <div className="ico"><Icons.Activity /></div>
            <h3>Valutazione iniziale</h3>
            <p>Test funzionali, analisi posturale e composizione corporea. Si parte dai dati, non dalle sensazioni.</p>
          </div>
          <div className="prop">
            <div className="ico"><Icons.Dumbbell /></div>
            <h3>Programmazione su misura</h3>
            <p>Schede progressive che si adattano al tuo ritmo settimanale, alla tua condizione e ai tuoi obiettivi.</p>
          </div>
          <div className="prop">
            <div className="ico"><Icons.Heart /></div>
            <h3>Supporto continuo</h3>
            <p>WhatsApp diretto, revisioni mensili e monitoraggio costante. Non sei solo tra una sessione e l&apos;altra.</p>
          </div>
        </div>
      </section>

      {/* PACK TEASER */}
      <section className="section" style={{ paddingTop: 0 }}>
        <SectionHeader
          eyebrow="Pacchetti"
          title="Tre percorsi,<br/>un solo <em>obiettivo</em>."
          meta="Dalla scheda mensile al coaching completo. Scegli la profondità del supporto in base al tuo momento."
        />
        <div className="packs-teaser">
          <div className="pack-tease" onClick={() => router.push('/pacchetti')}>
            <div className="grade">01 · Entry</div>
            <div className="name">Kick Starter</div>
            <div className="price">€50<small>/mese</small></div>
            <p style={{ color: 'var(--text-dim)', fontSize: 14, margin: 0, lineHeight: 1.5 }}>Schede ogni 6-8 settimane, check-in bi-settimanali.</p>
          </div>
          <div className="pack-tease silver" onClick={() => router.push('/pacchetti')}>
            <div className="grade">02 · Più scelto</div>
            <div className="name">Transformation</div>
            <div className="price">€90<small>/mese</small></div>
            <p style={{ color: 'var(--text-dim)', fontSize: 14, margin: 0, lineHeight: 1.5 }}>Check-in settimanali, supporto continuo, linee guida nutrizionali.</p>
          </div>
          <div className="pack-tease gold" onClick={() => router.push('/pacchetti')}>
            <div className="grade">03 · Premium</div>
            <div className="name">Elite</div>
            <div className="price">€120<small>/mese</small></div>
            <p style={{ color: 'var(--text-dim)', fontSize: 14, margin: 0, lineHeight: 1.5 }}>Piano alimentare completo e 1:1 mensile di revisione.</p>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 32 }}>
          <button className="btn btn-ghost" onClick={() => router.push('/pacchetti')}>
            Confronta tutti i pacchetti <span className="arrow">→</span>
          </button>
        </div>
      </section>

      {/* TESTIMONIAL */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="quote">
          <div className="quote-mark">&quot;</div>
          <div>
            <q>Sei mesi con Giuliano e ho perso 11 kg, ma soprattutto ho recuperato il mal di schiena che mi tormentava da anni. Non è solo un trainer: è una persona che ti ascolta davvero.</q>
            <div className="who">Marta R. · <em>Cliente dal 2024</em></div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="cta-banner">
          <div className="cta-banner-inner">
            <h3 className="display">Pronto a iniziare<br/>il <em>tuo</em> percorso?</h3>
            <button className="btn btn-primary" onClick={() => router.push('/contatti')}>
              Prenota una consulenza gratuita <span className="arrow">→</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
```

- [ ] **Step 2: Avvia il dev server e verifica visivamente**

```bash
npm run dev
```

Apri `http://localhost:3000` nel browser.

Verifica:
- La hero section appare con titolo e CTA
- Il marquee scorre
- I pack teaser sono visibili
- La testimonial e il CTA finale appaiono
- I bottoni Hero navigano a `/pacchetti` e `/contatti`
- Il nav e il footer sono visibili

- [ ] **Step 3: Commit**

```bash
git add app/page.tsx
git commit -m "feat: migrate Home page to Next.js"
```

---

## Task 9: Migra Esperienza page

**Files:**
- Create: `app/esperienza/page.tsx`

- [ ] **Step 1: Crea app/esperienza/page.tsx**

```bash
mkdir -p app/esperienza
```

```typescript
// app/esperienza/page.tsx
'use client'

import { useRouter } from 'next/navigation'
import { Icons } from '@/components/Icons'
import { SectionHeader } from '@/components/SectionHeader'

export default function PageEsperienza() {
  const router = useRouter()

  return (
    <div className="page" data-screen-label="Esperienza">
      <section className="section" style={{ paddingBottom: 'clamp(40px, 6vw, 80px)' }}>
        <SectionHeader
          eyebrow="Chi sono"
          title="Dodici anni di palestra,<br/>palco e <em>persone</em>."
          meta="Personal Trainer certificato, formato in scienze motorie e specializzato in ricomposizione corporea e riabilitazione funzionale."
        />
        <div className="bio">
          <div className="bio-portrait">
            <div className="badge"><span className="dot"></span>Disponibile · Cagliari</div>
          </div>
          <div className="bio-body">
            <p>
              Ho iniziato ad allenare a vent&apos;anni in una piccola palestra di quartiere.
              Dodici anni dopo, ho seguito oltre trecento persone — dall&apos;impiegato che voleva
              tornare a giocare a calcetto al bodybuilder pronto per la sua prima gara.
            </p>
            <p>
              Il mio metodo è semplice: <strong style={{ color: 'var(--text)' }}>ascolto prima, programmo dopo</strong>.
              Ogni corpo racconta una storia diversa, e il mio lavoro è leggerla bene
              prima di scrivere un piano che funzioni davvero. Credo nei numeri,
              nelle progressioni misurate e nella costanza — quella vera, non quella delle foto motivazionali.
            </p>
            <div className="signature">— Giuliano</div>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <SectionHeader eyebrow="Formazione" title="Certificazioni e <em>diplomi</em>." />
        <div className="creds">
          <div className="cred">
            <div className="ico"><Icons.Cap /></div>
            <div>
              <div className="yr">2014 · Laurea Magistrale</div>
              <h4>Scienze e Tecniche dello Sport</h4>
              <p className="org">Università degli Studi di Cagliari · 110 / 110 con lode</p>
            </div>
          </div>
          <div className="cred">
            <div className="ico"><Icons.Award /></div>
            <div>
              <div className="yr">2015</div>
              <h4>NSCA Certified Strength &amp; Conditioning Specialist</h4>
              <p className="org">National Strength and Conditioning Association · USA</p>
            </div>
          </div>
          <div className="cred">
            <div className="ico"><Icons.Award /></div>
            <div>
              <div className="yr">2017</div>
              <h4>FIPE — Istruttore di Powerlifting Livello 2</h4>
              <p className="org">Federazione Italiana Pesistica e Cultura Fisica</p>
            </div>
          </div>
          <div className="cred">
            <div className="ico"><Icons.Award /></div>
            <div>
              <div className="yr">2019</div>
              <h4>Functional Movement Screen — Livello 2</h4>
              <p className="org">FMS Functional Movement Systems</p>
            </div>
          </div>
          <div className="cred">
            <div className="ico"><Icons.Cap /></div>
            <div>
              <div className="yr">2021 · Master</div>
              <h4>Nutrizione Applicata allo Sport</h4>
              <p className="org">Scuola Italiana di Medicina dello Sport · Milano</p>
            </div>
          </div>
          <div className="cred">
            <div className="ico"><Icons.Award /></div>
            <div>
              <div className="yr">2023</div>
              <h4>Postural Rehab Specialist</h4>
              <p className="org">ATS — Academy of Therapeutic Sports</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <SectionHeader eyebrow="Specializzazioni" title="Dove sono <em>più forte</em>." />
        <div className="specs">
          <div className="spec">
            <div className="n">01</div>
            <h5>Body recomposition</h5>
            <p>Costruire massa e perdere grasso allo stesso tempo, in modo sostenibile.</p>
          </div>
          <div className="spec">
            <div className="n">02</div>
            <h5>Forza &amp; powerlifting</h5>
            <p>Programmazione per atleti natural e gare federali FIPE/IPF.</p>
          </div>
          <div className="spec">
            <div className="n">03</div>
            <h5>Riabilitazione</h5>
            <p>Ritorno all&apos;attività dopo infortuni a spalla, ginocchio e schiena.</p>
          </div>
          <div className="spec">
            <div className="n">04</div>
            <h5>Postura</h5>
            <p>Correzione di squilibri da scrivania e mobilità per chi sta seduto otto ore.</p>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <SectionHeader eyebrow="Percorso" title="Dove ho <em>allenato</em>." />
        <div className="timeline">
          <div className="tl-item">
            <div className="yr">2014 — 2016</div>
            <h4>Body &amp; Soul Fitness Center</h4>
            <p>Trainer di sala e responsabile dei corsi di forza. Primo contatto con la programmazione per atleti agonisti.</p>
          </div>
          <div className="tl-item">
            <div className="yr">2016 — 2020</div>
            <h4>Sardinia Strength Lab</h4>
            <p>Co-fondatore di uno spazio dedicato a forza e powerlifting. Preparazione di sei atleti per gare nazionali FIPE.</p>
          </div>
          <div className="tl-item">
            <div className="yr">2020 — 2023</div>
            <h4>Coach online — Stagione pandemia</h4>
            <p>Costruito un programma di coaching da remoto per 80+ clienti in tutta Italia. Sviluppo del metodo personale.</p>
          </div>
          <div className="tl-item">
            <div className="yr">2023 — Oggi</div>
            <h4>Studio Privato · Cagliari</h4>
            <p>Spazio personale dedicato 1-to-1, con valutazione funzionale, area pesi e nutrizione integrata.</p>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="cta-banner">
          <div className="cta-banner-inner">
            <h3 className="display">Vediamoci di persona,<br/>la prima volta è <em>offerta da me</em>.</h3>
            <button className="btn btn-primary" onClick={() => router.push('/contatti')}>
              Prenota la consulenza <span className="arrow">→</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
```

- [ ] **Step 2: Verifica visivamente a localhost:3000/esperienza**

Con il dev server attivo, verifica:
- La bio appare con la firma
- La griglia delle certificazioni è visibile
- La timeline è visibile
- Il CTA finale naviga a `/contatti`

- [ ] **Step 3: Commit**

```bash
git add app/esperienza/page.tsx
git commit -m "feat: migrate Esperienza page to Next.js"
```

---

## Task 10: Migra Pacchetti page

**Files:**
- Create: `app/pacchetti/page.tsx`

- [ ] **Step 1: Crea app/pacchetti/page.tsx**

```bash
mkdir -p app/pacchetti
```

```typescript
// app/pacchetti/page.tsx
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Icons } from '@/components/Icons'
import { SectionHeader } from '@/components/SectionHeader'
import { PACKS, CYCLES, fmtPrice, type CycleId, type PackId } from '@/lib/packs'

export default function PagePacchetti() {
  const router = useRouter()
  const [cycleId, setCycleId] = useState<CycleId>('mensile')
  const cycle = CYCLES.find((c) => c.id === cycleId)!

  const openContact = (packId?: PackId, cId?: CycleId) => {
    const params = new URLSearchParams()
    if (packId) params.set('pack', packId)
    if (cId && cId !== 'mensile') params.set('cycle', cId)
    const qs = params.toString()
    router.push(qs ? `/contatti?${qs}` : '/contatti')
  }

  return (
    <div className="page" data-screen-label="Pacchetti">
      <section className="section">
        <SectionHeader
          eyebrow="I Pacchetti"
          title="Tre percorsi.<br/>Il <em>tuo</em>, in fondo, è uno solo."
          meta="Tutti i pacchetti includono prima call gratuita di identificazione obiettivi. Sconti progressivi su trimestrale, semestrale e annuale."
        />

        <div className="cycle-toggle" role="tablist" aria-label="Periodo di fatturazione">
          {CYCLES.map((c) => (
            <button
              key={c.id}
              role="tab"
              aria-selected={cycleId === c.id}
              className={`cycle-opt ${cycleId === c.id ? 'active' : ''}`}
              onClick={() => setCycleId(c.id)}>
              <span>{c.label}</span>
              {c.badge && <em className="cycle-badge">{c.badge}</em>}
            </button>
          ))}
        </div>

        <div className="pack-grid">
          {PACKS.map((p) => {
            const total = p.monthly * cycle.months * (1 - cycle.discount)
            const effMonthly = total / cycle.months
            return (
              <div key={p.id} className={`pack ${p.id} ${p.featured ? 'featured' : ''}`}>
                <div className="pack-tier">{p.tier}</div>
                <div className="pack-name display">
                  {p.name[0]}<em>{p.name[1]}</em>
                </div>
                <p className="pack-desc">{p.desc}</p>
                <div className="pack-price">
                  <span className="cur">€</span>
                  <span className="amt mono-num">{fmtPrice(effMonthly)}</span>
                  <span className="per">/ mese</span>
                </div>
                {cycle.months > 1 && (
                  <div className="pack-total">
                    <span>Totale {cycle.label.toLowerCase()}</span>
                    <strong>€{fmtPrice(total)}</strong>
                  </div>
                )}
                <ul className="pack-features">
                  {p.features.map((f, i) => (
                    <li key={i} className={!f.s ? 'muted' : ''}>
                      <span className="chk">
                        {f.s
                          ? <Icons.Check />
                          : <svg width="14" height="14" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="6" y1="12" x2="18" y2="12"/></svg>
                        }
                      </span>
                      <span>{f.bold ? <strong>{f.t}</strong> : f.t}</span>
                    </li>
                  ))}
                </ul>
                <button
                  className={`btn ${p.featured ? 'btn-primary' : 'btn-ghost'}`}
                  onClick={() => openContact(p.id, cycleId)}>
                  Scegli {p.id === 'kick' ? 'Kick Starter' : p.name.join('')} <span className="arrow">→</span>
                </button>
              </div>
            )
          })}
        </div>

        <div className="single-note">
          <div>
            <div className="eyebrow"><span className="dot"></span>Senza pacchetto</div>
            <h4>Lezione singola</h4>
            <p>Una sessione 1:1, senza impegno. Ideale per provare il metodo o per una consulenza tecnica specifica.</p>
          </div>
          <div className="single-price">
            <span className="amt mono-num">€50</span>
            <span className="per">/ora</span>
          </div>
        </div>

        <div className="compare">
          <table>
            <thead>
              <tr>
                <th style={{ width: '40%' }}>Cosa è incluso</th>
                <th>Kick Starter</th>
                <th className="featured-col">Transformation</th>
                <th className="elite-col">Elite</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Prima call identificazione obiettivi', '✓', '✓', '✓'],
                ['Schede personalizzate', 'Ogni 6—8 sett.', 'Ogni 6—8 sett.', 'Ogni 6—8 sett.'],
                ['Check-in', 'Bi-settimanali', 'Settimanali', 'Settimanali'],
                ['Video e spiegazione esercizi', '✓', '✓', '✓'],
                ['Supporto WhatsApp', 'Entro 48h', 'Entro 24h', 'Prioritario'],
                ['Revisione esecuzione esercizi', '—', '✓', '✓'],
                ['Adattamento scheda periodico', '—', '✓', '✓'],
                ['Linee guida nutrizionali', '—', '✓', '✓'],
                ['Piano alimentare completo', '—', '—', '✓'],
                ['1:1 mensile di revisione', '—', '—', '✓'],
                ['Prezzo mensile', '€50', '€90', '€120'],
                ['Annuale (−20%)', '€480', '€864', '€1.152'],
              ].map((row, i) => (
                <tr key={i}>
                  {row.map((cell, j) => {
                    const cls = j === 0 ? '' : cell === '✓' ? 'yes' : cell === '—' ? 'no' : ''
                    return <td key={j} className={cls}>{cell}</td>
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <SectionHeader eyebrow="FAQ" title="Le domande che <em>arrivano</em> sempre." />
        <div className="faq">
          {[
            {
              q: 'Come funzionano gli sconti su trimestrale, semestrale e annuale?',
              a: "Più lungo è l'impegno, più scende il prezzo mensile equivalente: −10% sul trimestrale, −15% sul semestrale, −20% sull'annuale. Il pagamento avviene in un'unica soluzione al momento dell'attivazione.",
            },
            {
              q: 'Posso cambiare pacchetto durante il percorso?',
              a: 'Sì, in qualsiasi momento. Se passi a un piano superiore, paghi solo la differenza pro-rata. Se scendi, la modifica parte dal ciclo successivo.',
            },
            {
              q: 'Posso allenarmi nella mia palestra di fiducia?',
              a: "Assolutamente sì. I pacchetti sono pensati per essere seguiti ovunque: nella tua palestra, a casa, in viaggio. Ti fornisco programmazione, video e supporto — la sala te la scegli tu.",
            },
            {
              q: 'Quanto velocemente vedrò risultati?',
              a: "Dipende dal punto di partenza e dalla costanza. La maggior parte dei clienti nota cambiamenti visibili tra la quarta e l'ottava settimana. Lavoro per risultati duraturi, non per stupire la bilancia in due settimane.",
            },
            {
              q: 'Il piano alimentare è incluso in tutti i pacchetti?',
              a: "Le linee guida nutrizionali sono incluse dal Transformation. Il piano alimentare completo, con calcolo dei macronutrienti e indicazioni sui pasti, è incluso solo nell'Elite.",
            },
            {
              q: 'Lavori con principianti?',
              a: "Sì, e con piacere. Anzi, è uno dei momenti più importanti per impostare bene tutto: tecnica, abitudini, mentalità. Non serve \"essere in forma\" per iniziare.",
            },
            {
              q: 'Posso prendere solo una lezione singola?',
              a: "Certo: 50€/ora, una sessione 1:1 senza impegno. Utile per provare il metodo o per una valutazione tecnica specifica.",
            },
          ].map((f, i) => (
            <details key={i} className="faq-item" {...(i === 0 ? { open: true } : {})}>
              <summary>
                <span>{f.q}</span>
                <span className="plus">+</span>
              </summary>
              <div className="ans">{f.a}</div>
            </details>
          ))}
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="cta-banner">
          <div className="cta-banner-inner">
            <h3 className="display">Non sai quale scegliere?<br/>Parliamone <em>insieme</em>.</h3>
            <button className="btn btn-primary" onClick={() => openContact()}>
              Consulenza gratuita <span className="arrow">→</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
```

- [ ] **Step 2: Verifica visivamente a localhost:3000/pacchetti**

Verifica:
- Il toggle ciclo di fatturazione funziona e aggiorna i prezzi
- I 3 pack sono visibili con le feature list
- Il bottone "Scegli X" naviga a `/contatti?pack=kick&cycle=trimestrale` (controlla l'URL nel browser)
- La tabella comparativa è visibile
- La FAQ si apre/chiude con `<details>`

- [ ] **Step 3: Commit**

```bash
git add app/pacchetti/page.tsx
git commit -m "feat: migrate Pacchetti page to Next.js"
```

---

## Task 11: Migra Contatti page

**Files:**
- Create: `app/contatti/page.tsx`

Il componente usa `useSearchParams` che richiede un `<Suspense>` boundary in Next.js App Router. Il pattern corretto è: esportare come default un wrapper con Suspense, e il form vero e proprio come componente interno.

- [ ] **Step 1: Crea app/contatti/page.tsx**

```bash
mkdir -p app/contatti
```

```typescript
// app/contatti/page.tsx
'use client'

import { Suspense, useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { Icons } from '@/components/Icons'
import { SectionHeader } from '@/components/SectionHeader'
import type { PackId, CycleId } from '@/lib/packs'

type FormState = {
  name: string
  email: string
  phone: string
  goal: string
  message: string
  consent: boolean
}

type Errors = Partial<Record<keyof FormState, string>>

function ContattiForm() {
  const searchParams = useSearchParams()
  const [pack, setPack] = useState<PackId | ''>((searchParams.get('pack') as PackId) || '')
  const [cycle, setCycle] = useState<CycleId>((searchParams.get('cycle') as CycleId) || 'mensile')
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState<FormState>({ name: '', email: '', phone: '', goal: '', message: '', consent: false })
  const [errors, setErrors] = useState<Errors>({})

  useEffect(() => {
    const p = searchParams.get('pack') as PackId
    const c = searchParams.get('cycle') as CycleId
    if (p) setPack(p)
    if (c) setCycle(c)
  }, [searchParams])

  const validate = (): boolean => {
    const e: Errors = {}
    if (!form.name.trim()) e.name = 'Inserisci il tuo nome'
    if (!form.email.match(/^[^@\s]+@[^@\s]+\.[^@\s]+$/)) e.email = 'Email non valida'
    if (!form.consent) e.consent = 'Necessario per procedere'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const submit = (ev: React.FormEvent) => {
    ev.preventDefault()
    if (!validate()) return
    setSent(true)
  }

  if (sent) {
    return (
      <section className="section">
        <div className="form" style={{ maxWidth: 640, margin: '0 auto' }}>
          <div className="thank-you">
            <div className="ico"><Icons.Check s={32} /></div>
            <h3 className="display">Messaggio <span style={{ color: 'var(--red)', fontStyle: 'italic' }}>ricevuto</span>.</h3>
            <p>Grazie {form.name.split(' ')[0]}. Ti rispondo entro 24 ore con i prossimi passi e un orario per la consulenza gratuita.</p>
            <button
              className="btn btn-ghost"
              onClick={() => {
                setSent(false)
                setForm({ name: '', email: '', phone: '', goal: '', message: '', consent: false })
                setPack('')
              }}>
              Invia un altro messaggio
            </button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="section">
      <SectionHeader
        eyebrow="Contatti"
        title="Scrivimi.<br/>La prima consulenza è <em>gratuita</em>."
        meta="Rispondo personalmente entro 24 ore. Niente segreteria, niente form passati a uno staff: parli con me."
      />

      <div className="contact-grid">
        <div className="contact-info">
          <a className="contact-card" href="tel:+393331234567">
            <div className="ico"><Icons.Phone /></div>
            <div>
              <div className="lab">Telefono · WhatsApp</div>
              <div className="val">+39 333 123 4567</div>
            </div>
            <span className="arr">↗</span>
          </a>
          <a className="contact-card" href="mailto:giuliano@ortupt.it">
            <div className="ico"><Icons.Mail /></div>
            <div>
              <div className="lab">Email</div>
              <div className="val">giuliano@ortupt.it</div>
            </div>
            <span className="arr">↗</span>
          </a>
          <a className="contact-card" href="https://instagram.com/" target="_blank" rel="noreferrer">
            <div className="ico"><Icons.Instagram /></div>
            <div>
              <div className="lab">Instagram</div>
              <div className="val">@giuliano.ortu.pt</div>
            </div>
            <span className="arr">↗</span>
          </a>
          <a className="contact-card" href="#">
            <div className="ico"><Icons.Pin /></div>
            <div>
              <div className="lab">Studio</div>
              <div className="val">Via dei Giudicati 14<br/>09131 Cagliari (CA)</div>
            </div>
            <span className="arr">↗</span>
          </a>
          <div className="hours-card">
            <h4>Orari studio</h4>
            <div className="hours">
              <div className="hours-row"><span className="day">Lunedì — Venerdì</span><span className="time">07:00 — 21:00</span></div>
              <div className="hours-row"><span className="day">Sabato</span><span className="time">08:00 — 14:00</span></div>
              <div className="hours-row closed"><span className="day">Domenica</span><span className="time">Chiuso</span></div>
            </div>
          </div>
        </div>

        <form className="form" onSubmit={submit} noValidate>
          <div className="form-row">
            <div className={`field ${errors.name ? 'invalid' : ''}`}>
              <label>Nome e cognome *</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Mario Rossi"
              />
              {errors.name && <div className="err">{errors.name}</div>}
            </div>
            <div className={`field ${errors.email ? 'invalid' : ''}`}>
              <label>Email *</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="mario@email.it"
              />
              {errors.email && <div className="err">{errors.email}</div>}
            </div>
          </div>

          <div className="form-row">
            <div className="field">
              <label>Telefono (opzionale)</label>
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                placeholder="+39 ___ ___ ____"
              />
            </div>
            <div className="field">
              <label>Obiettivo principale</label>
              <select value={form.goal} onChange={(e) => setForm({ ...form, goal: e.target.value })}>
                <option value="">Seleziona...</option>
                <option>Dimagrimento</option>
                <option>Aumento massa muscolare</option>
                <option>Body recomposition</option>
                <option>Forza / powerlifting</option>
                <option>Postura / dolori</option>
                <option>Riabilitazione</option>
                <option>Altro</option>
              </select>
            </div>
          </div>

          <div className="field">
            <label>Pacchetto di interesse</label>
            <div className="pack-pills">
              {([
                { id: '' as const, label: 'Non so ancora' },
                { id: 'kick' as PackId, label: 'Kick Starter' },
                { id: 'transformation' as PackId, label: 'Transformation' },
                { id: 'elite' as PackId, label: 'Elite' },
                { id: 'singola' as const, label: 'Lezione singola' },
              ] as { id: PackId | '' | 'singola'; label: string }[]).map((p) => (
                <button
                  key={p.id || 'none'}
                  type="button"
                  className={`pack-pill ${pack === p.id ? 'active' : ''}`}
                  onClick={() => setPack(p.id as PackId | '')}>
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {pack && pack !== 'singola' && (
            <div className="field">
              <label>Periodo di fatturazione</label>
              <div className="pack-pills">
                {([
                  { id: 'mensile' as CycleId, label: 'Mensile' },
                  { id: 'trimestrale' as CycleId, label: 'Trimestrale −10%' },
                  { id: 'semestrale' as CycleId, label: 'Semestrale −15%' },
                  { id: 'annuale' as CycleId, label: 'Annuale −20%' },
                ]).map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    className={`pack-pill ${cycle === c.id ? 'active' : ''}`}
                    onClick={() => setCycle(c.id)}>
                    {c.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="field">
            <label>Messaggio</label>
            <textarea
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              placeholder="Raccontami qualcosa di te: il tuo punto di partenza, cosa hai già provato, cosa vorresti cambiare..."
            />
          </div>

          <label className={`consent ${errors.consent ? 'invalid' : ''}`}>
            <input
              type="checkbox"
              checked={form.consent}
              onChange={(e) => setForm({ ...form, consent: e.target.checked })}
            />
            <span>
              Acconsento al trattamento dei miei dati personali per essere ricontattato.
              I dati non saranno condivisi con terzi e potranno essere cancellati su richiesta.
              {errors.consent && <span style={{ color: 'var(--red)', display: 'block', marginTop: 4 }}>{errors.consent}</span>}
            </span>
          </label>

          <div className="form-submit">
            <span className="note">Risposta entro 24 ore · Consulenza iniziale gratuita</span>
            <button type="submit" className="btn btn-primary">
              Invia messaggio <span className="arrow">→</span>
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}

export default function PageContatti() {
  return (
    <div className="page" data-screen-label="Contatti">
      <Suspense fallback={<div style={{ padding: '4rem', textAlign: 'center' }}>Caricamento...</div>}>
        <ContattiForm />
      </Suspense>
    </div>
  )
}
```

- [ ] **Step 2: Verifica visivamente a localhost:3000/contatti**

Verifica:
- Il form appare con tutti i campi
- Le info di contatto appaiono nella sidebar
- Navigando da Pacchetti con "Scegli Kick Starter" → il pack `kick` è preselezionato nel form
- La validazione mostra errori se si invia il form vuoto
- Dopo invio corretto appare il messaggio "Messaggio ricevuto"

- [ ] **Step 3: Verifica la build di produzione**

```bash
npm run build
```

Output atteso: build completata senza errori TypeScript.

- [ ] **Step 4: Commit**

```bash
git add app/contatti/page.tsx
git commit -m "feat: migrate Contatti page to Next.js with search params"
```

---

## Task 12: Rimuovi i vecchi file e commit finale

**Files:**
- Delete: `index.html`, `components.jsx`, `page-home.jsx`, `page-esperienza.jsx`, `page-pacchetti.jsx`, `page-contatti.jsx`, `styles.css`
- Delete: `assets/` (contenuto spostato in `public/`)
- Delete: `uploads/` (contenuto spostato in `public/uploads/`)

- [ ] **Step 1: Rimuovi i file CDN legacy**

```bash
git rm index.html components.jsx page-home.jsx page-esperienza.jsx page-pacchetti.jsx page-contatti.jsx styles.css
git rm -r assets/ uploads/
```

- [ ] **Step 2: Verifica che il sito funzioni ancora**

```bash
npm run dev
```

Visita `http://localhost:3000` e naviga in tutte le 4 pagine.

- [ ] **Step 3: Build finale di produzione**

```bash
npm run build
```

Output atteso: build completata senza errori.

- [ ] **Step 4: Commit finale**

```bash
git add -A
git commit -m "chore: remove legacy CDN files, Next.js migration complete"
```

---

## Note per Piano 2 (Supabase + Admin)

Il Piano 2 innesterà in questa struttura:
- `app/admin/` — pannello PT con login Supabase Auth
- `app/api/upload/route.ts` — endpoint per upload verso Supabase Storage
- `lib/supabase.ts` — client Supabase (browser + server)
- Le immagini in `public/uploads/` verranno migrate a Supabase Storage

## Note per Piano 3 (Stripe)

Il Piano 3 innesterà:
- `app/api/stripe/create-payment-intent/route.ts`
- `app/api/stripe/webhook/route.ts`
- `lib/stripe.ts` — client Stripe
- Checkout nella pagina Contatti o Pacchetti
