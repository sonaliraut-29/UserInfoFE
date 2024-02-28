import React, { useState, useEffect } from "react";
import { schema } from "../validation/LoginSchema";
import * as routes from "../constant";
import { Formik, Field, ErrorMessage, Form } from "formik";

import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../../features/actions/authActions";
import { Button } from "primereact/button";

const Login = ({ history }) => {
  const dispatch = useDispatch();

  const gotoRegister = () => {
    history.push({ pathname: routes.REGISTER_ROUTE });
  };

  const handleSubmit = async (credentials) => {
    const res = await dispatch(userLogin(credentials));
    console.log(res);
    // console.log(res.payload.data.accessToken);
    if (res?.payload?.data?.accessToken) {
      history.push({ pathname: routes.USER_HOME_ROUTE });
    }
  };

  return (
    <>
      <div className="container p-d-flex p-jc-center p-ai-center">
        <div className="p-d-flex p-flex-column p-shadow-4 login-card">
          <h2 className="textAlignCenter">Login</h2>
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validationSchema={schema}
            onSubmit={(values, { setSubmitting }) => {
              handleSubmit(values);
              setSubmitting(false);
            }}
          >
            {(props) => {
              return (
                <Form onSubmit={props.handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="email" className="p-float-label">
                      Email
                    </label>
                    <Field
                      type="email"
                      name="email"
                      id="email"
                      placeholder="Enter email"
                      autoComplete="off"
                      className={`mt-2 form-control ${
                        props.touched.email && props.errors.email
                          ? "is-invalid"
                          : ""
                      }`}
                      onChange={props.handleChange}
                      value={props.values.email}
                    />
                    <ErrorMessage
                      component="div"
                      name="email"
                      className="invalid-feedback"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="password" className="mt-3">
                      Password
                    </label>
                    <Field
                      type="password"
                      name="password"
                      id="password"
                      placeholder="Enter password"
                      className={`form-control ${
                        props.touched.password && props.errors.password
                          ? "is-invalid"
                          : ""
                      }`}
                      onChange={props.handleChange}
                      value={props.values.password}
                    />
                    <ErrorMessage
                      component="div"
                      name="password"
                      className="invalid-feedback"
                    />
                  </div>
                  <div className="buttonContainer">
                    <Button
                      type="submit"
                      className="btn btn-primary btn-block mt-4"
                      disabled={props.isSubmitting}
                    >
                      {props.isSubmitting ? "Submitting..." : "Submit"}
                    </Button>
                    <Button
                      type="button"
                      className="btn btn-primary btn-block mt-4"
                      onClick={gotoRegister}
                    >
                      Register
                    </Button>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>
      </div>
    </>
  );
};

export default Login;
