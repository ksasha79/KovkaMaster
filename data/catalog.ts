export interface GalleryImage {
  url: string;
  label: string;
}

export type CategoryType = 'prof-sheet' | 'picket-3d' | 'mesh-3d' | 'chain-link' | 'jalousie';

export interface CatalogItem {
  id: number;
  title: string;
  category: CategoryType;
  description: string;
  priceStart: string;
  location: string;
  gallery: GalleryImage[];
}

export const catalogData: CatalogItem[] = [
  {
    id: 1,
    title: "Забор из жалюзи 'Lux'",
    category: 'jalousie',
    location: "Воронеж, СНТ Отдых",
    priceStart: "от 3 800 ₽/п.м.",
    description: "Современное решение из оцинкованной стали с полимерным покрытием. Обеспечивает проветриваемость участка при полной приватности. Толщина металла 0.5 мм.",
    gallery: [
      { label: "Фасадный вид", url: "/images/4-Zaluzi/3.png" },
      { label: "Вид изнутри", url: "/images/4-Zaluzi/1.jpeg" }, 
      { label: "Узел крепления", url: "/images/4-Zaluzi/2.png" }
    ]
  },
  {
    id: 2,
    title: "Ограждение из 3D сетки Gitter",
    category: 'mesh-3d',
    location: "Воронеж, Промзона",
    priceStart: "от 1 200 ₽/п.м.",
    description: "Секционное ограждение из оцинкованной проволоки 4мм с V-образными ребрами жесткости. Идеально для больших территорий и складских комплексов.",
    gallery: [
      { label: "Общий вид", url: "/images/2-3D Gitter/1.jpeg" },
      { label: "Установка столбов", url: "/images/2-3D Gitter/0.png" }   
    ]
  },
  {
    id: 3,
    title: "Забор из сетки рабицы",
    category: 'chain-link',
    location: "Семилуки, Воронежская обл.",
    priceStart: "от 850 ₽/п.м.",
    description: "Бюджетный и долговечный вариант. Сетка оцинкованная, не ржавеет. Установка внатяжку или в секциях из уголка. Монтаж за 1 день.",
    gallery: [
      { label: "Натяжной вариант", url: "/images/1-Rabica/0.png" },
      { label: "Готовый объект", url: "/images/1-Rabica/1.jpeg" }
    ]
  },
  {
    id: 4,
    title: "Забор из профлиста С8",
    category: 'prof-sheet',
    location: "Новая Усмань",
    priceStart: "от 2 200 ₽/п.м.",
    description: "Классический сплошной забор. Используем качественный лист НЛМК. Каркас из профильной трубы 60х40, покраска в цвет листа.",
    gallery: [
      { label: "Забор из профнастила", url: "/images/3-Lenta/1.png" }
    ]
  },
  {
    id: 5,
    title: "Забор из 3Д металлоштакетника",
    category: 'picket-3d',
    location: "Рамонь",
    priceStart: "от 2 600 ₽/п.м.",
    description: "Металлическая имитация классического деревянного забора. 3D-рез верхнего края придает эстетичный вид. Долговечно и красиво.",
    gallery: [
      { label: "Штакетник шахматка", url: "/images/3-Lenta/2.jpeg" }
    ]
  }
];
