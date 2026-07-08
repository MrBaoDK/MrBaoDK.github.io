# Component Rules

## TypeScript Only
- All components must be `.tsx` files
- Define interfaces for props and data
- No `any` types allowed

## Core Components (Reuse Required)
- **GenericIcon**: Standard component for all icons. Supports `react-icons` and `material-symbols-outlined`.
- **GenericModal**: Standard modal wrapper using `createPortal`. Use for all overlays.
- **ProjectCaseStudyModal**: Specific component for rich project deep-dives.

## Icons & Assets
- Use `GenericIcon` for consistent sizing and styling.
- Prefer **React Icons** (Lucide, Si, etc.) or **Material Symbols Outlined**.
- Image assets should be optimized (WebP preferred).

## Theme Consistency
- **NO hardcoded light backgrounds** (e.g., `bg-white`).
- Use CSS variables (`--color-primary`, etc.) for all colors.
- Maintain consistent spacing using Tailwind's standard scales.
