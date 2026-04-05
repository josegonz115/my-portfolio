// === CYBERPUNK FEATURE FLAGS ===
// Toggle individual effects on/off for debugging or customization.
// All flags default to true for the full cyberpunk experience.

export const CYBER_FLAGS = {
  /** Swap CSS palette from B&W to muted teal/dark cyan */
  cyberPalette: false,
  /** VT323 headers + Share Tech Mono body fonts */
  cyberFonts: true,
  /** Tron-style infinite perspective grid background */
  perspectiveGrid: true,
  /** CRT horizontal scanline overlay */
  scanlines: false,
  /** Dark corner vignette */
  crtVignette: true,
  /** Subtle CRT text flicker on name */
  textFlicker: true,
  /** Teal glow replacing white glow */
  cyberGlow: true,
  /** Cyan tint filter on thumbnails */
  thumbnailTint: false,
} as const;

// Derived font constants — every component imports these instead of hardcoding
export const FONT_HEADER = CYBER_FLAGS.cyberFonts ? "'VT323', monospace" : "'Bebas Neue', sans-serif";
export const FONT_MONO = CYBER_FLAGS.cyberFonts ? "'Share Tech Mono', monospace" : "'IBM Plex Mono', monospace";

// Accent color for inline styles (matches CSS --color-xmb-accent under cyber theme)
export const ACCENT = CYBER_FLAGS.cyberPalette ? '#00d4aa' : '#ffffff';
export const ACCENT_DIM = CYBER_FLAGS.cyberPalette ? 'rgba(0,212,170,0.5)' : 'rgba(255,255,255,0.5)';
export const BG_DARK = CYBER_FLAGS.cyberPalette ? '#050a0e' : '#000000';
