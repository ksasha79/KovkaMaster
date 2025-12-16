export interface CatalogItem {
  id: number;
  title: string;
  category: 'gates' | 'fences' | 'decor' | 'welding';
  image: string; // Ссылка на картинку
  description?: string;
}

export const catalogData: CatalogItem[] = [
  // ==========================================
  // КАК ДОБАВИТЬ СВОЮ РАБОТУ:
  // ==========================================
  
  // ВАРИАНТ 1 (Простой): Внешняя ссылка
  // Загрузите фото на postimages.org, скопируйте "Прямую ссылку" и вставьте сюда:
  /*
  {
    id: 101,
    title: "Мои ворота",
    category: 'gates',
    image: "https://i.postimg.cc/пример/фото.jpg", 
    description: "Ковка ручной работы"
  },
  */

  // ВАРИАНТ 2 (Надежный): Фото внутри проекта
  // 1. На GitHub нажмите Add file -> Upload files
  // 2. Перетащите ваше фото (например, vorota1.jpg) в папку public/images/
  // 3. Напишите путь так:
  /*
  {
    id: 102,
    title: "Ворота с калиткой",
    category: 'gates',
    image: "/images/vorota1.jpg", 
    description: "Установили в Батайске"
  },
  */

  // --- СПИСОК РАБОТ ---

  // --- ВОРОТА ---
  {
    id: 1,
    title: "Кованые ворота 'Барокко'",
    category: 'gates',
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80",
    description: "Сложная художественная ковка с элементами золочения."
  },
  {
    id: 2,
    title: "Откатные ворота 'Модерн'",
    category: 'gates',
    image: "https://images.unsplash.com/photo-1622372658604-0373df45f22e?auto=format&fit=crop&w=800&q=80",
    description: "Современный стиль, автоматика, глухая зашивка."
  },
  
  // --- ЗАБОРЫ ---
  {
    id: 3,
    title: "Забор с кирпичными столбами",
    category: 'fences',
    image: "https://images.unsplash.com/photo-1599423300746-b62507ac9705?auto=format&fit=crop&w=800&q=80",
    description: "Комбинированный забор: кирпич + кованые секции."
  },
  
  // --- ДЕКОР ---
  {
    id: 4,
    title: "Кованые перила",
    category: 'decor',
    image: "https://plus.unsplash.com/premium_photo-1678900994119-03c0032943b0?auto=format&fit=crop&w=800&q=80",
    description: "Перила для входной группы."
  },
  
  // --- ПРИМЕРЫ СВАРКИ ---
  {
    id: 5,
    title: "Навес для авто",
    category: 'welding',
    image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80",
    description: "Металлокаркас с поликарбонатом."
  }
];