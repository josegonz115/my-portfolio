interface Props {
  name: string;
  active: boolean;
}

const iconPaths: Record<string, React.ReactNode> = {
  terminal: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <polyline points="7,8 11,12 7,16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="13" y1="16" x2="17" y2="16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </>
  ),
  code: (
    <>
      <polyline points="16,18 22,12 16,6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <polyline points="8,6 2,12 8,18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="14" y1="4" x2="10" y2="20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </>
  ),
  microscope: (
    <>
      <circle cx="12" cy="7" r="3" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <line x1="12" y1="10" x2="12" y2="17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M8 17 C8 17 8 21 12 21 C16 21 16 17 16 17" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="6" y1="21" x2="18" y2="21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="15" y1="5" x2="18" y2="2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </>
  ),
  'file-text': (
    <>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <polyline points="14,2 14,8 20,8" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <line x1="8" y1="13" x2="16" y2="13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="8" y1="17" x2="13" y2="17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </>
  ),
  mail: (
    <>
      <rect x="2" y="4" width="20" height="16" rx="2" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <polyline points="2,4 12,13 22,4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
};

export function CategorySvgIcon({ name, active }: Props) {
  const path = iconPaths[name];
  if (!path) return null;

  return (
    <svg
      viewBox="0 0 24 24"
      className={`w-8 h-8 transition-colors duration-400 ${active ? 'text-xmb-accent' : 'text-xmb-text-dim'}`}
    >
      {path}
    </svg>
  );
}
