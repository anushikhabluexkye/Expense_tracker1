import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function AddProduct() {
    const history=useNavigate();
  const [data, setData] = useState({
    Product_Name: "",
  });
  const handlechange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handlesubmit = (e) => {
    e.preventDefault();
    console.log(data);
    axios
      .post("http://localhost:5197/api/Category/GetCategory", data)
      .then((response) => {
        console.log(response.data);
        toast.success("product added successfully!");
        history('/dashboard')
      })
      .catch((err) => {
        toast.error("some error occured!")
        console.log(err);
      });
  };
  return (
    <>
      <form onSubmit={handlesubmit}>
        <label htmlFor="productName">Product Name</label>
        <input
          type="text"
          name="Product_Name"
          id="productName"
          placeholder="Enter Product Name"
          autoComplete="off"
          onChange={handlechange}
        />
        <button type="submit">AddProduct</button>
      </form>
    </>
  );
}

export default AddProduct;
