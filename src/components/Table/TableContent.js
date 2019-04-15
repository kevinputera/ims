import styled from "styled-components";

const TableHeader = styled.td`
  margin: 0;
  padding: 5px ${props => props.action ? "4px" : "12px"};
  width: ${props => props.action ? "20px" : "inherit"};

  text-align: left;
  font-size: 16px;

  border: 1px solid #ccc;
`;

export default TableHeader;