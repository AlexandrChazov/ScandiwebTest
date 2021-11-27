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
      <div>{title}</div>
      <ProductWrapper>
        {products?.map((el: ProductsType) => {
          return (
            <div key={el.id}>
              <Image>
                <img src={el.gallery[0]} alt="product" />
              </Image>
              <div>{el.name}</div>
              <div>{`${el.prices[0].currency} ${el.prices[0].amount}`}</div>
            </div>
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

const ProductWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  text-align: center;
`;

const Image = styled.div`
  & > img {
    width: 10em;
  }
`;
