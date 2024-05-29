import React, { useEffect, useRef, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import axios from "axios";
import { toast } from "react-toastify";
import { ComponentToPrint } from "../components/ComponentToPrint";
import { useReactToPrint } from "react-to-print";

function POSPage() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [cart, setCart] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  const toastOptions = {
    autoClose: 400,
    pauseOnHover: true,
  };

  //getall products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:6060/api/v1/product/getallProduct`
      );
      setProducts(data.products);
    } catch (error) {
      console.log(error);
      toast.error("Someething Went Wrong");
    }
  };

  //lifecycle method
  useEffect(() => {
    getAllProducts();
  }, []);
  const addProductToCart = async (product) => {
    // check if the adding product exist
    let findProductInCart = await cart.find((i) => {
      return i.id === product._id;
    });

    if (findProductInCart) {
      let newCart = [];
      let newItem;

      cart.forEach((cartItem) => {
        if (cartItem.id === product.id) {
          newItem = {
            ...cartItem,
            quantity: cartItem.quantity + 1,
            totalAmount: cartItem.price * (cartItem.quantity + 1),
          };
          newCart.push(newItem);
        } else {
          newCart.push(cartItem);
        }
      });

      setCart(newCart);
      toast(`Added ${newItem.name} to cart`, toastOptions);
    } else {
      let addingProduct = {
        ...product,
        quantity: 1,
        totalAmount: product.price,
      };
      setCart([...cart, addingProduct]);
      toast(`Added ${product.name} to cart`, toastOptions);
    }
  };

  const removeProduct = async (product) => {
    const newCart = cart.filter((cartItem) => cartItem._id !== product._id);
    setCart(newCart);
  };

  const componentRef = useRef();

  const handleReactToPrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const handlePrint = () => {
    handleReactToPrint();
  };

  useEffect(() => {
    let newTotalAmount = 0;
    cart.forEach((icart) => {
      newTotalAmount = newTotalAmount + parseInt(icart.totalAmount);
    });
    setTotalAmount(newTotalAmount);
  }, [cart]);

  return (
    <MainLayout>
      <div className="bg-slate-400  rounded-md shadow-lg grid  lg:grid-cols-2 text-center mx-[50px] my-[10px] p-4">
        <div className="rounded-lg overflow-hidden shadow-lg">
          {isLoading ? (
            "Loading"
          ) : (
            <div className=" bg-slate-900 text-white text-center  ">
              {products.map((product, key) => (
                <div key={product._id} className="p-2">
                  <div className="p-2 grid-flow-col gap-2 border ">
                    <div>
                      <img
                        src={`http://localhost:6060/api/v1/product/product-photo/${product._id}`}
                        height={50}
                        width={50}
                        className="text-center"
                        alt={product.name}
                      />
                    </div>
                    <div>
                      <p className="text-center">{product.name}</p>
                      <p>{product.description.substring(0, 30)}</p>
                      <p>Price : {product.price}</p>
                      <button
                        className="bg-slate-200 p-2 text-black rounded-2xl hover:text-sm hover:bg-slate-500"
                        onClick={() => addProductToCart(product)}
                      >
                        Add To Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          <div style={{ display: "none" }}>
            <ComponentToPrint
              cart={cart}
              totalAmount={totalAmount}
              ref={componentRef}
            />
          </div>
          <div className="table-responsive bg-dark gap-2">
            <table className="table table-responsive table-dark table-hover">
              <thead className="p-2 bg-slate-400 text-2xl ">
                <tr className="p-2">
                  <td className="p-2 text-center">#</td>
                  <td className="p-2 text-center">Name</td>
                  <td className="p-2 text-center">Price</td>
                  <td className="p-2 text-center">Qty</td>
                  <td className="p-2 text-center">Total</td>
                  <td className="p-2 text-center">Action</td>
                </tr>
              </thead>
              <tbody className=" bg-slate-200 rounded-lg shadow-xl p-4">
                {cart
                  ? cart.map((cartProduct, key) => (
                      <tr key={key} className="p-2 text-center">
                        <td className="p-2 text-center">{key + 1}</td>
                        <td className="p-2 text-center">{cartProduct.name}</td>
                        <td className="p-2 text-center">{cartProduct.price}</td>
                        <td className="p-2 text-center">
                          {cartProduct.quantity}
                        </td>
                        <td className="p-2 text-center">
                          {cartProduct.totalAmount}
                        </td>
                        <td className="p-2 text-center">
                          <button
                            className="bg-red-500 text-lg text-white  hover:bg-red-950 rounded-lg"
                            onClick={() => removeProduct(cartProduct)}
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))
                  : "No Item in Cart"}
              </tbody>
            </table>
            <h2 className="p-5 text-white text-xl font-bold">
              Total Amount: INR---{totalAmount}
            </h2>
          </div>
          <div className="mt-3">
            {totalAmount !== 0 ? (
              <div>
                <button
                  className="bg-green-500 text-2xl text-white p-2 hover:bg-green-950 rounded-lg"
                  onClick={handlePrint}
                >
                  Pay Now
                </button>
              </div>
            ) : (
              "Please add a product to the cart"
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default POSPage;
