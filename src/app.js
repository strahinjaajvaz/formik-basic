import React, { Component } from "react";
import ReactDOM from "react-dom";
import { withFormik, Form, Field } from "formik";
import Yup from "yup";
import "./styles/styles.scss";
import "normalize.css/normalize.css";

// name value is used by formik as a unique identifier for that field
// if you dont supply an onChange handler, then the value becomes read only

// set submitting
//Formik will set this to true on your behalf before calling handleSubmit to reduce boilerplate

const App = ({ values, errors, touched, isSubmitting }) => (
  <Form>
    <div>
      {touched.email && errors.email && <p>{errors.email}</p>}
      <Field type="email" name="email" placeholder="Email" />
    </div>
    <div>
      {touched.password && errors.password && <p>{errors.password}</p>}
      <Field type="password" name="password" placeholder="Password" />
    </div>
    <label>
      <Field type="checkbox" name="newsletter" checked={values.newsletter} />
      Join our news letter
    </label>
    <Field component="select" name="plan">
      <option value="free">Free</option>
      <option value="permium">Permium</option>
    </Field>
    <button disabled={isSubmitting}>Just Submit</button>
  </Form>
);

const FormikApp = withFormik({
  mapPropsToValues({ email, password, newsletter, plan }) {
    return {
      email: email || "",
      password: password || "",
      newsletter: newsletter || false,
      plan: plan || "free"
    };
  },
  validationSchema: Yup.object().shape({
    email: Yup.string()
      .email("Email not valid")
      .required("Email is required"),
    password: Yup.string()
      .min(9, "Password must be 9 characters or longer")
      .required("Password is required")
  }),
  handleSubmit(values, { resetForm, setErrors, setSubmitting }) {
    setTimeout(() => {
      if (values.email === "andrew@test.io") {
        setErrors({
          email: "The email is already taken"
        });
      } else {
        resetForm();
      }
      setSubmitting(false);
    }, 2000);
  }
})(App);

ReactDOM.render(<FormikApp />, document.querySelector("#app"));
