import { useState } from "react";


const currencies = [
  { code: "us", name: "USD - Mỹ" },
  { code: "vn", name: "VND - Việt Nam" },
  { code: "eu", name: "EUR - Châu Âu" },
  { code: "ca", name: "CAD - Canada" },
  { code: "au", name: "AUD - Úc" },
];

const CurrencySelector = () => {
  const [selectedCurrency, setSelectedCurrency] = useState("vn");
  return (
    <div className="relative inline-block text-black">
      {/* Nút chọn tiền tệ */}
      <button className="flex items-center px-4 py-2 border rounded-lg shadow-md bg-white hover:bg-gray-700 hover:text-white">
        <span className={`flag-icon flag-icon-${selectedCurrency} w-6 h-6 mr-2`}></span>
        {currencies.find((c) => c.code === selectedCurrency)?.name}
      </button>

      {/* Dropdown danh sách tiền tệ */}
      <div className="absolute mt-2 w-48 bg-white shadow-lg rounded-lg">
        {currencies.map((currency) => (
          <button
            key={currency.code}
            className="flex items-center px-4 py-2 w-full hover:bg-gray-700 hover:text-white"
            onClick={() => setSelectedCurrency(currency.code)}
          >
            <span className={`flag-icon flag-icon-${currency.code} w-6 h-6 mr-2`}></span>
            {currency.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CurrencySelector;
