import type { XMBItem } from '../../../types/xmb';

interface Props {
  item: XMBItem;
}

export function DetailResume({ item }: Props) {
  const { data } = item;
  const type = data.type as string;

  if (type === 'view') {
    const url = data.url as string;
    return (
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <div className="w-6 h-px bg-xmb-accent/30" />
          <h2 className="text-lg font-light tracking-[0.2em] uppercase text-xmb-text-bright">Intel Document</h2>
        </div>
        <div className="overflow-hidden" style={{ height: '70vh', border: '1px solid rgba(200, 164, 78, 0.06)' }}>
          <iframe
            src={url}
            className="w-full h-full"
            title="Resume"
          />
        </div>
      </div>
    );
  }

  if (type === 'download') {
    const url = data.url as string;
    return (
      <div className="flex flex-col gap-8 items-center justify-center py-16">
        <div className="flex items-center gap-3">
          <div className="w-6 h-px bg-xmb-accent/30" />
          <h2 className="text-lg font-light tracking-[0.2em] uppercase text-xmb-text-bright">Extract Document</h2>
          <div className="w-6 h-px bg-xmb-accent/30" />
        </div>
        <p className="text-[11px] text-xmb-text-dim font-light tracking-wider">Save a copy to your device</p>
        <a
          href={url}
          download="Jose_Gonzalez_Resume.pdf"
          className="flex items-center gap-2 px-6 py-3 text-[10px] tracking-widest uppercase border border-xmb-accent/30 text-xmb-accent hover:bg-xmb-accent/10"
          style={{ transition: 'all 0.5s ease' }}
        >
          <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          Download PDF
        </a>
      </div>
    );
  }

  if (type === 'skills') {
    const categories = data.categories as Array<{ name: string; items: string[] }>;
    return (
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-3">
          <div className="w-6 h-px bg-xmb-accent/30" />
          <h2 className="text-lg font-light tracking-[0.2em] uppercase text-xmb-text-bright">Capabilities</h2>
        </div>
        <div className="flex flex-col gap-5">
          {categories.map((cat) => (
            <div key={cat.name}>
              <h3
                className="text-[10px] font-normal text-xmb-accent-dim/60 mb-2 tracking-[0.3em] uppercase"
                style={{ fontFamily: "'IBM Plex Mono', monospace" }}
              >
                {cat.name}
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {cat.items.map((skill) => (
                  <span
                    key={skill}
                    className="px-2.5 py-1 text-[10px] tracking-wider border border-xmb-border/40 text-xmb-text-dim"
                    style={{ fontFamily: "'IBM Plex Mono', monospace" }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return null;
}
