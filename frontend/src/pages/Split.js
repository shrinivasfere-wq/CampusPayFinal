import { useState, useContext } from "react";
import { WalletContext } from "../wallet/walletContext";
import { sendAlgo } from "../services/payments";

export default function Split() {
  const { address } = useContext(WalletContext);

  const [total, setTotal] = useState("");
  const [participants, setParticipants] = useState([
    { address: "", amount: "" }
  ]);
  const [splitType, setSplitType] = useState("equal");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  const addParticipant = () => {
    setParticipants([...participants, { address: "", amount: "" }]);
  };

  const handleChange = (index, field, value) => {
    const updated = [...participants];
    updated[index][field] = value;
    setParticipants(updated);
  };

  const calculateEqualSplit = () => {
    if (!total || participants.length === 0) return;

    const perPerson = (Number(total) / participants.length).toFixed(3);

    const updated = participants.map(p => ({
      ...p,
      amount: perPerson
    }));

    setParticipants(updated);
  };

  const validateSplit = () => {
    if (!address) {
      alert("Connect wallet first");
      return false;
    }

    if (!total || Number(total) <= 0) {
      alert("Enter valid total amount");
      return false;
    }

    for (let p of participants) {
      if (!p.address || p.address.length !== 58) {
        alert("Invalid Algorand address detected");
        return false;
      }

      if (!p.amount || Number(p.amount) <= 0) {
        alert("Invalid amount detected");
        return false;
      }
    }

    const totalEntered = participants.reduce(
      (sum, p) => sum + Number(p.amount),
      0
    );

    if (Number(totalEntered.toFixed(3)) !== Number(Number(total).toFixed(3))) {
      alert("Split total does not match total amount");
      return false;
    }

    return true;
  };

  const executeSplit = async () => {
    if (!validateSplit()) return;

    try {
      setLoading(true);
      setStatus("Processing transactions...");

      for (let i = 0; i < participants.length; i++) {
        setStatus(`Sending to participant ${i + 1}...`);

        await sendAlgo(
          address,
          participants[i].address.trim(),
          Number(participants[i].amount)
        );
      }

      setStatus("Split executed successfully 🎉");
    } catch (err) {
      console.error(err);
      setStatus("Split failed: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card split-card">
      <h2>Split Payment</h2>

      <input
        className="input-field"
        type="number"
        placeholder="Total Amount (ALGO)"
        value={total}
        onChange={(e) => setTotal(e.target.value)}
      />

      {/* SPLIT TYPE */}
      <div className="split-type">
        <button
          className={splitType === "equal" ? "active-type" : ""}
          onClick={() => {
            setSplitType("equal");
            calculateEqualSplit();
          }}
        >
          Equal Split
        </button>

        <button
          className={splitType === "custom" ? "active-type" : ""}
          onClick={() => setSplitType("custom")}
        >
          Custom Split
        </button>
      </div>

      {/* PARTICIPANTS */}
      {participants.map((p, index) => (
        <div key={index} className="participant-row">
          <input
            className="input-field"
            placeholder="Wallet Address"
            value={p.address}
            onChange={(e) =>
              handleChange(index, "address", e.target.value)
            }
          />

          <input
            className="input-field amount-field"
            type="number"
            placeholder="Amount"
            value={p.amount}
            disabled={splitType === "equal"}
            onChange={(e) =>
              handleChange(index, "amount", e.target.value)
            }
          />
        </div>
      ))}

      <button className="secondary-btn" onClick={addParticipant}>
        + Add Participant
      </button>

      <button
        className="primary-btn"
        style={{ marginTop: "20px" }}
        disabled={loading}
        onClick={executeSplit}
      >
        {loading ? "Executing Split..." : "Execute Split"}
      </button>

      {status && (
        <div style={{ marginTop: "15px", fontSize: "14px", color: "#aaa" }}>
          {status}
        </div>
      )}
    </div>
  );
}
