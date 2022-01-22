export interface Category {
  name: string;
  products: ProductInfo[];
}

export interface ProductInfo {
  id: string;
  name: string;
  description: string;
  category: string;
  prices: Price[];
  brand: string;
  inStock?: boolean;
  gallery?: string[];
  attributes?: AttributeSet[];
}

export interface AttributeSet {
  id: string;
  name?: string;
  type?: string;
  items?: Attribute[];
}

export interface Attribute {
  id: string;
  displayValue?: string;
  value?: string;
}

export interface Price {
  currency: AvailableCurrency;
  amount: number;
}

export type AvailableCurrency = "USD" | "GBP" | "AUD" | "JPY" | "RUB";
