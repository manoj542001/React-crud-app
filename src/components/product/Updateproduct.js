import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
const Uodateproduct = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const currentLogin = JSON.parse(localStorage.getItem("logged_user"));
  const userAllProducts = JSON.parse(
    localStorage.getItem(`${currentLogin.email} product`)
  );

  const getSingleProduct = userAllProducts.find(
    (product) => product.id === Number(id)
  );

  const validationSchema = Yup.object().shape({
    productName: Yup.string()
      .required("productName is required")
      .min(3, "Valid Name required")
      .matches(/^[A-Za-z]+$/, "enter valid name only "),

    details: Yup.string().required("details is required"),
    price: Yup.string()
      .required("price is required")
      .trim()
      .matches(/^[0-9]*$/, "enter Price only")
      .min(3, "Enter correct price"),
  });

  // functions to build form returned by useForm() hook
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: "all",
  });

  function onSubmit(data) {
    // display form data on success
    const updateProduct = userAllProducts.map((product) =>
      product.id === Number(id)
        ? {
            id: product.id,
            productName: data.productName,
            details: data.details,
            price: data.price,
          }
        : product
    );
    localStorage.setItem(
      `${currentLogin.email} product`,
      JSON.stringify(updateProduct)
    );
    toast.success("UPDATE SUCCESSFULLY ", {
      position: toast.POSITION.TOP_CENTER,
    });
    setTimeout(() => {
      navigate("/view");
    }, 1000);
  }
  return (
    <div>
      <div>
        <div className=" container-fluid black">
          <div className="row">
            <div className="col-md-2"></div>
            <div className="col-md-8">
              <div className="card m-3 backGR">
                <h5 className="card-header text-center text-white">
                  Update products
                </h5>
                <div className="card-body text-start">
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-row">
                      <div className="form-group col-12-5 my-4">
                        <label className="text-white">product Name</label>
                        <span className="text-danger">*</span>
                        <input
                          name="productName"
                          type="text"
                          {...register("productName")}
                          defaultValue={getSingleProduct.productName}
                          className={`form-control ${
                            errors.productName ? "is-invalid" : ""
                          } bg-transparent border-dark text-white`}
                        />
                        <div className="invalid-feedback">
                          {errors.firstName?.message}
                        </div>
                      </div>
                      <div className="form-group col-12-5 my-4">
                        <label className="text-white">Details</label>
                        <span className="text-danger">*</span>
                        <input
                          name="details"
                          type="text"
                          {...register("details")}
                          defaultValue={getSingleProduct.details}
                          className={`form-control ${
                            errors.details ? "is-invalid" : ""
                          } bg-transparent border-dark text-white`}
                        />
                        <div className="invalid-feedback">
                          {errors.details?.message}
                        </div>
                      </div>
                    </div>
                    <div className="form-group col my-4">
                      <label className="text-white">Price</label>
                      <span className="text-danger">*</span>
                      <input
                        name="price"
                        type="text"
                        {...register("price")}
                        defaultValue={getSingleProduct.price}
                        className={`form-control ${
                          errors.price ? "is-invalid" : ""
                        } bg-transparent border-dark text-white`}
                      />
                      <div className="invalid-feedback">
                        {errors.price?.message}
                      </div>
                    </div>

                    <div className="form-group">
                      <button
                        type="submit"
                        className="btn btn-warning mr-1 w-100"
                      >
                        Update
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="col-md-2"></div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Uodateproduct;
