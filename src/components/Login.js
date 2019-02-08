import React, { Component } from "react";

import { Formik, Field, Form } from "formik";

class Login extends Component {
  render() {
    return (
      <div className="login-container">
        <Formik
          initialValues={{ username: "", password: "" }}
          onSubmit={values => {}}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="centered-form__form">
                <h3>Login</h3>
                <div className="form-field">
                  <label>Name:</label>
                  <Field type="text" name="name" />
                </div>
                <div className="form-field">
                  <label>Password:</label>
                  <Field type="text" name="password" />
                </div>
                <div className="form-field">
                  <button disabled={isSubmitting}>Login</button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    );
  }
}
export default Login;
