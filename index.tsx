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
import ReactDOM from 'react-dom/client';
import App from './App.tsx';

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  console.error("Критическая ошибка: Корневой элемент #root не найден в DOM.");
}
