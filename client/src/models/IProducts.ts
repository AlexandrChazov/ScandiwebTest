export interface Product {
  id: string;
  name: string;
  inStock: boolean;
  gallery: string;
  description: string;
  category: string;
  attributes: AttributeSet;
  prices: Price;
  brand: string;
}

export interface AttributeSet {
  id: string;
  name: string;
  type: string;
  items: Attribute;
}

export interface Attribute {
  displayValue: string;
  value: string;
  id: string;
}

export interface Price {
  currency: string;
  amount: number;
}
