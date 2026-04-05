import { ACCENT, CYBER_FLAGS, FONT_HEADER, FONT_MONO } from '../../../config/cyberFlags';
import type { XMBItem } from '../../../types/xmb';

interface Props {
  item: XMBItem;
}

export function DetailAbout({ item }: Props) {
  const { data } = item;
  const type = data.type as string;
  const cyber = CYBER_FLAGS.cyberPalette;

  const dividerBg = cyber ? 'rgba(0,212,170,0.4)' : 'rgba(255,255,255,0.4)';
  const textMid = cyber ? 'rgba(0,212,170,0.7)' : 'rgba(255,255,255,0.7)';
  const textDim = cyber ? 'rgba(0,212,170,0.5)' : 'rgba(255,255,255,0.5)';
  const textFaint = cyber ? 'rgba(0,212,170,0.4)' : 'rgba(255,255,255,0.4)';
  const borderDim = cyber ? 'rgba(0,212,170,0.3)' : 'rgba(255,255,255,0.3)';
  const borderMid = cyber ? 'rgba(0,212,170,0.4)' : 'rgba(255,255,255,0.4)';
  const cardBg = cyber ? 'rgba(0,212,170,0.02)' : 'rgba(255,255,255,0.02)';

  if (type === 'bio') {
    const image = data.image as string | undefined;
    const imageSecondary = data.imageSecondary as string | undefined;

    return (
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-[2px]" style={{ backgroundColor: dividerBg }} />
          <h2
            className="text-4xl tracking-[0.2em] uppercase font-bold"
            style={{ fontFamily: FONT_HEADER, color: ACCENT }}
          >
            About
          </h2>
        </div>
        {(image || imageSecondary) && (
          <div className="flex flex-col sm:flex-row gap-4">
            {image && (
              <img
                src={image}
                alt="Jose Juan Gonzalez Jr"
                className="w-full sm:w-[260px] sm:flex-none h-auto object-cover"
                style={{ border: `2px solid ${ACCENT}` }}
              />
            )}
            {imageSecondary && (
              <img
                src={imageSecondary}
                alt="Jose Juan Gonzalez Jr illustration"
                className="w-full sm:flex-1 sm:min-w-0 h-auto object-contain"
                style={{ border: `2px solid ${ACCENT}` }}
              />
            )}
          </div>
        )}
        <p className="leading-relaxed text-[20px] whitespace-pre-line" style={{ color: textMid }}>
          {data.content as string}
        </p>
      </div>
    );
  }

  if (type === 'education') {
    const entries = data.entries as Array<{
      school: string;
      degree: string;
      period: string;
    }>;
    return (
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-[2px]" style={{ backgroundColor: dividerBg }} />
          <h2
            className="text-4xl tracking-[0.2em] uppercase font-bold"
            style={{ fontFamily: FONT_HEADER, color: ACCENT }}
          >
            Education
          </h2>
        </div>
        <div className="flex flex-col gap-5">
          {entries.map((entry, i) => (
            <div key={i} className="pl-5 py-1" style={{ borderLeft: `2px solid ${borderDim}` }}>
              <h3 className="text-[18px] font-medium tracking-wide" style={{ color: ACCENT }}>
                {entry.school}
              </h3>
              <p className="text-[16px] mt-1" style={{ color: textDim }}>
                {entry.degree}
              </p>
              <p
                className="text-[14px] mt-2 tracking-widest uppercase"
                style={{ fontFamily: FONT_MONO, color: textFaint }}
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
          <div className="w-8 h-[2px]" style={{ backgroundColor: dividerBg }} />
          <h2
            className="text-4xl tracking-[0.2em] uppercase font-bold"
            style={{ fontFamily: FONT_HEADER, color: ACCENT }}
          >
            Interests
          </h2>
        </div>
        <div className="flex flex-col gap-3">
          {items.map((interest, i) => (
            <div key={i} className="px-4 py-3" style={{ border: `2px solid ${borderMid}`, backgroundColor: cardBg }}>
              <h3 className="text-[18px] font-medium tracking-wider uppercase" style={{ color: ACCENT }}>
                {interest.name}
              </h3>
              <p className="text-[16px] mt-1" style={{ color: textDim }}>
                {interest.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return null;
}
