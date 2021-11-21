import {useQuery} from "@apollo/client";
import {GET_CATEGORIES} from "../../Query/categories";
import React, {useEffect, useState} from "react";
import {NavLink} from "react-router-dom";
import {categoriesActions} from "../../redux/categoriesReducer";

export const MainPage = () => {

  const {data, loading/*, error, refetch*/} = useQuery(GET_CATEGORIES);
  const [categories, setCategories] = useState([])

  useEffect(() => {
    if (!loading) {
      setCategories(data.categories)
    }
  }, [data, loading])

  if (loading) {
    return <h1>Loading...</h1>
  }

  const setCategory = (name: string) => {
    categoriesActions.setCategory(name)
  }

  return (
    <div>
      {categories.map((el: { name: string }) => {
        return (
          <div key={el.name}>
            <NavLink to="/Categories" onClick={() => setCategory(el.name)}>
              {el.name}
            </NavLink>
          </div>
        )
      })}
    </div>
  )
}