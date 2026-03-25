Account Abstraction with Skandha V1 & EntryPoint v0.6
This repository contains a complete implementation for deploying an ERC-4337 Smart Account and sending UserOperations to a local Skandha Bundler on the Sepolia testnet.

📋 Prerequisites
Before starting, ensure you have the following installed:

Node.js (v18 or v20 LTS recommended)

Bun (for fast installation and execution)

An Ethereum RPC Provider (Alchemy, Infura, or Public Node)

🛠 1. Skandha Bundler Setup (EntryPoint v0.6)
Skandha V1 is the specialized version for EntryPoint 0.6.0. Follow these "bulletproof" steps to avoid module errors.

Clone and Install
Bash
# 1. Clone and switch to the correct branch for EntryPoint 0.6.0
git clone https://github.com/etherspot/skandha
cd skandha
git checkout releases/v0.6

# 2. Install dependencies using Bun
bun install

# 3. Build the project into standard Javascript
bun run build

# 4. Bootstrap the monorepo (links internal packages)
bun run bootstrap
Configuration
Create your config.json by copying the default:

Bash
cp config.json.default config.json
Edit config.json and ensure it matches the following structure (replace rpcEndpoint with your provider URL):

JSON
{
  "entryPoints": [
    "0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789"
  ],
  "relayers": [
    "relayer private key"
  ],
  "beneficiary": "benifiery acc address",
  "rpcEndpoint": "https://sepolia.infura.io/v3/YOUR_KEY",
  "minInclusionDenominator": 10,
  "throttlingSlack": 10,
  "banSlack": 10,
  "bundleInterval": 2000,
  "bundleSize": 5
}
Note: bundleInterval: 2000 tells the bundler to wait 2 seconds to batch multiple operations before sending them to the network.

Run the Bundler
Bash
bun packages/cli/bin/skandha.js standalone
🚀 2. Smart Account Deployment
Now, return to this project directory to deploy your contracts to Sepolia.

Bash
# Install project dependencies
npm install

# Deploy Smart Account and Factory
npx hardhat run scripts/deploy.ts --network sepolia
Take note of the Factory Address printed in the console.

⛽ 3. Sending a User Operation
The test4331.ts script handles the complex logic of constructing the UserOperation, signing it with your EOA, and dispatching it to Skandha via Axios.

Why we use Axios & Hex Strings:
Axios: Standard Ethers providers don't always support the custom eth_sendUserOperation RPC method. Axios sends a raw JSON-RPC POST request directly to the Bundler.

Hex Conversion: The Bundler API follows strict JSON-RPC specs. JavaScript BigInt values must be converted to 0x-prefixed hex strings to be serialized correctly.

Execute the Operation:
Bash
npx hardhat run scripts/test4331.ts --network sepolia
🔗 Project Details
EntryPoint: 0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789 (v0.6)

Bundler URL: http://127.0.0.1:14337/rpc

Repo: Harish4586/smartAccount-skandhaV1-EntrypointV0.6