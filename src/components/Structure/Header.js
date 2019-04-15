import React from "react";
import styled from "styled-components";
import { Add } from "styled-icons/material";

const FormDisplayButton = styled.button`
  padding-right: 20px;
  padding-bottom: 5px;

  text-align: center;

  background-color: #006338;
  color: white;

  border: none;

  font-size: 30px;

  :focus {
    outline: none;
  }

  :hover {
    cursor: pointer;
  }
`;

const HeaderContainer = styled.div`
  display: flex;
  margin: 0;

  align-items: center;
  height: 60px;

  z-index: 2;

  justify-content: space-between;

  background-color: #006338;
  box-shadow: 0 1px 1px 0.1px grey;
`;

const HeaderTitle = styled.div`
  display: block;
  padding: 16px 16px;

  width: 100%;

  color: white;
  font-size: 21px;
`;

class Header extends React.Component {
  clickedFormDisplayButton = () => {
    this.props.setDisplayForm(true);
  };

  render() {
    return (
      <HeaderContainer>
        <HeaderTitle>ims</HeaderTitle>
        <FormDisplayButton onClick={this.clickedFormDisplayButton}>
          <Add size="30px" />
        </FormDisplayButton>
      </HeaderContainer>
    );
  }
}

export default Header;
