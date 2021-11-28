import React, { useEffect, useState } from "react";
import "./App.css";
import { MainPage } from "./Components/MainPage/MainPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CategoriesPage } from "./Components/CategoriesPage/CategoriesPage";
import { useQuery } from "@apollo/client";
import { GET_CATEGORIES } from "./Query/categories";

function App() {
  const { data, loading /*, error, refetch*/ } = useQuery(GET_CATEGORIES);
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

          {categories?.map((cat: { name: string }) => {
            return (
              <Route
                path={`/categories/${cat.name}`}
                key={cat.name}
                element={<CategoriesPage categories={categories} />}
              />
            );
          })}

          <Route path="*" element={<div>Page not found</div>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
