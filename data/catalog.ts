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

/**
 * ИНСТРУКЦИЯ ПО ЗАПОЛНЕНИЮ КАТАЛОГА:
 * 
 * 1. Загрузите фото в папку /public/images/ (имена файлов должны быть на латинице, без пробелов).
 * 2. В поле 'url' укажите путь: "/images/ваше_имя_файла.jpg"
 * 3. Поле 'category' определяет, в каком фильтре на сайте будет отображаться работа.
 * 4. В массиве 'gallery' первое фото будет обложкой карточки, остальные — в слайдере внутри.
 */

export const catalogData: CatalogItem[] = [
  {
    id: 1,
    title: "ЕвроЗабор 'Сланец Премиум'",
    category: 'concrete',
    location: "Ростов-на-Дону",
    priceStart: "от 2 500 ₽/п.м.",
    description: "Надежный забор with текстурой натурального сланца. Глубокое армирование, морозостойкий бетон марки М350. Идеально подходит для частных домов.",
    gallery: [
      { label: "Фасадный вид", url: "/images/1-1.png" },
      { label: "Детали текстуры", url: "/images/1-2.png" },
    ]
  },
  {
    id: 2,
    title: "ЕвроЗабор 'Евро-Классик'",
    category: 'concrete',
    location: "Донецк",
    priceStart: "от 2 800 ₽/п.м.",
    description: "Классическое решение для ограждения. Секции with имитацией кирпича или камня. Покраска в цвет по RAL, долговечность и эстетика.",
    gallery: [
      { label: "Общий вид", url: "/images/22.jpg" },
    ]
  },
  {
    id: 3,
    title: "Навес для авто 'Премиум'",
    category: 'canopies',
    location: "Луганск",
    priceStart: "от 4 200 ₽/м²",
    description: "Арочный навес из поликарбоната 10мм. Фермы из профильной трубы 60х60. Полная защита вашего автомобиля от осадков.",
    gallery: [
      { label: "Навес на 2 машины", url: "/images/66.jpg" },
    ]
  },
  {
    id: 4,
    title: "Забор 'Gitter 3D' Зеленый",
    category: '3d-mesh',
    location: "Аксай",
    priceStart: "от 1 850 ₽/п.м.",
    description: "Ограждение из сварной сетки with полимерным покрытием. Долговечно, не требует покраски, пропускает свет.",
    gallery: [
      { label: "Установленное ограждение", url: "/images/44.jpg" },
    ]
  },
  {
    id: 5,
    title: "Беседка 'Loft Modern'",
    category: 'gazebos',
    location: "Таганрог",
    priceStart: "от 95 000 ₽",
    description: "Современная зона отдыха. Металлокаркас + отделка лиственницей. В комплекте идет фундамент на сваях.",
    gallery: [
      { label: "Готовый проект", url: "/images/55.jpg" },
    ]
  },
  {
    id: 6,
    title: "Стеллажная система 'Гараж-Про'",
    category: 'shelving',
    location: "Ростов-на-Дону",
    priceStart: "от 15 000 ₽",
    description: "Усиленные стеллажи для хранения инструментов и колес. Порошковая покраска, нагрузка до 300кг на полку.",
    gallery: [
      { label: "Организация гаража", url: "/images/77.jpg" },
    ]
  },
  {
    id: 7,
    title: "Ворота 'Евро-Классик'",
    category: 'gates',
    location: "Донецк",
    priceStart: "от 48 000 ₽",
    description: "Распашные или откатные ворота в едином стиле with забором 'Евро-Классик'. Надежная рама и качественное заполнение.",
    gallery: [
      { label: "Фасад", url: "/images/88.jpg" },
    ]
  }
];
