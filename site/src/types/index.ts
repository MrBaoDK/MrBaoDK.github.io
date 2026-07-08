export interface BaseIcon {
  icon: string | React.ComponentType<React.SVGProps<SVGSVGElement> & { size?: number | string }>;
}

export interface Technology extends BaseIcon {
  name: string;
}

export interface BaseContent {
  title: string;
  description: string;
}

export interface Capability extends BaseContent, BaseIcon {
  core: Technology[];
  utility: string[];
}

export interface CaseStudySection {
  heading: string;
  body: string;
}

export interface Project extends BaseContent {
  technologies: string[]; // Keeping as string[] for now per user feedback
  impact: string;
  category?: string | string[];
  /** Year range, e.g. "2024" or "2023 – 2024" */
  year?: string;
  /** Organisation / industry context shown on the card */
  company?: string;
  /** Optional live demo or GitHub link */
  link?: string;
  /** Label for external link button, e.g. "GitHub" | "Live Demo" */
  linkLabel?: string;
  /** Rich case-study content shown in the modal */
  caseStudy?: {
    problem: string;
    solution: string;
    architecture?: string;
    results: string[];
    sections?: CaseStudySection[];
  };
}

export interface Experience extends BaseContent {
  year: string;
  company: string;
}

export interface TimelineItem extends Experience {
  achievements: string[];
}

export interface Testimonial {
  name: string;
  role: string;
  location: string;
  content: string;
  logo: string;
}

export type NavLocation = 'header' | 'footer' | 'cta';

export interface NavItem {
  href: string;
  label: string;
  id: string;
  whereUsed?: NavLocation[];
  footerLabel?: string;
}

export interface SocialItem extends NavItem, BaseIcon {
  labels?: string[];
  order?: number;
}
