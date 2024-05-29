import React from "react";
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <>
      <header className="bg-indigo-900 text-xl text-white">
        <nav className="navbar navbar-light bg-primary p-4 shadow-b">
          <div className="container flex gap-3">
            <Link to="/" className="navbar-brand">
              DevPOS
            </Link>
            <Link to="/category" className="navbar-brand">
              CategoryList
            </Link>
            <Link to="/all-product" className="navbar-brand">
              ProductList
            </Link>
            <Link to="/product" className="navbar-brand">
              Products
            </Link>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;
