import styled from "styled-components";

const SidebarButton = styled.button`
  display: block;

  margin: 0;
  padding-left: 28px;
  padding-top: 12px;
  padding-bottom: 12px;
  width: 100%;
  border: 0px;

  text-align: left;
  font-size: 20px;

  color: ${props => (props.index === props.active ? "#4c4c4c" : "black")};

  :hover {
    color: #757575;
    cursor: pointer;
  }

  :active {
    color: #757575;
  }

  :focus {
    outline: none;
  }
`;

export default SidebarButton;
