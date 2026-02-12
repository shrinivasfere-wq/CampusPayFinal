import { useContext, useEffect, useState } from "react";
import { WalletContext } from "../wallet/walletContext";
import { getAccountBalance } from "../services/balance";

export default function Dashboard() {
  const { address, connect } = useContext(WalletContext);
  const [balance, setBalance] = useState(null);

  useEffect(() => {
    if (address) {
      getAccountBalance(address).then(setBalance);
    }
  }, [address]);

  if (!address) {
    return (
      <div className="card center">
        <button className="primary-btn" onClick={connect}>
          Connect Wallet
        </button>
      </div>
    );
  }

  return (
    <div>

      <div className="balance-grid">
        <div className="balance-card">
          <h4>Total Balance</h4>
          <h2>{balance?.balance.toFixed(3)} ALGO</h2>
        </div>

        <div className="balance-card">
          <h4>Available</h4>
          <h2>{balance?.available.toFixed(3)} ALGO</h2>
        </div>

        <div className="balance-card">
          <h4>Min Balance</h4>
          <h2>{balance?.minBalance.toFixed(3)} ALGO</h2>
        </div>
      </div>

    </div>
  );
}
