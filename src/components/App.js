import React from "react";
import styled from "styled-components";
import Global from "./Global";
import Sidebar from "./Sidebar/Sidebar";
import Table from "./Table/Table";
import Form from "./Form/Form";

const AppContainer = styled.div`
  display: flex;

  width: 100vw;
  height: 100vh;
`;

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sidebarSelection: "items",
      sidebarItems: {
        items: ["Item ID", "Item Name", "Price", "Quantity"],
        transactions: [
          "Transaction ID",
          "Item Name",
          "Supplier/Customer",
          "In",
          "Out"
        ],
        customers: ["Customer Name", "Customer Tax ID"]
      },
      sidebarDataDisplayOrder: {
        items: ["itemId", "itemName", "price", "quantity"],
        transactions: ["transactionId", "itemName", "person", "in", "out"],
        customers: ["customerName", "customerTaxId"]
      },
      displayForm: false
    };
  }

  setSidebarSelection = id => {
    this.setState({ sidebarSelection: id });
  };

  setDisplayForm = display => {
    this.setState({ displayForm: display });
  };

  render() {
    return (
      <AppContainer>
        <Global />
        <Form
          displayForm={this.state.displayForm}
          setDisplayForm={this.setDisplayForm}
        />
        <Sidebar
          title="ims"
          list={Object.keys(this.state.sidebarItems)}
          active={this.state.sidebarSelection}
          setSidebarSelection={this.setSidebarSelection}
          setDisplayForm={this.setDisplayForm}
        />
        <Table
          categoryItems={this.state.sidebarItems}
          categorySelection={this.state.sidebarSelection}
          categoryDataDisplayOrder={this.state.sidebarDataDisplayOrder}
        />
      </AppContainer>
    );
  }
}

export default App;
