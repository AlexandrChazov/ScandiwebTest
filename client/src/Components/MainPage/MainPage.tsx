import React from "react";
import {NavLink} from "react-router-dom";
import styled from "styled-components";

export const MainPage: React.FC<MainPagePropsType> = ({categories, setCategory}) => {

  return (
    <Main>
      {categories?.map((el: { name: string }) => {
        return (
          <div key={el.name}>
            <StyledNavLink to="/Categories" onClick={() => setCategory(el.name)}>
              {el.name}
            </StyledNavLink>
          </div>
        )
      })}
    </Main>
  )
}

type MainPagePropsType = {
  categories: Array<{ name: string }>
  setCategory: (name: string) => void
}

const Main = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  row-gap: 1em;
  background-image: linear-gradient(135deg, #8BC6EC 0%, #9599E2 100%);
`

const StyledNavLink = styled(NavLink)`
  font-size: 2em;
  text-transform: uppercase;
  text-decoration: none;
  font-weight: bold;
  color: #3e3e3e;
  
  &:hover {
    color: black;
  }
`