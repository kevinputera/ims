import config from "../../config";
import React from "react";
import FormContainer from "./FormComponents/FormContainer";
import FormButton from "./FormComponents/FormButton";
import FormLabel from "./FormComponents/FormLabel";
import FormInput from "./FormComponents/FormInput";
import FormErrorTag from "./FormComponents/FormErrorTag";
import { Formik } from "formik";

class FormTransactions extends React.Component {
  validateData = values => {
    let errors = {};

    // Validate transaction ID
    let transactionIdRegex = /^[-a-z0-9]+$/i;
    if (!values.transactionId) {
      errors.transactionId = "Transaction ID is required";
    } else if (!transactionIdRegex.test(values.transactionId)) {
      errors.transactionId = "Invalid transaction ID";
    }

    // Validate item name
    let itemNameRegex = /^[ a-z0-9]+$/i;
    if (!values.itemName) {
      errors.itemName = "Item name is required";
    } else if (!itemNameRegex.test(values.itemName)) {
      errors.itemName = "Invalid item name";
    }

    // Validate supplier/customer name
    let personRegex = /^[ a-z]+$/i;
    if (!values.person) {
      errors.person = "Supplier/Customer is required";
    } else if (!personRegex.test(values.person)) {
      errors.person = "Invalid supplier/customer";
    }

    let quantityRegex = /^[0-9]+$/;
    if (!values.quantity) {
      errors.quantity = "Quantity is required";
    } else if (!quantityRegex.test(values.quantity)) {
      errors.quantity = "Invalid quantity";
    }

    return errors;
  };

  submitData = async (values, { setSubmitting, resetForm }) => {
    let putValues = {
      transactionId: values.transactionId,
      itemName: values.itemName,
      person: values.person,
      sell: values.type === "sell" ? values.quantity : 0,
      buy: values.type === "buy" ? values.quantity : 0
    };

    try {
      let res = await fetch(
        `http://localhost:${config.node_port}/transactions/add`,
        {
          method: "PUT",
          body: JSON.stringify(putValues),
          headers: {
            "Content-Type": "application/json"
          }
        }
      );

      if (!res.ok) {
        throw new Error(`Error ${res.status}: ${res.statusText}`);
      }

      this.props.updateTableData();
      resetForm();
    } catch (err) {
      alert(`${err.message}. Please try again`);
    }

    setSubmitting(false);
  };

  render() {
    return (
      <Formik
        initialValues={{
          transactionId: "",
          itemName: "",
          person: "",
          type: "sell",
          quantity: ""
        }}
        validate={this.validateData}
        onSubmit={this.submitData}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          resetForm
        }) => (
          <FormContainer
            width="400px"
            maxHeight="510px"
            onSubmit={handleSubmit}
          >
            <div className="wrapper-top">
              <FormLabel htmlFor="transactionId">
                Transaction ID{" "}
                {touched.transactionId && errors.transactionId && (
                  <FormErrorTag>{errors.transactionId}</FormErrorTag>
                )}
              </FormLabel>
              <FormInput
                type="text"
                id="transactionId"
                name="transactionId"
                error={errors.transactionId && touched.transactionId}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.transactionId}
                disabled={isSubmitting}
                placeholder="Transaction ID"
              />

              <FormLabel htmlFor="itemName">
                Item Name{" "}
                {touched.itemName && errors.itemName && (
                  <FormErrorTag>{errors.itemName}</FormErrorTag>
                )}
              </FormLabel>
              <FormInput
                type="text"
                id="itemName"
                name="itemName"
                error={errors.itemName && touched.itemName}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.itemName}
                disabled={isSubmitting}
                placeholder="Item Name"
              />

              <FormLabel htmlFor="person">
                Supplier/Customer{" "}
                {touched.person && errors.person && (
                  <FormErrorTag>{errors.person}</FormErrorTag>
                )}
              </FormLabel>
              <FormInput
                type="text"
                id="person"
                name="person"
                error={errors.person && touched.person}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.person}
                disabled={isSubmitting}
                placeholder="Supplier/Customer"
              />

              <div className="radio-sell" style={{ display: "flex" }}>
                <FormInput
                  type="radio"
                  id="sell"
                  name="type"
                  value="sell"
                  onChange={handleChange}
                  disabled={isSubmitting}
                  radio
                />
                <FormLabel htmlFor="sell">Sell</FormLabel>
              </div>
              <div className="radio-buy" style={{ display: "flex" }}>
                <FormInput
                  type="radio"
                  id="buy"
                  name="type"
                  value="buy"
                  onChange={handleChange}
                  disabled={isSubmitting}
                  radio
                />
                <FormLabel htmlFor="buy">Buy</FormLabel>
              </div>

              <FormLabel htmlFor="quantity">
                Quantity{" "}
                {touched.quantity && errors.quantity && (
                  <FormErrorTag>{errors.quantity}</FormErrorTag>
                )}
              </FormLabel>
              <FormInput
                type="number"
                id="quantity"
                name="quantity"
                min="0"
                step="1"
                error={errors.quantity && touched.quantity}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.quantity}
                disabled={isSubmitting}
                placeholder="Quantity"
              />
            </div>

            <div className="wrapper-bottom">
              <FormButton
                type="submit"
                isSubmitting={isSubmitting}
                disabled={isSubmitting}
                primary
              >
                Add Item
              </FormButton>
              <FormButton
                type="close"
                isSubmitting={isSubmitting}
                disabled={isSubmitting}
                onClick={e => {
                  resetForm();
                  this.props.closeForm(e);
                }}
              >
                Close
              </FormButton>
            </div>
          </FormContainer>
        )}
      </Formik>
    );
  }
}

export default FormTransactions;
