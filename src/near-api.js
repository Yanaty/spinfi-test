import { connect, keyStores, WalletConnection } from "near-api-js";
import { getConfig } from "./near-config";

const nearConfig = getConfig();

export const initContract = async () => {
  const near = await connect(
    Object.assign(
      { deps: { keyStore: new keyStores.BrowserLocalStorageKeyStore() } },
      nearConfig
    )
  );
  window.walletConnection = new WalletConnection(near);
  window.accountId = window.walletConnection.getAccountId();
};

export const signOutNearWallet = () => {
  window.walletConnection.signOut();
  window.location.replace(window.location.origin + window.location.pathname);
};

export const signInWithNearWallet = () => {
  window.walletConnection.requestSignIn(nearConfig.contractName);
};

export const getMarkets = async () => {
  let account = window.walletConnection.account();
  if (!account) {
    return;
  }
  const markets = await account.viewFunction(
    nearConfig.contractName,
    "markets",
    {}
  );

  return markets;
};

export const getMarketById = async (id) => {
  let account = window.walletConnection.account();
  if (!account) {
    return;
  }
  const market = await account.viewFunction(
    nearConfig.contractName,
    "view_market",
    { market_id: id }
  );

  return market;
};
