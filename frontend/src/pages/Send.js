import { useState, useContext } from "react";
import { WalletContext } from "../wallet/walletContext";
import { sendAlgo } from "../services/payments";

export default function Send() {
  const { address } = useContext(WalletContext);
  const [to, setTo] = useState("");
  const [amount, setAmount] = useState("");

  const handleSend = async () => {
    if (!address) return alert("Connect wallet first");

    try {
      const txId = await sendAlgo(address, to, Number(amount));
      alert("Success! TxID:\n" + txId);
    } catch (err) {
      alert("Failed: " + err.message);
    }
  };

  return (
    <div className="card">
      <h2>Send ALGO</h2>

      <input
        className="input-field"
        placeholder="Receiver Address"
        value={to}
        onChange={(e) => setTo(e.target.value)}
      />

      <input
        className="input-field"
        type="number"
        placeholder="Amount (ALGO)"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <button className="primary-btn" onClick={handleSend}>
        Send
      </button>
    </div>
  );
}
