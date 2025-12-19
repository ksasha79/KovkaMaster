export interface GalleryImage {
  url: string;
  label: string;
}

export interface CatalogItem {
  id: number;
  title: string;
  category: 'concrete' | '3d-mesh' | 'gates' | 'installations' | 'canopies' | 'gazebos' | 'shelving';
  description: string;
  priceStart: string;
  location: string;
  gallery: GalleryImage[];
}

export const catalogData: CatalogItem[] = [
  {
    id: 1,
    title: "ЕвроЗабор 'Сланец Премиум'",
    category: 'concrete',
    location: "Склад: Ростов / Донецк",
    priceStart: "2 100 ₽/секция",
    description: "Готовая бетонная секция, армированная стальной сеткой. Имитация натурального камня. Всегда в наличии на складе.",
    gallery: [
      { label: "Вид на участке", url: "/images/zabor1.jpg" },
      { label: "Текстура плиты", url: "/images/zabor1_detail.jpg" },
    ]
  },
  {
    id: 2,
    title: "Автонавес 'Мегаполис'",
    category: 'canopies',
    location: "Индивидуальный размер",
    priceStart: "от 3 500 ₽/м²",
    description: "Мощный навес из поликарбоната или профлиста на стальных опорах. Идеально защищает авто от града и солнца.",
    gallery: [
      { label: "Навес для авто", url: "/images/naves1.jpg" },
    ]
  },
  {
    id: 3,
    title: "Ворота 'Классик' (Ready-Set)",
    category: 'gates',
    location: "Сборка 2 дня",
    priceStart: "42 000 ₽/комплект",
    description: "Типовые распашные ворота под заполнение еврозабором. Готовый каркас, окрашенный в заводских условиях.",
    gallery: [
      { label: "Установленные ворота", url: "/images/gate1.jpg" },
    ]
  },
  {
    id: 4,
    title: "Беседка 'Loft Style'",
    category: 'gazebos',
    location: "Монтаж 3 дня",
    priceStart: "от 85 000 ₽",
    description: "Металлическая беседка с элементами дерева. Современный дизайн, надежный каркас с антикоррозийной обработкой.",
    gallery: [
      { label: "Беседка на участке", url: "/images/besedka1.jpg" },
    ]
  },
  {
    id: 5,
    title: "Стеллаж 'Склад-500'",
    category: 'shelving',
    location: "Любые размеры",
    priceStart: "от 12 000 ₽",
    description: "Сверхпрочные стеллажи для гаража, склада или мастерской. Нагрузка на полку до 500 кг. Болтовое крепление или сварка.",
    gallery: [
      { label: "Стеллаж в гараж", url: "/images/stella1.jpg" },
    ]
  },
  {
    id: 6,
    title: "3D Панель 'Gitter'",
    category: '3d-mesh',
    location: "В наличии",
    priceStart: "1 450 ₽/панель",
    description: "Готовые сетчатые панели с полимерным покрытием. Идеально для быстрой установки больших периметров.",
    gallery: [
      { label: "Готовый объект", url: "/images/mesh1.jpg" },
    ]
  }
];
