import styled from "styled-components";

const FormContainer = styled.form`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  margin: 0;
  padding: 25px 20px;

  width: ${props => props.width};
  height: 100%;
  max-height: ${props => props.maxHeight};

  border-radius: 10px;
  box-shadow: 0 0 10px grey;
  
  overflow-y: auto;

  background-color: white;
`;

export default FormContainer;
