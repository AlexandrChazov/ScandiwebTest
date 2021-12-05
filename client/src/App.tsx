import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useQuery } from "@apollo/client";
import "./App.css";
import { MainPage } from "./Components/MainPage/MainPage";
import { CategoriesPage } from "./Components/CategoriesPage/CategoriesPage";
import { GET_CATEGORIES } from "./Query/categories";

export const App = () => {
  const { data, loading /* , error, refetch */ } = useQuery(GET_CATEGORIES);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (!loading) {
      setCategories(data?.categories);
    }
  }, [data, loading]);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage categories={categories} />} />

          {categories?.map((cat: { name: string }) => (
            <Route
              path={`/categories/${cat.name}`}
              key={cat.name}
              element={<CategoriesPage categories={categories} />}
            />
          ))}

          <Route path="*" element={<div>Page not found</div>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};
