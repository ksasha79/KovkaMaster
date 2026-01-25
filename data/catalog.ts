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
    title: "Забор из проф листа",
    category: 'prof-sheet',
    location: "Воронеж",
    priceStart: "от 3 500 ₽/п.м.",
    description: "Шаблон описания: Сплошной забор из профнастила. Укажите толщину листа, марку стали и тип покрытия.",
    gallery: [
      { label: "Главное фото", url: "/images/prof-sheet-1.jpg" }
    ]
  },
  {
    id: 2,
    title: "Забор из 3Д штакета",
    category: 'picket-3d',
    location: "Воронеж",
    priceStart: "от 5 500 ₽/п.м.",
    description: "Шаблон описания: Металлический штакетник с 3D резом. Укажите способ заполнения (односторонний/шахматка).",
    gallery: [
      { label: "Главное фото", url: "/images/picket-3d-1.jpg" }
    ]
  },
  {
    id: 3,
    title: "Забор из 3Д сетки",
    category: 'mesh-3d',
    location: "Воронеж",
    priceStart: "от 3 000 ₽/п.м.",
    description: "Шаблон описания: Секционный забор из 3D сетки Gitter. Укажите толщину прутка и высоту секции.",
    gallery: [
      { label: "Главное фото", url: "/images/mesh-3d-1.jpg" }
    ]
  },
  {
    id: 4,
    title: "Забор из сетки рабицы",
    category: 'chain-link',
    location: "Воронеж",
    priceStart: "от 2 000 ₽/п.м.",
    description: "Шаблон описания: Бюджетное ограждение из оцинкованной сетки рабицы. Укажите высоту и способ монтажа.",
    gallery: [
      { label: "Главное фото", url: "/images/chain-link-1.jpg" }
    ]
  },
  {
    id: 5,
    title: "Забор из жалюзи",
    category: 'jalousie',
    location: "Воронеж",
    priceStart: "от 8 500 ₽/п.м.",
    description: "Шаблон описания: Современный забор-жалюзи. Укажите тип ламелей, глубину секции и цвет по каталогу RAL.",
    gallery: [
      { label: "Главное фото", url: "/images/jalousie-1.jpg" }
    ]
  }
];
