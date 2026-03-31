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
        <h2 className="text-2xl font-bold text-xmb-accent xmb-glow">About Me</h2>
        <p className="text-xmb-text leading-relaxed text-sm">{data.content as string}</p>
      </div>
    );
  }

  if (type === 'education') {
    const entries = data.entries as Array<{ school: string; degree: string; period: string }>;
    return (
      <div className="flex flex-col gap-6">
        <h2 className="text-2xl font-bold text-xmb-accent xmb-glow">Education</h2>
        <div className="flex flex-col gap-4">
          {entries.map((entry, i) => (
            <div key={i} className="border-l-2 border-xmb-accent pl-4 py-2">
              <h3 className="text-base font-semibold text-xmb-text">{entry.school}</h3>
              <p className="text-sm text-xmb-text-dim">{entry.degree}</p>
              <p className="text-xs text-xmb-accent mt-1 font-mono">{entry.period}</p>
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
        <h2 className="text-2xl font-bold text-xmb-accent xmb-glow">Interests</h2>
        <div className="grid grid-cols-1 gap-3">
          {items.map((interest, i) => (
            <div key={i} className="p-3 rounded border border-xmb-border bg-xmb-highlight">
              <h3 className="text-sm font-semibold text-xmb-accent">{interest.name}</h3>
              <p className="text-xs text-xmb-text-dim mt-1">{interest.description}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return null;
}
