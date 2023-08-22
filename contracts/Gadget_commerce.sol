// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract GadgetCommerce {

    address public owner;

    struct Item {
        uint id;
        string name;
        string category;
        string image;
        uint cost;
        uint rating;
        uint stock;
    }
    mapping(uint256 => Item) public items;

    constructor() {
        owner = msg.sender;
    }

    function list(
        uint256 _id,
        string memory _name, 
        string memory _category, 
        string memory _image, 
        uint256 _cost,
        uint256 _rating,
        uint256 _stock
    ) public {

        // creating a new instance of the items
        Item memory item = Item(
            _id, 
            _name, 
            _category,
            _image,
            _cost,
            _rating,
            _stock
        );
        
        // Save item to blockchain using the Id
        items[_id] = item;   

    }
}