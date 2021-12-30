import React from "react";
import styled from "styled-components";
import { Outlet } from "react-router-dom";
import { Header } from "../CategoriesPage/Header";

const Main = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

export const MainContent: React.FC<PropsType> = ({ categories }) => (
  <Main>
    <Header categories={categories} />
    <Outlet />
  </Main>
);

interface PropsType {
  categories: Array<{ name: string }>;
}
