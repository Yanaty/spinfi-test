import React, { useEffect, useState } from "react";
import { utils } from "near-api-js";
import "./AccountInfo.css";

const AccountInfo = () => {
  const urlPrefix = `https://explorer.testnet.near.org/accounts`;
  const [balance, setBalance] = useState("0");

  useEffect(() => {
    const getBalance = async () => {
      const walletAccountObj = window.walletConnection.account();
      const yoctoNEARBalance = await walletAccountObj.getAccountBalance();
      const accountBalance = utils.format.formatNearAmount(
        yoctoNEARBalance?.available
      );
      setBalance(Number(accountBalance).toFixed(5));
    };
    getBalance();
  }, []);

  return (
    <div className="account-info">
      <div className="account-row">
        Your account ID:{" "}
        <a
          target="_blank"
          rel="noreferrer"
          href={`${urlPrefix}/${window.accountId}`}
        >
          <code>{window.accountId}</code>
        </a>
      </div>
      <div className="account-row">
        NEAR balance: <code className="green-text">{balance} NEAR</code>
      </div>
    </div>
  );
};

export default AccountInfo;
