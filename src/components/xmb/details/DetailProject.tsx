import type { Project } from '../../../types/types';
import type { XMBItem } from '../../../types/xmb';
import getImagePath from '../../../utils/iconSrcLoader';

interface Props {
  item: XMBItem;
}

export function DetailProject({ item }: Props) {
  const project = item.data as unknown as Project;

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-3">
          <div className="w-6 h-[2px] bg-white/40" />
          <span
            className="text-[9px] tracking-[0.4em] uppercase text-white/50"
            style={{ fontFamily: "'IBM Plex Mono', monospace" }}
          >
            {project.category === 'research' ? 'Research' : 'Project'}
          </span>
        </div>
        <h2
          className="text-2xl font-bold tracking-wide text-white uppercase"
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            letterSpacing: '0.1em',
          }}
        >
          {project.heading}
        </h2>
        {project.subheading && <p className="text-[12px] text-white/50 mt-1.5">{project.subheading}</p>}
        <p
          className="text-[10px] text-white/40 mt-2 tracking-widest uppercase"
          style={{ fontFamily: "'IBM Plex Mono', monospace" }}
        >
          {project.date}
        </p>
      </div>

      {/* Divider */}
      <div className="h-[2px] bg-gradient-to-r from-white/30 via-white/20 to-transparent" />

      {/* Tech stack — bold manga tags */}
      <div className="flex flex-wrap gap-1.5">
        {project.tech_stack.map((tech) => {
          let iconSrc: string | null = null;
          try {
            iconSrc = getImagePath(tech);
          } catch {
            // icon not found
          }
          return (
            <span
              key={tech}
              className="flex items-center gap-1.5 px-2 py-0.5 text-[10px] tracking-wider uppercase border-2 border-white/50 text-white/70"
              style={{ fontFamily: "'IBM Plex Mono', monospace" }}
            >
              {iconSrc && <img src={iconSrc} alt={tech} className="w-3 h-3" />}
              {tech}
            </span>
          );
        })}
      </div>

      {/* Images — manga panel frames, high contrast B&W */}
      {project.images.length > 0 && (
        <div className="flex flex-col gap-3">
          {project.images.map((img, i) => (
            <div key={i} className="overflow-hidden" style={{ border: '3px solid #fff' }}>
              <img
                src={img}
                alt={`${project.heading} ${i + 1}`}
                className="w-full h-auto object-cover"
                style={{
                  filter: 'contrast(1.05) brightness(1)',
                  transition: 'filter 0.4s ease',
                }}
                loading="lazy"
                onMouseEnter={(e) => {
                  (e.target as HTMLImageElement).style.filter = 'contrast(1.15) brightness(1.1) saturate(1.2)';
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLImageElement).style.filter = 'contrast(1.05) brightness(1)';
                }}
              />
            </div>
          ))}
        </div>
      )}

      {/* Summary */}
      <div className="text-[13px] text-white/70 leading-relaxed whitespace-pre-line">{project.summary}</div>

      {/* Links — dramatic inversion on hover */}
      <div className="flex gap-3 pt-2">
        {project.links.github && (
          <a
            href={project.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 text-[10px] tracking-widest uppercase border-2 border-white/40 text-white/60 hover:bg-white hover:text-black hover:border-white"
            style={{ transition: 'all 0.3s ease' }}
          >
            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12Z" />
            </svg>
            Source
          </a>
        )}
        {project.links.live && (
          <a
            href={project.links.live}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 text-[10px] tracking-widest uppercase border-2 border-white text-white hover:bg-white hover:text-black"
            style={{ transition: 'all 0.3s ease' }}
          >
            <svg
              viewBox="0 0 24 24"
              className="w-3.5 h-3.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
            Deploy
          </a>
        )}
      </div>
    </div>
  );
}
