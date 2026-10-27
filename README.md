# UniVerse — Global University Confession & Student Community Platform

**UniVerse** is a modern, student-centered web application where university students worldwide can anonymously share campus confessions, exchange academic notes and exam guides, find student-recommended study cafes and food spots, customize cute 2D vector avatars, and personalize the entire visual interface through 12 aesthetic themes and real HTML color pickers.

---

## 🌟 Key Features

1. **Anonymous Confession Feed & Safety Engine**
   - Three distinct privacy modes: **Completely Anonymous**, **Custom Nickname**, or **Student Profile**.
   - Built-in **AI Confession Analyzer** that evaluates primary category, sentiment (Romantic, Nervous, Humorous, Frustrated, etc.), advice flags, and scans for PII (phone numbers, emails) or targeted harassment before publishing.
   - Works immediately via server-side Gemini AI or resilient local rule-engine fallback.
   - Interactive reactions (likes), nested comments, bookmarks, and abuse reporting.

2. **Global University Directory with Azerbaijan-First Experience**
   - Search by campus name, acronym, city, or country.
   - Prominent spotlight on **15+ Azerbaijan universities** (ADA, Baku State University, UNEC, BHOS, Khazar, ASOIU, AMU, AzTU, AUL, ASPU, AzUAC, BEU, Western Caspian, ATMU, AU).
   - Dedicated community hubs for each institution (`/universities/:universitySlug`).
   - Campus suggestion form for institutions not yet indexed.

3. **12 Aesthetic Theme Presets & Real Color Picker**
   - Instant visual transformation across navigation, cards, modals, and forms without page reload.
   - 12 presets: **Cute / Kawaii**, **Minimalist**, **Gothic / Dark Academia**, **Academia**, **Y2K**, **Cyberpunk Neon**, **Nature**, **Ocean**, **Sunset**, **Monochrome**, **Coquette**, and **Lavender Dream**.
   - Real HTML color inputs (`<input type="color">`) for custom Primary, Accent, Background, Surface, and Text colors.
   - Full Light, Dark, and System preference support with persistent local storage.

4. **Academic Notes & Verified Study Tools**
   - Student repository for lecture notes, exam prep checklists, formula cheatsheets, and project guides.
   - Upvotes for helpfulness and safe document downloads.
   - Curated directory of essential study tools (Overleaf, Wolfram Alpha, Semantic Scholar, Anki, Notion, Zotero).

5. **Student Discussion Rooms & Campus Recommendations**
   - Topic channels for general campus chat, academic help, food & cafes, course advice, roommates, and events.
   - Reactive message list with emoji reactions, message reply threading, and custom sender avatars.
   - Campus spot directory for study cafes, late-night bites, and quiet parks with filter tags (Affordable, Quiet, Good Wi-Fi, Group Study, Late Opening).

6. **Cute 2D Vector Avatar Creator**
   - Expressive layered vector illustration system rendered in clean SVG.
   - Customizable hairstyles, hair colors, anime/sparkle eye styles, blush/freckles, glasses, bows, earrings, cozy outfits, and charm stars.
   - Theme-aware style presets (Cute, Gothic, Academia, Y2K, Minimal) and randomize generator.

---

## 🚀 Running the Project Locally in Visual Studio Code

### Prerequisites
- Node.js (version 18+ or 20+ recommended)
- npm or pnpm

### Quick Start
```bash
# 1. Clone or extract the repository
cd universe

# 2. Install dependencies
npm install

# 3. Start the Vite development server
npm run dev
```

Open your browser to: **`http://localhost:3000`**

### Optional: Running the Express Backend Server
```bash
# Start standalone Express server with full API routes
npx tsx server/index.ts
```

### Production Build
```bash
npm run build
npm run preview
```

---

## 📁 Project Folder Structure

```
universe/
├── src/
│   ├── app/
│   │   ├── App.tsx                     # Main application shell
│   │   ├── router.tsx                  # React Router configuration
│   │   └── providers.tsx               # Theme and global providers
│   ├── components/
│   │   ├── layout/                     # Navbar, MobileNavigation, Footer, PageLayout
│   │   ├── theme/                      # ThemeProvider, ThemeSelector, ColorPicker, ThemePreview
│   │   ├── confessions/                # ConfessionCard, Composer, Filters, Comments, ReportModal
│   │   ├── universities/               # UniversityCard, UniversitySearch, UniversityFilters
│   │   ├── resources/                  # ResourceCard, ResourceUploader, ResourceFilters
│   │   ├── chat/                       # ChatRoomList, ChatWindow, MessageComposer
│   │   ├── avatar/                     # AvatarPreview (SVG), AvatarEditor, AvatarOptions
│   │   └── common/                     # Modals, buttons, badges, ExportModal
│   ├── pages/
│   │   ├── LandingPage.tsx             # Curated landing page with live previews
│   │   ├── UniversitiesPage.tsx        # Global directory & Azerbaijan spotlight
│   │   ├── UniversityDashboardPage.tsx # Specific campus hub
│   │   ├── ConfessionsPage.tsx         # Filterable confession feed
│   │   ├── CreateConfessionPage.tsx    # Confession authoring & AI analyzer
│   │   ├── ResourcesPage.tsx           # Academic notes & study tools
│   │   ├── CreateResourcePage.tsx      # Note upload form with validation
│   │   ├── ChatPage.tsx                # Multi-channel discussion rooms
│   │   ├── RecommendationsPage.tsx     # Student cafes & places near campus
│   │   ├── ProfilePage.tsx             # Student profile & saved bookmarks
│   │   ├── AvatarPage.tsx              # 2D vector character customization
│   │   ├── SettingsPage.tsx            # Appearance and custom color studio
│   │   ├── ModerationPage.tsx          # Safety desk for flagged submissions
│   │   ├── GuidelinesPage.tsx          # Community pledge and anonymity disclosure
│   │   └── NotFoundPage.tsx            # 404 recovery page
│   ├── services/
│   │   ├── aiClassifier.ts             # AI analyzer & local keyword rule engine
│   │   ├── aiClassifier.test.ts        # Unit tests using node:test
│   │   ├── universityService.ts        # University query & filtering
│   │   ├── universityService.test.ts   # Unit tests using node:test
│   │   ├── confessionService.ts        # Confession CRUD, reactions & comments
│   │   └── storageService.ts           # Local persistence and demo state
│   ├── data/
│   │   ├── universities.ts             # 15+ Azerbaijan & global institutions
│   │   ├── sampleConfessions.ts        # Realistic sample confessions
│   │   ├── sampleResources.ts          # Academic resources & study tools
│   │   ├── sampleChat.ts               # Chat rooms & messages
│   │   ├── sampleRecommendations.ts   # Cafes, bookstores & quiet spots
│   │   └── themePresets.ts             # 12 aesthetic theme definitions
│   ├── styles/
│   │   ├── variables.css               # Dynamic CSS custom properties
│   │   ├── themes.css                  # Reusable utility classes
│   │   └── globals.css
│   └── main.tsx                        # Entry point
├── server/
│   ├── index.ts                        # Express server entry
│   ├── routes/ai.ts                    # Server-side /api/ai/classify endpoint
│   └── services/classifier.ts          # Gemini API integration service
├── .env.example                        # Environment variable template
├── index.html                          # HTML entry point with synchronized metadata
├── package.json
├── tsconfig.json
└── vite.config.ts                      # Vite configuration with API connect middleware
```

---

## 🔒 Privacy & Safety Philosophy

- **Public Anonymity:** When publishing anonymously, author profiles, avatars, and academic records are excluded from public JSON payloads.
- **AI Moderation:** Content containing personal telephone numbers or emails is held under "Needs Review" rather than published immediately.
- **Explainable Moderation:** Community moderators have a dedicated `/moderation` portal to inspect and act on user reports.

---

## 🛠️ Testing Core Logic

Run the automated unit tests using Node's test runner:
```bash
npx --yes tsx --test src/services/aiClassifier.test.ts
npx --yes tsx --test src/services/universityService.test.ts
```

---

## 📄 License
MIT License. Open-source educational platform for university students.
