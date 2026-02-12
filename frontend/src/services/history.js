export const getTransactionHistory = async (address) => {
  const response = await fetch(
    `https://testnet-idx.algonode.cloud/v2/accounts/${address}/transactions?limit=20`
  );

  const data = await response.json();

  return data.transactions || [];
};
