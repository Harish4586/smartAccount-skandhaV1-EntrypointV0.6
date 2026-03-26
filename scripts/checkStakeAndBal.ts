import hre from "hardhat";

const ENTRYPOINT_ADDR = "0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789";
const PAYMASTER_ADDR = "0xEa1A9b6fe92D1de8F620BAd0e4EF99c3C7f1581d";

async function main() {
    const { ethers } = await hre.network.connect();

    console.log("Checking status for Paymaster (v0.6):", PAYMASTER_ADDR);

    // We define the ABI for the 'getDepositInfo' or 'deposits' call manually 
    // since your IEntryPoint interface is missing it.
    const entryPoint = await ethers.getContractAt(
        [
            "function deposits(address account) public view returns (uint256 deposit, bool staked, uint256 stake, uint32 unstakeDelaySec, uint64 withdrawTime)"
        ],
        ENTRYPOINT_ADDR
    );

    try {
        const info = await entryPoint.deposits(PAYMASTER_ADDR);

        console.log("\n--- Paymaster v0.6 Status ---");
        console.log("Deposit (Gas Money): ", ethers.formatEther(info.deposit), "ETH");
        console.log("Is Staked:           ", info.staked);
        console.log("Stake (Bond):        ", ethers.formatEther(info.stake), "ETH");
        console.log("Unstake Delay:       ", info.unstakeDelaySec.toString(), "seconds");
        console.log("Withdraw Time:       ", info.withdrawTime.toString());
        console.log("-----------------------------\n");
    } catch (err) {
        console.error("Error: Could not fetch deposit info. Ensure the address is correct for EntryPoint v0.6.");
        console.error(err);
    }
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});



/**
 * Before Adding Stake
 * npx hardhat run scripts/checkStakeAndBal.ts --network sepolia

Checking status for Paymaster (v0.6): 0xEa1A9b6fe92D1de8F620BAd0e4EF99c3C7f1581d

--- Paymaster v0.6 Status ---
Deposit (Gas Money):  0.01 ETH
Is Staked:            false
Stake (Bond):         0.0 ETH
Unstake Delay:        0 seconds
Withdraw Time:        0
-----------------------------




After ADding Stake->
 npx hardhat run scripts/checkStakeAndBal.ts --network sepolia

Checking status for Paymaster (v0.6): 0xEa1A9b6fe92D1de8F620BAd0e4EF99c3C7f1581d

--- Paymaster v0.6 Status ---
Deposit (Gas Money):  0.01 ETH
Is Staked:            true
Stake (Bond):         0.01 ETH
Unstake Delay:        86400 seconds
Withdraw Time:        0
-----------------------------

 */