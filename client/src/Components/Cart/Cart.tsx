import React from "react";
import styled from "styled-components";
import { CurrencyEnum } from "../Products/Products";
import { useAppSelector } from "../../hooks/redux";
import { Price } from "../../models/IProducts";
import { CartItem } from "./CartItem";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const PageName = styled.h1`
  font-size: 2em;
  font-weight: 700;
  margin: 2.4em 0 2.2em 3em;
  text-transform: uppercase;
`;

export const Cart = () => {
  const selectedProducts = JSON.parse(
    localStorage.getItem("selectedProducts") as string
  ) as ISelectedProducts;

  const { currency } = useAppSelector((state) => state.header);
  const currencyIndex = CurrencyEnum[currency];

  console.log(selectedProducts);

  return (
    <Wrapper>
      <PageName>Cart</PageName>
      {Object.keys(selectedProducts).map((goods) => (
        <CartItem
          key={goods}
          goods={goods}
          selectedProducts={selectedProducts}
          currencyIndex={currencyIndex}
        />
      ))}
    </Wrapper>
  );
};

export type ISelectedProducts = {
  [key: string]: ISelectedProduct;
};

interface ISelectedProduct {
  brand: string;
  prices: Array<Price>;
  image?: string[];
  attributes: { [key: string]: string };
}
