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
    console.log("App initialized successfully");
  } catch (error) {
    console.error("React render error:", error);
    // Резервный механизм вывода ошибки на экран
    container.innerHTML = `<div style="padding: 40px; text-align: center; color: white;">
      <h2>Ошибка загрузки</h2>
      <p>Пожалуйста, обновите страницу или попробуйте зайти с другого браузера.</p>
    </div>`;
  }
} else {
  console.error("Root element not found");
}

