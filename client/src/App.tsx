import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { useQuery } from "@apollo/client";
import { StartPage } from "./Components/StartPage/StartPage";
import { CategoriesPage } from "./Components/CategoriesPage/CategoriesPage";
import { GET_CATEGORIES } from "./query/categories";
import { ProductInfo } from "./Components/ProductInfo/ProductInfo";
import { MainContent } from "./Components/MainContent/MainContent";

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
        <Route path="/" element={<StartPage categories={categories} />} />
        <Route path=":category" element={<MainContent categories={categories} />}>
          <Route index element={<CategoriesPage />} />
          <Route path=":productId" element={<ProductInfo />} />
        </Route>
        <Route path="*" element={<div>Page not found</div>} />
      </Routes>
    </BrowserRouter>
  );
};

export interface GetCategories {
  name: string;
}
