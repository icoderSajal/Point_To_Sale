import React from "react";

const CategoryForm = ({ handleSubmit, value, setValue }) => {
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            type="text"
            placeholder="Enter new category"
            className="h-14 w-[300px] rounded-xl p-4"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="bg-slate-900 text-white text-lg px-6 py-2 rounded-lg hover:bg-green-800 duration-1000"
        >
          Submit
        </button>
      </form>
    </>
  );
};

export default CategoryForm;
