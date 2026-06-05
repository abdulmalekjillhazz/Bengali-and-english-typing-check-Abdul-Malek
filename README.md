# ⌨️ Typing Speed Tracker Pro

A professional typing speed tracking app built with **Next.js 14**, **React**, and **Tailwind CSS**.

Supports **English** and **Bengali** typing, tracks your progress over time, and stores everything locally in your browser.

---

## Features

- ✅ English & Bengali typing support
- ✅ Live WPM, CPM, Word Count, Character Count
- ✅ 1 / 3 / 5 / 15 minute durations + custom
- ✅ Target WPM system (20–60 + custom)
- ✅ Personal Best tracking
- ✅ Statistics dashboard (avg WPM, streaks, success rate, etc.)
- ✅ Full test history (search, sort, delete, clear)
- ✅ CSV export
- ✅ Dark mode (saved to localStorage)
- ✅ Keyboard shortcuts: `Ctrl+Enter` to start, `Esc` to stop
- ✅ Fullscreen mode
- ✅ Toast notifications
- ✅ Completion sound (Web Audio API — no file needed)
- ✅ Fully responsive (mobile → desktop)

---

## Getting Started

### Requirements

- [Node.js](https://nodejs.org/) **18 or higher**
- npm (comes with Node.js)

### Steps

```bash
# 1. Enter the project folder
cd typing-speed-tracker

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

Then open **http://localhost:3000** in your browser.

---

## Project Structure

```
typing-speed-tracker/
├── app/
│   ├── globals.css       ← Global styles + CSS variables
│   ├── layout.js         ← Root HTML layout
│   └── page.js           ← Entry page (loads TypingApp dynamically)
│
├── components/
│   ├── TypingApp.js      ← Main orchestrator — all state lives here
│   ├── Navbar.js         ← Top bar: logo, dark mode, fullscreen
│   ├── SettingsPanel.js  ← Language / Duration / Target selectors
│   ├── CountdownTimer.js ← Circular ring + linear progress bar
│   ├── TypingArea.js     ← Live stats bar + textarea
│   ├── ResultCard.js     ← Post-test result display
│   ├── StatsDashboard.js ← Aggregated statistics grid
│   ├── StatisticsCard.js ← Single reusable metric card
│   ├── HistoryTable.js   ← Searchable / sortable history table
│   ├── Toast.js          ← Notification toast stack
│   └── Pill.js           ← Reusable toggle pill button
│
├── hooks/
│   ├── useLocalStorage.js  ← Read/write localStorage safely
│   ├── useDarkMode.js      ← Dark mode toggle + persistence
│   ├── useTimer.js         ← Countdown logic
│   ├── useTypingStats.js   ← Live WPM/CPM calculation
│   └── useToast.js         ← Toast notification state
│
├── utils/
│   ├── textUtils.js    ← countWords, countChars
│   ├── calcUtils.js    ← calculateWPM, calculateCPM
│   ├── dateUtils.js    ← formatDate, formatTime
│   ├── exportUtils.js  ← exportToCSV
│   └── soundUtils.js   ← playCompletionSound (Web Audio API)
│
└── public/             ← Static assets (empty by default)
```

---

## LocalStorage Keys

| Key | Stores |
|-----|--------|
| `tst_history` | Array of all test result objects |
| `tst_personal_best` | Single number — highest WPM ever |
| `tst_dark_mode` | Boolean — dark mode preference |

---

## Build for Production

```bash
npm run build
npm start
```
# Bengali-and-english-typing-check
# Bengali-and-english-typing-check-Abdul-Malek
