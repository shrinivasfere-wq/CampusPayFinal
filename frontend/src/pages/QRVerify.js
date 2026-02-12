import { useEffect, useRef, useState, useContext } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import QRCode from "react-qr-code";
import { WalletContext } from "../wallet/walletContext";

export default function QRVerify() {
  const { address } = useContext(WalletContext);
  const scannerRef = useRef(null);
  const [scanResult, setScanResult] = useState("");
  const [showScanner, setShowScanner] = useState(false);

  useEffect(() => {
    if (!showScanner) return;

    const scanner = new Html5QrcodeScanner(
      "reader",
      { fps: 10, qrbox: 250 },
      false
    );

    scanner.render(
      (decodedText) => {
        setScanResult(decodedText);
        scanner.clear();
        setShowScanner(false);
      },
      (error) => {
        console.warn(error);
      }
    );

    return () => {
      scanner.clear().catch(() => {});
    };
  }, [showScanner]);

  return (
    <div className="card">
      <h2>QR Payment Verification</h2>

      {/* Generate QR */}
      {address && (
        <>
          <p>Your Wallet QR</p>
          <div
            style={{
              background: "white",
              padding: "15px",
              display: "inline-block",
              borderRadius: "10px"
            }}
          >
            <QRCode value={address} size={180} />
          </div>
        </>
      )}

      {/* Scanner Toggle */}
      <div style={{ marginTop: "30px" }}>
        <button
          className="secondary-btn"
          onClick={() => setShowScanner(!showScanner)}
        >
          {showScanner ? "Close Scanner" : "Scan QR"}
        </button>
      </div>

      {/* Scanner Container */}
      {showScanner && (
        <div id="reader" style={{ marginTop: "20px" }}></div>
      )}

      {/* Result */}
      {scanResult && (
        <div style={{ marginTop: "20px" }}>
          <p><strong>Scanned Address:</strong></p>
          <p style={{ wordBreak: "break-all" }}>{scanResult}</p>
        </div>
      )}
    </div>
  );
}
