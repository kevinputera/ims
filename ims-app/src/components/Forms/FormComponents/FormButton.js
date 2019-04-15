import styled from "styled-components";

const FormButton = styled.button`
  display: block;

  margin: 5px 0;

  width: 100%;
  height: 37px;

  background-color: ${props => (props.primary ? "#006338" : "white")};
  color: ${props => (props.primary ? "white" : "black")};

  border-radius: 6px;

  font-size: 16px;

  :hover {
    cursor: ${props => (props.isSubmitting ? "default" : "pointer")};
  }
`;

export default FormButton;
