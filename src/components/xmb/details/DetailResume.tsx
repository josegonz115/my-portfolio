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
        <h2 className="text-2xl font-bold text-xmb-accent xmb-glow">Resume</h2>
        <div className="rounded border border-xmb-border overflow-hidden" style={{ height: '70vh' }}>
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
      <div className="flex flex-col gap-6 items-center justify-center py-12">
        <h2 className="text-2xl font-bold text-xmb-accent xmb-glow">Download Resume</h2>
        <p className="text-sm text-xmb-text-dim">Save a copy to your device</p>
        <a
          href={url}
          download="Jose_Gonzalez_Resume.pdf"
          className="flex items-center gap-2 px-6 py-3 rounded border border-xmb-accent text-xmb-accent hover:bg-xmb-highlight transition-colors text-sm"
        >
          <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
        <h2 className="text-2xl font-bold text-xmb-accent xmb-glow">Skills</h2>
        <div className="flex flex-col gap-5">
          {categories.map((cat) => (
            <div key={cat.name}>
              <h3 className="text-sm font-semibold text-xmb-text mb-2">{cat.name}</h3>
              <div className="flex flex-wrap gap-2">
                {cat.items.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 text-xs rounded border border-xmb-border bg-xmb-highlight text-xmb-accent font-mono"
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
