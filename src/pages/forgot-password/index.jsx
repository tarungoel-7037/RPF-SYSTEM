import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { forgotPassword } from "../../service/Auth";
import { Link } from "react-router-dom";
import { ROUTES } from "../../constants/RoutesConst";
const ForgotPassword = () => {
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const formData = new FormData();
      formData.append("email", values.email);
      const res = await forgotPassword(formData);
      if (res?.data?.response === "success") {
        toast.success(res?.data?.message);
        resetForm();
      } else {
        toast.error(res?.data?.error?.[0] || res?.data?.error);
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
          <div className="col-md-8 col-lg-6 col-xl-5">
            <div className="card overflow-hidden">
              <div className="bg-soft-primary">
                <div className="row">
                  <div className="col-12">
                    <div className="text-primary p-4">
                      <h5 className="text-primary">Welcome to RFP System!</h5>
                      <p>Forgot Password</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card-body pt-0">
                <div className="p-2">
                  <Formik
                    initialValues={{ email: "" }}
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

                        <div className="mt-3">
                          <button
                            className="btn btn-primary btn-block waves-effect waves-light"
                            type="submit"
                            disabled={isSubmitting}
                          >
                            {isSubmitting ? "Sending..." : "Send OTP"}
                          </button>
                        </div>
                        <div className="mt-4 text-center">
                          <Link
                            to={ROUTES.RESET_PASSWORD}
                            className="text-muted"
                          >
                            <i className="mdi mdi-lock-reset mr-1"></i> Reset
                            Password
                          </Link>
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

export default ForgotPassword;
