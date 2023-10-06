import React from "react";
import logo from "../../image/pumalogo.png";
import { useNavigate } from "react-router-dom";
const Header = () => {
  const navigate = useNavigate();
  //get login data from local storage
  const loginUser = JSON.parse(localStorage.getItem("logged_user"));
  //log out function using to remove local storage
  const logOutSession = () => {
    localStorage.removeItem("logged_user");
    navigate("/");
  };
  return (
    <div>
      <nav class="navbar navbar-expand-sm navbar-light bg-light ">
        <h1 class="navbar-brand text-white ps-4 pt-3  pb-0">
          <img
            src={logo}
            alt=""
            className=" ban cursor-pointer"
            onClick={() => navigate("/")}
          />
        </h1>

        <button
          class="navbar-toggler d-lg-none"
          type="button"
          data-toggle="collapse"
          data-target="#collapsibleNavId"
          aria-controls="collapsibleNavId"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div
          class="collapse navbar-collapse d-flex justify-content-end "
          id="collapsibleNavId"
        >
          <ul class="navbar-nav mr-auto mt-2 mt-lg-0  ">
            <li class="nav-item">
              {loginUser ? (
                <button
                  className="btn btn-info me-2"
                  onClick={() => navigate("/dashboard")}
                >
                  DashBoard
                </button>
              ) : (
                <button
                  className="btn btn-outline-danger me-2"
                  onClick={() => navigate("/register")}
                >
                  Register
                </button>
              )}
            </li>
            <li class="nav-item">
              {loginUser ? (
                <button
                  onClick={() => logOutSession()}
                  className="btn btn-danger me-2"
                >
                  Logout
                </button>
              ) : (
                <button
                  className="btn btn-danger me-2"
                  onClick={() => navigate("/login")}
                >
                  Login
                </button>
              )}
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Header;
