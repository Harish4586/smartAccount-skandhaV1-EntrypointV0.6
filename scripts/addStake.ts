import hre from "hardhat";

const PAYMASTER_ADDR = "0xEa1A9b6fe92D1de8F620BAd0e4EF99c3C7f1581d";

async function main() {
    const { ethers } = await hre.network.connect();
    const [owner] = await ethers.getSigners();

    console.log("Current EOA Wallet:", owner.address);

    // 1. Connect to your deployed Paymaster contract
    const paymaster = await ethers.getContractAt("Paymaster", PAYMASTER_ADDR);

    // 2. Define Stake Parameters
    // Bundlers like Skandha usually require a 1-day delay (86400 seconds)
    const stakeAmount = ethers.parseEther("0.01"); 
    const unstakeDelaySec = 86400; 

    console.log(`Staking ${ethers.formatEther(stakeAmount)} ETH...`);

    // 3. Execute the transaction
    const tx = await paymaster.addStake(unstakeDelaySec, {
        value: stakeAmount
    });

    console.log("Waiting for confirmation (Sepolia)...");
    await tx.wait();

    console.log("SUCCESS: Stake added to EntryPoint via Paymaster.");
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});


/**
 *  npx hardhat run scripts/addStake.ts --network sepolia

Current EOA Wallet: 0x878344AF84A404439Ea37cFB9b30DeFd7938741C
Staking 0.01 ETH...
Waiting for confirmation (Sepolia)...
SUCCESS: Stake added to EntryPoint via Paymaster.
harish@harish-Vostro:~/Desktop/v0.6$ 
 */