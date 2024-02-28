import React, { useState, useEffect, useRef } from "react";
import { schema } from "../validation/RegisterSchema";
import * as routes from "../constant";
import { Formik, Field, ErrorMessage, Form } from "formik";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { useDispatch, useSelector } from "react-redux";

import { registerUser } from "../../features/actions/authActions";

const Register = ({ history }) => {
  const [visible, setVisible] = useState(false);
  const [formData, setFormData] = useState({});

  const dispatch = useDispatch();

  const gotoLogin = () => {
    history.push({ pathname: routes.ROOT_ROUTE });
  };

  const addressSchema = {
    streetAddress: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
  };

  const initialValues = {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    phoneno: "",
    dateofbirth: "",
    gender: "",
    address: [addressSchema],
  };

  const cities = ["pune", "mumbai", "satara"];
  const states = ["maharashtra", "gujrat", "punjab"];
  const countries = ["india", "america", "africa"];
  const formRef = useRef();

  const addMoreAddress = () => {
    const addresses = [...formRef.current.values.address, addressSchema];
    formRef.current.setFieldValue(`address`, addresses);
  };

  const handleRemoveAddress = (index) => {
    let addresses = [...formRef.current.values.address];

    addresses = addresses.filter((item, indexIn) => indexIn !== index);

    formRef.current.setFieldValue(`address`, addresses);
  };

  const PrettyJson = () => {
    return <pre>{JSON.stringify(formData, null, 2)}</pre>;
  };

  const handleSubmit = (data, actions) => {
    setFormData(data);
    setVisible(true);
  };

  const handleFromSubmit = async () => {
    const res = await dispatch(registerUser(formData));
    if (res?.payload?.success) {
      history.push({ pathname: routes.ROOT_ROUTE });
    }
  };

  return (
    <>
      <div className="container p-d-flex p-jc-center p-ai-center">
        <div className="p-d-flex p-flex-column p-shadow-4 login-card">
          <h2 className="textAlignCenter">Register</h2>
          <Formik
            initialValues={initialValues}
            validationSchema={schema}
            innerRef={formRef}
            onSubmit={handleSubmit}
          >
            {(props) => {
              return (
                <Form onSubmit={props.handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="firstname">Firstname</label>
                    <Field
                      type="text"
                      name="firstname"
                      id="firstname"
                      placeholder="Enter firstname"
                      className={`mt-2 form-control ${
                        props.touched.firstname && props.errors.firstname
                          ? "is-invalid"
                          : ""
                      }`}
                    />
                    <ErrorMessage
                      component="div"
                      name="firstname"
                      className="invalid-feedback"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="lastname">Lastname</label>
                    <Field
                      type="text"
                      name="lastname"
                      id="lastname"
                      placeholder="Enter lastname"
                      className={`mt-2 form-control ${
                        props.touched.lastname && props.errors.lastname
                          ? "is-invalid"
                          : ""
                      }`}
                    />
                    <ErrorMessage
                      component="div"
                      name="lastname"
                      className="invalid-feedback"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
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
                    />
                    <ErrorMessage
                      component="div"
                      name="password"
                      className="invalid-feedback"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="phoneno" className="mt-3">
                      Phone No
                    </label>
                    <Field
                      type="text"
                      name="phoneno"
                      id="phoneno"
                      placeholder="Enter phone number"
                      className={`form-control ${
                        props.touched.phoneno && props.errors.phoneno
                          ? "is-invalid"
                          : ""
                      }`}
                    />
                    <ErrorMessage
                      component="div"
                      name="phoneno"
                      className="invalid-feedback"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="dateofbirth" className="mt-3">
                      Date of birth
                    </label>
                    <Field
                      type="date"
                      id="dateofbirth"
                      name="dateofbirth"
                      placeholder="xx/xx/xxxx"
                      className={`form-control ${
                        props.touched.dateofbirth && props.errors.dateofbirth
                          ? "is-invalid"
                          : ""
                      }`}
                    />
                    <ErrorMessage
                      component="div"
                      name="dateofbirth"
                      className="invalid-feedback"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="gender" className="mt-3">
                      Gender
                    </label>

                    <select
                      name="gender"
                      id="gender"
                      value={props.values.gender}
                      style={{ display: "block" }}
                      onChange={props.handleChange}
                    >
                      <option value="" key="male1">
                        Choose Gender
                      </option>
                      <option value="male" key="male">
                        Male
                      </option>
                      <option value="female" key="female">
                        Female
                      </option>
                      <option value="other" key="other">
                        Other
                      </option>
                    </select>
                    <ErrorMessage
                      component="div"
                      name="gender"
                      className="invalid-feedback"
                    />
                  </div>

                  <div className="form-group">
                    <h2 className="textAlignCenter">Address</h2>
                  </div>
                  <div className="addressAdd">
                    <Button onClick={addMoreAddress}>Add More Address</Button>
                  </div>
                  {props.values.address.map((item, index) => {
                    return (
                      <>
                        {index > 0 ? (
                          <div className="addressAdd">
                            <Button onClick={() => handleRemoveAddress(index)}>
                              Remove Address
                            </Button>
                          </div>
                        ) : (
                          ""
                        )}
                        <div className="form-group">
                          <label
                            htmlFor={`address.${index}.streetAddress`}
                            className="mt-3"
                          >
                            Street Address
                          </label>
                          <Field
                            type="text"
                            placeholder="Enter phone number"
                            className={`form-control ${
                              props.touched.streetAddress &&
                              props.errors.streetAddress
                                ? "is-invalid"
                                : ""
                            }`}
                            id={`address.${index}.streetAddress`}
                            name={`address.${index}.streetAddress`}
                            value={props.values.address[index].streetAddress}
                          />
                          <ErrorMessage
                            component="div"
                            name={`address.${index}.streetAddress`}
                            className="invalid-feedback"
                          />
                        </div>

                        <div className="form-group">
                          <label
                            htmlFor={`address.${index}.city`}
                            className="mt-3"
                          >
                            City
                          </label>

                          <select
                            style={{ display: "block" }}
                            value={props.values.address[index].city}
                            id={`address.${index}.city`}
                            name={`address.${index}.city`}
                            onChange={props.handleChange}
                          >
                            <option value="" key="city1">
                              Choose City
                            </option>
                            {cities.map((item) => {
                              return (
                                <option value={item} key={item}>
                                  {item.charAt(0).toUpperCase() + item.slice(1)}
                                </option>
                              );
                            })}
                          </select>
                          <ErrorMessage
                            component="div"
                            name="city"
                            className="invalid-feedback"
                          />
                        </div>

                        <div className="form-group">
                          <label
                            htmlFor={`address.${index}.state`}
                            className="mt-3"
                          >
                            State
                          </label>

                          <select
                            value={props.values.address[index].state}
                            id={`address.${index}.state`}
                            name={`address.${index}.state`}
                            style={{ display: "block" }}
                            onChange={props.handleChange}
                          >
                            <option value="" key="state1">
                              Choose State
                            </option>
                            {states.map((item) => {
                              return (
                                <option value={item} key={item}>
                                  {item.charAt(0).toUpperCase() + item.slice(1)}
                                </option>
                              );
                            })}
                          </select>
                          <ErrorMessage
                            component="div"
                            name="city"
                            className="invalid-feedback"
                          />
                        </div>

                        <div className="form-group">
                          <label
                            htmlFor={`address.${index}.zipcode`}
                            className="mt-3"
                          >
                            Postal Code
                          </label>
                          <Field
                            type="text"
                            value={props.values.address[index].zipcode}
                            id={`address.${index}.zipcode`}
                            name={`address.${index}.zipcode`}
                            placeholder="Enter postal code"
                            className={`form-control ${
                              props.touched.zipcode && props.errors.zipcode
                                ? "is-invalid"
                                : ""
                            }`}
                          />
                          <ErrorMessage
                            component="div"
                            name="zipcode"
                            className="invalid-feedback"
                          />
                        </div>
                        <div className="form-group">
                          <label
                            htmlFor={`address.${index}.country`}
                            className="mt-3"
                          >
                            Country
                          </label>

                          <select
                            value={props.values.address[index].country}
                            id={`address.${index}.country`}
                            name={`address.${index}.country`}
                            style={{ display: "block" }}
                            onChange={props.handleChange}
                          >
                            <option value="" key="country1">
                              Choose Country
                            </option>
                            {countries.map((item) => {
                              return (
                                <option value={item} key={item}>
                                  {item.charAt(0).toUpperCase() + item.slice(1)}
                                </option>
                              );
                            })}
                          </select>
                          <ErrorMessage
                            component="div"
                            name="country"
                            className="invalid-feedback"
                          />
                        </div>
                      </>
                    );
                  })}
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
                      onClick={gotoLogin}
                    >
                      Login
                    </Button>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>
      </div>
      <Dialog
        header="Header"
        visible={visible}
        style={{ width: "50vw" }}
        onHide={() => setVisible(false)}
      >
        <p className="m-0">{PrettyJson()}</p>
        <Button onClick={handleFromSubmit}>Submit</Button>
      </Dialog>
    </>
  );
};

export default Register;
