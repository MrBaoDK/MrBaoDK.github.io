# Content Management

## External Data
- All content in separate files under `data/`
- Easy to update without touching components
- Type-safe with TypeScript interfaces

## Data Models
### Core Interfaces
```typescript
interface Skill {
  title: string;
  description: string;
  technologies: string[];
}

interface Project {
  title: string;
  description: string;
  technologies: string[];
  impact: string;
  category?: string;
  year?: string;
  company?: string;
  link?: string;
  linkLabel?: string;
  caseStudy?: {
    problem: string;
    solution: string;
    architecture?: string;
    results: string[];
  };
}

interface SocialItem {
  href: string;
  label: string;
  icon: string;
}

interface SocialData {
   [key: string]: SocialItem;
}
```

## Adding a New Project
When asked to add a new repository or project:
1. **Research**: Use tool `read_url_content` (or `browser_subagent`) to read the repository's `README.md`.
2. **Extract**:
   - **Technologies**: List main frameworks/libs.
   - **Impact**: Quantify results if possible (e.g., "30% faster").
   - **Case Study**: Identify the core problem, the technical solution, and the resulting architecture.
3. **Draft**: Create the data object matching the `Project` interface.
4. **Append**: Add to the `projects` array in `site/src/data/projects.ts`.

### Socials & Contact
- All social links, contact info (email, phone, address), and branding links should be maintained in `site/src/data/socials.ts`.
- Use the `SOCIALS` object to avoid hardcoding URLs in components.

### Implementation Pattern
- Define interfaces in `site/src/types/index.ts`.
- Export data from `site/src/data/*.ts`.
- Import within components (e.g., `import { SOCIALS } from '../data/socials'`).
