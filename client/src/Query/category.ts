import {gql} from '@apollo/client';

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
`

export type ProductsType = {
 id: number
 name: string
 gallery: string
 prices: Array<PricesType>
}

type PricesType = {
  currency: string
  amount: number
}