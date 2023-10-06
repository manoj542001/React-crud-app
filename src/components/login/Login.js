import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";

const Login = () => {
  //react hooks form
  const navigate = useNavigate();
  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Email is required").email("Email is invalid"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .matches(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
        "uppercase , symbols and 8 character required "
      )
      .required("Password is required"),
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
  //react hooks from onsubit data
  function onSubmit(data) {
    const exist = JSON.parse(localStorage.getItem("register_log") || "[]");
    console.log(exist);

    const userFind = exist.find(
      (e) => e.email === data.email && e.password === data.password
    );
    console.log(userFind);

    if (!userFind) {
      toast.error("Email or Password Not Match", {
        position: toast.POSITION.TOP_CENTER,
      });
    } else {
      localStorage.setItem("logged_user", JSON.stringify(userFind));
      Swal.fire({
        position: "top-center",
        icon: "success",
        title: "Login Successfully",
        showConfirmButton: false,
        timer: 1500,
      });
      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
    }
  }

  return (
    <div>
      <div className=" container-fluid black p-5">
        <div className="row">
          <div className="col-md-2"></div>
          <div className="col-md-8 ">
            <div className="card m-3 backGR">
              <h5 className="card-header  text-center text-white">
                Login Form
              </h5>
              <div className="card-body text-start">
                <form onSubmit={handleSubmit(onSubmit)} onReset={reset}>
                  <div className="form-group col">
                    <label className="text-white">Email</label>
                    <span className="text-danger">*</span>
                    <input
                      name="email"
                      type="text"
                      {...register("email")}
                      className={`form-control ${
                        errors.email ? "is-invalid" : ""
                      }  bg-transparent border-dark text-white`}
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
                        }  bg-transparent border-dark text-white`}
                      />
                      <div className="invalid-feedback">
                        {errors.password?.message}
                      </div>
                    </div>
                  </div>

                  <div className="form-group">
                    <button
                      type="submit"
                      className="btn btn-secondary mr-1 w-100"
                    >
                      Login
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

export default Login;
