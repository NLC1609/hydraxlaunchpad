// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract HydraxMain is ERC20 {
    constructor() ERC20("HydraxMain", "HDX") {
        _mint(msg.sender, 500000 * 10 ** decimals());
    }
}
