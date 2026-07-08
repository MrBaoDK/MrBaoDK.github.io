# Styling & Design System (Cyber Obsidian)

## Theme: Cyber Obsidian
- **Primary/Accent**: `#E94560` (Accent Crimson)
- **Background**: `#1A1A2E` (Deep Space Blue)
- **Navy/Card**: `#0F3460` (Midnight Navy)
- **White**: `#EEEEEE` (Text)
- **Silver**: `#C0C0C0` (Muted Text)

## Typography
- **Headings**: `Space Grotesk` (600, 700)
- **Body**: `Manrope` (400, 500)

## Icons
- Use the **GenericIcon** component for all iconography.
- Supports **React Icons** (Lucide, SimpleIcons, etc.) and **Material Symbols Outlined**.
- Icons should use CSS variables for colors (e.g. `var(--color-primary)`).

## Aesthetics (Cyber Obsidian)
- **Glassmorphism**: Use `bg-glass` utility or `backdrop-filter: blur(10px)` with semi-transparent backgrounds for cards and overlays.
- **Gradients**: Use linear gradients from `--color-dark` to `--color-primary` for visual depth.
- **Hover States**: Apply subtle transitions and transforms (e.g., `hover:translate-y-[-1px]`, `hover:shadow-lg`).
- **Borders**: Use subtle borders (`rgba(192, 192, 192, 0.2)`) to define sections in the dark theme.

## Tailwind CSS 4.0
- Use CSS variables for all design tokens.
- **NO hardcoded light backgrounds** (e.g., `bg-white`).
- Prefer Tailwind's standard spacing and sizing scales.
