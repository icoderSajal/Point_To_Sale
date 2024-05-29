import React from "react";
import { Link } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";

function HomePage() {
  return (
    <MainLayout>
      <div className="bg-slate-400 rounded-xl p-5 mt-[70px] gap-5 text-center shadow-2xl grid lg:grid-cols-3 sm:grid-cols-1 md:grid-cols-1">
        <div className="bg-slate-600 px-4 py-4 shadow-xl rounded-2xl text-center text-2xl text-white font-bold">
          <p className="p-4 mb-5">Product to Sale</p>
          <Link
            to="/pos"
            className="bg-slate-900 text-white text-lg px-6 py-2 rounded-lg hover:bg-green-800 duration-1000"
          >
            Sale
          </Link>
        </div>
        <div className="bg-slate-600 px-4 py-4 shadow-xl rounded-2xl text-center text-2xl text-white font-bold">
          <p className="p-4 mb-5">Manage Category</p>
          <Link
            to="/category"
            className="bg-slate-900 text-white text-lg px-6 py-2 rounded-lg hover:bg-green-800 duration-1000"
          >
            Category
          </Link>
        </div>
        <div className="bg-slate-600 px-4 py-4 shadow-xl rounded-2xl text-center text-2xl text-white font-bold">
          <p className="p-4 mb-5">Manage Products</p>
          <Link
            to="/all-product"
            className="bg-slate-900  text-white text-lg px-6 py-2 rounded-lg hover:bg-green-800 duration-1000"
          >
            Product
          </Link>
        </div>
      </div>
    </MainLayout>
  );
}

export default HomePage;
