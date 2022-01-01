import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { GET_PRODUCT, Product } from "../../query/product";
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
  padding: 1em 0 0 6.5em;
`;

const Brand = styled.h2`
  margin: 0 auto;
  font-size: 2em;
`;

export const ProductInfo = () => {
  const { productId } = useParams();
  const { data, loading /* , error, refetch */ } = useQuery(GET_PRODUCT, {
    variables: {
      id: productId
    }
  });

  const [product, setProduct] = useState({} as Product);
  const [selectedImg, setSelectedImg] = useState(0);
  const { currency } = useAppSelector((state) => state.header);
  const currencyIndex = CurrencyEnum[currency];

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
          <div>{product.id}</div>
          {product?.attributes
            && product?.attributes.map((attribute) => (
              <div key={attribute.id}>
                <div>{attribute.id}</div>
                {attribute.items
                  && attribute.items.map((item) => (
                    <button key={item.value} type="button">
                      {item.value}
                    </button>
                  ))}
              </div>
            ))}
        </div>
        <div>
          <div>price</div>
          <CurrencyImage
            src={availableCurrencies.img[currencyIndex]}
            alt={availableCurrencies.name[currencyIndex]}
          />
          {product.prices && product.prices[currencyIndex].amount}
        </div>
        <button type="button">add to cart</button>
        <div>{product.description?.match(/(?<=>)(.*?)(?=<)/gm)}</div>
      </InfoWrapper>
    </GridWrapper>
  );
};
