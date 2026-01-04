///
///import React from 'react';
///import ReactDOM from 'react-dom/client';
///import App from './App.tsx';
///
///const rootElement = document.getElementById('root');
///if (!rootElement) {
///  throw new Error("Could not find root element to mount to");
///}
///
///const root = ReactDOM.createRoot(rootElement);
///root.render(
/// <React.StrictMode>
///    <App />
///  </React.StrictMode>
///);

import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';

const container = document.getElementById('root');

if (container) {
  try {
    const root = createRoot(container);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  } catch (err) {
    console.error("Critical rendering failure:", err);
    container.innerHTML = `
      <div style="background:#0a0a0c; color:white; padding:40px; text-align:center; height:100vh; display:flex; flex-direction:column; justify-content:center;">
        <h2 style="color:#e2b35a;">Ошибка отображения контента</h2>
        <p style="opacity:0.7;">${err instanceof Error ? err.message : 'Неизвестная ошибка модуля'}</p>
      </div>
    `;
  }
}
