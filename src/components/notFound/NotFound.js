import React from "react";
import notFound from "../../image/404-drib23.gif";
import { FaExternalLinkAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <>
      <h4 className="text-center mt-3">
        Go to Home page
        <span onClick={() => navigate("/")} className="crush mx-2">
          <FaExternalLinkAlt />
        </span>
      </h4>
      <div className="container-fluid p-2 d-flex justify-content-center align-items-center hell">
        <img src={notFound} alt="" className="img-fluid w-75 h-75" />
      </div>
    </>
  );
};

export default NotFound;
