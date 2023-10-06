import React from "react";
import download from "../../image/Puma-1024x700.jpg";

const DashboardTable = () => {
  //get login data
  const localData = JSON.parse(localStorage.getItem("logged_user"));
  console.log(localData);
  //get login product data
  const product = JSON.parse(
    localStorage.getItem(`${localData.email} product`) || "[]"
  );

  return (
    <div>
      {product.length > 0 ? (
        <table class="table table-striped">
          <thead>
            <tr>
              <th scope="col">S.No</th>
              <th scope="col">Product Name</th>
              <th scope="col">Details</th>
              <th scope="col">Price</th>
            </tr>
          </thead>
          <tbody>
            {product.length > 0 ? (
              product.slice(0, 5).map((e) => (
                <tr>
                  <th scope="row">{e.id}</th>
                  <td>{e.productName}</td>
                  <td>{e.details}</td>
                  <td>{e.price}</td>
                </tr>
              ))
            ) : (
              <>
                <h1 className="text-center text-danger">no data found</h1>
              </>
            )}
          </tbody>
        </table>
      ) : (
        <>
          <div className="pt-3">
            <img src={download} alt="" className=" high" />
          </div>
        </>
      )}
    </div>
  );
};

export default DashboardTable;
