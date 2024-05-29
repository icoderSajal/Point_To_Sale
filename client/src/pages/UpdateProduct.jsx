import React, { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import { Select } from "antd";
import axios from "axios";

import { useNavigate, useParams } from "react-router-dom";
const { Option } = Select;

const UpdateProduct = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState("");
  const [id, setId] = useState("");
  const navigate = useNavigate();
  const params = useParams();

  //get all category
  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:6060/api/v1/product/get-product/${params.id}`
      );
      setName(data.product.name);
      setId(data.product._id);
      setDescription(data.product.description);
      setPrice(data.product.price);
      setPrice(data.product.price);
      setQuantity(data.product.quantity);
      setShipping(data.product.shipping);
      setCategory(data.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getSingleProduct();
    //eslint-disable-next-line
  }, []);

  //get all category
  const getAllCategory = async () => {
    //////////////
    try {
      const { data } = await axios.get(
        `http://localhost:6060/api/v1/category/get-Allcategory`
      );
      setCategories(data.category);
    } catch (error) {
      console.log(error);
      //toast.error("Someething Went Wrong");
    }
    //////////////
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  //create product function
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      photo && productData.append("photo", photo);
      productData.append("category", category);
      const { data } = axios.put(
        `http://localhost:6060/api/v1/product/updateProduct/${id}`,
        productData
      );
      if (data?.success) {
        //toast.error(data?.message);
      } else {
        // toast("Product Updated Successfully");
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      //toast.error("something went wrong");
    }
  };

  return (
    <>
      <MainLayout>
        <div className="bg-slate-400 mt-10  p-4 mx-[20px]  rounded-md">
          <h1 className="mt-6 text-3xl text-center font-bold">
            Update Product
          </h1>

          <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 p-4 gap-5">
            <div className="p-2 text-center">
              <Select
                variant="outlined"
                placeholder="Select a category"
                size="large"
                showSearch
                className="w-full"
                onChange={(value) => {
                  setCategory(value);
                }}
              >
                {categories?.map((c) => (
                  <Option key={c._id} value={c._id}>
                    {c.name}
                  </Option>
                ))}
              </Select>
            </div>
            <div className="p-2 text-center">
              <input
                type="text"
                value={name}
                placeholder="write a name"
                className="w-full p-2 rounded-lg"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="p-2 text-center">
              <textarea
                type="text"
                value={description}
                placeholder="write a description"
                className="w-full p-2 rounded-lg"
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="p-2 text-center">
              <input
                type="number"
                value={price}
                placeholder="write a Price"
                className="w-full p-2 rounded-lg"
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div className="p-2 text-center">
              <input
                type="number"
                value={quantity}
                placeholder="write a quantity"
                className="w-full p-2 rounded-lg"
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>
            <div className="p-2 text-center">
              <Select
                variant="outlined"
                placeholder="Select Shipping "
                size="large"
                showSearch
                className="w-full"
                onChange={(value) => {
                  setShipping(value);
                }}
              >
                <Option value="0">No</Option>
                <Option value="1">Yes</Option>
              </Select>
            </div>
            <div className="p-2 text-center">
              <label className="btn btn-outline-secondary col-md-12">
                <input
                  type="file"
                  name="photo"
                  accept="image/*"
                  className="w-full border border-b-8"
                  onChange={(e) => setPhoto(e.target.files[0])}
                />
              </label>
            </div>
            <div>
              <div className="mb-3">
                {photo ? (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(photo)}
                      alt="product_photo"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                ) : (
                  <div className="text-center">
                    <img
                      src={`http://localhost:6060/api/v1/product/product-photo/${params.id}`}
                      alt="product_photo"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                )}
              </div>
            </div>
            <div className="p-text-center">
              <button
                className="bg-slate-900 text-lg px-4 py-2 text-white hover:bg-green-500 rounded-xl duration-1000"
                onClick={handleUpdate}
              >
                UPDATE PRODUCT
              </button>
            </div>
          </div>
        </div>
      </MainLayout>
    </>
  );
};

export default UpdateProduct;
