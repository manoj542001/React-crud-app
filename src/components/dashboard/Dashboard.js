import React from "react";
import { useNavigate } from "react-router-dom";
import { FaHandPointRight } from "react-icons/fa";
import DashboardTable from "./DashboardTable";
import sport from "../../image/sport.gif";

const Dashboard = () => {
  //navigate to the another page
  const navigate = useNavigate();
  //get login data localstorage data
  const localData = JSON.parse(localStorage.getItem("logged_user"));
  console.log(localData);
  //get login user product data
  const product = JSON.parse(
    localStorage.getItem(`${localData.email} product`) || "[]"
  );

  return (
    <div>
      <div className="container hell">
        <div className="row">
          <div className="col-md-4">
            <div className="card  m-auto my-5">
              <div className="card-body">
                <p>
                  Connect to
                  <span className="ms-2 hdd">
                    <FaHandPointRight />
                  </span>
                  <span class="text-danger mx-3  py-1 hd">
                    {localData.firstName}
                  </span>
                </p>
                <h5>
                  Product Count :
                  <span class="badge bg-success mx-2 px-3 py-1">
                    {product.length}
                  </span>
                </h5>

                <div></div>
              </div>
              <img src={sport} alt="" />
            </div>
          </div>
          <div className="col-md-8">
            <div className="d-flex justify-content-between mt-5 mb-3">
              <button
                className="btn btn-outline-warning "
                onClick={() => navigate("/add")}
              >
                Add Products
              </button>
              <button
                className="btn btn-outline-warning "
                onClick={() => navigate("/view")}
              >
                View Products
              </button>
            </div>
            <DashboardTable />
          </div>
        </div>
      </div>
      <div className=""></div>
    </div>
  );
};

export default Dashboard;
