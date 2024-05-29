import MainLayout from "../layouts/MainLayout";
import React, { useEffect, useState } from "react";
import axios from "axios";
import CategoryForm from "../components/CategoryForm";
import { Modal } from "antd";

const CategoryPage = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:6060/api/v1/category/create-category",
        {
          name,
        }
      );
      if (data?.success) {
        //toast.success(`${name} is created`);
        getAllCategory();
      } else {
        //toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      //toast.error("somthing went wrong in input form");
    }
  };
  //get all cat
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:6060/api/v1/category/get-Allcategory"
      );
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      //toast.error("Something wwent wrong in getting catgeory");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);
  //update category
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `http://localhost:6060/api/v1/category/update-category/${selected._id}`,
        { name: updatedName }
      );
      if (data?.success) {
        //toast.success(`${updatedName} is updated`);
        setSelected(null);
        setUpdatedName("");
        setVisible(false);
        getAllCategory();
      } else {
        //toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  //delete category
  const handleDelete = async (pId) => {
    try {
      const { data } = await axios.delete(
        `http://localhost:6060/api/v1/category/delete-category/${pId}`
      );
      if (data.success) {
        // toast.success(`category is deleted`);

        getAllCategory();
      } else {
        // toast.error(data.message);
      }
    } catch (error) {
      // toast.error("Somtihing went wrong");
    }
  };

  return (
    <>
      <MainLayout>
        <div className="p-4 rounded-lg bg-slate-300">
          <h1 className="mt-2 mb-4 text-center text-3xl font-bold">
            Manage Category List
          </h1>
          <div className="text-center">
            <CategoryForm
              handleSubmit={handleSubmit}
              value={name}
              setValue={setName}
            />
            <Modal
              onCancel={() => setVisible(false)}
              footer={null}
              open={visible}
              className="border border-indigo-500"
            >
              <CategoryForm
                value={updatedName}
                setValue={setUpdatedName}
                handleSubmit={handleUpdate}
              />
            </Modal>
          </div>
          <div className="text-center mt-10">
            <table className="w-full p-2 bg-slate-400 shadow-xl rounded-xl mx-auto">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {categories?.map((c) => (
                  <>
                    <tr>
                      <td key={c._id}>{c.name}</td>
                      <td>
                        <button
                          className="p-1 rounded-lg bg-green-400 text-white hover:bg-green-800 duration-1000"
                          onClick={() => {
                            setVisible(true);
                            setUpdatedName(c.name);
                            setSelected(c);
                          }}
                        >
                          Edit
                        </button>
                        <button
                          className="bg-red-500 p-1 rounded-lg text-white hover:bg-red-800 duration-1000"
                          onClick={() => {
                            handleDelete(c._id);
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  </>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </MainLayout>
    </>
  );
};

export default CategoryPage;
