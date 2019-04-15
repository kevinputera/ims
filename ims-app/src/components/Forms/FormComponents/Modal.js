import styled from "styled-components";

const Modal = styled.div`
  display: ${props => (props.displayForm ? "flex" : "none")};
  align-items: center;
  justify-content: center;

  position: fixed;
  z-index: 1;

  margin: 0;

  width: 100%;
  height: 100%;

  background-color: rgba(0, 0, 0, 0.4);
`;

export default Modal;
