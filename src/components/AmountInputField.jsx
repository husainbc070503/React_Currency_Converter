import React from "react";

const AmountInputField = ({ title, amount, handleAmount }) => {
  return (
    <div className="mt-3">
      <label
        htmlFor={title}
        className="block text-md font-medium text-gray-700"
      >
        {title}
      </label>

      <input
        type="number"
        name="amount"
        id="amount"
        autoFocus
        className="focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-100 p-3 mt-1 w-full rounded-md"
        value={amount}
        onChange={handleAmount}
      />
    </div>
  );
};

export default AmountInputField;
