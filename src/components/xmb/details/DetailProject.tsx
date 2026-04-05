import { ACCENT, BG_DARK, CYBER_FLAGS, FONT_HEADER, FONT_MONO } from '../../../config/cyberFlags';
import type { Project } from '../../../types/types';
import type { XMBItem } from '../../../types/xmb';
import getImagePath from '../../../utils/iconSrcLoader';

interface Props {
  item: XMBItem;
}

export function DetailProject({ item }: Props) {
  const project = item.data as unknown as Project;
  const cyber = CYBER_FLAGS.cyberPalette;

  const dividerBg = cyber ? 'rgba(0,212,170,0.4)' : 'rgba(255,255,255,0.4)';
  const textMid = cyber ? 'rgba(0,212,170,0.7)' : 'rgba(255,255,255,0.7)';
  const textDim = cyber ? 'rgba(0,212,170,0.5)' : 'rgba(255,255,255,0.5)';
  const textFaint = cyber ? 'rgba(0,212,170,0.4)' : 'rgba(255,255,255,0.4)';
  const tagBorder = cyber ? 'rgba(0,212,170,0.5)' : 'rgba(255,255,255,0.5)';
  const gradientFrom = cyber ? 'rgba(0,212,170,0.3)' : 'rgba(255,255,255,0.3)';
  const gradientMid = cyber ? 'rgba(0,212,170,0.2)' : 'rgba(255,255,255,0.2)';
  const summary = cyber ? '#00d4aa' : '#ffffff';

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-3">
          <div className="w-6 h-[4px]" style={{ backgroundColor: dividerBg }} />
          <span className="text-[14px] tracking-[0.4em] uppercase" style={{ fontFamily: FONT_MONO, color: textDim }}>
            {project.category === 'research' ? 'Experience' : 'Project'}
          </span>
        </div>
        <h2
          className="text-5xl font-bold tracking-wide uppercase"
          style={{
            fontFamily: FONT_HEADER,
            letterSpacing: '0.1em',
            color: ACCENT,
          }}
        >
          {project.heading}
        </h2>
        {project.subheading && (
          <p className="text-[20px] mt-1.5" style={{ color: textDim }}>
            {project.subheading}
          </p>
        )}
        <p className="text-[14px] mt-2 tracking-widest uppercase" style={{ fontFamily: FONT_MONO, color: textFaint }}>
          {project.date}
        </p>
      </div>

      {/* Divider */}
      <div
        className="h-[2px]"
        style={{ background: `linear-gradient(to right, ${gradientFrom}, ${gradientMid}, transparent)` }}
      />

      {/* Tech stack tags */}
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
              className="flex items-center gap-1.5 px-2 py-0.5 text-[14px] tracking-wider uppercase"
              style={{
                fontFamily: FONT_MONO,
                border: `2px solid ${tagBorder}`,
                color: textMid,
              }}
            >
              {iconSrc && <img src={iconSrc} alt={tech} className="w-4 h-4" />}
              {tech}
            </span>
          );
        })}
      </div>

      {/* Images */}
      {project.images.length > 0 && (
        <div className="flex flex-col gap-3">
          {project.images.map((img, i) => (
            <div key={i} className="overflow-hidden w-full lg:w-3/5" style={{ border: `2px solid ${ACCENT}` }}>
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
      <div className="text-[20px] leading-relaxed whitespace-pre-line" style={{ color: summary }}>
        {project.summary}
      </div>

      {/* Links */}
      <div className="flex gap-3 pt-2">
        {project.links.github && (
          <a
            href={project.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 text-[13px] tracking-widest uppercase"
            // style={{
            //   border: `2px solid ${btnBorder}`,
            //   color: btnText,
            //   transition: 'all 0.3s ease',
            // }}
            style={{
              border: `2px solid ${ACCENT}`,
              color: ACCENT,
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget;
              el.style.backgroundColor = ACCENT;
              el.style.color = BG_DARK;
              el.style.borderColor = ACCENT;
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget;
              el.style.backgroundColor = 'transparent';
              el.style.color = ACCENT;
              el.style.borderColor = ACCENT;
            }}
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
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
            className="flex items-center gap-2 px-4 py-2 text-[13px] tracking-widest uppercase"
            style={{
              border: `2px solid ${ACCENT}`,
              color: ACCENT,
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget;
              el.style.backgroundColor = ACCENT;
              el.style.color = BG_DARK;
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget;
              el.style.backgroundColor = 'transparent';
              el.style.color = ACCENT;
            }}
          >
            <svg
              viewBox="0 0 24 24"
              className="w-4 h-4"
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
