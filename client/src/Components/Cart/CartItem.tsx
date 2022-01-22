import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { availableCurrencies } from "../Header";
import ArrowToLeft from "../../assets/arrowLeft.svg";
import ArrowToRight from "../../assets/arrowRight.svg";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { SelectedProductType, setSelectedProducts } from "../../store/reducers/cartSlice";

const Product = styled.div<{ isInHeader: boolean }>`
  ${(props) => (props.isInHeader
    ? `{
        display: grid;
        grid-template-rows: 1fr;
        grid-template-columns: 1fr 1fr;
      }`
    : `{
        display: grid;
        grid-template-rows: 1fr;
        grid-template-columns: 3fr 1fr;
        padding: 0 9em 2em 6em;
        width: 100vw;
        &::before {
          position: absolute;
          transform: translate(0%, -0.7em);
          content: "";
          width: 78%;
          height: 1px;
          background: #e5e5e5;
        }
      }`)}
`;

const Brand = styled.div<{ isInHeader: boolean }>`
  ${(props) => (props.isInHeader
    ? `{
        font-size: 1em;
      }`
    : `{
        font-size: 2em;
      }`)}
`;

const Name = styled.div<{ isInHeader: boolean }>`
  ${(props) => (props.isInHeader
    ? `{
        font-size: 1em;
      }`
    : `{
        font-size: 2em;
      }`)}
`;

const ProductPrice = styled.div<{ isInHeader: boolean }>`
  ${(props) => (props.isInHeader
    ? `{
        display: flex;
        align-items: center;
        padding: 0.5em 0 0.7em 0;
        font-size: 1em;
        font-weight: 700;
      }`
    : `{
        display: flex;
        align-items: center;
        padding: 0.5em 0 0.7em 0;
        font-size: 1.5em;
        font-weight: 700;
      }`)}
`;

const CurrencyLogo = styled.img<{ isInHeader: boolean }>`
  ${(props) => (props.isInHeader
    ? `{
        width: 0.5em;
        height: 0.7em;
        margin-right: 0.3em;
      }`
    : `{
        width: 0.7em;
        height: 1em;
        margin-right: 0.3em;
      }`)}
`;

const AttributesWrapper = styled.div`
  display: flex;
`;

const Attribute = styled.div<{ isInHeader: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid gray;
  margin-right: 0.5em;
  ${(props) => (props.isInHeader
    ? `{
        width: 1.5em;
        height: 1.5em;
        background-color: #fff;
        color: #000;
      }`
    : `{
        width: 4em;
        height: 3em;
        background-color: #1d1f22;
        color: #ffffff;
    }`)}
`;

const AmountWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const ButtonsWrapper = styled.div<{ isInHeader: boolean }>`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 1em;
  padding-top: 0.6em;
  ${(props) => (props.isInHeader
    ? `{
        justify-content: space-around;
      }`
    : `{
        justify-content: space-between;
      }`)}
`;

const ChangeAmountButton = styled.button<{ isInHeader: boolean }>`
  ${(props) => (props.isInHeader
    ? `{
        width: 1.5em;
        height: 1.5em;
      }`
    : `{
        width: 3.5em;
        height: 3.5em;
      }`)}
`;

const Amount = styled.div<{ isInHeader: boolean }>`
  ${(props) => (props.isInHeader
    ? `{
        font-size: 1em;
        font-weight: 700;
      }`
    : `{
        font-size: 1.5em;
        font-weight: 700;
      }`)}
`;

const ImageWrapper = styled.div<{ isInHeader: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  ${(props) => (props.isInHeader
    ? `{
        width: 6em;
        height: 8em;
      }`
    : `{
        width: 8em;
        height: 10em;
      }`)}
`;

const ArrowWrapper = styled.div`
  position: absolute;
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const ArrowImage = styled.img`
  width: 1em;
`;

const Image = styled.img`
  width: 100%;
`;

export const CartItem: React.FC<PropsType> = ({
  currencyIndex,
  selectedProducts,
  goods,
  isInHeader
}) => {
  const amount = useAppSelector(
    (state) => state.cart.selectedProducts[goods]?.count
  );
  const [index, setIndex] = useState(0);
  const [src, setSrc] = useState("");
  const dispatch = useAppDispatch();

  useEffect(() => {
    setSrc(selectedProducts[goods].image[index]);
  }, [index]);

  const handleChageImage = (arrowTo: string) => {
    if (selectedProducts[goods].image) {
      if (arrowTo === "prev") {
        if (index === 0) {
          setIndex(selectedProducts[goods].image.length - 1);
        } else {
          setIndex((ind) => ind - 1);
        }
      }
      if (arrowTo === "next") {
        if (index === selectedProducts[goods].image.length - 1) {
          setIndex(0);
        } else {
          setIndex((ind) => ind + 1);
        }
      }
    }
  };

  const handleChangeAmount = (more: boolean) => {
    const changedSelectedProducts = {
      ...selectedProducts,
      [goods]: {
        ...selectedProducts[goods],
        count: more ? amount + 1 : amount - 1
      }
    };
    localStorage.setItem("selectedProducts", JSON.stringify(changedSelectedProducts));
    dispatch(setSelectedProducts(changedSelectedProducts));
  };

  return (
    <Product isInHeader={isInHeader}>
      <div>
        <Brand isInHeader={isInHeader}>{selectedProducts[goods].brand}</Brand>
        <Name isInHeader={isInHeader}>{goods}</Name>
        <ProductPrice isInHeader={isInHeader}>
          <CurrencyLogo
            src={availableCurrencies.img[currencyIndex]}
            alt={availableCurrencies.name[currencyIndex]}
            isInHeader={isInHeader}
          />
          {`${selectedProducts[goods].prices[currencyIndex].amount}`}
        </ProductPrice>
        <AttributesWrapper>
          {selectedProducts[goods].attributes
          && Object.keys(selectedProducts[goods].attributes).map((atr: string) => (
            <Attribute isInHeader={isInHeader} key={atr}>
              {selectedProducts[goods].attributes[atr]}
            </Attribute>
          ))}
        </AttributesWrapper>
      </div>
      <AmountWrapper>
        <ButtonsWrapper isInHeader={isInHeader}>
          <ChangeAmountButton onClick={() => handleChangeAmount(true)} isInHeader={isInHeader}>
            +
          </ChangeAmountButton>
          <Amount isInHeader={isInHeader}>{amount}</Amount>
          <ChangeAmountButton
            onClick={() => handleChangeAmount(false)}
            disabled={amount === 1}
            isInHeader={isInHeader}
          >
            -
          </ChangeAmountButton>
        </ButtonsWrapper>
        <ImageWrapper isInHeader={isInHeader}>
          <ArrowWrapper>
            <ArrowImage
              src={ArrowToLeft}
              alt="prev"
              onClick={() => handleChageImage("prev")}
            />
            <ArrowImage
              src={ArrowToRight}
              alt="next"
              onClick={() => handleChageImage("next")}
            />
          </ArrowWrapper>
          <Image src={src} alt={goods} />
        </ImageWrapper>
      </AmountWrapper>
    </Product>
  );
};

interface PropsType {
  goods: string;
  selectedProducts: { [key: string]: SelectedProductType };
  currencyIndex: number;
  isInHeader: boolean;
}
