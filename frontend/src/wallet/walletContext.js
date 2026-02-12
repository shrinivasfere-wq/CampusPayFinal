import { createContext, useState } from "react";
import { peraWallet, connectWallet } from "./connectWallet";

export const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
  const [address, setAddress] = useState(null);

const connect = async () => {
  const addr = await connectWallet();
  if (addr) {
    setAddress(addr);
  }
};
  const disconnect = async () => {
    await peraWallet.disconnect();
    setAddress(null);
  };

  return (
    <WalletContext.Provider value={{ address, connect, disconnect }}>
      {children}
    </WalletContext.Provider>
  );
};
