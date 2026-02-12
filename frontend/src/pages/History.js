import { useEffect, useState, useContext } from "react";
import { WalletContext } from "../wallet/walletContext";
import { getTransactionHistory } from "../services/history";

export default function History() {
  const { address } = useContext(WalletContext);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!address) return;

    const fetchHistory = async () => {
      try {
        setLoading(true);
        const txs = await getTransactionHistory(address);

        // Only show payment transactions
        const paymentTxs = txs.filter(
          (tx) => tx["tx-type"] === "pay"
        );

        setTransactions(paymentTxs);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [address]);

  return (
    <div className="card">
      <h2>Transaction History</h2>

      {!address && <p>Connect wallet to see transactions</p>}
      {loading && <p>Loading transactions...</p>}

      {address && !loading && (
        <table className="tx-table">
          <thead>
            <tr>
              <th>TxID</th>
              <th>Type</th>
              <th>Amount</th>
              <th>From / To</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {transactions.length === 0 && (
              <tr>
                <td colSpan="5">No transactions found</td>
              </tr>
            )}

            {transactions.map((tx) => {
              const payment = tx["payment-transaction"];
              const amount = payment.amount / 1_000_000;

              const isSender = tx.sender === address;

              return (
                <tr key={tx.id}>
                  <td>{tx.id.slice(0, 8)}...</td>

                  <td>
                    {isSender ? "Sent" : "Received"}
                  </td>

                  <td>
                    {amount} ALGO
                  </td>

                  <td style={{ fontSize: "12px" }}>
                    {isSender
                      ? payment.receiver.slice(0, 6) + "..."
                      : tx.sender.slice(0, 6) + "..."}
                  </td>

                  <td className="success">
                    Confirmed
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}
