// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.18;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract Lock {
    uint256 public count;
    mapping(uint256=>address) public records;

    function setn(uint256 n) public {
        for(uint256 i=count; i<count+n; i++) {
            records[i] = msg.sender;
        }
        count += n;
    }

    function set(uint256 f, uint256 t, address addr) public {
        for(uint256 i=f; i<t; i++) {
            records[i] = addr;
        }
    }
}
