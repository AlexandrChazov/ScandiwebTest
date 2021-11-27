import styled from "styled-components";

export const Header = () => {
  return (
    <Wrapper>
      <LeftMenu>
        <div>Clothes</div>
        <div>Tech</div>
      </LeftMenu>
      <RightMenu>
        <div>Carrency</div>
        <div>Cart</div>
      </RightMenu>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 2em 3em;
`;

const LeftMenu = styled.div`
  display: flex;
  & div {
    padding: 0 1em;
  }
`;

const RightMenu = styled.div`
  display: flex;
  & div {
    padding: 0 1em;
  }
`;
