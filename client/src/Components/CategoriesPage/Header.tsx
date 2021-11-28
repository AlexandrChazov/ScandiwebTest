import styled from "styled-components";
import brandIcon from "../../assets/VSF.png";
import emptyCartIcon from "../../assets/empty_cart.png";
import dollarIcon from "../../assets/dollarIcon.png";

export const Header = () => {
  return (
    <Wrapper>
      <LeftMenu>
        <div>CLOTHES</div>
        <div>TECH</div>
      </LeftMenu>
      <BrandIcon src={brandIcon} alt="VSF" />
      <RightMenu>
        <DollarIcon src={dollarIcon} alt="dollarIcon" />
        <EmptyCartIcon src={emptyCartIcon} alt="emptyCart" />
      </RightMenu>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 0.2fr 1fr;
  grid-template-rows: 5em;
`;

const LeftMenu = styled.div`
  display: flex;
  align-self: center;
  padding-left: 6em;
  padding-bottom: 0.5em;
  & div {
    padding: 0 1em;
  }
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
`;

const EmptyCartIcon = styled.img`
  width: 1.5em;
  height: 1.3em;
`;
