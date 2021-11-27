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
  const [category, setCategory] = useState("");

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
          <Route
            path="/"
            element={
              <MainPage categories={categories} setCategory={setCategory} />
            }
          />
          <Route
            path="/Categories"
            element={<CategoriesPage category={category} />}
          />
          <Route path="*" element={<div>Page not found</div>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
