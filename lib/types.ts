export interface Position {
  floor_id: number;
  x: number;
  y: number;
  lat: number;
  lng: number;
  radius: number;
  georeferences: {
    lat: number;
    lng: number;
  };
  cartesians: {
    x: number;
    y: number;
  };
}

export interface CustomField {
  id: number;
  name: string;
  value: string | number | boolean | null;
  type: 'text' | 'number' | 'boolean' | 'date';
  required: boolean;
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: number;
  name: string;
  icon_url: string;
  selected_icon_url: string;
  name_es: string;
  name_en: string;
  code: string;
  created_at: string;
  updated_at: string;
  parent_poi_category_id: number | null;
  custom_fields: CustomField[];
  public: boolean;
}

export interface POI {
  id: number;
  created_at: string;
  updated_at: string;
  category_name: string;
  position: Position;
  building_id: number;
  name: string;
  info: string;
  custom_fields: CustomField[];
  category_id: number;
  categories: Category[];
  icon: string | null;
  selected_icon: string | null;
  type: string | null;
  project_id: number;
  info_unsafe: string;
}

export interface FormData {
  email: string;
  apiKey: string;
  buildingId: number;
} 