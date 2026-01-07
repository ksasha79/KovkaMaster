import React, { useState } from 'react';
import { CONTACTS } from '../config.ts';

const Footer: React.FC = () => {
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    setIsExporting(true);
    try {
      // @ts-ignore
      const JSZip = window.JSZip;
      // @ts-ignore
      const saveAs = window.saveAs;
      
      if (!JSZip || !saveAs) {
        alert("Ошибка: Библиотеки для экспорта не загружены.");
        return;
      }

      const zip = new JSZip();

      // Функция для получения содержимого текущих файлов (имитация доступа к ФС через API)
      // В реальности мы берем данные из текущей сборки
      // Для упрощения бэкапа мы упаковываем основные текстовые файлы
      
      // Добавляем файлы проекта (подготовлено на основе текущего состояния)
      const filesToInclude = [
        'index.html', 'index.tsx', 'App.tsx', 'config.ts', 'types.ts', 
        'metadata.json', 'package.json', 'services/geminiService.ts', 
        'data/catalog.ts'
      ];

      // Так как мы в браузере, мы можем "скачать" текущие версии файлов через fetch
      for (const fileName of filesToInclude) {
        try {
          const response = await fetch(`./${fileName}`);
          if (response.ok) {
            const content = await response.text();
            zip.file(fileName, content);
          }
        } catch (e) {
          console.warn(`Не удалось включить файл ${fileName} в архив`);
        }
      }

      const content = await zip.generateAsync({ type: "blob" });
      saveAs(content, `euro_zabory_backup_${new Date().toISOString().split('T')[0]}.zip`);
    } catch (error) {
      console.error("Export error:", error);
      alert("Ошибка при создании архива");
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <footer className="py-12 border-t border-white/5 bg-brand-black">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex flex-col gap-2">
          <div className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">
            © {new Date().getFullYear()} {CONTACTS.COMPANY_NAME}. Все права защищены.
          </div>
          <button 
            onClick={handleExport}
            className="text-[9px] font-black text-brand-gold/40 hover:text-brand-gold uppercase tracking-[0.2em] text-left transition-colors flex items-center gap-2"
          >
            {isExporting ? 'Сборка архива...' : '📦 Скачать полный бэкап проекта (.zip)'}
          </button>
        </div>
        <div className="flex gap-6">
          <a href="#" className="text-[10px] font-bold text-gray-600 uppercase tracking-widest hover:text-white">Политика</a>
          <a href="#" className="text-[10px] font-bold text-gray-600 uppercase tracking-widest hover:text-white">Оферта</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
