# ABTalks Frontend Prototype

A polished, mobile-first frontend prototype for the ABTalks 60-day coding challenge platform.

## Problem
Indian college students need a structured way to build consistently, maintain a public track record of their work, and improve visibility for recruiters. Learning in private often leads to endless tutorials with no finished projects.

## Solution
A 60-day coding challenge platform where students receive a daily task, build it, and provide proof of work via GitHub commits and LinkedIn posts.

## Core UX Idea: Momentum Recovery
If a student misses a day, they are not shamed and their progress is not erased. The product separates "Current Streak" from "Challenge Progress", showing a "Your streak paused. Your progress didn't." state that encourages recovery rather than abandonment.

## Tech Stack
- **Framework**: Next.js (App Router)
- **Styling**: Vanilla CSS (CSS Modules & Global variables)
- **Icons**: Lucide React
- **Data**: Mocked JSON

## Architecture
- `src/app`: Next.js pages for routing.
- `src/components/ui`: Reusable primitive components (Button, Card, Badge, etc.)
- `src/data`: Mock JSON data driving the UI state.
- `src/lib`: Utilities (clsx).

## Routes
- `/` - Landing Page
- `/dashboard` - Student Dashboard
- `/day/[id]` (e.g. `/day/12`) - Challenge Day View

## Route Map
- `/`
- `/dashboard`
- `/day/12`

## How to run locally
1. `npm install`
2. `npm run dev`
3. Open `http://localhost:3000`

*Test using mobile browser emulation at 390px width for the intended experience.*

## Deployment URL
[Placeholder for Deployment URL]

## AI Usage Log
Please refer to `AI_USAGE_LOG.md` for details on how AI was used during development.

## Design Decisions
- **Mobile First**: Target viewport of 390px ensuring typography, spacing, and interaction design feel premium on phones.
- **Natural Palette**: Deep forest green, sage, and warm cream for a calm environment that suits late-night building sessions.
- **Vanilla CSS**: Kept dependencies low by strictly using Vanilla CSS with CSS modules and a global CSS variable system.
- **Component Reusability**: Built a custom lightweight design system (Button, Card, Badge, ProgressBar) instead of relying on heavy component libraries.

## Edge Cases Handled
- **Missed Day**: Handled via "Momentum Recovery" banner on the dashboard (set `currentStreak: 0` in `src/data/student.json` to view).
- **First Day**: Progress calculation naturally supports starting states. Empty profiles show an inviting first-milestone message.
