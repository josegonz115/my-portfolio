import type { XMBItem } from '../../../types/xmb';

interface Props {
  item: XMBItem;
}

export function DetailContact({ item }: Props) {
  const { data } = item;
  const href = data.href as string;
  const display = data.display as string;
  const type = data.type as string;

  const icon = type === 'email' ? (
    <svg viewBox="0 0 24 24" className="w-6 h-6 text-xmb-accent/60" fill="none" stroke="currentColor" strokeWidth="1">
      <rect x="2" y="5" width="20" height="14" rx="1.5" />
      <polyline points="2,5 12,13 22,5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ) : item.id === 'github' ? (
    <svg viewBox="0 0 24 24" className="w-6 h-6 text-xmb-accent/60" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12Z" />
    </svg>
  ) : (
    <svg viewBox="0 0 24 24" className="w-6 h-6 text-xmb-accent/60" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );

  return (
    <div className="flex flex-col items-center justify-center gap-8 py-16">
      <div className="p-4 rounded-full border border-xmb-accent/10">
        {icon}
      </div>

      <div className="flex flex-col items-center gap-2">
        <h2 className="text-base font-light tracking-[0.2em] uppercase text-xmb-text-bright">{item.label}</h2>
        <span
          className="text-[10px] tracking-[0.3em] uppercase text-xmb-accent-dim/50"
          style={{ fontFamily: "'IBM Plex Mono', monospace" }}
        >
          {type === 'email' ? 'Codec Channel' : 'External Link'}
        </span>
      </div>

      <a
        href={href}
        target={type === 'email' ? undefined : '_blank'}
        rel={type === 'email' ? undefined : 'noopener noreferrer'}
        className="text-[12px] text-xmb-text/60 hover:text-xmb-accent/80 underline underline-offset-4 decoration-xmb-accent/20"
        style={{ fontFamily: "'IBM Plex Mono', monospace", transition: 'color 0.5s ease' }}
      >
        {display}
      </a>

      <a
        href={href}
        target={type === 'email' ? undefined : '_blank'}
        rel={type === 'email' ? undefined : 'noopener noreferrer'}
        className="mt-2 flex items-center gap-2 px-6 py-3 text-[10px] tracking-widest uppercase border border-xmb-accent/20 text-xmb-accent/70 hover:border-xmb-accent/40 hover:text-xmb-accent"
        style={{ transition: 'all 0.5s ease' }}
      >
        {type === 'email' ? 'Open Channel' : `Connect`}
        <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
          <polyline points="15 3 21 3 21 9" />
          <line x1="10" y1="14" x2="21" y2="3" />
        </svg>
      </a>
    </div>
  );
}
