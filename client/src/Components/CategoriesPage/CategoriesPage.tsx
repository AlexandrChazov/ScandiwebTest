import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_CATEGORY, ProductsType } from "../../Query/category";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { Header } from "./Header";

export const CategoriesPage: React.FC<CategoriesPagePropsType> = () => {
  const { pathname } = useLocation();
  const splitedUrl = pathname.split("/");
  const title = splitedUrl[splitedUrl.length - 1];
  const { data, loading /*, error, refetch*/ } = useQuery(GET_CATEGORY, {
    variables: {
      input: {
        title: `${title}`,
      },
    },
  });

  const [products, setProducts] = useState([] as Array<ProductsType>);

  useEffect(() => {
    if (!loading) {
      setProducts(data.category.products);
    }
  }, [data, loading]);

  return (
    <Main>
      <Header />
      <CategoryName>Category name</CategoryName>
      <ProductWrapper>
        {products?.map((el: ProductsType) => {
          return (
            <ProductCard key={el.id}>
              <ProductImage src={el.gallery[0]} alt="product" />
              <ProductName>{el.name}</ProductName>
              <ProductPrice>{`${el.prices[0].currency} ${el.prices[0].amount}`}</ProductPrice>
            </ProductCard>
          );
        })}
      </ProductWrapper>
    </Main>
  );
};

type CategoriesPagePropsType = {};

const Main = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const CategoryName = styled.div`
  font-size: 2.6em;
  letter-spacing: 0.03em;
  margin: 2em 0em 0em 2.4em;
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
  text-align: start;
  padding-top: 0.6em;
  padding-left: 3.4em;
`;
