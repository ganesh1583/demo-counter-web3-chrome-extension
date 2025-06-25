// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.0;

contract Counter {
    uint count = 0;

    function incrementCounter() public {
        count++;
    }

    function getCount() public view returns(uint) {
        return count;
    }
}