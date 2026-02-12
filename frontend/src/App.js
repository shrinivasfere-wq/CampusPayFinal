import './App.css';
import { Routes, Route, NavLink } from "react-router-dom";
import { useContext } from "react";
import { WalletContext } from "./wallet/walletContext";
import logo from "./logo.png";
import Split from "./pages/Split";
import QRVerify from "./pages/QRVerify";
import Dashboard from "./pages/Dashboard";
import Send from "./pages/Send";
import History from "./pages/History";

function App() {
  const { address } = useContext(WalletContext);

  return (
    <div className="app-container">

      {/* SIDEBAR */}
<div className="sidebar">
  <div className="sidebar-header">
    <img src={logo} alt="CampusPay" className="sidebar-logo" />
    <div className="logo-text">CampusPay</div>
  </div>

  <div className="menu-section">
    <NavLink to="/" end className="nav-item">
      Dashboard
    </NavLink>

    <NavLink to="/send" className="nav-item">
      Send
    </NavLink>

    <NavLink to="/split" className="nav-item">
  Split Bill
</NavLink>

    <NavLink to="/qr" className="nav-item">
  QR Verify
</NavLink>

    <NavLink to="/history" className="nav-item">
      History
    </NavLink>
  </div>

  {/* Upcoming Features */}
  <div className="upcoming-section">
    <div className="upcoming-title">Upcoming</div>

    <div className="upcoming-item">Request Payment</div>
    <div className="upcoming-item">QR Payments</div>
    <div className="upcoming-item">Campus Store</div>
  </div>
</div>

      {/* MAIN AREA */}
      <div className="main-area">

        {/* TOPBAR */}
        <div className="topbar">
          <div></div>

          <div className="wallet-status">
            {address
              ? `${address.slice(0, 6)}...${address.slice(-4)}`
              : "Not Connected"}
          </div>
        </div>

        {/* PAGE CONTENT */}
        <div className="content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/send" element={<Send />} />
            <Route path="/split" element={<Split />} />
            <Route path="/qr" element={<QRVerify />} />
            <Route path="/history" element={<History />} />
          </Routes>
        </div>

      </div>
    </div>
  );
}

export default App;
