export interface Product {
    id: number;
    name: string;
    category_name: string;
    brand_name: string;
    ean: string;
    quantity: number;
    price: number;
    weight: number;
}

export interface Category {
  id: string;
  name: string;
  brand_name: string;
}

export interface Brand {
    id: string;
    name: string;
}
