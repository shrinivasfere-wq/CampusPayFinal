import algosdk from "algosdk";
import { algodClient } from "../config/algorand";
import { peraWallet } from "../wallet/connectWallet";

export const sendAlgo = async (from, to, amount) => {
  // Basic validations
  if (typeof from !== "string" || from.length !== 58) {
    throw new Error("Invalid sender address");
  }

  if (typeof to !== "string" || to.length !== 58) {
    throw new Error("Invalid receiver address");
  }

  if (typeof amount !== "number" || amount <= 0) {
    throw new Error("Invalid amount");
  }

  // Get suggested params from Algorand node
  const params = await algodClient.getTransactionParams().do();

  // Create payment transaction (NEW SDK STYLE)
  const txn = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
    sender: from,
    receiver: to,
    amount: Math.round(amount * 1e6), // ALGO → microALGO
    suggestedParams: params,
  });

  // Pera Wallet expects nested array
  const signedTxns = await peraWallet.signTransaction([
    [{ txn }],
  ]);

  // Send transaction
  const { txId } = await algodClient
    .sendRawTransaction(signedTxns.flat())
    .do();

  // Wait for confirmation
  try {
  await algosdk.waitForConfirmation(algodClient, txId, 15);
} catch (e) {
  console.warn("Confirmation delayed, check explorer:", txId);
}


  return txId;
};
