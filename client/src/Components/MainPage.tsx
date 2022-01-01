import React from "react";
import styled from "styled-components";
import { Outlet } from "react-router-dom";
import { Header } from "./Header";

const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

export const MainPage: React.FC<PropsType> = ({ categories }) => (
  <MainWrapper>
    <Header categories={categories} />
    <Outlet />
  </MainWrapper>
);

interface PropsType {
  categories: Array<{ name: string }>;
}
