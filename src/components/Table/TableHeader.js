import styled from "styled-components";

const TableHeader = styled.th`
  position: sticky;
  top: 0;

  margin: 0;
  padding: 5px ${props => props.action ? "0" : "12px"};
  width: auto;

  text-align: left;
  font-size: 16px;
  font-weight: normal;

  border: 1px solid white;

  background-color: #c1c1c1;
  color: black;
`;

export default TableHeader;