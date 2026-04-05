import { ACCENT, CYBER_FLAGS } from '../../config/cyberFlags';

interface Props {
  name: string;
  active: boolean;
  sizeClass?: string;
}

// Bold icon set — thick 2px strokes, high contrast
const iconPaths: Record<string, React.ReactNode> = {
  terminal: (
    <>
      <circle cx="12" cy="8" r="3.5" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M5 20v-1a7 7 0 0 1 14 0v1" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </>
  ),
  code: (
    <>
      <rect x="3" y="7" width="18" height="13" rx="1.5" fill="none" stroke="currentColor" strokeWidth="2" />
      <path
        d="M8 7V5.5A1.5 1.5 0 0 1 9.5 4h5A1.5 1.5 0 0 1 16 5.5V7"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
      <circle cx="12" cy="13" r="1.5" fill="currentColor" />
    </>
  ),
  microscope: (
    <>
      <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="12" cy="12" r="5" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <line x1="12" y1="3" x2="12" y2="6" stroke="currentColor" strokeWidth="1.5" />
      <line x1="12" y1="12" x2="18" y2="6" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="18" cy="6" r="2" fill="currentColor" />
    </>
  ),
  'file-text': (
    <>
      <path
        d="M14 2H6a1.5 1.5 0 0 0-1.5 1.5v17A1.5 1.5 0 0 0 6 22h12a1.5 1.5 0 0 0 1.5-1.5V8Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
      <polyline points="14,2 14,8 19.5,8" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <line x1="8" y1="13" x2="16" y2="13" stroke="currentColor" strokeWidth="1.5" />
      <line x1="8" y1="16" x2="13" y2="16" stroke="currentColor" strokeWidth="1.5" />
    </>
  ),
  mail: (
    <>
      <rect x="2" y="5" width="20" height="14" rx="1.5" fill="none" stroke="currentColor" strokeWidth="2" />
      <polyline
        points="2,5 12,13 22,5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  ),
};

export function CategorySvgIcon({ name, active, sizeClass = 'w-12 h-12' }: Props) {
  const path = iconPaths[name];
  if (!path) return null;

  const cyber = CYBER_FLAGS.cyberPalette;

  return (
    <svg
      viewBox="0 0 24 24"
      className={sizeClass}
      style={{
        color: active ? ACCENT : cyber ? 'rgba(0,212,170,0.62)' : 'rgba(255,255,255,0.62)',
        transition: 'color 0.4s ease, filter 0.4s ease',
        filter: active ? `drop-shadow(0 0 6px ${cyber ? 'rgba(0,212,170,0.5)' : 'rgba(255,255,255,0.5)'})` : 'none',
      }}
    >
      {path}
    </svg>
  );
}
