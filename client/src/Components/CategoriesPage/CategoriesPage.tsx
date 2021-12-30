import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import styled from "styled-components";
import {
  NavLink, useParams
} from "react-router-dom";
import { GET_CATEGORY, ProductsType } from "../../query/category";
import { availableCurrency, Header } from "./Header";
import { useAppSelector } from "../../hooks/redux";

const Main = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const CategoryName = styled.div`
  font-size: 2.6em;
  letter-spacing: 0.03em;
  margin: 2em 0em 0em 2.4em;
  text-transform: uppercase;
`;

const ProductWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-row-gap: 8.7em;
  text-align: center;
  padding: 8em 0em;
`;

const ProductCard = styled.div`
  justify-self: center;
  box-shadow: 0px 0px 7px 0.5px #c3c3c3;
  &:hover {
    cursor: pointer;
  }
`;

const ProductImage = styled.img`
  width: 22em;
  height: 20.6em;
`;

const ProductName = styled.div`
  text-align: start;
  padding-top: 1.5em;
  padding-left: 3.4em;
`;

const ProductPrice = styled.div`
  display: flex;
  text-align: start;
  padding-top: 0.6em;
  padding-left: 3.4em;
  margin-bottom: 1em;
`;

const CurrencyLogo = styled.img`
  width: 1em;
  margin-right: 0.3em;
`;

// eslint-disable-next-line no-shadow
enum CurrencyEnum {
  USD,
  GBP,
  AUD,
  JPY,
  RUB
}

export const CategoriesPage = () => {
  const { category } = useParams();
  const { data, loading /* , error, refetch */ } = useQuery(GET_CATEGORY, {
    variables: {
      input: {
        title: category
      }
    }
  });

  const [products, setProducts] = useState([] as Array<ProductsType>);
  const { currency } = useAppSelector((state) => state.header);

  useEffect(() => {
    if (!loading) {
      setProducts(data?.category?.products);
    }
  }, [data, loading]);

  return (
    <Main>
      <CategoryName>{category}</CategoryName>
      <ProductWrapper>
        {products?.map((product) => (
          <ProductCard key={product.id}>
            <NavLink to={`/${category}/${product.id}`}>
              <ProductImage src={product.gallery[0]} alt="product" />
            </NavLink>
            <ProductName>{product.name}</ProductName>
            <ProductPrice>
              <CurrencyLogo
                src={availableCurrency.img[CurrencyEnum[currency]]}
                alt={availableCurrency.name[CurrencyEnum[currency]]}
              />
              {`${product.prices[CurrencyEnum[currency]].amount}`}
            </ProductPrice>
          </ProductCard>
        ))}
      </ProductWrapper>
    </Main>
  );
};
