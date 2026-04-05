import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { CYBER_FLAGS } from './config/cyberFlags';
import './index.css';

// Activate cyber theme CSS variable overrides synchronously before first paint
if (CYBER_FLAGS.cyberPalette) {
  document.documentElement.dataset.theme = 'cyber';
}

const rootElement = document.getElementById('root');
if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}
