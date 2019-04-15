import config from "../../config";
import React from "react";
import FormContainer from "./FormComponents/FormContainer";
import FormButton from "./FormComponents/FormButton";
import FormLabel from "./FormComponents/FormLabel";
import FormInput from "./FormComponents/FormInput";
import FormErrorTag from "./FormComponents/FormErrorTag";
import { Formik } from "formik";

class FormItems extends React.Component {
  validateData = values => {
    let errors = {};

    // Validate item ID
    let itemIdRegex = /^[-a-z0-9]+$/i;
    if (!values.itemId) {
      errors.itemId = "Item ID is required";
    } else if (!itemIdRegex.test(values.itemId)) {
      errors.itemId = "Invalid item ID";
    }

    // Validate item name
    let itemNameRegex = /^[ a-z0-9]+$/i;
    if (!values.itemName) {
      errors.itemName = "Item name is required";
    } else if (!itemNameRegex.test(values.itemName)) {
      errors.itemName = "Invalid item name";
    }

    // Validate price
    let priceRegex = /^[0-9]*.?[0-9]{0,2}$/;
    if (!values.price) {
      errors.price = "Price is required";
    } else if (!priceRegex.test(values.price)) {
      errors.price = "Invalid price";
    }

    return errors;
  };

  submitData = async (values, { setSubmitting, resetForm }) => {
    try {
      let res = await fetch(`http://localhost:${config.node_port}/items/add`, {
        method: "PUT",
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json"
        }
      });

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
        initialValues={{ itemId: "", itemName: "", price: "", quantity: 0 }}
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
            maxHeight="350px"
            onSubmit={handleSubmit}
          >
            <div className="wrapper-top">
              <FormLabel htmlFor="itemId">
                Item ID{" "}
                {touched.itemId && errors.itemId && (
                  <FormErrorTag>{errors.itemId}</FormErrorTag>
                )}
              </FormLabel>
              <FormInput
                type="text"
                id="itemId"
                name="itemId"
                error={errors.itemId && touched.itemId}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.itemId}
                disabled={isSubmitting}
                placeholder="Item ID"
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

              <FormLabel htmlFor="price">
                Price{" "}
                {touched.price && errors.price && (
                  <FormErrorTag>{errors.price}</FormErrorTag>
                )}
              </FormLabel>
              <FormInput
                type="number"
                id="price"
                name="price"
                min="0"
                step="0.10"
                error={errors.price && touched.price}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.price}
                disabled={isSubmitting}
                placeholder="Price"
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

export default FormItems;
