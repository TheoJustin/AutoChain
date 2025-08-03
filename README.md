<p align="center">
   <a href="https://github.com/TheoJustin/AutoChain" target="_blank" rel="noopener noreferer">
      <img width="150" src="./src/assets/logo-no-background.png" alt="AutoChain Logo">
   </a>
</p>
<h1 style="border-bottom: none; margin-bottom: 0" align="center">AutoChain</h1>
<h4 style="margin-top: 0.4rem; " align="center">A decentralized car rental solution that leverages <b>NFTs</b>, <b>smart contracts</b>, and <b>AI</b> to improve trust, transparency, and efficiency in peer-to-peer vehicle rentals.</h4>

## Features

- **CarNFT**: Every vehicle is represented as a unique NFT on the blockchain, minted by the car owner. This acts as an immutable and verifiable proof of ownership
- **Smart Property**: Only wallets that own or are delegated a CarNFT can access the vehicle
- **AI Powered Car Recommendation System**: Provide personalized car suggestions to reduce choice overload and improve booking satisfaction.

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file in frontend directory

`NEXT_PUBLIC_MODEL_API_URL`

## Run Locally

Clone the project

```bash
  git clone https://github.com/TheoJustin/AutoChain.git
```

Install frontend dependencies

```bash
  cd ./AutoChain/frontend
  npm install
```

Install backend requirements
```bash
    cd ../backend/AI/recommendation
    python -m venv venv
    ./venv/Scripts/activate
    pip install -r requirements.txt
```

Run the frontend server
```bash
    # from the project root directory
    cd ./frontend
    npm run dev
```

Run the backend server
```bash
    # from the project root directory
    cd ./backend/AI
    ./recommendation/venv/Scripts/activate
    python main.py
```