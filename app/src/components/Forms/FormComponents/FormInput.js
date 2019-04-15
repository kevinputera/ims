import styled from "styled-components";

const FormInput = styled.input`
  display: block;

  margin: 3px 0;
  padding: 0 5px;

  width: ${props => (props.radio ? "30px" : "100%")};
  height: 35px;

  border-radius: 5px;
  box-sizing: border-box;

  border: 1px solid ${props => (props.error ? "red" : "#ccc")};

  font-size: 16px;
`;

export default FormInput;
