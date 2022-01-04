import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { useQuery } from "@apollo/client";
import { StartPage } from "./Components/StartPage";
import { Products } from "./Components/Products/Products";
import { GET_CATEGORIES } from "./query/categories";
import { ProductInfo } from "./Components/Product/ProductInfo";
import { MainPage } from "./Components/MainPage";
import { Cart } from "./Components/Cart/Cart";

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
        <Route path=":category" element={<MainPage categories={categories} />}>
          <Route index element={<Products />} />
          <Route path=":productId" element={<ProductInfo />} />
        </Route>
        <Route path="/cart" element={<MainPage categories={categories} />}>
          <Route index element={<Cart />} />
        </Route>
        <Route path="*" element={<div>Page not found</div>} />
      </Routes>
    </BrowserRouter>
  );
};

export interface GetCategories {
  name: string;
}
