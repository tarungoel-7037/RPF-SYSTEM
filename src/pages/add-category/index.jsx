import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { addCategory } from "../../service/Category.js";
import Breadcrumb from "../../components/breadcrumb/index.jsx";
import { ADD_CATEGORY_BREADCRUMBS } from "../../constants/AppConst.js";

const AddCategory = () => {
  const validationSchema = Yup.object({
    category: Yup.string().required("Category is required"),
  });

  const initialValues = {
    category: "",
  };

  const handleSubmit = async (values, { resetForm, setSubmitting }) => {
    try {
      const formData = new FormData();
      formData.append("name", values.category);
      const res = await addCategory(formData);
      if (res?.data?.response === "success") {
        toast.success("Category added successfully");
        resetForm();
      } else {
        toast.error(res?.data?.error || "Something went wrong");
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
    <div className="d-flex flex-column pt-1 px-3">
      <div className="page-title-box d-flex align-items-center justify-content-between">
        <h5 className="mb-0">Add Category</h5>
        <Breadcrumb items={ADD_CATEGORY_BREADCRUMBS} />
      </div>

      <div className="row">
        <div className="col-lg-6">
          <div className="card">
            <div className="card-body">
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting }) => (
                  <Form>
                    <div className="form-group">
                      <label htmlFor="category">
                        Category Name <em>*</em>
                      </label>
                      <Field
                        type="text"
                        name="category"
                        id="category"
                        className="form-control"
                        placeholder="Enter category name"
                      />
                      <ErrorMessage
                        name="category"
                        component="div"
                        className="text-danger mt-1"
                      />
                    </div>

                    <div className="text-right mt-4">
                      <button
                        type="submit"
                        className="btn btn-success"
                        disabled={isSubmitting}
                      >
                        Submit
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCategory;
