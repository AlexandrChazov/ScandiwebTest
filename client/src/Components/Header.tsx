import React, { useState } from "react";
import styled from "styled-components";
import { NavLink, useParams } from "react-router-dom";
import brandIcon from "../assets/VSF.png";
import emptyCartIcon from "../assets/empty_cart.png";
import USD from "../assets/USD.png";
import GBP from "../assets/GBP.png";
import JPY from "../assets/JPY.png";
import AUD from "../assets/AUD.png";
import RUB from "../assets/RUB.png";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { setCurrency } from "../store/reducers/headerSlice";
import { AvailableCurrency } from "../models/IProducts";
import { GetCategories } from "../App";
import { CurrencyEnum } from "./Products/Products";
import { ISelectedProducts } from "./Cart/Cart";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 0.2fr 1fr;
  grid-template-rows: 5em;
`;

const LeftMenu = styled.div`
  display: flex;
  align-self: center;
  padding-left: 7em;
  padding-bottom: 0.5em;
  & div {
    padding: 0 1em;
  }
`;

const Category = styled(NavLink)<{ active: string | null }>`
  text-decoration: none;
  text-transform: uppercase;
  color: black;
  margin-right: 2em;
  position: relative;
  ${(props) => (props.active
    ? `
    &::after {
      position: absolute;
      transform: translate(-85%, 3.3em);
      content: "";
      width: 140%;
      height: 2px;
      background: #5ece7b;
}`
    : null)}
`;

const BrandIcon = styled.img`
  align-self: center;
  justify-self: center;
  margin-top: 0.5em;
  margin-left: 1em;
`;

const RightMenu = styled.div`
  display: flex;
  justify-self: end;
  align-self: center;
  padding-top: 0.8em;
  padding-right: 5.2em;
  > div {
    padding: 0 1em;
  }
`;

const CurrencyIcon = styled.img`
  width: 0.7em;
  height: 1.2em;
  margin-right: 2.2em;
  &:hover {
    cursor: pointer;
  }
`;

const CurrencyInput = styled.div<{ isOpen: string }>`
  margin-top: 1em;
  display: ${(props) => (props.isOpen === "true" ? "flex" : "none")};
  flex-direction: column;
  justify-content: space-around;
  position: absolute;
  fit-content;
  box-shadow: 0px 0px 7px 0.5px #c3c3c3;
  background-color: white;
  z-index: 1;
`;

const CurrencyInputItem = styled.div`
  display: flex;
  margin: 0.5em auto;
  &:hover {
    cursor: pointer;
  }
`;

export const CurrencyImage = styled.img`
  width: 1em;
`;

const CartLink = styled(NavLink)<{ active: string | null }>`
  ${(props) => (props.active
    ? `
    &::after {
      position: absolute;
      transform: translate(-85%, 3.3em);
      content: "";
      width: 50%;
      height: 2px;
      background: #5ece7b;
}`
    : null)}
`;

const CartIconWrapper = styled.div`
  position: relative;
`;

const EmptyCartIcon = styled.img`
  width: 1.5em;
  height: 1.3em;
  &:hover {
    cursor: pointer;
  }
`;

const GoodsInCart = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: -25%;
  color: white;
  background-color: black;
  left: 55%;
  border-radius: 100%;
  font-size: 0.7em;
  height: 1.7em;
  width: 1.7em;
  padding: 0;
`;

type PropsType = {
  categories: Array<GetCategories>;
};

export const availableCurrencies = {
  name: ["USD", "GBP", "AUD", "JPY", "RUB"] as Array<AvailableCurrency>,
  img: [USD, GBP, AUD, JPY, RUB]
};

export const Header: React.FC<PropsType> = ({ categories }) => {
  const cart = JSON.parse(
    localStorage.getItem("selectedProducts") as string
  ) as ISelectedProducts;
  const goodsCount = cart && Object.keys(cart).length;
  const { category } = useParams();
  const [activeLink, setActiveLink] = useState(category);
  // const [goodsCount, setGoodsCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const { currency } = useAppSelector((state) => state.header);
  const currencyIndex = CurrencyEnum[currency];
  const dispatch = useAppDispatch();

  return (
    <Wrapper>
      <LeftMenu>
        {categories.map((cat) => (
          <Category
            key={cat.name}
            to={`/${cat.name}`}
            onClick={() => {
              setActiveLink(cat.name);
            }}
            active={activeLink === cat.name ? "true" : null}
          >
            {cat.name}
          </Category>
        ))}
      </LeftMenu>
      <BrandIcon src={brandIcon} alt="VSF" />
      <RightMenu>
        <CurrencyIcon
          src={availableCurrencies.img[currencyIndex]}
          alt={availableCurrencies.name[currencyIndex]}
          onClick={() => setIsOpen(!isOpen)}
        />
        <CurrencyInput
          isOpen={isOpen.toString()}
          onClick={() => setIsOpen(false)}
        >
          {availableCurrencies.name.map(
            (name: AvailableCurrency, index: number) => (
              <CurrencyInputItem
                key={name}
                onClick={() => dispatch(setCurrency(name))}
              >
                <CurrencyImage
                  src={availableCurrencies.img[index]}
                  alt={name}
                />
                <span>{name}</span>
              </CurrencyInputItem>
            )
          )}
        </CurrencyInput>
        <CartIconWrapper>
          <CartLink
            to="/cart"
            onClick={() => {
              setActiveLink("cart");
            }}
            active={activeLink === "cart" ? "true" : null}
          >
            <EmptyCartIcon src={emptyCartIcon} alt="emptyCart" />
            {!!goodsCount && <GoodsInCart>{goodsCount}</GoodsInCart>}
          </CartLink>
        </CartIconWrapper>
      </RightMenu>
    </Wrapper>
  );
};
