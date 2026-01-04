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
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
  // Плавное проявление после загрузки всех ресурсов
  window.addEventListener('load', () => {
    container.classList.add('loaded');
  });
  // Резервное включение видимости, если событие load не сработало
  setTimeout(() => {
    container.classList.add('loaded');
  }, 1500);
} else {
  console.error("Критическая ошибка: Контейнер #root не найден в документе.");
}
