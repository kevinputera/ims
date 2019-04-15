import React from "react";
import Modal from "./FormComponents/Modal";
import FormItems from "./FormItems";
import FormTransactions from "./FormTransactions";
import FormCustomers from "./FormCustomers";

class Form extends React.Component {
  closeForm = e => {
    e.preventDefault();
    this.props.setDisplayForm(false);
  };

  render() {
    return (
      <React.Fragment>
        <Modal ref={this.modal} displayForm={this.props.displayForm}>
          {this.props.categorySelection === "items" &&
            this.props.displayForm && (
              <FormItems
                closeForm={this.closeForm}
                updateTableData={this.props.updateTableData}
              />
            )}

          {this.props.categorySelection === "customers" &&
            this.props.displayForm && (
              <FormCustomers
                closeForm={this.closeForm}
                updateTableData={this.props.updateTableData}
              />
            )}

          {this.props.categorySelection === "transactions" &&
            this.props.displayForm && (
              <FormTransactions
                closeForm={this.closeForm}
                updateTableData={this.props.updateTableData}
              />
            )}
        </Modal>
      </React.Fragment>
    );
  }
}

export default Form;
