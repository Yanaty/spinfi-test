import BigNumber from "bignumber.js";

export const formattedNum = (val, decimals = 24, digits = 4) => {
  const formattedValue = new BigNumber(val);
  const divisor = new BigNumber(10).pow(new BigNumber(decimals));
  return formattedValue.dividedBy(divisor).toNumber().toFixed(digits);
};

export const sortByPrice = (arr) => {
  if (Array.isArray(arr) && arr.length > 0) {
    return arr.sort((a, b) => {
      return a?.price < b?.price ? 1 : -1;
    });
  }
  return arr;
};
