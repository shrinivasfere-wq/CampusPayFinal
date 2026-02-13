🚀 CampusPay – Decentralized Campus Payment System (Algorand)

CampusPay is a decentralized payment system built on the Algorand blockchain, designed specifically for college campuses.
It enables students to send and receive payments, manage wallet connections, and perform secure peer-to-peer transactions using Pera Wallet.

This project was developed as part of a hackathon / academic blockchain assignment focusing on Future of Finance use cases.

✨ Features

🔐 Pera Wallet Integration

💸 Peer-to-Peer ALGO Transfers

🌐 Algorand TestNet Support

🔗 WalletConnect-based Authentication

⚡ Fast, Low-Cost Blockchain Transactions

📱 Mobile-Friendly (via ngrok HTTPS)

🧩 Modular & Scalable Code Structure

🏗️ Tech Stack
Layer	Technology
Frontend	React.js (Create React App)
Blockchain	Algorand
Wallet	Pera Wallet
SDK	algosdk v3.5.2
Networking	WalletConnect
Environment	TestNet
📁 Project Structure
CampusPay/
│
├── frontend/
│   ├── src/
│   │   ├── wallet/
│   │   │   ├── connectWallet.js
│   │   │   └── walletContext.js
│   │   │
│   │   ├── services/
│   │   │   └── payments.js
│   │   │
│   │   ├── config/
│   │   │   └── algorand.js
│   │   │
│   │   ├── App.js
│   │   ├── index.js
│   │   └── App.css
│   │
│   └── package.json
│
└── README.md

⚙️ Installation & Setup
1️⃣ Clone the Repository
git clone https://github.com/your-username/CampusPay.git
cd CampusPay/frontend

2️⃣ Install Dependencies
npm install

3️⃣ Ensure Correct SDK Versions
npm list algosdk


✔ Required:

algosdk@3.5.2

4️⃣ Start the App
npm start

5️⃣ Enable Mobile Wallet Access (Required)

Use ngrok to expose localhost:

ngrok http 3000


Open the generated HTTPS URL on your mobile browser.

🔐 Wallet Setup

Install Pera Wallet on your phone

Switch to Algorand TestNet

Get TestNet ALGOs from:

https://bank.testnet.algorand.network/


Connect wallet via CampusPay

💸 How Transactions Work

User connects wallet

Enters:

Receiver Algorand address

Amount in ALGO

Transaction is:

Created using Algorand SDK

Signed via Pera Wallet

Submitted to Algorand TestNet

TxID is returned after confirmation

🧠 Key Learnings

WalletConnect session management

Algorand transaction lifecycle

Handling SDK version conflicts

Blockchain debugging in real-world environments

Secure client-side signing

🧪 Network Details

Blockchain: Algorand

Network: TestNet


Explorer: https://testnet.algoexplorer.io

