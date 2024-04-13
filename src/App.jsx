import React, { useState } from "react";
import CurrencyConverter from "./components/CurrencyConverter";

const App = () => {
  return (
    <div className="min-h-screen flex flex-col items-center pt-24 bg-gray-100">
      <CurrencyConverter />
    </div>
  );
};

export default App;
