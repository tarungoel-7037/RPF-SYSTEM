import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { resetPassword } from "../../service/Auth";
import { ROUTES } from "../../constants/RoutesConst";
import { Link } from "react-router-dom";

const ResetPassword = () => {
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .min(5, "Password must be at least 5 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .required("Confirm Password is required")
      .oneOf([Yup.ref("password"), null], "Passwords must match"),
    otp: Yup.string().required("OTP is required"),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const payload = {
        email: values.email,
        new_password: values.password,
        otp: values.otp,
      };
      const res = await resetPassword(payload);
      if (res?.data?.response === "success") {
        toast.success("Password changed successfully");
        resetForm();
      } else {
        toast.error(res?.data?.error?.[0] || res?.data?.error);
      }
    } catch (error) {
      console.error(error);
      toast.error(
        error?.response?.data?.error ||
          error?.response?.data?.message ||
          "Something went wrong",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="account-pages my-5 pt-sm-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6 col-xl-5">
            <div className="card overflow-hidden">
              <div className="bg-soft-primary">
                <div className="row">
                  <div className="col-12">
                    <div className="text-primary p-4">
                      <h5 className="text-primary">Welcome to RFP System!</h5>
                      <p>Reset Password</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card-body pt-0">
                <div className="p-2">
                  <Formik
                    initialValues={{
                      password: "",
                      confirmPassword: "",
                      otp: "",
                      email: "",
                    }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                  >
                    {({ isSubmitting }) => (
                      <Form>
                        <div className="form-group">
                          <label htmlFor="email">Email</label>
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
                        <div className="form-group">
                          <label htmlFor="password">New Password</label>
                          <Field
                            type="password"
                            name="password"
                            id="password"
                            className="form-control"
                            placeholder="Enter new password"
                          />
                          <ErrorMessage
                            name="password"
                            component="div"
                            className="text-danger"
                          />
                        </div>

                        <div className="form-group">
                          <label htmlFor="confirmPassword">
                            Confirm Password
                          </label>
                          <Field
                            type="password"
                            name="confirmPassword"
                            id="confirmPassword"
                            className="form-control"
                            placeholder="Confirm new password"
                          />
                          <ErrorMessage
                            name="confirmPassword"
                            component="div"
                            className="text-danger"
                          />
                        </div>

                        <div className="form-group">
                          <label htmlFor="otp">OTP</label>
                          <Field
                            type="text"
                            name="otp"
                            id="otp"
                            className="form-control"
                            placeholder="Enter OTP"
                          />
                          <ErrorMessage
                            name="otp"
                            component="div"
                            className="text-danger"
                          />
                        </div>

                        <div className="mt-3">
                          <button
                            className="btn btn-primary btn-block waves-effect waves-light"
                            type="submit"
                            disabled={isSubmitting}
                          >
                            {isSubmitting ? "Submitting..." : "Submit"}
                          </button>
                        </div>
                        <div className="mt-4 text-center">
                          <Link to={ROUTES.LOGIN} className="text-muted">
                            <i className="mdi mdi-lock mr-1"></i> Login
                          </Link>
                        </div>
                      </Form>
                    )}
                  </Formik>
                </div>
              </div>
            </div>

            <div className="mt-5 text-center">
              <p>
                © Copyright <i className="mdi mdi-heart text-danger"></i> RFP
                System
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
