import { algodClient } from "../config/algorand";

export const getAccountBalance = async (address) => {
  const info = await algodClient.accountInformation(address).do();

  const amount = Number(info.amount); // microAlgos

  // Some SDK versions don't expose min-balance reliably
  const minBalanceMicro =
    info["min-balance"] !== undefined
      ? Number(info["min-balance"])
      : 100_000; // default Algorand minimum

  return {
    balance: amount / 1e6,
    minBalance: minBalanceMicro / 1e6,
    available: (amount - minBalanceMicro) / 1e6,
  };
};
