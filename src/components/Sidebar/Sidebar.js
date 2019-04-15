import React from "react";
import SidebarContainer from "./SidebarContainer";
import SidebarButton from "./SidebarButton";

class Sidebar extends React.Component {
  render() {
    let itemList = this.props.list.map((item, index) => (
      <SidebarButton
        key={item}
        index={item}
        active={this.props.active}
        onClick={() => this.props.setSidebarSelection(item)}
      >
        {item}
      </SidebarButton>
    ));

    return (
      <SidebarContainer>
        {itemList}
      </SidebarContainer>
    );
  }
}

export default Sidebar;
