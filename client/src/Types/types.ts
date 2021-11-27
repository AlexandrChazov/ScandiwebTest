export type ProductType = {
  id: string;
  name: string;
  inStock: boolean;
  gallery: string;
  description: string;
  category: string;
  attributes: AttributeSetType;
  prices: PriceType;
  brand: string;
};

export type AttributeSetType = {
  id: string;
  name: string;
  type: string;
  items: AttributeType;
};

export type AttributeType = {
  displayValue: string;
  value: string;
  id: string;
};

export type PriceType = {
  currency: string;
  amount: number;
};
