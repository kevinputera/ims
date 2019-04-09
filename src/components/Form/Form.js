import React from "react";
import ModalOverlay from "./ModalOverlay";
import FormItems from "./FormItems";

class Form extends React.Component {
  constructor(props) {
    super(props);

    this.modal = React.createRef();
  }

  clickedModalOverlay = e => {
    if (e.target === this.modal.current) {
      this.props.setDisplayForm(false);
    }
  };

  render() {
    return (
      <React.Fragment>
        <ModalOverlay
          ref={this.modal}
          displayForm={this.props.displayForm}
          onClick={e => this.clickedModalOverlay(e)}
        >
          <FormItems />
        </ModalOverlay>
      </React.Fragment>
    );
  }
}

export default Form;
