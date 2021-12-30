import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { useQuery } from "@apollo/client";
import { MainPage } from "./Components/MainPage/MainPage";
import { CategoriesPage } from "./Components/CategoriesPage/CategoriesPage";
import { GET_CATEGORIES } from "./query/categories";
import { ProductInfo } from "./Components/ProductInfo/ProductInfo";

export const App = () => {
  const { data, loading /* , error, refetch */ } = useQuery(GET_CATEGORIES);
  const [categories, setCategories] = useState([] as Array<GetCategories>);

  useEffect(() => {
    if (!loading) {
      setCategories(data?.categories);
    }
  }, [data, loading]);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage categories={categories} />} />

        {categories?.map((category) => (
          <Route
            path={`${category.name}`}
            element={<CategoriesPage categories={categories} />}
          />
        ))}
        {categories?.map((category) => {
          const categoryLink = category.name;
          return category.products.map((product) => <Route path={`${categoryLink}/${product.id}`} element={<ProductInfo />} />);
        })}

        <Route path="*" element={<div>Page not found</div>} />
      </Routes>
    </BrowserRouter>
  );
};

interface GetCategories {
  name: string
  products: Array<Product>
}

export interface Product {
  id: string
}
