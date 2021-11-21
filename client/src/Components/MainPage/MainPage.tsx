import React from "react";
import {NavLink} from "react-router-dom";
import styles from "./MainPage.module.css";

export const MainPage: React.FC<MainPagePropsType> = ({categories, setCategory}) => {

  return (
    <div className={styles.wrapper}>
      {categories?.map((el: { name: string }) => {
        return (
          <div key={el.name}>
            <NavLink to="/Categories" onClick={() => setCategory(el.name)} className={styles.link}>
              {el.name}
            </NavLink>
          </div>
        )
      })}
    </div>
  )
}

type MainPagePropsType = {
  categories: Array<{ name: string }>
  setCategory: (name: string) => void
}