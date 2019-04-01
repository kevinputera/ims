import React from "react";
import SidebarContainer from "./SidebarContainer";
import SidebarMenu from "./SidebarMenu";
import SidebarButton from "./SidebarButton";
import SidebarSeparator from "./SidebarSeparator";

class Sidebar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      active: 0
    };
  }

  buttonClick = (e, id) => {
    this.setState({ active: id });
    this.props.setDisplayFilterId(id);
  };

  render() {
    let itemList = this.props.list.map((item, index) => (
      <React.Fragment key={2 * index}>
        <SidebarButton
          key={2 * index + 1}
          index={index}
          active={this.state.active}
          onClick={(e, id) => this.buttonClick(e, index)}
        >
          {item}
        </SidebarButton>
      </React.Fragment>
    ));

    return (
      <SidebarContainer>
        <SidebarMenu>{this.props.title}</SidebarMenu>
        {itemList}
      </SidebarContainer>
    );
  }
}

export default Sidebar;
