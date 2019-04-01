import React from "react";
import Global from "./Global";
import Sidebar from "./Sidebar/Sidebar";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.sidebarList = [
      "items",
      "transactions",
      "customers",
    ];

    this.state = {
      displayFilterId: 0
    };
  }

  setDisplayFilterId = id => {
    this.setState({ displayFilterId: id });
  };

  render() {
    return (
      <React.Fragment>
        <Global />
        <Sidebar
          title="ims"
          list={this.sidebarList}
          setDisplayFilterId={this.setDisplayFilterId}
        />
      </React.Fragment>
    );
  }
}

export default App;
