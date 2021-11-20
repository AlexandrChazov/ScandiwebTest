import React, {useEffect, useState} from 'react';
import './App.css';
import {useQuery} from "@apollo/client";
import {GET_CATEGORIES} from "./Query/categories";

function App() {

  const { data, loading/*, error, refetch*/ } = useQuery(GET_CATEGORIES);
  const [categories, setCategories] = useState([])

  useEffect(() => {
    if (!loading) {
      setCategories(data.categories)
    }
  }, [data, loading])

  if (loading) {
    return <h1>Loading...</h1>
  }

  return (
    <div>
      {categories.map((el: { name: string }, ind: number)=>{
        return <button key={ind}>
          {el.name}
        </button>
      })}
    </div>
  );
}

export default App;
