export interface GalleryImage {
  url: string;
  label: string;
}

export interface CatalogItem {
  id: number;
  title: string;
  category: 'gates' | 'fences' | 'decor' | 'welding';
  description: string;
  priceStart: string;
  location: string;
  gallery: GalleryImage[];
}

const placeholder = (type: 'sketch' | 'process' | 'shop' | 'installed') => {
  switch (type) {
    case 'sketch': return "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=800&q=80";
    case 'process': return "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80";
    case 'shop': return "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=800&q=80";
    case 'installed': return "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80";
  }
};

export const catalogData: CatalogItem[] = [
  {
    id: 1,
    title: "Ворота 'Византия' с патиной",
    category: 'gates',
    location: "г. Донецк",
    priceStart: "125 000 ₽",
    description: "Сложная художественная ковка, ручная работа. Покрытие - немецкая кузнечная краска.",
    gallery: [
      { label: "Готовый результат", url: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80" },
      { label: "Эскиз проекта", url: placeholder('sketch') },
      { label: "Процесс ковки", url: placeholder('process') },
    ]
  },
  {
    id: 2,
    title: "Въездная группа 'Классик'",
    category: 'gates',
    location: "г. Ростов-на-Дону",
    priceStart: "85 000 ₽",
    description: "Распашные ворота с элементами холодной ковки. Оптимальное соотношение цена/качество.",
    gallery: [
      { label: "Объект в Батайске", url: "https://images.unsplash.com/photo-1599423300746-b62507ac9705?auto=format&fit=crop&w=800&q=80" },
      { label: "Сборка каркаса", url: placeholder('process') },
    ]
  },
  {
    id: 3,
    title: "Забор 'Модерн' секционный",
    category: 'fences',
    location: "г. Мариуполь",
    priceStart: "4 500 ₽/п.м.",
    description: "Секционный забор из профильной трубы с декоративными вставками.",
    gallery: [
      { label: "Установленные секции", url: "https://images.unsplash.com/photo-1621253457193-41e913a5d852?auto=format&fit=crop&w=800&q=80" },
      { label: "Монтаж столбов", url: placeholder('process') },
    ]
  },
  {
    id: 4,
    title: "Навес для авто 'Лофт'",
    category: 'welding',
    location: "г. Макеевка",
    priceStart: "65 000 ₽",
    description: "Металлоконструкция с покрытием из поликарбоната. Скрытые сварные швы.",
    gallery: [
      { label: "Готовый навес", url: "https://images.unsplash.com/photo-1581094794329-cd19cedcb2ad?auto=format&fit=crop&w=800&q=80" },
      { label: "В цеху", url: placeholder('shop') },
    ]
  }
];
