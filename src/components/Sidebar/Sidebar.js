import React from "react";
import SidebarContainer from "./SidebarContainer";
import SidebarMenu from "./SidebarMenu";
import SidebarButton from "./SidebarButton";
import FormDisplayButton from "./FormDisplayButton";

class Sidebar extends React.Component {
  clickedFormDisplayButton = () => {
    this.props.setDisplayForm(true);
  }

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
        <SidebarMenu>
          <span>{this.props.title}</span>
          <FormDisplayButton onClick={this.clickedFormDisplayButton}/>
        </SidebarMenu>
        {itemList}
      </SidebarContainer>
    );
  }
}

export default Sidebar;
