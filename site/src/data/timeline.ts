import { TimelineItem } from '@baodk-site/types';

export const careerTimeline: TimelineItem[] = [
  {
    year: '2025 - Present',
    title: 'Tech Lead',
    company: 'VN Vortex Data',
    description:
      'Leading full-stack architecture and development for a GA4-to-BigQuery analytics SaaS platform — from system design to production deployment.',
    achievements: [
      'Architected monorepo with React + FastAPI serving 3 frontends and 15+ API endpoints',
      'Designed subscription billing with PayOS integration (VND/USD multi-currency)',
      'Built Storage Engine, Tracking Engine, and Integrations Dashboard modules',
      'Implemented JWT auth flow with Supabase, RBAC, and i18n localization',
    ],
  },
  {
    year: '2015 - Present',
    title: 'Quality System & Data Engineer',
    company: 'Jabil',
    description:
      'Architecting data solutions and automating quality reporting in a high-volume electronics manufacturing environment.',
    achievements: [
      'Built 20+ Power BI dashboards cutting manual effort by 60%',
      'Designed end-to-end ETL/ELT pipelines for MES and SAP data integration',
      'Automated labor performance tracking reducing review time by 90%',
      'Maintained 95%+ uptime for mission-critical production dashboards',
    ],
  },
  {
    year: '2027 (Expected)',
    title: 'Bachelor of Business Administration',
    company: 'Hanoi Open University',
    description:
      'Focusing on the intersection of business strategy and data-driven decision making.',
    achievements: [
      'Applying analytical frameworks to business operations',
      'Bridging the gap between technical data and business value',
      'Focusing on organizational efficiency and scalability',
    ],
  },
  {
    year: '2024',
    title: 'Specialization in Data Engineering',
    company: 'FUNiX (FPT)',
    description:
      'Advanced certification focusing on modern data engineering stacks and high-scale data processing.',
    achievements: [
      'Mastered E2E data pipeline construction and management',
      'Applied modern ETL/ELT patterns for complex datasets',
      'Developed expertise in scalable database design and optimization',
    ],
  },
];
