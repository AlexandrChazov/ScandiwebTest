import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { availableCurrencies } from "../Header";
import { ISelectedProducts } from "./Cart";
import ArrowToLeft from "../../assets/arrowLeft.svg";
import ArrowToRight from "../../assets/arrowRight.svg";

const Product = styled.div`
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
`;

const Brand = styled.div`
  font-size: 2em;
`;

const Name = styled.div`
  font-size: 2em;
`;

const ProductPrice = styled.div`
  display: flex;
  align-items: center;
  padding: 0.5em 0 0.7em 0;
  font-size: 1.5em;
  font-weight: 700;
`;

const CurrencyLogo = styled.img`
  width: 0.7em;
  height: 1em;
  margin-right: 0.3em;
`;

const AttributesWrapper = styled.div`
  display: flex;
`;

const Attribute = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid gray;
  width: 4em;
  height: 3em;
  margin-right: 0.5em;
  background-color: #1d1f22;
  color: #ffffff;
`;

const AmountWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const ButtonsWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin-right: 1em;
  padding-top: 0.6em;
`;

const ChangeAmountButton = styled.button`
  width: 3.5em;
  height: 3.5em;
`;

const Amount = styled.div`
  font-size: 1.5em;
  font-weight: 700;
`;

const ImageWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 8em;
  height: 10em;
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
  goods
}) => {
  const [amount, setAmount] = useState(1);
  const [index, setIndex] = useState(0);
  const [src, setSrc] = useState("");

  useEffect(() => {
    if (selectedProducts[goods].image) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore todo
      setSrc(selectedProducts[goods].image[index]);
    }
  }, [index]);

  const handleChageImage = (arrowTo: string) => {
    if (selectedProducts[goods].image) {
      if (arrowTo === "prev") {
        if (index === 0) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore todo
          setIndex(selectedProducts[goods].image.length - 1);
        } else {
          setIndex((ind) => ind - 1);
        }
      }
      if (arrowTo === "next") {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore todo
        if (index === selectedProducts[goods].image.length - 1) {
          setIndex(0);
        } else {
          setIndex((ind) => ind + 1);
        }
      }
    }
  };

  return (
    <Product>
      <div>
        <Brand>{selectedProducts[goods].brand}</Brand>
        <Name>{goods}</Name>
        <ProductPrice>
          <CurrencyLogo
            src={availableCurrencies.img[currencyIndex]}
            alt={availableCurrencies.name[currencyIndex]}
          />
          {`${selectedProducts[goods].prices[currencyIndex].amount}`}
        </ProductPrice>
        <AttributesWrapper>
          {selectedProducts[goods].attributes
            && Object.keys(selectedProducts[goods].attributes).map((atr) => (
              <Attribute>{selectedProducts[goods].attributes[atr]}</Attribute>
            ))}
        </AttributesWrapper>
      </div>
      <AmountWrapper>
        <ButtonsWrapper>
          <ChangeAmountButton onClick={() => setAmount((value) => value + 1)}>
            +
          </ChangeAmountButton>
          <Amount>{amount}</Amount>
          <ChangeAmountButton
            onClick={() => setAmount((value) => value - 1)}
            disabled={amount === 1}
          >
            -
          </ChangeAmountButton>
        </ButtonsWrapper>
        <ImageWrapper>
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
  selectedProducts: ISelectedProducts;
  currencyIndex: number;
}
