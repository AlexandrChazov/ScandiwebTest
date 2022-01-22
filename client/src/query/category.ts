import { gql } from "@apollo/client";
import { ProductInfo } from "../models/types";

export const GET_CATEGORY = gql`
  query category($input: CategoryInput) {
    category(input: $input) {
      products {
        id
        name
        gallery
        prices {
          currency
          amount
        }
      }
    }
  }
`;

// interface Products extends Omit<Category, "name" | "products"> {
//   products: Product;
// }

export type Product = Omit<
  ProductInfo,
  "description" | "category" | "brand" | "inStock" | "attributes"
>;
