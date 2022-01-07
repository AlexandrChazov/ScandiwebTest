import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { GET_PRODUCT, Product, Attribute } from "../../query/product";
import { useAppSelector } from "../../hooks/redux";
import { CurrencyEnum } from "../Products/Products";
import { availableCurrencies, CurrencyImage } from "../Header";

const GridWrapper = styled.div`
  padding-top: 3em;
  display: grid;
  grid-template-columns: 1fr 4fr 4fr;
  grid-template-rows: 1fr;
`;

const GalaryWrapper = styled.div`
  padding-left: 6em;
`;

const GalaryImage = styled.img`
  width: 5.5em;
  cursor: pointer;
`;

const BigImageWrapper = styled.div`
  padding-left: 2em;
`;

const BigImage = styled.img`
  width: 38em;
`;

const InfoWrapper = styled.div`
  padding: 1.5em 0 0 6.5em;
`;

const Brand = styled.h2`
  margin: 0 auto;
  font-size: 2em;
`;

const ProductName = styled.h3`
  margin: 0 auto;
  font-size: 2em;
`;

const AttributeName = styled.div`
  margin: 2em auto 0;
  font-size: 1em;
  font-weight: 700;
  text-transform: uppercase;
`;

const AttributeItems = styled.div`
  margin: 0 auto;
`;

const AttributeItem = styled.button`
  margin: 0 auto;
  width: 4.7em;
  height: 3.4em;
  margin: 0.7em 1em 0 0;
  cursor: pointer;
`;

const Prise = styled.div`
  text-transform: uppercase;
  font-weight: 700;
  font-size: 1em;
  margin: 2em auto 1.5em;
`;

const Cost = styled.span`
  font-size: 1.4em;
  font-weight: 700;
`;

const AddToCartButton = styled.button`
  background-color: #5ece7b;
  text-transform: uppercase;
  font-size: 1em;
  border: none;
  color: white;
  width: 18.3em;
  height: 3em;
  margin-top: 1.7em;
  cursor: pointer;
`;

const Description = styled.div`
  font-size: 1em;
  margin-top: 2.5em;
  width: 18em;
`;

export const ProductInfo = (): JSX.Element => {
  const { productId } = useParams();

  const { data, loading /* , error, refetch */ } = useQuery(GET_PRODUCT, {
    variables: {
      id: productId
    }
  });

  const [product, setProduct] = useState({} as Product);
  const [selectedImg, setSelectedImg] = useState(0);
  const [selectedAtrs, setSelectedAtrs] = useState({});
  const { currency } = useAppSelector((state) => state.header);
  const currencyIndex = CurrencyEnum[currency];

  const setAtributes = (id: string, item: Attribute) => {
    const attrs = {} as { [key: string]: string | undefined };
    attrs[id] = item.displayValue;
    setSelectedAtrs({ ...selectedAtrs, ...attrs });
  };

  const handleAddToCart = () => {
    let selectedProducts;
    if (localStorage.getItem("selectedProducts")) {
      selectedProducts = JSON.parse(localStorage.getItem("selectedProducts") as string);
    } else {
      selectedProducts = {};
    }
    const key = product.id;
    const selectedProduct = {
      brand: product.brand,
      prices: product.prices,
      attributes: selectedAtrs,
      image: product.gallery
    };
    selectedProducts[key] = selectedProduct;
    localStorage.setItem("selectedProducts", JSON.stringify(selectedProducts));
  };

  useEffect(() => {
    if (!loading) {
      setProduct(data.product);
    }
  }, [data, loading]);

  return (
    <GridWrapper>
      <GalaryWrapper>
        {product?.gallery
          && product.gallery.map((imgSrc, index) => (
            <div
              key={imgSrc}
              role="presentation"
              onClick={() => setSelectedImg(index)}
            >
              <GalaryImage src={imgSrc} alt="gh" />
            </div>
          ))}
      </GalaryWrapper>
      <BigImageWrapper>
        {product?.gallery && (
          <BigImage src={product?.gallery[selectedImg]} alt="selectedImg" />
        )}
      </BigImageWrapper>
      <InfoWrapper>
        <Brand>{product.brand}</Brand>
        <div>
          <ProductName>{product.id}</ProductName>
          {product?.attributes
            && product?.attributes.map((attribute) => (
              <div key={attribute.id}>
                <AttributeName>{attribute.id}</AttributeName>
                <AttributeItems>
                  {attribute.items
                    && attribute.items.map((item) => (
                      <AttributeItem
                        key={item.id}
                        type="button"
                        onClick={() => setAtributes(attribute.id, item)}
                      >
                        {item.displayValue}
                      </AttributeItem>
                    ))}
                </AttributeItems>
              </div>
            ))}
        </div>
        <div>
          <Prise>price</Prise>
          <CurrencyImage
            src={availableCurrencies.img[currencyIndex]}
            alt={availableCurrencies.name[currencyIndex]}
          />
          <Cost>{product.prices && product.prices[currencyIndex].amount}</Cost>
        </div>
        <AddToCartButton type="button" onClick={() => handleAddToCart()}>
          add to cart
        </AddToCartButton>
        <Description>
          {product.description?.match(/(?<=>)(.*?)(?=<)/gm)}
        </Description>
      </InfoWrapper>
    </GridWrapper>
  );
};
