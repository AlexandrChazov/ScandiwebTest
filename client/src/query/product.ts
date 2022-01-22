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
