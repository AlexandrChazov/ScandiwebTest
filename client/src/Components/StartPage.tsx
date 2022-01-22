import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { CategoriesNames } from "../App";

const Main = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  row-gap: 1em;
  background-image: linear-gradient(135deg, #8bc6ec 0%, #9599e2 100%);
`;

const StyledNavLink = styled(NavLink)`
  font-size: 2em;
  text-transform: uppercase;
  text-decoration: none;
  font-weight: bold;
  color: #3e3e3e;

  &:hover {
    color: black;
  }
`;

export const StartPage: React.FC<PropsType> = ({ categories }) => (
  <Main>
    {categories?.map((category) => (
      <div key={category.name}>
        <StyledNavLink to={`/${category.name}`}>
          {category.name}
        </StyledNavLink>
      </div>
    ))}
  </Main>
);

interface PropsType {
  categories: CategoriesNames[];
}
