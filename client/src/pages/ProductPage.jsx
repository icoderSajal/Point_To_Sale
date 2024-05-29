import MainLayout from "../layouts/MainLayout";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { Select } from "antd";
import { useNavigate } from "react-router-dom";
const { Option } = Select;

const ProductPage = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState("");
  const toastOptions = {
    autoClose: 400,
    pauseOnHover: true,
  };

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
      toast("Someething Went Wrong");
    }
    //////////////
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  //create product function
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      productData.append("photo", photo);
      productData.append("category", category);
      const { data } = axios.post(
        "http://localhost:6060/api/v1/product/createProduct",
        productData
      );
      if (data?.success) {
        //toast.error(data?.message);
      } else {
        // toast.success("Product Created Successfully");
        toast(`Product ${name} created Successfully...`, toastOptions);
        //navigate("/all-product");
      }
    } catch (error) {
      console.log(error);
      toast("something went wrong");
    }
  };

  return (
    <>
      <MainLayout>
        <div className="bg-slate-200 rounded-xl mx-auto">
          <h1 className="mt-6 text-3xl text-center font-bold">
            Create Product
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
                  className="w-full border border-red-900"
                  onChange={(e) => setPhoto(e.target.files[0])}
                />
              </label>
            </div>
            <div>
              <div className="mb-3">
                {photo && (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(photo)}
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
                onClick={handleCreate}
              >
                CREATE PRODUCT
              </button>
            </div>
          </div>
        </div>
      </MainLayout>
    </>
  );
};

export default ProductPage;
