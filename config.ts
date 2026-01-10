/// правки от Alex



///export const CONTACTS = {
///  // Основной номер телефона (для ссылок)
///  MANAGER_PHONE: "79920595253", // Формат: 7XXXXXXXXXX (без плюса)
/// 
///  // Отображаемый номер телефона
///  MANAGER_PHONE_DISPLAY: "+7 (992) 059-52-53",
///  
///  // Дополнительный номер (Завод)
/// FACTORY_PHONE: "79591878949",
///  FACTORY_PHONE_DISPLAY: "+7 (959) 187-89-49",
/// 
///  // Электронная почта
///  EMAIL: "evrozabory6@gmail.com",
///  
///  // Социальные сети и мессенджеры
///  TELEGRAM_USER: "evrozabory6", // Юзернейм или ссылка на бота/менеджера
///  WHATSAPP_LINK: "79920595253", // Номер для WhatsApp ссылки
///  
///  // Название компании
///  COMPANY_NAME: "ООО «Евро-Заборы»",
///  WEBSITE_URL: "евро-заборы.рф",
///
///  // Ссылка на фоновое 3D видео (mp4)
///  // Для примера поставлю качественный архитектурный фон. Замените на свое видео.
///  HERO_VIDEO_URL: "https://player.vimeo.com/external/494252666.sd.mp4?s=bc2463e2646274b572620257e80f4f91e3e7f480&profile_id=164&oauth2_token_id=57447761"
///};



export interface ContactConfig {
  COMPANY_NAME: string;
  SLOGAN: string;
  MANAGER_PHONE: string;
  MANAGER_PHONE_DISPLAY: string;
  FACTORY_PHONE: string;
  FACTORY_PHONE_DISPLAY: string;
  EMAIL: string;
  TELEGRAM_USER: string;
  WHATSAPP_LINK: string;
  WEBSITE_URL: string;
  HERO_VIDEO_URL: string;
}

///export const CONTACTS: ContactConfig = {
///  COMPANY_NAME: "ООО Евро-Заборы",
///  SLOGAN: "Заводское производство и профессиональный монтаж систем ограждений",
///  MANAGER_PHONE: "79920595253",
///  MANAGER_PHONE_DISPLAY: "+7 (992) 059-52-53",
///  FACTORY_PHONE: "79591878949",
///  FACTORY_PHONE_DISPLAY: "+7 (959) 187-89-49",
///  EMAIL: "info@euro-zabory.рф",
///  TELEGRAM_USER: "euro_zabory_rostov",
/// WHATSAPP_LINK: "79920595253",
///  WEBSITE_URL: "евро-заборы.рф",
///  HERO_VIDEO_URL: "https://player.vimeo.com/external/371433846.sd.mp4?s=231519c1701abc06174090299933bb38581cc8d1&profile_id=164&oauth2_token_id=57447761"
///};

///export const CONTACTS = {
///  COMPANY_NAME: "ООО «Евро-Заборы»",
///  SLOGAN: "Завод систем ограждений №1",
///  PHONE: "79591878949",
///  PHONE_DISPLAY: "+7 (959) 187-89-49",
///  MANAGER_PHONE: "79920595253",
///  MANAGER_PHONE_DISPLAY: "+7 (992) 059-52-53",
///  EMAIL: "info@euro-zabory.ru",
///  LOCATION: "Ростов-на-Дону / ДНР / ЛНР",
///  TELEGRAM_USER: "euro_zabor_manager",
///  WHATSAPP_LINK: "79920595253",
///  FACTORY_ADDRESS: "г. Ростов-на-Дону, ул. Производственная, 12"
///};

export const CONTACTS = {
  COMPANY_NAME: "ООО «Евро-Заборы»",
  BRAND_NAME: "Евро-Заборы",
  SLOGAN: "Завод систем ограждений полного цикла",
  PHONE: "79591878949",
  PHONE_DISPLAY: "+7 (959) 187-89-49",
  MANAGER_PHONE: "79912644770",
  MANAGER_PHONE_DISPLAY: "+7 (959) 187-89-49",
  EMAIL: "evrozabory6@gmail.com",
  LOCATION: "Ростов-на-Дону, ДНР, ЛНР, Воронеж, Белгород, Курск, Тамбов, Липецк ",
  TELEGRAM_USER: "8201704520",
  WHATSAPP_LINK: "79591878949",
  DOMAIN: "евро-заборы.рф",
  FACTORY_ADDRESS: "Производственная база: г. Аксай, ул. Промышленная / Прямые поставки в Мариуполь, Донецк, Луганск"
};