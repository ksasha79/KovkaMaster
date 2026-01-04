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
    console.log("React App: Mount successful");
  } catch (error) {
    console.error("React App: Mount failed", error);
    container.innerHTML = `
      <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; color: white; text-align: center; padding: 20px;">
        <h2 style="color: #c5a059;">Ошибка загрузки сайта</h2>
        <p>Пожалуйста, обновите страницу или попробуйте зайти с другого браузера.</p>
      </div>
    `;
  }
} else {
  console.error("Critical: #root element not found");
}

