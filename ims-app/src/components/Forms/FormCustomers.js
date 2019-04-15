import config from "../../config";
import React from "react";
import FormContainer from "./FormComponents/FormContainer";
import FormButton from "./FormComponents/FormButton";
import FormLabel from "./FormComponents/FormLabel";
import FormInput from "./FormComponents/FormInput";
import FormErrorTag from "./FormComponents/FormErrorTag";
import { Formik } from "formik";

class FormCustomers extends React.Component {
  validateData = values => {
    let errors = {};

    // Validate customer tax ID
    let customerTaxIdRegex = /^[-0-9]+$/i;
    if (!values.customerTaxId) {
      errors.customerTaxId = "Customer tax ID is required";
    } else if (!customerTaxIdRegex.test(values.customerTaxId)) {
      errors.customerTaxId = "Invalid customer tax ID";
    }

    // Validate customer name
    let customerNameRegex = /^[ a-z0-9]+$/i;
    if (!values.customerName) {
      errors.customerName = "Customer name is required";
    } else if (!customerNameRegex.test(values.customerName)) {
      errors.customerName = "Invalid customer name";
    }

    return errors;
  };

  submitData = async (values, { setSubmitting, resetForm }) => {
    try {
      let res = await fetch(
        `http://localhost:${config.node_port}/customers/add`,
        {
          method: "PUT",
          body: JSON.stringify(values),
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
        initialValues={{ customerTaxId: "", customerName: "" }}
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
            maxHeight="270px"
            onSubmit={handleSubmit}
          >
            <div className="wrapper-top">
              <FormLabel htmlFor="customerTaxId">
                Customer Tax ID{" "}
                {touched.customerTaxId && errors.customerTaxId && (
                  <FormErrorTag>{errors.customerTaxId}</FormErrorTag>
                )}
              </FormLabel>
              <FormInput
                type="text"
                id="customerTaxId"
                name="customerTaxId"
                error={errors.customerTaxId && touched.customerTaxId}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.customerTaxId}
                disabled={isSubmitting}
                placeholder="Customer Tax ID"
              />

              <FormLabel htmlFor="customerName">
                Customer Name{" "}
                {touched.customerName && errors.customerName && (
                  <FormErrorTag>{errors.customerName}</FormErrorTag>
                )}
              </FormLabel>
              <FormInput
                type="text"
                id="customerName"
                name="customerName"
                error={errors.customerName && touched.customerName}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.customerName}
                disabled={isSubmitting}
                placeholder="Customer Name"
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

export default FormCustomers;
