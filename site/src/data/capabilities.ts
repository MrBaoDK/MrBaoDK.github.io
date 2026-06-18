import { FaAws, FaMicrosoft } from 'react-icons/fa';
import {
  SiApacheairflow,
  SiApachekafka,
  SiApachespark,
  SiDocker,
  SiFastapi,
  SiGrafana,
  SiKubernetes,
  SiMysql,
  SiNodedotjs,
  SiOpenai,
  SiPostgresql,
  SiPytest,
  SiPython,
  SiPytorch,
  SiReact,
  SiSap,
  SiSnowflake,
  SiTensorflow,
  SiTerraform,
  SiTypescript,
} from 'react-icons/si';
import { VscAzure } from 'react-icons/vsc';

import { Capability } from '@baodk-site/types';
// Custom/Internal Modular SVGs
import {
  PlaywrightIcon as Playwright,
  PowerAppsIcon as PowerApps,
  PowerAutomateIcon as PowerAutomate,
  PowerBIIcon as PowerBI,
} from '@mrbaodk/ui';

export const capabilities: Capability[] = [
  {
    title: 'Data Engineering',
    description:
      'Designing scalable data pipelines, ETL/ELT workflows, and data warehouse architectures',
    core: [
      { name: 'Python', icon: SiPython },
      { name: 'PostgreSQL', icon: SiPostgresql },
      { name: 'Apache Airflow', icon: SiApacheairflow },
      { name: 'Apache Spark', icon: SiApachespark },
      { name: 'Apache Kafka', icon: SiApachekafka },
      { name: 'Snowflake', icon: SiSnowflake },
      { name: 'MySQL', icon: SiMysql },
    ],
    utility: ['SQL', 'ETL/ELT', 'Data Modeling', 'Azure Data Factory', 'dbt'],
    icon: 'database',
  },
  {
    title: 'AI & Machine Learning',
    description: 'Developing AI-driven applications and integrating LLM-based systems',
    core: [
      { name: 'PyTorch', icon: SiPytorch },
      { name: 'TensorFlow', icon: SiTensorflow },
      { name: 'OpenAI', icon: SiOpenai },
    ],
    utility: ['LlamaIndex', 'RAG', 'DataOps', 'LangChain'],
    icon: 'smart_toy',
  },
  {
    title: 'Full Stack & Backend',
    description: 'Building end-to-end applications and robust backend services',
    core: [
      { name: 'React', icon: SiReact },
      { name: 'FastAPI', icon: SiFastapi },
      { name: 'TypeScript', icon: SiTypescript },
      { name: 'Node.js', icon: SiNodedotjs },
    ],
    utility: ['PostgreSQL', 'Python', 'REST APIs'],
    icon: 'developer_board',
  },
  {
    title: 'Cloud & DevOps',
    description: 'Managing cloud infrastructure, orchestration, and deployment automation',
    core: [
      { name: 'AWS', icon: FaAws },
      { name: 'Azure', icon: VscAzure },
      { name: 'Docker', icon: SiDocker },
      { name: 'Kubernetes', icon: SiKubernetes },
      { name: 'Terraform', icon: SiTerraform },
    ],
    utility: ['Podman', 'Jenkins', 'Azure DevOps', 'CI/CD'],
    icon: 'cloud',
  },
  {
    title: 'Quality Engineering',
    description:
      'Ensuring reliability through testing, automation, and quality assurance practices',
    core: [
      { name: 'PyTest', icon: SiPytest },
      { name: 'Playwright', icon: Playwright },
    ],
    utility: ['Test Automation', 'CI/CD', 'Quality Gates', 'Selenium'],
    icon: 'verified_user',
  },
  {
    title: 'BI & Analytics',
    description: 'Creating advanced BI solutions with data modeling and KPI insights',
    core: [
      { name: 'Power BI', icon: PowerBI },
      { name: 'Grafana', icon: SiGrafana },
    ],
    utility: ['DAX', 'Power Query', 'Data Analysis', 'Tableau'],
    icon: 'leaderboard',
  },
  {
    title: 'Enterprise & Automation',
    description: 'Managing enterprise-scale platforms and automated business workflows',
    core: [
      { name: 'Microsoft', icon: FaMicrosoft },
      { name: 'SAP', icon: SiSap },
      { name: 'Power Automate', icon: PowerAutomate },
      { name: 'Power Apps', icon: PowerApps },
    ],
    utility: ['SQL Server', 'Logic Apps', 'Six Sigma', 'VBA', 'Quality Reporting'],
    icon: 'factory',
  },
];
