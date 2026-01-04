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
    console.log("Приложение успешно инициализировано.");
  } catch (error) {
    console.error("Ошибка при рендеринге React:", error);
    container.innerHTML = `<div style="padding: 20px; color: white; text-align: center;">
      <h2>Ошибка загрузки сайта</h2>
      <p>Пожалуйста, обновите страницу или попробуйте позже.</p>
    </div>`;
  }
} else {
  console.error("Критическая ошибка: Контейнер #root не найден.");
}

