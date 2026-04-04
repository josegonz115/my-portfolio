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

  // Navigate — pen scratch: sharp, scratchy, fast
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

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(2000, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.04);

      filter.type = 'highpass';
      filter.frequency.setValueAtTime(1000, ctx.currentTime);

      gain.gain.setValueAtTime(0.03, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);

      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.05);
    } catch {
      // ignore
    }
  }, [muted, getCtx]);

  // Select — impact slam: deep bass thump + crunch + noise burst
  const playSelect = useCallback(() => {
    if (muted) return;
    try {
      const ctx = getCtx();

      // Bass thump
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.connect(gain1);
      gain1.connect(ctx.destination);
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(80, ctx.currentTime);
      gain1.gain.setValueAtTime(0.08, ctx.currentTime);
      gain1.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);
      osc1.start(ctx.currentTime);
      osc1.stop(ctx.currentTime + 0.2);

      // Crunch
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.connect(gain2);
      gain2.connect(ctx.destination);
      osc2.type = 'square';
      osc2.frequency.setValueAtTime(150, ctx.currentTime);
      gain2.gain.setValueAtTime(0.04, ctx.currentTime);
      gain2.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
      osc2.start(ctx.currentTime);
      osc2.stop(ctx.currentTime + 0.1);

      // White noise burst for impact transient
      const bufferSize = ctx.sampleRate * 0.03; // 30ms
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * 0.5;
      }
      const noise = ctx.createBufferSource();
      const noiseGain = ctx.createGain();
      noise.buffer = buffer;
      noise.connect(noiseGain);
      noiseGain.connect(ctx.destination);
      noiseGain.gain.setValueAtTime(0.06, ctx.currentTime);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.03);
      noise.start(ctx.currentTime);
    } catch {
      // ignore
    }
  }, [muted, getCtx]);

  // Back — paper flip: quick flutter + noise
  const playBack = useCallback(() => {
    if (muted) return;
    try {
      const ctx = getCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(1500, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(3000, ctx.currentTime + 0.03);
      osc.frequency.exponentialRampToValueAtTime(1000, ctx.currentTime + 0.06);

      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);

      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.08);

      // Tiny noise burst for paper texture
      const bufferSize = ctx.sampleRate * 0.02;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * 0.3;
      }
      const noise = ctx.createBufferSource();
      const noiseGain = ctx.createGain();
      noise.buffer = buffer;
      noise.connect(noiseGain);
      noiseGain.connect(ctx.destination);
      noiseGain.gain.setValueAtTime(0.03, ctx.currentTime);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.02);
      noise.start(ctx.currentTime);
    } catch {
      // ignore
    }
  }, [muted, getCtx]);

  const toggleMute = useCallback(() => {
    setMuted(m => !m);
  }, []);

  return { muted, toggleMute, playNavigate, playSelect, playBack };
}
