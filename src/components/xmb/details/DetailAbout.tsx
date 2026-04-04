import type { XMBItem } from '../../../types/xmb';

interface Props {
  item: XMBItem;
}

export function DetailAbout({ item }: Props) {
  const { data } = item;
  const type = data.type as string;

  if (type === 'bio') {
    return (
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-[2px] bg-white/40" />
          <h2
            className="text-xl tracking-[0.2em] uppercase text-white font-bold"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            About
          </h2>
        </div>
        <p className="text-white/70 leading-relaxed text-[13px]">{data.content as string}</p>
      </div>
    );
  }

  if (type === 'education') {
    const entries = data.entries as Array<{ school: string; degree: string; period: string }>;
    return (
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-[2px] bg-white/40" />
          <h2
            className="text-xl tracking-[0.2em] uppercase text-white font-bold"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            Education
          </h2>
        </div>
        <div className="flex flex-col gap-5">
          {entries.map((entry, i) => (
            <div key={i} className="border-l-2 border-white/30 pl-5 py-1">
              <h3 className="text-[13px] font-medium text-white tracking-wide">{entry.school}</h3>
              <p className="text-[12px] text-white/50 mt-1">{entry.degree}</p>
              <p
                className="text-[10px] text-white/40 mt-2 tracking-widest uppercase"
                style={{ fontFamily: "'IBM Plex Mono', monospace" }}
              >
                {entry.period}
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (type === 'interests') {
    const items = data.items as Array<{ name: string; description: string }>;
    return (
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-[2px] bg-white/40" />
          <h2
            className="text-xl tracking-[0.2em] uppercase text-white font-bold"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            Interests
          </h2>
        </div>
        <div className="flex flex-col gap-3">
          {items.map((interest, i) => (
            <div key={i} className="px-4 py-3 border-2 border-white/40 bg-white/[0.02]">
              <h3 className="text-[12px] font-medium text-white tracking-wider uppercase">{interest.name}</h3>
              <p className="text-[11px] text-white/50 mt-1">{interest.description}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return null;
}
