export interface GalleryImage {
  url: string;
  label: string;
}

export interface CatalogItem {
  id: number;
  title: string;
  category: 'concrete' | '3d-mesh' | 'gates' | 'installations';
  description: string;
  priceStart: string;
  location: string;
  gallery: GalleryImage[];
}

const placeholder = (type: 'concrete' | 'mesh' | 'gate' | 'work') => {
  switch (type) {
    case 'concrete': return "https://images.unsplash.com/photo-1621253457193-41e913a5d852?auto=format&fit=crop&w=800&q=80";
    case 'mesh': return "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80";
    case 'gate': return "https://images.unsplash.com/photo-1599423300746-b62507ac9705?auto=format&fit=crop&w=800&q=80";
    case 'work': return "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80";
  }
};

export const catalogData: CatalogItem[] = [
  {
    id: 1,
    title: "ЕвроЗабор 'Колотый Сланец'",
    category: 'concrete',
    location: "г. Донецк",
    priceStart: "2 100 ₽/п.м.",
    description: "Классическая бетонная секция с имитацией натурального камня. Самый популярный выбор для частного сектора.",
    gallery: [
      { label: "Готовый забор", url: "https://images.unsplash.com/photo-1516962215378-7fa2e137ae93?auto=format&fit=crop&w=800&q=80" },
      { label: "Текстура вблизи", url: placeholder('concrete') },
    ]
  },
  {
    id: 2,
    title: "3D Ограждение 'Стандарт'",
    category: '3d-mesh',
    location: "г. Ростов-на-Дону",
    priceStart: "1 850 ₽/п.м.",
    description: "Панельное сетчатое ограждение с полимерным покрытием. Не перекрывает свет, служит более 20 лет.",
    gallery: [
      { label: "Объект в Батайске", url: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80" },
      { label: "Крепления столбов", url: placeholder('mesh') },
    ]
  },
  {
    id: 3,
    title: "Ворота под ЕвроЗабор",
    category: 'gates',
    location: "г. Макеевка",
    priceStart: "45 000 ₽/комплект",
    description: "Распашные ворота с заполнением в стиль основного забора. Каркас из усиленной трубы.",
    gallery: [
      { label: "Установленные ворота", url: "https://images.unsplash.com/photo-1599423300746-b62507ac9705?auto=format&fit=crop&w=800&q=80" },
      { label: "Узел автоматики", url: placeholder('gate') },
    ]
  },
  {
    id: 4,
    title: "ЕвроЗабор 'Бутовый камень'",
    category: 'concrete',
    location: "г. Луганск",
    priceStart: "2 450 ₽/п.м.",
    description: "Двусторонняя секция с глубоким рельефом. Визуально не отличим от кладки из натурального камня.",
    gallery: [
      { label: "Готовый объект", url: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80" },
      { label: "Монтажные работы", url: placeholder('work') },
    ]
  }
];
