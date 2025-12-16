export interface GalleryImage {
  url: string;
  label: string; // Например: "Эскиз", "В цеху", "Монтаж"
}

export interface CatalogItem {
  id: number;
  title: string;
  category: 'gates' | 'fences' | 'decor' | 'welding';
  description: string;
  priceStart?: string; // Цена "от..."
  gallery: GalleryImage[]; // Серия фото
}

// Вспомогательная функция, чтобы не дублировать длинные ссылки-заглушки
// Когда будете менять на свои фото, просто стирайте заглушки и пишите: "/images/foto1.jpg"
const placeholder = (type: 'sketch' | 'process' | 'shop' | 'installed') => {
  switch (type) {
    case 'sketch': return "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=800&q=80"; // Бумага/чертеж
    case 'process': return "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80"; // Сварка
    case 'shop': return "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=800&q=80"; // Деталь в цеху
    case 'installed': return "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80"; // Готовые ворота
  }
};

export const catalogData: CatalogItem[] = [
  // --- КАТЕГОРИЯ: ВОРОТА ---
  {
    id: 1,
    title: "Кованые ворота премиум-класса",
    category: 'gates',
    description: "Эксклюзивный дизайн, сложная ковка, патинирование под золото.",
    gallery: [
      { label: "Готовый результат", url: placeholder('installed') },
      { label: "Эскиз проекта", url: placeholder('sketch') },
      { label: "Сварка деталей", url: placeholder('process') },
      { label: "Грунтовка в цеху", url: placeholder('shop') },
    ]
  },
  {
    id: 2,
    title: "Ворота с калиткой под ключ",
    category: 'gates',
    description: "Комплексное решение: въездная группа и входная калитка в едином стиле.",
    gallery: [
      { label: "Вид на объекте", url: "https://images.unsplash.com/photo-1599423300746-b62507ac9705?auto=format&fit=crop&w=800&q=80" },
      { label: "3D Модель", url: placeholder('sketch') },
      { label: "Сборка каркаса", url: placeholder('process') },
    ]
  },
  {
    id: 7,
    title: "Современные металлические ворота",
    category: 'gates',
    description: "Стиль хай-тек, лофт, жалюзи. Лаконичность и надежность.",
    gallery: [
      { label: "Стиль Лофт", url: "https://images.unsplash.com/photo-1622372658604-0373df45f22e?auto=format&fit=crop&w=800&q=80" },
      { label: "Чертеж", url: placeholder('sketch') },
      { label: "Покраска", url: placeholder('shop') },
    ]
  },

  // --- КАТЕГОРИЯ: ЗАБОРЫ ---
  {
    id: 3,
    title: "Заборы любой сложности",
    category: 'fences',
    description: "От профнастила до кованых секций и кирпичной кладки.",
    gallery: [
      { label: "Кирпич + Ковка", url: "https://images.unsplash.com/photo-1621253457193-41e913a5d852?auto=format&fit=crop&w=800&q=80" },
      { label: "Фундамент", url: placeholder('process') },
      { label: "Кладка столбов", url: placeholder('shop') },
    ]
  },

  // --- КАТЕГОРИЯ: ХУДОЖЕСТВЕННАЯ КОВКА (Декор) ---
  {
    id: 4,
    title: "Художественная ковка",
    category: 'decor',
    description: "Перила, козырьки, решетки и элементы декора ручной работы.",
    gallery: [
      { label: "Кованые перила", url: "https://plus.unsplash.com/premium_photo-1678900994119-03c0032943b0?auto=format&fit=crop&w=800&q=80" },
      { label: "Ковка элементов", url: placeholder('process') },
      { label: "Сборка узора", url: placeholder('shop') },
    ]
  },
  {
    id: 8,
    title: "Индивидуальные проекты под заказ",
    category: 'decor',
    description: "Воплощаем в металле любые ваши идеи и нестандартные эскизы.",
    gallery: [
      { label: "Эксклюзив", url: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=800&q=80" },
      { label: "Эскиз заказчика", url: placeholder('sketch') },
      { label: "Процесс работы", url: placeholder('process') },
    ]
  },

  // --- КАТЕГОРИЯ: СВАРКА И МОНТАЖ ---
  {
    id: 5,
    title: "Профессиональные сварочные работы",
    category: 'welding',
    description: "Качественные швы, сборка металлоконструкций, каркасов и ферм.",
    gallery: [
      { label: "Сварка ферм", url: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80" },
      { label: "Крупный план шва", url: placeholder('shop') },
    ]
  },
  {
    id: 6,
    title: "Монтаж и установка конструкций",
    category: 'welding',
    description: "Установка ворот, навесов и ограждений на объекте заказчика.",
    gallery: [
      { label: "Монтаж навеса", url: "https://images.unsplash.com/photo-1581094794329-cd19cedcb2ad?auto=format&fit=crop&w=800&q=80" },
      { label: "Бетонирование", url: placeholder('process') },
    ]
  }
];
