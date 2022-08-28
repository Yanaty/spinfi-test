import React, { useEffect, useState, useMemo } from "react";
import "./Markets.css";
import { getMarketById, getMarkets } from "../../near-api";
import OrderBook from "../OrderBook";
import { sortByPrice } from "../../utils";

const Markets = () => {
  const [markets, setMarkets] = useState([]);
  const [selectedMarketId, setSelectedMarketId] = useState("");
  const [orderBookData, setOrderBookData] = useState(null);

  const selectedMarket = useMemo(() => {
    return markets.find((item) => item.id == selectedMarketId);
  }, [selectedMarketId, markets]);

  useEffect(() => {
    getMarkets()
      .then((result) => {
        setMarkets(result);
      })
      .catch((err) => {
        console.log("Error ", err);
      });
  }, []);

  const handleChange = (event) => {
    const value = event.target.value;
    setSelectedMarketId(value);

    getMarketById(+value)
      .then((res) => {
        if (res) {
          sortByPrice(res?.ask_orders);
          setOrderBookData(res);
        }
      })
      .catch((err) => {
        console.log("Error ", err);
      });
  };

  return (
    <>
      <div className="markets">
        <div>Choose markets:</div>
        <select onChange={handleChange} value={selectedMarketId}>
          <option disabled value="">
            Select market
          </option>
          {markets.map((item) => {
            return (
              <option key={item.id} value={item.id}>
                {item?.base?.ticker} / {item?.quote?.ticker}
              </option>
            );
          })}
        </select>
      </div>
      <OrderBook market={selectedMarket} data={orderBookData} />
    </>
  );
};

export default Markets;
