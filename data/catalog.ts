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
    description: "Надежный забор с текстурой натурального сланца. Глубокое армирование, морозостойкий бетон марки М350. Идеально подходит для частных домов.",
    gallery: [
      { label: "Фасадный вид", url: "/images/1-1.png" },
      { label: "Детали текстуры", url: "/images/1-2.png" },
    ]
  },
  {
    id: 2,
    title: "Ворота 'Евро-Классик'",
    category: 'gates',
    location: "Донецк",
    priceStart: "от 45 000 ₽",
    description: "Распашные ворота с заполнением из секций еврозабора. Покраска в цвет по RAL, усиленные петли на подшипниках.",
    gallery: [
      { label: "Общий вид", url: "/images/gate_classic_1.jpg" },
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
      { label: "Навес на 2 машины", url: "/images/naves_premium_1.jpg" },
    ]
  },
  {
    id: 4,
    title: "Забор 'Gitter 3D' Зеленый",
    category: '3d-mesh',
    location: "Аксай",
    priceStart: "от 1 850 ₽/п.м.",
    description: "Ограждение из сварной сетки с полимерным покрытием. Долговечно, не требует покраски, пропускает свет.",
    gallery: [
      { label: "Периметр участка", url: "/images/gitter_3d_green.jpg" },
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
      { label: "Вид спереди", url: "/images/gazebo_loft_1.jpg" },
      { label: "Внутренняя отделка", url: "/images/gazebo_loft_int.jpg" },
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
      { label: "Организация гаража", url: "/images/shelving_garage.jpg" },
    ]
  }
];
