import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

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

export const StartPage: React.FC<MainPagePropsType> = ({ categories }) => (
  <Main>
    {categories?.map((category: { name: string }) => (
      <div key={category.name}>
        <StyledNavLink to={`/${category.name}`}>
          {category.name}
        </StyledNavLink>
      </div>
    ))}
  </Main>
);

type MainPagePropsType = {
  categories: Array<{ name: string }>;
};
