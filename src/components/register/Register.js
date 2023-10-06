import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const validationSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(4, "Valid Name required")
      .required(" Name is required")
      .trim()
      .matches(/^[A-Za-z]+$/, "enter valid name only "),

    email: Yup.string()
      .required("Email is required")
      .email("Email is invalid")
      .trim(),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required")
      .matches(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
        "uppercase , symbols and 8 character required "
      )
      .trim(),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required")

      .trim(),

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
    mode: "all",
  });

  // const clearData = () => {
  //   reset({ email: "" });
  // };

  function onSubmit(data) {
    // display form data on success
    const userData = JSON.parse(localStorage.getItem("register_log") || "[]");
    const id = userData.length ? userData[userData.length - 1].id + 1 : 1;
    const exisist = userData.find((x) => x.email === data.email);
    if (exisist) {
      toast.error("already Email exist!", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }

    localStorage.setItem(
      "register_log",
      JSON.stringify([
        ...(JSON.parse(localStorage.getItem("register_log")) || []),
        {
          id,
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          password: data.password,
          confirmPassword: data.confirmPassword,

          //data nu mattu potta kuda data save aagum
        },
      ])
    );
    toast.success("Register Successfully!!", {
      position: toast.POSITION.TOP_CENTER,
    });

    setTimeout(() => {
      navigate("/login");
    }, 2000);
  }
  return (
    <div className=" container-fluid black">
      <div className="row">
        <div className="col-md-2"></div>
        <div className="col-md-8">
          <div className="card m-3 backGR">
            <h5 className="card-header black text-center text-white mt-3">
              Register Form
            </h5>
            <div className="card-body text-start">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-row">
                  <div className="form-group col-12-5 my-4">
                    <label className="text-white"> Name</label>
                    <span className="text-danger">*</span>
                    <input
                      name="firstName"
                      type="text"
                      {...register("firstName")}
                      className={`form-control ${
                        errors.firstName ? "is-invalid" : ""
                      } bg-transparent border-dark text-white`}
                    />
                    <div className="invalid-feedback">
                      {errors.firstName?.message}
                    </div>
                  </div>
                </div>
                <div className="form-group col">
                  <label className="text-white">Email</label>
                  <span className="text-danger">*</span>
                  <input
                    name="email"
                    type="text"
                    {...register("email")}
                    className={`form-control ${
                      errors.email ? "is-invalid" : ""
                    } bg-transparent border-dark text-white`}
                  />
                  <div className="invalid-feedback">
                    {errors.email?.message}
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col-12-5 my-4">
                    <label className="text-white">Password</label>
                    <span className="text-danger">*</span>
                    <input
                      name="password"
                      type="password"
                      {...register("password")}
                      className={`form-control ${
                        errors.password ? "is-invalid" : ""
                      } bg-transparent border-dark text-white`}
                    />
                    <div className="invalid-feedback">
                      {errors.password?.message}
                    </div>
                  </div>
                  <div className="form-group col-12-5 my-4">
                    <label className="text-white">Confirm Password</label>
                    <span className="text-danger">*</span>
                    <input
                      name="confirmPassword"
                      type="password"
                      {...register("confirmPassword")}
                      className={`form-control ${
                        errors.confirmPassword ? "is-invalid" : ""
                      } bg-transparent border-dark text-white`}
                    />
                    <div className="invalid-feedback">
                      {errors.confirmPassword?.message}
                    </div>
                  </div>
                </div>
                <div className="form-group form-check my-4">
                  <input
                    name="acceptTerms"
                    type="checkbox"
                    {...register("acceptTerms")}
                    id="acceptTerms"
                    className={`form-check-input ${
                      errors.acceptTerms ? "is-invalid" : ""
                    }`}
                  />
                  <label
                    for="acceptTerms"
                    className="form-check-label text-white"
                  >
                    Accept Terms & Conditions
                  </label>
                  <div className="invalid-feedback">
                    {errors.acceptTerms?.message}
                  </div>
                </div>
                <div className="form-group">
                  <button type="submit" className="sub-btn">
                    <span className="sub-text"> register</span>
                  </button>
                  <button
                    className="sub-btn-red mx-2 "
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
      <ToastContainer />
    </div>
  );
};

export default Register;
