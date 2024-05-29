import MainLayout from "../layouts/MainLayout";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import axios from "axios";

const ProductsList = () => {
  const [products, setProducts] = useState([]);
  //getall products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:6060/api/v1/product/getallProduct"
      );
      setProducts(data.products);
    } catch (error) {
      console.log(error);
      // toast.error("Someething Went Wrong");
    }
  };

  //lifecycle method
  useEffect(() => {
    getAllProducts();
  }, []);

  const deleteRole = async (pid) => {
    let result = await fetch(
      `http://localhost:6060/api/v1/product/deleteProduct/${pid}`,
      {
        method: "Delete",
      }
    );
    //alert("Product Deleted Successfully!!!");

    result = await result.json();
    if (result) {
      getAllProducts();
    }
  };
  return (
    <>
      <MainLayout>
        <div className="bg-slate-500 p-4 rounded-md">
          <h1 className="mt-2 mb-4 text-center text-3xl font-bold">
            All Products List
          </h1>
          <div className="grid bg-slate-300 p-2 rounded-md m-auto  lg:grid-cols-4 gap-2">
            {products.map((item, index) => (
              <div
                key={item._id}
                className="p-1 border border-red-100 rounded-md text-center shadow-2xl"
              >
                <img
                  src={`http://localhost:6060/api/v1/product/product-photo/${item._id}`}
                />
                <p>{item._id}</p>
                <h2 className="text-2xl font-semibold">{item.name}</h2>
                <h2>{item.price}</h2>
                <p className="text-lg font-bold"></p>
                <Link to={"/updateproduct/" + item._id}>
                  <button className="p-1 rounded-lg bg-green-400 text-white hover:bg-green-800 duration-1000">
                    Edit
                  </button>
                </Link>
                <button
                  className="bg-red-500 p-1 rounded-lg text-white hover:bg-red-800 duration-1000"
                  onClick={() => deleteRole(item._id)}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      </MainLayout>
    </>
  );
};

export default ProductsList;
