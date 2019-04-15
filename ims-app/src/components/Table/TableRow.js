import styled from "styled-components";

const TableRow = styled.tr`
  margin: 0;
  padding: 0;

  :nth-child(even) {
    background-color: #f2f2f2;
  }

  :hover {
    background-color: #f1ffed;
  }
`;

export default TableRow;