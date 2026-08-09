# AI Prompt Log

## Initial Prototype

Instructed the AI to create the ABTalks frontend redesign as a mobile-first Next.js application, targeting a 390px viewport and implementing the required routes:

* `/`
* `/dashboard`
* `/day/12`

The prompt specified the product flow, visual direction, reusable frontend architecture, mocked data, student dashboard, challenge-day experience, proof-of-work flow, edge cases, and responsive requirements.

## Subsequent Development

The initial prototype was reviewed and will be refined incrementally through focused AI-assisted tasks covering:

1. Landing page refinement
2. Dashboard refinement
3. Challenge Day refinement
4. Interaction and edge-case improvements
5. 390px responsive polish
6. Final accessibility and UI QA




## AI-Assisted Development Tasks

8. Redesigned the landing page at `/` as a premium mobile-first product experience with a stronger visual story, Build → Prove → Share journey, 60-day visualization, Day 12 preview, benefits, streak/progress philosophy, improved navigation, and subtle scroll animations while maintaining the 390px target.



9. Refined the landing page typography using Syne for hero headings, major section headings, milestones, and ABTalks brand elements, while keeping Manrope for body text, navigation, descriptions, buttons, and UI content. Improved typography hierarchy and visual consistency without changing the existing landing-page structure or functionality.


9. Fixed landing-page navbar navigation and routing for Home, How It Works, Challenge, and Start.


10. Added a site-wide dark/light theme toggle with the existing dark theme preserved, a new light theme, persistent theme preference, and responsive sun/moon controls across all required routes.



9. Redesigned the `/dashboard` as a premium Builder Command Center with improved visual hierarchy, refined streak/progress presentation, polished task and achievement cards, Syne/Manrope typography, subtle animations, responsive 390px-first layout, and consistent dark/light theme support while preserving existing functionality.




## 9. Dashboard Redesign

Redesigned `/dashboard` into a premium builder workspace with a 60-day activity grid, clickable day journals, today’s build focus, streak/progress tracking, meaningful milestone badges, quick search, completed/upcoming/missed states, subtle animations, and strong ABTalks typography/theme consistency. Kept gamification purposeful and focused on real building progress.



## Dashboard Activity Journey & Day Flow

Refined the `/dashboard` experience with an interactive 60-day activity system using completed, current, upcoming, missed, and catch-up states. Added state-aware day details, View Task flow, proof/status handling, and responsive interactions while preserving the existing ABTalks visual identity and `/` and `/day/12` experiences.


## Dashboard Activity Interaction

Enhanced the 60-Day Activity grid with clear status states, a visual legend, clickable day interactions, and contextual day-detail/view-task flow while keeping the ABTalks visual system and responsive behavior consistent.


## Dashboard Theme & Typography

Unified `/dashboard` with the landing page's Syne + Manrope typography system and shared dark/light theme toggle while preserving existing dashboard functionality and layout.

## Completed Day Routing & Data

Fixed dynamic completed-day routing so Days 1–11 load their own day-specific content instead of incorrectly rendering the Day 12 challenge. Added proper completed/read-only states while preserving the existing Day 12 experience and shared day-page architecture.



## Missed & Catch-Up Day Flow

Added state-aware completed, missed, and catch-up day experiences with correct proof handling, actionable catch-up flow, and synchronized dashboard day statuses.





### `prompt.md`

Don't record the AI's claim that it worked if it **didn't actually work**. Since you're maintaining an honest AI usage log, add the task only as a development attempt/fix:

```md
## Missed & Catch-Up State

Implemented explicit missed and catch-up day states with separate proof/submission behavior, then debugged the day-status data flow to ensure the correct UI renders for each state.


## Missed Day UX

Refined the missed-day experience with a red missed status, empty proof state, and disabled recovery action while keeping completed, catch-up, today, and upcoming states distinct.


Update all `/day/[id]` pages.

- Add the existing Home-page Day/Night theme toggle to every day page.
- Make light/dark mode work consistently for Completed, Missed, Catch-Up, Current, and Upcoming states.
- Use the exact same Home-page typography: Syne for headings and Manrope for body/UI.
- Do not create a new theme or font system.
- Preserve all existing day-status logic and functionality.
- Ensure the design remains responsive at 390px.
- Verify `/day/1`, `/day/10`, `/day/11`, `/day/12`, and an upcoming day.



Improve Dashboard Milestones.

- Add meaningful milestones: First Week, 10 Builds Shipped, 14 Day Streak, 25 Builds Shipped, 30 Day Builder, 60 Day Builder.
- Dynamically show Earned, In Progress, and Locked states from real user progress.
- Add icons, short descriptions, checks, and subtle progress bars.
- Keep ABTalks professional and portfolio-focused, not childish gamification.
- Use existing theme, Syne + Manrope typography, and dashboard design.
- Keep responsive and don't modify unrelated functionality.


## Home — 60-Day Journey

Enhanced the 60-Day Journey with concise chapter/topic previews under each milestone (Day 01, 15, 30, 45, 60), using challenge data and clickable day navigation while preserving the existing timeline, theme, typography, and 390px mobile-first design.


## Day 12 — Today’s Build

Redesigned the current-day task page into a complete learning-to-submission workflow: learning resources, tutorial/tool/task sections, interactive Definition of Done, optional learning reflection, unified GitHub + LinkedIn proof card, required confirmation checkbox, and functional Day 12 submission flow while preserving ABTalks typography, theme, responsiveness, and existing day-status architecture.




## Day 12 — Submission Flow Fix

Fixed Day 12 interactions: functional accordions, Definition of Done checkboxes, optional learning reflection, dynamic GitHub/LinkedIn proof states, confirmation checkbox, and validation-controlled submission button.


## Day 12 — Tutorial Video

Added a functional YouTube tutorial section for the Day 12 portfolio task with embedded playback, video metadata, and a direct "Watch on YouTube" link while keeping the existing ABTalks theme and responsive design.


## Day 12 — Responsive Developer Portfolio

Improved the Day 12 challenge flow with an interactive Definition of Done checklist, optional learning reflection, and unified GitHub + LinkedIn proof submission.

### What I Built
- Responsive developer portfolio layout
- Hero, About, Skills, and Projects sections
- Mobile-responsive design
- Interactive Definition of Done checklist
- Optional learning summary
- GitHub repository and commit proof
- LinkedIn post proof
- Final completion confirmation and submission flow

### Key Learning
Practiced responsive design, semantic HTML, component structure, and presenting development work as public proof of progress.

Improve the completed-day journal pages to feel more professional and portfolio-focused. Add a “What I Built” section, rename “Your Proof” to “Proof of Work”, use clean GitHub/LinkedIn proof cards, add a Build Record with completion date and duration, and add Previous Day / Next Day navigation. Keep completed days read-only with no checkboxes, editable fields, or submit button. Preserve the existing ABTalks font, dark/light theme, responsive design, and use dynamic data for every day without hardcoding Day 7.