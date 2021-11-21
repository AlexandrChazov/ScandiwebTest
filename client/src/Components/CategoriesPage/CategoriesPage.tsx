import React, {useEffect, useState} from "react";
import styles from "./CategoriesPage.module.css";
import {useQuery} from "@apollo/client";
import {GET_CATEGORY, ProductsType} from "../../Query/category";

export const CategoriesPage: React.FC<CategoriesPagePropsType> = ({category}) => {

  const {data, loading/*, error, refetch*/} = useQuery(GET_CATEGORY, {
    variables: {
       input: {
         title: category
       }
    }
  });

  const [products, setProducts] = useState([] as Array<ProductsType>);

  useEffect(() => {
    if (!loading) {
      setProducts(data.category.products)
    }
  }, [data])

  return (
    <div className={styles.wrapper}>
      <div>
        {category}
      </div>
      <div className={styles.productCardWrapper}>
        {products?.map((el: ProductsType) => {
          return (
            <div className={styles.productCard}>
              <div className={styles.img}><img src={el.gallery[0]}/></div>
              <div>{el.name}</div>
              <div>{`${el.prices[0].currency} ${el.prices[0].amount}`}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

type CategoriesPagePropsType = {
  category: string
}