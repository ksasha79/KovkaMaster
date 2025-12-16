export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface PortfolioItem {
  id: string;
  imageUrl: string;
  title: string;
  category: 'gates' | 'fences' | 'welding';
  isAiGenerated?: boolean;
}

export interface ContactForm {
  name: string;
  phone: string;
  message: string;
}

export enum Region {
  ROSTOV = 'Ростовская область',
  DNR = 'ДНР',
  LNR = 'ЛНР'
}