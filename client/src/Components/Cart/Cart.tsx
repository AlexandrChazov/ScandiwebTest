import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { CategoryName as PageName, CurrencyEnum } from "../Products/Products";
import { useAppSelector } from "../../hooks/redux";
import { availableCurrencies } from "../Header";
import { Price } from "../../models/IProducts";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Product = styled.div`
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 3fr 1fr;
  padding: 5em;
  width: 100vw;
`;

const Brand = styled.div`
  font-size: 2em;
`;

const Name = styled.div`
  font-size: 2em;
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

const AttributesWrapper = styled.div`
  display: flex;
`;

const Attribute = styled.div`
  border: 1px solid gray;
  width: 2.5em;
  height: 2em;
  text-align: center;
  margin-right: 0.5em;
`;

const Image = styled.img`
  width: 5em;
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
      {Object.keys(selectedProducts).map((product) => (
        <Product>
          <div>
            <Brand>{selectedProducts[product].brand}</Brand>
            <Name>{product}</Name>
            <ProductPrice>
              <CurrencyLogo
                src={availableCurrencies.img[currencyIndex]}
                alt={availableCurrencies.name[currencyIndex]}
              />
              {`${selectedProducts[product].prices[currencyIndex].amount}`}
            </ProductPrice>
            <AttributesWrapper>
              {selectedProducts[product].atributes
                && Object.keys(selectedProducts[product].atributes).map((atr) => (
                  <Attribute>
                    {selectedProducts[product].atributes[atr]}
                  </Attribute>
                ))}
            </AttributesWrapper>
          </div>
          <div>
            <Image src={selectedProducts[product].image} alt={product} />
          </div>
        </Product>
      ))}
    </Wrapper>
  );
};

type ISelectedProducts = {
  [key: string]: ISelectedProduct;
};

interface ISelectedProduct {
  brand: string;
  prices: Array<Price>;
  image?: string;
  atributes: { [key: string]: string };
}
