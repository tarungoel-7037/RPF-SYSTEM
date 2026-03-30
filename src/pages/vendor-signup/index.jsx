import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { register } from "../../service/Auth.js";
import { getCategories } from "../../service/Category.js";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { ROUTES } from "../../constants/RoutesConst";

const VendorSignUp = () => {
  const [categories, setCategories] = useState(null);

  const fetchCategories = async () => {
    try {
      const res = await getCategories();
      if (res?.data?.response === "success") {
        const categoriesArray = Object.values(res.data.categories);
        setCategories(categoriesArray);
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchCategories();
  }, []);

  const validationSchema = Yup.object({
    firstName: Yup.string()
      .matches(/^[A-Za-z]+$/, "First Name must contain letters only")
      .required("First Name is required")
      .min(2, "First Name must be atleast 2 characters")
      .max(30, "First Name cannot exceed 30 characters "),
    lastName: Yup.string()
      .matches(/^[A-Za-z]+$/, "Last Name must contain letters only")
      .required("Last Name is required")
      .min(2, "Last Name must be atleast 2 characters")
      .max(30, "Last Name cannot exceed 30 characters"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .min(5, "Password must be at least 5 characters")
      .required("Password is required"),
    confirmPassword: Yup.string().oneOf(
      [Yup.ref("password"), null],
      "Passwords must match",
    ),
    revenue: Yup.string()
      .required("Revenue is required")
      .test(
        "three-numbers",
        "Revenue must have 3 numeruc values seprated by comas",
        (value) => {
          if (!value) return false;
          const parts = value.split(",");
          if (parts.length !== 3) return false;
          return parts.every((p) => /^(0|[1-9]\d*)(\.\d+)?$/.test(p));
        },
      ),
    noOfEmployees: Yup.number()
      .required("No of Employees is required")
      .typeError("No of Employees must be a number")
      .integer("No of Employees must be an integer")
      .min(1, "No of Employees must be at least 1"),

    categories: Yup.array().min(1, "Select at least one category"),
    gstNumber: Yup.string()
      .required("GST No. is Required")
      .matches(
        /^\d{2}[A-Z]{5}\d{4}[A-Z]{1}[A-Z\d]{1}Z[A-Z\d]{1}$/,
        "GST Number is invalid",
      ),

    panNo: Yup.string()
      .required("PAN No. is Required")
      .matches(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, "PAN Number is invalid"),
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
      formData.append("revenue", values.revenue);
      formData.append("no_of_employees", values.noOfEmployees);
      formData.append("category", values.categories.join(","));
      formData.append("pancard_no", values.panNo);
      formData.append("gst_no", values.gstNumber);
      formData.append("mobile", values.phoneNo);
      const res = await register(formData);

      if (res?.data?.response === "success") {
        toast.success("Vendor registered successfully");
      } else {
        toast.error(res?.data?.error);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setSubmitting(false);
      resetForm();
    }
  };
  return (
    <div className="account-pages my-5 pt-sm-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6 col-xl-8">
            <div className="card overflow-hidden">
              <div className="bg-soft-primary">
                <div className="row">
                  <div className="col-12">
                    <div className="text-primary p-4">
                      <h5 className="text-primary">Welcome to RFP System!</h5>
                      <p>Regsiter as Vendor</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card-body pt-0">
                <div className="p-4">
                  <Formik
                    initialValues={{
                      firstName: "",
                      lastName: "",
                      email: "",
                      password: "",
                      confirmPassword: "",
                      revenue: "",
                      noOfEmployees: "",
                      gstNumber: "",
                      panNo: "",
                      phoneNo: "",
                      categories: [],
                    }}
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
                              <label htmlFor="revenue">
                                Revenue (Last 3 Years in Lakhs)<em>*</em>
                              </label>
                              <Field
                                type="text"
                                name="revenue"
                                id="revenue"
                                className="form-control"
                                placeholder="Enter Revenue"
                              />
                              <ErrorMessage
                                name="revenue"
                                component="div"
                                className="text-danger"
                              />
                            </div>
                          </div>

                          <div className="col-md-12 col-lg-6 col-xl-6">
                            <div className="form-group">
                              <label htmlFor="noOfEmployees">
                                No of Employees<em>*</em>
                              </label>
                              <Field
                                type="number"
                                name="noOfEmployees"
                                id="noOfEmployees"
                                className="form-control"
                                placeholder="No of Employees"
                              />
                              <ErrorMessage
                                name="noOfEmployees"
                                component="div"
                                className="text-danger"
                              />
                            </div>
                          </div>

                          <div className="col-md-12 col-lg-6 col-xl-6">
                            <div className="form-group">
                              <label htmlFor="gstNumber">
                                GST No<em>*</em>
                              </label>
                              <Field
                                type="text"
                                name="gstNumber"
                                id="gstNumber"
                                className="form-control"
                                placeholder="Enter GST No"
                              />
                              <ErrorMessage
                                name="gstNumber"
                                component="div"
                                className="text-danger"
                              />
                            </div>
                          </div>

                          <div className="col-md-12 col-lg-6 col-xl-6">
                            <div className="form-group">
                              <label htmlFor="panNo">
                                PAN No<em>*</em>
                              </label>
                              <Field
                                type="text"
                                name="panNo"
                                id="panNo"
                                className="form-control"
                                placeholder="Enter PAN No"
                              />
                              <ErrorMessage
                                name="panNo"
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

                          {/* //Handle Category */}
                          <div className="col-md-12 col-lg-6 col-xl-6">
                            <div className="form-group">
                              <label htmlFor="categories">
                                Categories<em>*</em>
                              </label>
                              <Field
                                as="select"
                                name="categories"
                                multiple
                                className="form-control"
                                id="categories"
                              >
                                {categories?.map((cat) => (
                                  <option key={cat.id} value={cat.id}>
                                    {cat.name}
                                  </option>
                                ))}
                              </Field>
                              <ErrorMessage
                                name="categories"
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
                              {isSubmitting ? "Registering " : "Register"}
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

export default VendorSignUp;
