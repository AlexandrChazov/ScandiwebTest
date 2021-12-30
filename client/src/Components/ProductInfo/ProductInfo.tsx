import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_PRODUCT, Product } from "../../query/product";
import { useUrlLastChild } from "../../common/useUrlLastChild";

export const ProductInfo = () => {
  const productId = useUrlLastChild();
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
