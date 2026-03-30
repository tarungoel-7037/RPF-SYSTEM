import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { ROUTES } from "../../constants/RoutesConst";
import { registerAdmin } from "../../service/Auth";

const AdminSignUp = () => {
  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNo: "",
  };
  const validationSchema = Yup.object({
    firstName: Yup.string()
      .matches(/^[A-Za-z]+$/, "First Name must contain letters only")
      .required("First Name is required")
      .min(2, "First Name must be at least 2 characters")
      .max(30, "First Name cannot exceed 30 characters"),
    lastName: Yup.string()
      .matches(/^[A-Za-z]+$/, "Last Name must contain letters only")
      .required("Last Name is required")
      .min(2, "Last Name must be at least 2 characters")
      .max(30, "Last Name cannot exceed 30 characters"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .min(5, "Password must be at least 5 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .required("Confirm Password is required")
      .oneOf([Yup.ref("password"), null], "Passwords must match"),
    phoneNo: Yup.string()
      .required("Phone Number is required")
      .matches(/^\d{10}$/, "Phone Number must be exactly 10 digits"),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const formData = new FormData();
      formData.append("firstname", values.firstName);
      formData.append("lastname", values.lastName);
      formData.append("email", values.email);
      formData.append("password", values.password);
      formData.append("mobile", values.phoneNo);

      const res = await registerAdmin(formData);
      if (res?.data?.response === "success") {
        toast.success("Admin registered successfully");
        resetForm();
      } else {
        toast.error(
          res?.data?.error?.[0] || res?.data?.error || "Something went wrong",
        );
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="account-pages my-5 pt-sm-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6 col-xl-6">
            <div className="card overflow-hidden">
              <div className="bg-soft-primary">
                <div className="row">
                  <div className="col-12">
                    <div className="text-primary p-4">
                      <h5 className="text-primary">Welcome to RFP System!</h5>
                      <p>Register as Admin</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card-body pt-0">
                <div className="p-4">
                  <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                  >
                    {({ isSubmitting }) => (
                      <Form>
                        <div className="row">
                          <div className="col-md-12 col-lg-6 col-xl-6">
                            <div className="form-group">
                              <label htmlFor="firstName">
                                First name<em>*</em>
                              </label>
                              <Field
                                type="text"
                                name="firstName"
                                id="firstName"
                                className="form-control"
                                placeholder="Enter Firstname"
                              />
                              <ErrorMessage
                                name="firstName"
                                component="div"
                                className="text-danger"
                              />
                            </div>
                          </div>

                          <div className="col-md-12 col-lg-6 col-xl-6">
                            <div className="form-group">
                              <label htmlFor="lastName">
                                Last name<em>*</em>
                              </label>
                              <Field
                                type="text"
                                name="lastName"
                                id="lastName"
                                className="form-control"
                                placeholder="Enter Lastname"
                              />
                              <ErrorMessage
                                name="lastName"
                                component="div"
                                className="text-danger"
                              />
                            </div>
                          </div>

                          <div className="col-md-12">
                            <div className="form-group">
                              <label htmlFor="email">
                                Email<em>*</em>
                              </label>
                              <Field
                                type="text"
                                name="email"
                                id="email"
                                className="form-control"
                                placeholder="Enter Email"
                              />
                              <ErrorMessage
                                name="email"
                                component="div"
                                className="text-danger"
                              />
                            </div>
                          </div>

                          <div className="col-md-12 col-lg-6 col-xl-6">
                            <div className="form-group">
                              <label htmlFor="password">
                                Password<em>*</em>
                              </label>
                              <Field
                                type="password"
                                name="password"
                                id="password"
                                className="form-control"
                                placeholder="Enter Password"
                              />
                              <ErrorMessage
                                name="password"
                                component="div"
                                className="text-danger"
                              />
                            </div>
                          </div>

                          <div className="col-md-12 col-lg-6 col-xl-6">
                            <div className="form-group">
                              <label htmlFor="confirmPassword">
                                Confirm Password<em>*</em>
                              </label>
                              <Field
                                type="password"
                                name="confirmPassword"
                                id="confirmPassword"
                                className="form-control"
                                placeholder="Enter Confirm Password"
                              />
                              <ErrorMessage
                                name="confirmPassword"
                                component="div"
                                className="text-danger"
                              />
                            </div>
                          </div>

                          <div className="col-md-12 col-lg-6 col-xl-6">
                            <div className="form-group">
                              <label htmlFor="phoneNo">
                                Phone No<em>*</em>
                              </label>
                              <Field
                                type="text"
                                name="phoneNo"
                                id="phoneNo"
                                className="form-control"
                                placeholder="Enter Phone No"
                              />
                              <ErrorMessage
                                name="phoneNo"
                                component="div"
                                className="text-danger"
                              />
                            </div>
                          </div>

                          <div className="p-2 mt-3">
                            <button
                              className="btn btn-primary btn-block waves-effect waves-light"
                              type="submit"
                              disabled={isSubmitting}
                            >
                              {isSubmitting ? "Registering..." : "Register"}
                            </button>
                          </div>

                          <div className="mt-4 text-center">
                            <Link to={ROUTES.LOGIN} className="text-muted">
                              <i className="mdi mdi-lock mr-1"></i> Login
                            </Link>
                          </div>
                        </div>
                      </Form>
                    )}
                  </Formik>
                </div>
              </div>
            </div>

            <div className="mt-5 text-center">
              <div>
                <p>
                  &copy; Copyright <i className="mdi mdi-heart text-danger"></i>{" "}
                  RFP System
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSignUp;
