interface Props {
  name: string;
  active: boolean;
}

// Thin, tactical, military-grade icon set — 1px strokes, clean geometry
const iconPaths: Record<string, React.ReactNode> = {
  terminal: (
    <>
      {/* Dossier / Profile — tactical silhouette */}
      <circle cx="12" cy="8" r="3.5" fill="none" stroke="currentColor" strokeWidth="1" />
      <path d="M5 20v-1a7 7 0 0 1 14 0v1" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
      <line x1="18" y1="4" x2="21" y2="4" stroke="currentColor" strokeWidth="0.8" opacity="0.4" />
      <line x1="18" y1="6" x2="20" y2="6" stroke="currentColor" strokeWidth="0.8" opacity="0.4" />
    </>
  ),
  code: (
    <>
      {/* Briefcase / Operations */}
      <rect x="3" y="7" width="18" height="13" rx="1.5" fill="none" stroke="currentColor" strokeWidth="1" />
      <path d="M8 7V5.5A1.5 1.5 0 0 1 9.5 4h5A1.5 1.5 0 0 1 16 5.5V7" fill="none" stroke="currentColor" strokeWidth="1" />
      <line x1="3" y1="12" x2="21" y2="12" stroke="currentColor" strokeWidth="0.8" opacity="0.3" />
      <circle cx="12" cy="12" r="1.5" fill="none" stroke="currentColor" strokeWidth="1" />
    </>
  ),
  microscope: (
    <>
      {/* Radar / Research */}
      <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="1" />
      <circle cx="12" cy="12" r="5" fill="none" stroke="currentColor" strokeWidth="0.7" opacity="0.4" />
      <circle cx="12" cy="12" r="1" fill="none" stroke="currentColor" strokeWidth="0.7" opacity="0.3" />
      <line x1="12" y1="3" x2="12" y2="6" stroke="currentColor" strokeWidth="0.8" opacity="0.5" />
      <line x1="12" y1="12" x2="18" y2="6" stroke="currentColor" strokeWidth="0.8" />
      <circle cx="18" cy="6" r="1.5" fill="currentColor" opacity="0.6" />
    </>
  ),
  'file-text': (
    <>
      {/* Document / Intel */}
      <path d="M14 2H6a1.5 1.5 0 0 0-1.5 1.5v17A1.5 1.5 0 0 0 6 22h12a1.5 1.5 0 0 0 1.5-1.5V8Z" fill="none" stroke="currentColor" strokeWidth="1" />
      <polyline points="14,2 14,8 19.5,8" fill="none" stroke="currentColor" strokeWidth="0.8" opacity="0.5" />
      <line x1="8" y1="13" x2="16" y2="13" stroke="currentColor" strokeWidth="0.7" opacity="0.4" />
      <line x1="8" y1="16" x2="13" y2="16" stroke="currentColor" strokeWidth="0.7" opacity="0.4" />
      <line x1="8" y1="10" x2="11" y2="10" stroke="currentColor" strokeWidth="0.7" opacity="0.4" />
    </>
  ),
  mail: (
    <>
      {/* Codec / Signal */}
      <rect x="2" y="5" width="20" height="14" rx="1.5" fill="none" stroke="currentColor" strokeWidth="1" />
      <polyline points="2,5 12,13 22,5" fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="2" y1="19" x2="8" y2="13" stroke="currentColor" strokeWidth="0.7" opacity="0.3" />
      <line x1="22" y1="19" x2="16" y2="13" stroke="currentColor" strokeWidth="0.7" opacity="0.3" />
    </>
  ),
};

export function CategorySvgIcon({ name, active }: Props) {
  const path = iconPaths[name];
  if (!path) return null;

  return (
    <svg
      viewBox="0 0 24 24"
      className={`w-7 h-7 ${active ? 'text-xmb-accent' : 'text-xmb-text-dim'}`}
      style={{
        transition: 'color 0.5s ease, filter 0.5s ease',
        filter: active ? 'drop-shadow(0 0 4px rgba(200, 164, 78, 0.3))' : 'none',
      }}
    >
      {path}
    </svg>
  );
}
