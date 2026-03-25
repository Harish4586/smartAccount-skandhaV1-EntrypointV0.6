# ERC-4337 Smart Account with Skandha V1

> Account Abstraction on Ethereum Sepolia — using a custom Smart Account Factory and the Skandha Bundler (EntryPoint v0.6)

[![Solidity](https://img.shields.io/badge/Solidity-^0.8-363636?logo=solidity)](https://soliditylang.org/)
[![Hardhat](https://img.shields.io/badge/Built%20with-Hardhat-f7dc6f?logo=ethereum)](https://hardhat.org/)
[![EntryPoint](https://img.shields.io/badge/EntryPoint-v0.6-blue)](https://eips.ethereum.org/EIPS/eip-4337)
[![Network](https://img.shields.io/badge/Network-Sepolia-purple)](https://sepolia.etherscan.io/)

---

## Overview

This repository demonstrates a complete [ERC-4337](https://eips.ethereum.org/EIPS/eip-4337) Account Abstraction workflow:

- Deploying a custom **Smart Account** and **Smart Account Factory** to Sepolia
- Running a local **Skandha Bundler** (EntryPoint v0.6.0)
- Constructing, signing, and dispatching **UserOperations** via raw JSON-RPC

---

## Prerequisites

| Requirement | Notes |
|---|---|
| **Node.js** v18 or v20 LTS | Node v22+ may break older OpenSSL deps in Skandha v1 |
| **Bun** | Used for fast dependency installation |
| **Ethereum RPC Provider** | Alchemy, Infura, or any Sepolia public node |

---

## 1. Skandha Bundler Setup (EntryPoint v0.6.0)

> **Recommended approach:** Use **Bun** for installation and **Node.js** for execution to avoid module resolution errors.

### Clone & Build

```bash
# Clone Skandha and switch to the EntryPoint v0.6 branch
git clone https://github.com/etherspot/skandha
cd skandha
git checkout releases/v0.6

# Install dependencies with Bun
bun install

# Compile to standard JavaScript (prevents runtime TypeScript errors)
bun run build

# Bootstrap the monorepo (links internal packages)
bun run bootstrap
```

### Configure

Copy the default config and fill in your details:

```bash
cp config.json.default config.json
```

Edit `config.json`:

```json
{
  "entryPoints": [
    "0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789"
  ],
  "relayers": [
    "YOUR_RELAYER_PRIVATE_KEY"
  ],
  "beneficiary": "YOUR_BENEFICIARY_ADDRESS",
  "rpcEndpoint": "https://sepolia.infura.io/v3/YOUR_INFURA_KEY",
  "minInclusionDenominator": 10,
  "throttlingSlack": 10,
  "banSlack": 10,
  "bundleInterval": 2000,
  "bundleSize": 5
}
```

> **Tip:** `bundleInterval: 2000` introduces a 2-second batching window, allowing the bundler to group multiple UserOperations into a single on-chain transaction.

### Start the Bundler

```bash
bun packages/cli/bin/skandha.js standalone
```

---

## 2. Deploy Contracts

Switch back to this project's directory and deploy to Sepolia:

```bash
npx hardhat run scripts/deploy.ts --network sepolia
```

This deploys both the **Smart Account Factory** and an initial **Smart Account** instance.

---

## 3. Send a UserOperation

```bash
npx hardhat run scripts/test4331.ts --network sepolia
```

This script:
1. Constructs the `UserOperation` struct
2. Signs it with your EOA private key
3. Sends it to the local Skandha bundler using a raw `eth_sendUserOperation` JSON-RPC call via Axios

---

## Key Technical Notes

**Axios for JSON-RPC**
Standard `ethers` providers do not expose native wrappers for `eth_sendUserOperation`. Raw Axios POST requests are used instead for direct bundler communication.

**Hex Encoding**
All `BigInt` values — gas limits, fees, nonces — must be converted to hex strings (e.g., `0x1a`) to comply with the Ethereum JSON-RPC specification.

**EntryPoint Address (v0.6)**
```
0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789
```

---

## Quick Workflow Summary

```
1. Clone Skandha → git checkout releases/v0.6
2. bun install
3. bun run build && bun run bootstrap
4. Configure config.json (RPC endpoint + relayer key)
5. bun packages/cli/bin/skandha.js standalone
6. npx hardhat run scripts/deploy.ts --network sepolia
7. npx hardhat run scripts/test4331.ts --network sepolia
```

---

## Project Structure

```
.
├── contracts/
│   ├── SmartAccount.sol        # ERC-4337 compatible smart account
│   └── SmartAccountFactory.sol # Factory for deploying smart accounts
├── scripts/
│   ├── deploy.ts               # Deploys factory and account to Sepolia
│   └── test4331.ts             # Builds and sends a UserOperation
├── hardhat.config.ts
└── package.json
```

---

## Resources

- [ERC-4337 Specification](https://eips.ethereum.org/EIPS/eip-4337)
- [Skandha Bundler](https://github.com/etherspot/skandha)
- [This Repository](https://github.com/Harish4586/smartAccount-skandhaV1-EntrypointV0.6)

---

## License

MIT