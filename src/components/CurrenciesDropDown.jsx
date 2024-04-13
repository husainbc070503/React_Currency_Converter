import React from "react";
import { HiOutlineStar, HiStar } from "react-icons/hi2";

const CurrenciesDropDown = ({
  title,
  currencies,
  favLists,
  currency,
  setCurrency,
  addToFavs,
}) => {
  return (
    <div>
      <label
        htmlFor={title}
        className="block text-md font-medium text-gray-700"
      >
        {title}
      </label>

      <div className="mt-1 relative">
        <select
          name={title}
          id={title}
          value={currency}
          className="w-full bg-gray-100 p-2 rounded-md cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500"
          onChange={(e) => setCurrency(e.target.value)}
        >
          {favLists?.map((item) => (
            <option className="bg-white" value={item} key={item}>
              {item}
            </option>
          ))}

          {currencies
            ?.filter((item) => !favLists.includes(item))
            ?.map((item) => (
              <option className="bg-gray-300 mb-1" value={item} key={item}>
                {item}
              </option>
            ))}
        </select>

        <button
          className="absolute right-5 top-3 leading-5"
          onClick={() => addToFavs(currency)}
        >
          {favLists?.includes(currency) ? (
            <HiStar color="orange" />
          ) : (
            <HiOutlineStar />
          )}
        </button>
      </div>
    </div>
  );
};

export default CurrenciesDropDown;
