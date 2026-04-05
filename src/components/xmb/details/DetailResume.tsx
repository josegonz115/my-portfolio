import { ACCENT, BG_DARK, CYBER_FLAGS, FONT_HEADER, FONT_MONO } from '../../../config/cyberFlags';
import type { XMBItem } from '../../../types/xmb';

interface Props {
  item: XMBItem;
}

export function DetailResume({ item }: Props) {
  const { data } = item;
  const type = data.type as string;
  const cyber = CYBER_FLAGS.cyberPalette;

  const dividerBg = cyber ? 'rgba(0,212,170,0.4)' : 'rgba(255,255,255,0.4)';
  const textDim = cyber ? 'rgba(0,212,170,0.5)' : 'rgba(255,255,255,0.5)';
  const textMid = cyber ? 'rgba(0,212,170,0.7)' : 'rgba(255,255,255,0.7)';
  const tagBorder = cyber ? 'rgba(0,212,170,0.4)' : 'rgba(255,255,255,0.4)';

  if (type === 'view') {
    const url = data.url as string;
    const previewUrl = `${url}#zoom=90`;
    return (
      <div className="flex flex-col gap-5">
        <div className="flex items-center gap-3">
          <div className="w-6 h-[2px]" style={{ backgroundColor: dividerBg }} />
          <h2
            className="text-4xl tracking-[0.2em] uppercase font-bold"
            style={{ fontFamily: FONT_HEADER, color: ACCENT }}
          >
            Resume
          </h2>
        </div>
        <div className="flex flex-wrap gap-3">
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 text-[14px] tracking-widest uppercase"
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
            Open in New Tab
          </a>
          <a
            href={url}
            download="Jose_Gonzalez_Resume.pdf"
            className="flex items-center gap-2 px-5 py-2.5 text-[14px] tracking-widest uppercase"
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
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Download PDF
          </a>
        </div>
        <div className="mt-2">
          <iframe
            src={previewUrl}
            title="Resume"
            className="block w-full"
            style={{ height: '95vh', border: `2px solid ${ACCENT}`, backgroundColor: '#fff' }}
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
          <div className="w-6 h-[2px]" style={{ backgroundColor: dividerBg }} />
          <h2
            className="text-4xl tracking-[0.2em] uppercase font-bold"
            style={{ fontFamily: FONT_HEADER, color: ACCENT }}
          >
            Download
          </h2>
          <div className="w-6 h-[2px]" style={{ backgroundColor: dividerBg }} />
        </div>
        <p className="text-[16px] tracking-wider" style={{ color: textDim }}>
          Save a copy to your device
        </p>
        <a
          href={url}
          download="Jose_Gonzalez_Resume.pdf"
          className="flex items-center gap-2 px-6 py-3 text-[14px] tracking-widest uppercase"
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
    const categories = data.categories as Array<{
      name: string;
      items: string[];
    }>;
    return (
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-3">
          <div className="w-6 h-[2px]" style={{ backgroundColor: dividerBg }} />
          <h2
            className="text-4xl tracking-[0.2em] uppercase font-bold"
            style={{ fontFamily: FONT_HEADER, color: ACCENT }}
          >
            Skills
          </h2>
        </div>
        <div className="flex flex-col gap-5">
          {categories.map((cat) => (
            <div key={cat.name}>
              <h3
                className="text-[14px] font-bold mb-2 tracking-[0.3em] uppercase"
                style={{ fontFamily: FONT_MONO, color: textDim }}
              >
                {cat.name}
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {cat.items.map((skill) => (
                  <span
                    key={skill}
                    className="px-2.5 py-1 text-[14px] tracking-wider"
                    style={{
                      fontFamily: FONT_MONO,
                      border: `2px solid ${tagBorder}`,
                      color: textMid,
                    }}
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
