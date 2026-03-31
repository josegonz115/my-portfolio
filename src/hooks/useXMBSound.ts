import { useCallback, useRef, useState, useEffect } from 'react';

const STORAGE_KEY = 'xmb-sound-muted';

export function useXMBSound() {
  const audioCtxRef = useRef<AudioContext | null>(null);
  const [muted, setMuted] = useState(() => {
    try {
      return localStorage.getItem(STORAGE_KEY) === 'true';
    } catch {
      return false;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, String(muted));
    } catch {
      // ignore
    }
  }, [muted]);

  const getCtx = useCallback(() => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new AudioContext();
    }
    return audioCtxRef.current;
  }, []);

  // Navigate — codec tick: low, short, tactile
  const playNavigate = useCallback(() => {
    if (muted) return;
    try {
      const ctx = getCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(280, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(220, ctx.currentTime + 0.06);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1200, ctx.currentTime);

      gain.gain.setValueAtTime(0.06, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);

      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.08);
    } catch {
      // ignore
    }
  }, [muted, getCtx]);

  // Select — codec open: two-tone chirp, weighty
  const playSelect = useCallback(() => {
    if (muted) return;
    try {
      const ctx = getCtx();

      // First tone
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.connect(gain1);
      gain1.connect(ctx.destination);
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(440, ctx.currentTime);
      gain1.gain.setValueAtTime(0.05, ctx.currentTime);
      gain1.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);
      osc1.start(ctx.currentTime);
      osc1.stop(ctx.currentTime + 0.12);

      // Second tone — slight delay
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.connect(gain2);
      gain2.connect(ctx.destination);
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(660, ctx.currentTime + 0.06);
      gain2.gain.setValueAtTime(0, ctx.currentTime);
      gain2.gain.linearRampToValueAtTime(0.04, ctx.currentTime + 0.06);
      gain2.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);
      osc2.start(ctx.currentTime + 0.06);
      osc2.stop(ctx.currentTime + 0.2);
    } catch {
      // ignore
    }
  }, [muted, getCtx]);

  // Back — codec close: descending, melancholic
  const playBack = useCallback(() => {
    if (muted) return;
    try {
      const ctx = getCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.type = 'sine';
      osc.frequency.setValueAtTime(520, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(260, ctx.currentTime + 0.15);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(2000, ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.15);

      gain.gain.setValueAtTime(0.05, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.18);

      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.18);
    } catch {
      // ignore
    }
  }, [muted, getCtx]);

  const toggleMute = useCallback(() => {
    setMuted(m => !m);
  }, []);

  return { muted, toggleMute, playNavigate, playSelect, playBack };
}
