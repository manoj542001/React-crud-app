import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import DataTable from "react-data-table-component";
import { BiCartAdd } from "react-icons/bi";
import { MdDeleteForever } from "react-icons/md";
import { BiEditAlt } from "react-icons/bi";
import image from "../../image/Puma_Banner.webp";

const Viewproduct = () => {
  const currentLogin = JSON.parse(localStorage.getItem("logged_user"));

  const navigate = useNavigate();
  const localData = JSON.parse(
    localStorage.getItem(`${currentLogin.email} product`) || "[]"
  );
  console.log(localData);
  const [del, setDel] = useState(
    JSON.parse(localStorage.getItem(`${currentLogin.email} product`) || "[]")
  );

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
        const deleteData = localData.filter((data) => data.id !== id);
        setDel(deleteData);
        localStorage.setItem(
          `${currentLogin.email} product`,
          JSON.stringify(deleteData)
        );
      }
    });
  };

  const columns = [
    {
      id: 1,
      name: "id",
      selector: (row) => row.id,
      sortable: true,
      reorder: true,
    },
    {
      id: 2,
      name: "productName",
      selector: (row) => row.productName,
      sortable: true,
      reorder: true,
    },
    {
      id: 3,
      name: "details",
      selector: (row) => row.details,
      sortable: true,

      reorder: true,
    },
    {
      id: 4,
      name: "price",
      selector: (row) => row.price,
      sortable: true,
      reorder: true,
    },
    {
      id: 5,
      name: "Edit",
      cell: (row) => (
        <button
          className="btn btn-warning"
          onClick={() => navigate(`update/${row.id}`)}
        >
          <span className="">
            <BiEditAlt />
          </span>
          Edit
        </button>
      ),
      sortable: true,
      reorder: true,
    },
    {
      id: 6,
      name: "Delete",
      selector: (row) => (
        <button
          className="btn btn-danger "
          onClick={() => handleDelete(row.id)}
        >
          <span className="">
            <MdDeleteForever />
          </span>
          Delete
        </button>
      ),
      sortable: true,
      reorder: true,
    },
  ];
  return (
    <div className="hell">
      <div className="container-fluid p-0">
        <img src={image} alt="" className="img-fluid " />
      </div>
      <div className="d-flex justify-content-between p-2">
        <h3>Products</h3>
        <h3 className="crush" onClick={() => navigate("/add")}>
          <BiCartAdd />
        </h3>
      </div>

      <DataTable
        columns={columns}
        data={del}
        defaultSortFieldId={1}
        pagination={2}
        // selectableRows
      />
    </div>
  );
};

export default Viewproduct;
