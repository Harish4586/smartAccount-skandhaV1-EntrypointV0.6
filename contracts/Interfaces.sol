// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.23;

import "./UserOperation.sol";

interface IEntryPoint {

    function handleOps(
        UserOperation[] calldata ops,
        address payable beneficiary
    ) external;

    function getNonce(
        address sender,
        uint192 key
    ) external view returns (uint256 nonce);

    function getUserOpHash(
        UserOperation calldata userOp
    ) external view returns (bytes32);

    function depositTo(address account)
        external
        payable;

    function withdrawTo(
        address payable withdrawAddress,
        uint256 amount
    ) external;

    function balanceOf(
        address account
    )   
        external
        view
        returns (uint256);

}


interface IAccount {

    function validateUserOp(
        UserOperation calldata userOp,
        bytes32 userOpHash,
        uint256 missingAccountFunds
    ) external returns (uint256 validationData);

}