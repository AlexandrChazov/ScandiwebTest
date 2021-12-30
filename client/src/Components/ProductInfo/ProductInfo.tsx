import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { GET_PRODUCT, Product } from "../../query/product";

export const ProductInfo = () => {
  const { productId } = useParams();
  const {
    data, loading, error, refetch
  } = useQuery(GET_PRODUCT, {
    variables: {
      id: productId
    }
  });

  const [product, setProduct] = useState({} as Product);

  useEffect(() => {
    setProduct(data);
  }, [data, loading]);

  return (
    <div>
      {productId}
    </div>
  );
};
