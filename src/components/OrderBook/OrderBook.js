import React, { useMemo } from "react";
import "./OrderBook.css";
import { formattedNum } from "../../utils";

const OrderBook = ({ market, data }) => {
  const priceDiff = useMemo(() => {
    if (data) {
      const askPrice = data?.ask_orders[data?.ask_orders.length - 1]?.price;
      const bidPrice = data?.bid_orders[0]?.price;
      return formattedNum(askPrice - bidPrice);
    }
  }, [data]);

  const spread = useMemo(() => {
    if (data) {
      const askPrice = formattedNum(
        data?.ask_orders[data?.ask_orders.length - 1]?.price
      );
      const bidPrice = formattedNum(data?.bid_orders[0]?.price);
      const calcSpread = (+askPrice / +bidPrice - 1) * 100;
      return calcSpread.toFixed(2);
    }
  }, [data]);

  if (!data) return null;

  return (
    <div className="order-book">
      <table className="book-table">
        <thead>
          <tr className="table-head">
            <th>Price ({market?.quote?.ticker})</th>
            <th>Size ({market?.base?.ticker})</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {data?.ask_orders?.map((item, i) => {
            const formattedPrice = formattedNum(item?.price);
            // НЕ думаю, что это правильно сделано, но я не поняла почему такие большие объемы, бывают ли такие вообще и как их правильно отобржать
            const formattedQuantity = formattedNum(item?.quantity);
            const total = Number(formattedPrice * formattedQuantity).toFixed(2);
            return (
              <tr key={i}>
                <td className="text-red">{formattedPrice}</td>
                <td>{formattedQuantity}</td>
                <td>{total}</td>
              </tr>
            );
          })}
          <tr className="middle-row">
            <td>{priceDiff}</td>
            <td>Spread</td>
            <td>{spread}%</td>
          </tr>
          {data?.bid_orders?.map((item, i) => {
            const formattedPrice = formattedNum(item?.price);
            // НЕ думаю, что это правильно сделано, но я не поняла почему такие большие объемы, бывают ли такие вообще и как их правильно отобржать
            const formattedQuantity = formattedNum(item?.quantity);
            const total = Number(formattedPrice * formattedQuantity).toFixed(2);
            return (
              <tr key={i}>
                <td className="text-green">{formattedPrice}</td>
                <td>{formattedQuantity}</td>
                <td>{total}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default OrderBook;
