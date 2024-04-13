import React, { useEffect, useState } from "react";
import { api } from "../Api";
import CurrenciesDropDown from "./CurrenciesDropDown";
import { HiArrowsRightLeft } from "react-icons/hi2";
import AmountInputField from "./AmountInputField";

const CurrencyConverter = () => {
  //  Api for conversion -> https://api.frankfurter.app/latest?amount=10&from=GBP&to=USD

  const [currencies, setCurrencies] = useState([]);
  const [fromCurr, setFromCurr] = useState("INR");
  const [toCurr, setToCurr] = useState("USD");
  const [amount, setAmount] = useState(0);
  const [convertedAmount, setConvertedAmount] = useState("");
  const [converting, setConverting] = useState(false);
  const [favLists, setFavLists] = useState(
    JSON.parse(localStorage.getItem("currency-converter-fav-list")) || []
  );

  const fetchCurrencies = async () => {
    try {
      const res = await fetch(`${api}/currencies`);
      const data = await res.json();
      setCurrencies(Object.keys(data));
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleAddToFavs = (curr) => {
    var updatedFavLists = [...favLists];
    console.log(updatedFavLists.includes(curr));

    if (!updatedFavLists.includes(curr)) {
      updatedFavLists.push(curr);
    } else {
      updatedFavLists = updatedFavLists.filter((item) => item !== curr);
    }

    setFavLists(updatedFavLists);
    localStorage.setItem(
      "currency-converter-fav-list",
      JSON.stringify(updatedFavLists)
    );
  };

  const convertCurrency = async () => {
    setConverting(true);
    try {
      const res = await fetch(
        `${api}/latest?amount=${amount}&from=${fromCurr}&to=${toCurr}`
      );
      const data = await res.json();

      setConverting(false);
      setConvertedAmount(`${data.rates[toCurr]} ${toCurr}`);
    } catch (error) {
      console.log(error.message);
    }
  };

  const swapCurrency = () => {
    setFromCurr(toCurr);
    setToCurr(fromCurr);
  };

  useEffect(() => {
    fetchCurrencies();
  }, []);

  return (
    <div className="bg-white w-screen sm:w-5/12 rounded p-3">
      <h2 className="text-center font-bold text-4xl text-indigo-500 mb-5">
        Currency Converter
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center justify-center">
        <CurrenciesDropDown
          title="From:"
          currencies={currencies}
          currency={fromCurr}
          favLists={favLists}
          addToFavs={handleAddToFavs}
          setCurrency={setFromCurr}
        />

        <div className="flex items-center mt-3 justify-center">
          <button
            className="bg-gray-100 rounded-full p-3 cursor-pointer hover:bg-gray-300"
            onClick={swapCurrency}
          >
            <HiArrowsRightLeft className="text-2xl font-normal" />
          </button>
        </div>

        <CurrenciesDropDown
          title="To:"
          currencies={currencies}
          currency={toCurr}
          favLists={favLists}
          addToFavs={handleAddToFavs}
          setCurrency={setToCurr}
        />
      </div>

      <AmountInputField
        title="Amount:"
        amount={amount}
        handleAmount={(e) => setAmount(e.target.value)}
      />

      {convertedAmount && (
        <p className="text-xl font-bold my-2 text-green-400">
          Converted Amount: {convertedAmount}
        </p>
      )}

      <button
        type="button"
        className="mt-5 bg-indigo-500 p-3 rounded-md text-white font-bold  mx-auto flex items-center"
        onClick={convertCurrency}
      >
        {converting && (
          <span className="animate-spin h-5 w-5 border-r-gray-100 border-l-gray-100 border-b-gray-100 border-t-black rounded-full border-4 mr-2"></span>
        )}
        {converting ? "Converting..." : "Convert"}
      </button>
    </div>
  );
};

export default CurrencyConverter;
