import React, { useState } from "react";

export const ComponentToPrint = React.forwardRef((props, ref) => {
  const { cart, totalAmount } = props;
  const [date, setDate] = useState(new Date());
  // const getdate = () => {
  //   const today = new Date();
  //   const month = today.getMonth() + 1;
  //   const year = today.getFullYear();
  //   const date = today.getDate();
  //   return `${date}/${month}/${year}`;
  // };

  return (
    <>
      <div ref={ref} className="text-center">
        <h1 className="text-3xl font-bold underline">Invoice</h1>
        <h1 className="text-xl font-bold"> Bajaj Health</h1>
        <h1 className="text-xl ">Nai Basti Madhobari</h1>
        <p className="text-xl ">Bareilly- 243001</p>
        <p className="text-xl ">Uttar Pradesh</p>

        <div className="p-5 bg-green-200  text-center">
          <p>Invoice Date:{date.toDateString()}</p>
          <table className="table w-full">
            <thead>
              <tr className="bg-green-500 text-2xl font-bold">
                <th className="w-2">#</th>
                <th>Name</th>
                <th>Price</th>
                <th>Qty</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {cart
                ? cart.map((cartProduct, key) => (
                    <tr className="bg-green-200" key={key}>
                      <td>{key + 1}</td>
                      <td>{cartProduct.name}</td>
                      <td>{cartProduct.price}</td>
                      <td>{cartProduct.quantity}</td>
                      <td>{cartProduct.totalAmount}</td>
                    </tr>
                  ))
                : ""}
            </tbody>
          </table>
          <h2 className="px-2 mt-6 bg-slate-700 text-white font-bold ">
            Total Amount: INR- {totalAmount}
          </h2>
        </div>
      </div>
    </>
  );
});
