export interface CatalogItem {
  id: number;
  title: string;
  category: 'gates' | 'fences' | 'decor' | 'welding';
  image: string; // Ссылка на картинку
  description?: string;
}

export const catalogData: CatalogItem[] = [
  // --- КАТЕГОРИЯ: ВОРОТА ---
  {
    id: 1,
    title: "Кованые ворота премиум-класса",
    category: 'gates',
    // В будущем замените на: "/images/premium_vorota.jpg"
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80",
    description: "Эксклюзивный дизайн, сложная ковка, патинирование."
  },
  {
    id: 2,
    title: "Ворота с калиткой под ключ",
    category: 'gates',
    image: "https://images.unsplash.com/photo-1599423300746-b62507ac9705?auto=format&fit=crop&w=800&q=80",
    description: "Комплексное решение: въездная группа и входная калитка в едином стиле."
  },
  {
    id: 7,
    title: "Современные металлические ворота",
    category: 'gates',
    image: "https://images.unsplash.com/photo-1622372658604-0373df45f22e?auto=format&fit=crop&w=800&q=80",
    description: "Стиль хай-тек, лофт, жалюзи. Лаконичность и надежность."
  },

  // --- КАТЕГОРИЯ: ЗАБОРЫ ---
  {
    id: 3,
    title: "Заборы любой сложности",
    category: 'fences',
    image: "https://images.unsplash.com/photo-1621253457193-41e913a5d852?auto=format&fit=crop&w=800&q=80",
    description: "От профнастила до кованых секций и кирпичной кладки."
  },

  // --- КАТЕГОРИЯ: ХУДОЖЕСТВЕННАЯ КОВКА (Декор) ---
  {
    id: 4,
    title: "Художественная ковка",
    category: 'decor',
    image: "https://plus.unsplash.com/premium_photo-1678900994119-03c0032943b0?auto=format&fit=crop&w=800&q=80",
    description: "Перила, козырьки, решетки и элементы декора ручной работы."
  },
  {
    id: 8,
    title: "Индивидуальные проекты под заказ",
    category: 'decor',
    image: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=800&q=80",
    description: "Воплощаем в металле любые ваши идеи и нестандартные эскизы."
  },

  // --- КАТЕГОРИЯ: СВАРКА И МОНТАЖ ---
  {
    id: 5,
    title: "Профессиональные сварочные работы",
    category: 'welding',
    image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80",
    description: "Качественные швы, сборка металлоконструкций, каркасов и ферм."
  },
  {
    id: 6,
    title: "Монтаж и установка конструкций",
    category: 'welding',
    image: "https://images.unsplash.com/photo-1581094794329-cd19cedcb2ad?auto=format&fit=crop&w=800&q=80",
    description: "Установка ворот, навесов и ограждений на объекте заказчика."
  }
];
