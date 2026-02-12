import { PeraWalletConnect } from "@perawallet/connect";

export const peraWallet = new PeraWalletConnect({
  network: "testnet"
});

export const connectWallet = async () => {
  try {
    const accounts = await peraWallet.connect();
    return accounts[0];
  } catch (err) {
    // User closed wallet modal — NOT an error
    console.log("Wallet connection cancelled by user");
    return null;
  }
};

export const disconnectWallet = async () => {
  await peraWallet.disconnect();
};
