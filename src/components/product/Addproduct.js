import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const Addproduct = () => {
  const navigate = useNavigate();
  const currentLogin = JSON.parse(localStorage.getItem("logged_user"));

  const validationSchema = Yup.object().shape({
    productName: Yup.string()
      .min(3, "Valid Name required")
      .required("productName is required")
      .matches(/^[A-Za-z]+$/, "enter valid name only "),

    details: Yup.string().required("details is required"),
    price: Yup.string()
      .required("price is required")
      .matches(/^[0-9]*$/, "enter Price only")
      .trim()
      .min(3, "Enter correct price"),

    acceptTerms: Yup.bool().oneOf([true], "Accept Ts & Cs is required"),
  });

  // functions to build form returned by useForm() hook
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: "onBlur",
  });

  function onSubmit(data) {
    // display form data on success
    const userData = JSON.parse(
      localStorage.getItem(`${currentLogin.email} product`) || "[]"
    );

    const id = userData.length ? userData[userData.length - 1].id + 1 : 1;

    localStorage.setItem(
      `${currentLogin.email} product`,
      JSON.stringify([
        ...(JSON.parse(localStorage.getItem(`${currentLogin.email} product`)) ||
          []),
        {
          id,
          productName: data.productName,
          details: data.details,
          price: data.price,

          //data nu mattu potta kuda data save aagum
        },
      ])
    );
    toast.success("ADD SUCCESSFULLY ", {
      position: toast.POSITION.TOP_CENTER,
    });
    setTimeout(() => {
      navigate("/view");
    }, 1000);
    reset();
  }
  return (
    <div>
      <div className=" container-fluid black ">
        <div className="row">
          <div className="col-md-2"></div>
          <div className="col-md-8 ">
            <div className="card m-3 backGR ">
              <h5 className="card-header  text-center text-white">
                Add products
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
                        className={`form-control ${
                          errors.productName ? "is-invalid" : ""
                        } bg-transparent border-dark text-white`}
                      />
                      <div className="invalid-feedback">
                        {errors.productName?.message}
                      </div>
                    </div>
                    <div className="form-group col-12-5 my-4">
                      <label className="text-white">Details</label>
                      <span className="text-danger">*</span>
                      <input
                        name="details"
                        type="text"
                        {...register("details")}
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
                      className={`form-control ${
                        errors.price ? "is-invalid" : ""
                      } bg-transparent border-dark text-white`}
                    />
                    <div className="invalid-feedback">
                      {errors.price?.message}
                    </div>
                  </div>

                  <div className="form-group d-flex justify-content-between">
                    <button type="submit" className="sub-btn-add mr-1 ">
                      Add Product
                    </button>
                    <button
                      className=" sub-btn-red mx-2 w-25"
                      type="reset"
                      onClick={() => reset()}
                    >
                      Reset
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="col-md-2"></div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Addproduct;
