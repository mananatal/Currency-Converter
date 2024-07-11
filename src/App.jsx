import { useState } from "react";
import InputBox from "./components/InputBox";
import useCurrencyInfo from "./hooks/useCurrencyInfo";


export default function App() {
    const [amount,setAmount]=useState(0);
    const [convertedAmount,setConvertedAmount]=useState(0);
    const [from,setFrom]=useState("usd");
    const [to,setTo]=useState("inr");

    const CurrencyInfo=useCurrencyInfo(from);
    const options=Object.keys(CurrencyInfo);
    
    

    const convert=()=>{
        setConvertedAmount(amount*CurrencyInfo[to]);
    }

    const swap=()=>{
        setFrom(to)
        setTo(from)
        setAmount(convertedAmount)
        setConvertedAmount(amount)
    }

  return (
      <div
          className="w-full h-screen flex flex-wrap justify-center items-center bg-slate-950 bg-cover bg-no-repeat"
          
      >
          <div className="w-full">
              <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30">
                  <form
                      onSubmit={(e) => {
                          e.preventDefault();
                          convert();
                      }}
                  >
                      <div className="w-full mb-1">
                          <InputBox
                              label="From"
                              currencyOptions={options}
                              selectCurrency={from}
                              onAmountChange={(value)=>setAmount(value)}
                              amount={amount}
                              onCurrencyChange={(value)=>setFrom(value)}
                          />
                      </div>
                      <div className="relative w-full h-0.5">
                          <button
                              type="button"
                              className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5"
                              onClick={swap}
                          >
                              swap
                          </button>
                      </div>
                      <div className="w-full mt-1 mb-4">
                          <InputBox
                              label="To"
                              currencyOptions={options}
                              selectCurrency={to}
                              onCurrencyChange={(value)=>setTo(value)}
                              amount={convertedAmount}
                              onAmountChange={(value)=>setConvertedAmount(value)}
                          />
                      </div>
                      <button type="submit" className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg">
                          Convert from {from} to {to}
                      </button>
                  </form>
              </div>
          </div>
      </div>
  );

}