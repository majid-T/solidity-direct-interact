// SPDX-License-Identifier: MIT

pragma solidity ^0.6.0;

/**
 * @author Majid Shockoohi
 * @title SimpleCounter
 */

contract SimpleCounter {
    uint256 public value;

    constructor(uint256 _initVal) public {
        value = _initVal;
    }

    function addOne() public {
        value++;
        emit Addition(value, msg.sender);
    }

    function subOne() public {
        value--;
        emit Subtraction(value, msg.sender);
    }

    function echoMsg(string memory _msg) public pure returns (string memory) {
        return _msg;
    }

    event Addition(uint256 indexed number, address indexed caller);
    event Subtraction(uint256 indexed number, address indexed caller);
}
