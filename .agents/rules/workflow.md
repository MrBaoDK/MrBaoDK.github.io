---
trigger: always_on
---

# Development Workflow

## Package Manager
- **Use `pnpm` exclusively.** Do not use `npm` or `yarn`.

## Commands
- **Install**: `pnpm install` (always from root)
- **Start**: `pnpm dev` (from root) or `pnpm start` (from `site/`)
- **Build**: `pnpm build` (from root)
- **Deploy**: `pnpm gh-deploy` (from root, deploys to `gh-pages` with `baodk.tech` CNAME)
- **Format**: `pnpm format` (from root)

## Simple Testing
- Test components manually in the browser.
- Check mobile responsiveness (responsive views).
- Verify all links and anchor tags work.
