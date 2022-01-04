import { gql } from "@apollo/client";

export const GET_PRODUCT = gql`
  query category($id: String!) {
    product(id: $id) {
      id
      name
      inStock
      gallery
      description
      category
      attributes {
        id
        name
        type
        items {
          displayValue
          value
          id
        }
      }
      prices {
        currency
        amount
      }
      brand
    }
  }
`;

export interface Product {
  id: string;
  name: string;
  inStock?: boolean;
  gallery?: Array<string>;
  description: string;
  category: string;
  attributes?: Array<AttributeSet>;
  prices: Array<Price>;
  brand: string;
}

interface AttributeSet {
  id: string;
  name?: string;
  type?: string;
  items?: Array<Attribute>;
}

export interface Attribute {
  id: string;
  value?: string;
  displayValue?: string;
}

interface Price {
  currency: string;
  amount: number;
}
