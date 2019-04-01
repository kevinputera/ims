import styled from "styled-components";

const SidebarButton = styled.button`
  display: block;

  margin: 0;
  padding: 12px 16px;
  width: 100%;
  border: 0px;

  text-align: left;
  font-size: 20px;

  background-color: ${props =>
    props.index === props.active ? "#565e5b" : "white"};
  color: ${props => (props.index === props.active ? "white" : "black")};

  :hover {
    background-color: ${props =>
      props.index === props.active ? "#565e5b" : "#9e9e9e"};
    color: white;
  }

  :active {
    background-color: #565e5b;
    color: white;
  }

  :focus {
    outline: none;
  }
`;

export default SidebarButton;
