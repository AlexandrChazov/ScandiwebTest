import styled from "styled-components";
import brandIcon from "../../assets/VSF.png";
import emptyCartIcon from "../../assets/empty_cart.png";
import dollarIcon from "../../assets/dollarIcon.png";
import USD from "../../assets/USD.png";
import EUR from "../../assets/EUR.png";
import JPY from "../../assets/JPY.png";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { useUrlLastChild } from "../../Common/useUrlLastChild";

export const Header: React.FC<HeaderPropsType> = ({ categories }) => {
  const category = useUrlLastChild();
  const [activeLink, setActivLink] = useState(category);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Wrapper>
      <LeftMenu>
        {categories.map((category: { name: string }) => {
          return (
            <Category
              key={category.name}
              to={`/categories/${category.name}`}
              onClick={() => {
                setActivLink(category.name);
              }}
              active={activeLink === category.name ? "true" : null}
            >
              {category.name}
            </Category>
          );
        })}
      </LeftMenu>
      <BrandIcon src={brandIcon} alt="VSF" />
      <RightMenu>
        <DollarIcon
          src={dollarIcon}
          alt="dollarIcon"
          onClick={() => setIsOpen(!isOpen)}
        />
        <CurrencyInput
          isOpen={isOpen.toString()}
          onClick={() => setIsOpen(false)}
        >
          <img src={USD} alt="USD" />
          <img src={EUR} alt="EUR" />
          <img src={JPY} alt="JPY" />
        </CurrencyInput>
        <EmptyCartIcon src={emptyCartIcon} alt="emptyCart" />
      </RightMenu>
    </Wrapper>
  );
};

type HeaderPropsType = {
  categories: Array<{ name: string }>;
};

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 0.2fr 1fr;
  grid-template-rows: 5em;
`;

const LeftMenu = styled.div`
  display: flex;
  align-self: center;
  padding-left: 7em;
  padding-bottom: 0.5em;
  & div {
    padding: 0 1em;
  }
`;

const Category = styled(NavLink)<{ active: string | null }>`
  text-decoration: none;
  text-transform: uppercase;
  color: black;
  margin-right: 2em;
  position: relative;
  ${(props) =>
    props.active
      ? `
    &::after {
      position: absolute;
      transform: translate(-85%, 3.3em);
      content: "";
      width: 140%;
      height: 2px;
      background: #5ece7b;
}`
      : null}
`;

const BrandIcon = styled.img`
  align-self: center;
  justify-self: center;
  margin-top: 0.5em;
  margin-left: 1em;
`;

const RightMenu = styled.div`
  justify-self: end;
  align-self: center;
  padding-top: 0.8em;
  padding-right: 5.2em;
  & div {
    padding: 0 1em;
  }
`;

const DollarIcon = styled.img`
  width: 0.7em;
  height: 1.2em;
  margin-right: 2.2em;
  &:hover {
    cursor: pointer;
  }
`;

const CurrencyInput = styled.div<{ isOpen: string }>`
  margin-top: 1em;
  display: ${(props) => (props.isOpen === "true" ? "flex" : "none")};
  flex-direction: column;
  justify-content: space-around;
  position: absolute;
  height: 5em;
  box-shadow: 0px 0px 7px 0.5px #c3c3c3;
`;

const EmptyCartIcon = styled.img`
  width: 1.5em;
  height: 1.3em;
  &:hover {
    cursor: pointer;
  }
`;
