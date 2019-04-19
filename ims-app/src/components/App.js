import config from "../config.json";
import React from "react";
import Global from "./Global";
import Sidebar from "./Sidebar/Sidebar";
import Table from "./Table/Table";
import Form from "./Forms/Form";
import AppContainer from "./Structure/AppContainer";
import Header from "./Structure/Header";
import Body from "./Structure/Body";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sidebarSelection: "items",
      sidebarTableItems: {
        items: ["Item ID", "Item Name", "Price", "Quantity"],
        transactions: [
          "Transaction ID",
          "Item ID",
          "Buy",
          "Sell"
        ],
        customers: ["Customer Tax ID", "Customer Name"]
      },
      tableData: [],
      displayForm: false
    };
  }

  setSidebarSelection = id => {
    this.setState({ sidebarSelection: id });
  };

  setDisplayForm = display => {
    this.setState({ displayForm: display });
  };

  setUpdateTableData = update => {
    this.setState({ updateTableData: update });
  };

  updateTableData = async () => {
    // update table data
    let serverURL = `http://localhost:${config.node_port}/${encodeURIComponent(
      this.state.sidebarSelection
    )}`;

    try {
      let res = await fetch(serverURL);

      if (!res.ok) {
        throw new Error(`Error ${res.status}: ${res.statusText}`);
      }

      let tableData = await res.json();
      this.setState({ tableData: tableData });
    } catch (err) {
      alert(`${err.message}. Please try again`);
    }
  };

  render() {
    return (
      <AppContainer>
        <Global />
        <Header setDisplayForm={this.setDisplayForm}>ims</Header>
        <Body>
          <Sidebar
            list={Object.keys(this.state.sidebarTableItems)}
            active={this.state.sidebarSelection}
            setSidebarSelection={this.setSidebarSelection}
          />
          <Table
            tableData={this.state.tableData}
            categoryItems={this.state.sidebarTableItems}
            categorySelection={this.state.sidebarSelection}
            updateTableData={this.updateTableData}
          />
        </Body>
        <Form
          displayForm={this.state.displayForm}
          categorySelection={this.state.sidebarSelection}
          setDisplayForm={this.setDisplayForm}
          updateTableData={this.updateTableData}
        />
      </AppContainer>
    );
  }
}

export default App;
