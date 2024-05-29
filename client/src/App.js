import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import POSPage from "./pages/POSPage";
import ProductPage from "./pages/ProductPage";
import ProductsList from "./pages/ProductsList";
import UpdateProduct from "./pages/UpdateProduct";
import CategoryPage from "./pages/CategoryPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/pos" element={<POSPage />} />
        <Route path="/product" element={<ProductPage />} />
        <Route path="/all-product" element={<ProductsList />} />
        <Route path="/updateproduct/:id" element={<UpdateProduct />} />
        <Route path="/category" element={<CategoryPage />} />
      </Routes>
    </Router>
  );
}

export default App;
