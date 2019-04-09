import React from "react";
import TableRow from "./TableRow";
import TableContainer from "./TableContainer";
import TableHeader from "./TableHeader";
import TableContent from "./TableContent";

class Table extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tableData: []
    };
  }

  componentDidMount() {
    // retrieve initial table data
    let serverURL =
      "http://localhost:8008/" +
      encodeURIComponent(this.props.categorySelection);
    fetch(serverURL)
      .then(res => res.json())
      .then(res => this.setState({ tableData: res }))
      .catch(console.log);
  }

  componentDidUpdate(prevProps) {
    // update table data
    if (this.props.categorySelection !== prevProps.categorySelection) {
      let serverURL =
        "http://localhost:8008/" +
        encodeURIComponent(this.props.categorySelection);
      fetch(serverURL)
        .then(res => res.json())
        .then(res => this.setState({ tableData: res }))
        .catch(console.log);
    }
  }

  render() {
    let headerList = this.props.categoryItems[this.props.categorySelection].map(
      (header, index) => <TableHeader key={header}>{header}</TableHeader>
    );

    let dataList = this.state.tableData.map((json, index) => {
      let row = this.props.categoryDataDisplayOrder[this.props.categorySelection].map(
        (col, index) => {
          return <TableContent key={col}>{json[col]}</TableContent>;
        }
      );

      return (
        <TableRow
          key={json[this.props.categoryDataDisplayOrder[this.props.categorySelection][0]] + index.toString()}
          >
          {row}
        </TableRow>
      );
    });

    return (
      <TableContainer>
        <tbody>
          <TableRow>{headerList}</TableRow>
          {dataList}
        </tbody>
      </TableContainer>
    );
  }
}

export default Table;
