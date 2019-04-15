import config from "../../config.js";
import React from "react";
import TableRow from "./TableRow";
import TableContainer from "./TableContainer";
import TableHeader from "./TableHeader";
import TableContent from "./TableContent";
import styled from "styled-components";
import { Delete } from "styled-icons/material/Delete";

const DeleteButton = styled.button`
  visibility: ${props => (props.show ? "visible" : "hidden")};

  padding: 0;

  background-color: inherit;
  color: #818181;

  border: none;

  :focus {
    outline: none;
  }

  :hover {
    cursor: pointer;
  }
`;

class Table extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tableDataDisplayOrder: {
        items: ["itemId", "itemName", "price", "quantity"],
        transactions: ["transactionId", "itemName", "person", "buy", "sell"],
        customers: ["customerTaxId", "customerName"]
      },
      deleteEnableRow: -1
    };
  }

  componentDidMount() {
    this.props.updateTableData();
  }

  componentDidUpdate(prevProps) {
    if (this.props.categorySelection !== prevProps.categorySelection) {
      this.props.updateTableData();
    }
  }

  deleteData = async row => {
    if (
      window.confirm(
        `Delete \n${JSON.stringify(this.props.tableData[row], null, 4)}\n?`
      )
    ) {
      let serverURL = `http://localhost:${
        config.node_port
      }/${encodeURIComponent(this.props.categorySelection)}/delete`;

      try {
        let res = await fetch(serverURL, {
          method: "DELETE",
          body: JSON.stringify(this.props.tableData[row]),
          headers: {
            "Content-Type": "application/json"
          }
        });

        if (!res.ok) {
          throw new Error(`Error ${res.status}: ${res.statusText}`);
        }

        this.props.updateTableData();
      } catch (err) {
        alert(`${err.message}. Please try again`);
      }
    }
  };

  render() {
    let headerList = [
      <TableHeader key="action" action="true" />,
      ...this.props.categoryItems[this.props.categorySelection].map(
        (header, index) => <TableHeader key={header}>{header}</TableHeader>
      )
    ];

    let dataList = this.props.tableData.map((json, indexRow) => {
      let row = [
        <TableContent key="action" action="true">
          <DeleteButton
            show={indexRow === this.state.deleteEnableRow}
            onClick={() => this.deleteData(indexRow)}
          >
            <Delete size="20px" />
          </DeleteButton>
        </TableContent>,
        ...this.state.tableDataDisplayOrder[this.props.categorySelection].map(
          (col, indexColumn) => (
            <TableContent key={col}>{json[col]}</TableContent>
          )
        )
      ];

      return (
        <TableRow
          key={
            json[
              this.state.tableDataDisplayOrder[this.props.categorySelection][0]
            ] + indexRow.toString()
          }
          onMouseOver={() => this.setState({ deleteEnableRow: indexRow })}
        >
          {row}
        </TableRow>
      );
    });

    return (
      <TableContainer
        onMouseLeave={() => this.setState({ deleteEnableRow: -1 })}
      >
        <tbody>
          <TableRow>{headerList}</TableRow>
          {dataList}
        </tbody>
      </TableContainer>
    );
  }
}

export default Table;
