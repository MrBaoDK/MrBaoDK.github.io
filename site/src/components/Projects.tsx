import React, { useState } from 'react';

import GenericIcon from '@baodk-site/components/GenericIcon';
import ProjectCaseStudyModal from '@baodk-site/components/ProjectCaseStudyModal';
import { projects } from '@baodk-site/data/projects';
import type { Project } from '@baodk-site/types';
import { handleNavClick } from '@baodk-site/utils/navigation';

const Projects: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  const categories = [
    'All',
    'Software Engineering',
    'Data Engineering',
    'Analytics',
    'AI/Automation',
    'Full-Stack SaaS'
  ];

  const filteredProjects =
    selectedCategory === 'All'
      ? projects
      : projects.filter((project) => {
          if (!project.category) return false;
          const categories = Array.isArray(project.category)
            ? project.category
            : [project.category];
          return categories.includes(selectedCategory);
        });

  const onNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    handleNavClick(e, id);
  };

  return (
    <section className='section relative'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8 relative z-10'>
        {/* Section Header */}
        <div className='section-header max-w-3xl mx-auto mb-16'>
          <h2 className='text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tight'>
            Featured <span className='text-[var(--color-primary)]'>Projects</span>
          </h2>
          <p className='text-lg text-white/50 font-medium'>
            AI-assisted automation and analytics solutions built for industrial-scale operations —
            each backed by measurable business outcomes.
          </p>
        </div>

        {/* Category Filter */}
        <div className='flex flex-wrap justify-center gap-3 mb-16'>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full font-bold text-sm tracking-widest uppercase transition-all duration-300 border ${
                selectedCategory === category
                  ? 'bg-[var(--color-primary)] text-white border-[var(--color-primary)] shadow-[0_0_20px_rgba(233,30,96,0.3)] scale-105'
                  : 'bg-white/5 text-white/40 border-white/10 hover:border-white/30 hover:text-white'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className='grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3'>
          {filteredProjects.map((project, index) => {
            const visibleTechs = project.technologies.slice(0, 4);
            const extraCount = project.technologies.length - visibleTechs.length;

            return (
              <button
                key={index}
                onClick={() => setActiveProject(project)}
                className='card group flex flex-col text-left w-full cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] rounded-3xl'
                aria-label={`Open case study: ${project.title}`}
              >
                {/* Category + Year */}
                <div className='flex items-start justify-between gap-2 mb-4'>
                  <div className='flex flex-wrap gap-1.5'>
                    {Array.isArray(project.category)
                      ? project.category.map((cat, i) => (
                          <span
                            key={i}
                            className='text-[10px] font-black uppercase tracking-[0.2em] text-[var(--color-primary)] bg-[var(--color-primary)]/10 px-2.5 py-1.5 rounded-full border border-[var(--color-primary)]/20'
                          >
                            {cat}
                          </span>
                        ))
                      : project.category && (
                          <span className='text-[10px] font-black uppercase tracking-[0.2em] text-[var(--color-primary)] bg-[var(--color-primary)]/10 px-3 py-1.5 rounded-full border border-[var(--color-primary)]/20'>
                            {project.category}
                          </span>
                        )}
                  </div>
                  {project.year && (
                    <span className='flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-white/25 shrink-0 mt-1'>
                      <GenericIcon icon='calendar_today' size='sm' />
                      {project.year}
                    </span>
                  )}
                </div>

                {/* Title + Company */}
                <h3 className='card-title group-hover:text-[var(--color-primary)] transition-colors mb-1'>
                  {project.title}
                </h3>
                {project.company && (
                  <p className='flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-white/25 mb-5'>
                    <GenericIcon icon='corporate_fare' size='sm' />
                    {project.company}
                  </p>
                )}

                {/* One-line impact stat */}
                <p className='text-white/60 text-sm font-medium leading-snug line-clamp-2 mb-5'>
                  {project.impact}
                </p>

                {/* Tech pills — top 4 + overflow */}
                <div className='flex flex-wrap gap-2 mt-auto mb-5'>
                  {visibleTechs.map((tech, i) => (
                    <span
                      key={i}
                      className='px-3 py-1 rounded-md bg-white/5 text-white/40 text-[10px] font-bold border border-white/5 uppercase tracking-tighter'
                    >
                      {tech}
                    </span>
                  ))}
                  {extraCount > 0 && (
                    <span className='px-3 py-1 rounded-md bg-white/5 text-white/25 text-[10px] font-bold border border-white/5 uppercase tracking-tighter'>
                      +{extraCount} more
                    </span>
                  )}
                </div>

                {/* Footer row */}
                <div className='flex items-center justify-between pt-4 border-t border-white/5'>
                  <span className='flex items-center gap-2 text-white/40 font-bold text-xs uppercase tracking-widest group-hover:text-[var(--color-primary)] transition-colors'>
                    <span>Case Study</span>
                    <GenericIcon
                      icon='arrow_forward'
                      className='transition-transform group-hover:translate-x-1'
                      size='sm'
                    />
                  </span>

                  {project.link && (
                    <a
                      href={project.link}
                      target='_blank'
                      rel='noopener noreferrer'
                      onClick={(e) => e.stopPropagation()}
                      className='flex items-center gap-1 text-white/25 font-bold text-xs uppercase tracking-widest hover:text-[var(--color-primary)] transition-colors no-underline'
                      aria-label={`${project.linkLabel ?? 'View project'}: ${project.title}`}
                    >
                      <GenericIcon icon='open_in_new' size='sm' />
                      <span>{project.linkLabel ?? 'Link'}</span>
                    </a>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className='text-center mt-24'>
          <p className='text-xl text-white/40 mb-8 font-medium'>
            Interested in similar results for your organization?
          </p>
          <a
            href='#contact'
            onClick={(e) => onNavClick(e, 'contact')}
            className='px-10 py-5 rounded-full bg-white text-black font-black text-sm uppercase tracking-widest hover:bg-[var(--color-primary)] hover:text-white transition-all hover:scale-105 shadow-xl inline-block no-underline'
          >
            Book a Collaboration
          </a>
        </div>
      </div>

      {/* Case Study Modal */}
      <ProjectCaseStudyModal project={activeProject} onClose={() => setActiveProject(null)} />
    </section>
  );
};

export default Projects;
