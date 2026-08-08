# AI Usage Log

- **Architecture Decisions**: AI suggested using Next.js App Router for simple file-based routing (`/`, `/dashboard`, `/day/12`) and Vanilla CSS with CSS Modules to strictly follow the guidelines while remaining modular.
- **Component Generation**: AI generated the lightweight, reusable UI components (`Button`, `Card`, `Badge`, `Checkbox`, `Input`, `ProgressBar`) tailored to the specific design system.
- **UX Reasoning**: AI implemented the "Momentum Recovery" state on the dashboard by differentiating the "Current Streak" from "Challenge Progress", and providing clear, encouraging messaging when a day is missed.
- **Mock Data**: AI generated the structured mock JSON data for the student profile, challenge state, and day 12 task to avoid hardcoding data directly into components.
- **Responsive Improvements**: AI utilized CSS Flexbox and Grid layouts to ensure the design targets exactly 390px (mobile-first) while remaining adaptable on larger screens via max-width containers.
- **Accessibility Improvements**: AI used standard HTML elements (buttons, inputs), proper semantic structure (header, main, sections, h1/h2), visually hidden (`sr-only`) checkboxes behind custom visuals, and high-contrast color variables.
- **Debugging**: AI fixed a few ESLint rules relating to unescaped entities and empty interface declarations in TypeScript.
