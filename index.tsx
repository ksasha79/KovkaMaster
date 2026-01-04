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
import App from './App';

const container = document.getElementById('root');
if (container) {
  try {
    const root = createRoot(container);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  } catch (error) {
    console.error("Render error:", error);
    container.innerHTML = `<div style="color: white; padding: 20px;">Ошибка рендеринга: ${error instanceof Error ? error.message : 'Неизвестная ошибка'}</div>`;
  }
}
