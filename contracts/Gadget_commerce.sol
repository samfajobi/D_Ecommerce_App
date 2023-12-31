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

    struct Order {
        uint256 time;
        Item item;
    }

    mapping(uint256 => Item) public items;
    mapping(address => mapping(uint256 => Order)) public orders;
    mapping(address => uint256) public orderCount;

    event List(string name, uint cost, uint quantity);

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

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
    ) public onlyOwner {

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

        // Emit Event
        emit List(_name, _cost, _stock);

    }

    function buy(uint256 _id) public payable {
       //fetch Item
       Item memory item = items[_id];

       // check for enough ether for purchase
       require(msg.value >= item.cost);

       // check if item is in stock
       require(item.stock > 0);

       // Create Order
       Order memory order = Order(block.timestamp, item);

       // save order to blockchain
       orderCount[msg.sender]++;
       orders[msg.sender]orderCount[msg.sender] = order;

       // subtract item from stock
       item[_id].stock = item.stock - 1;
    }

    function withdraw() public onlyOwner {
        (bool success) = owner.call{value: address(this).balance}("");
        require(success);
    }
}








// contract Mapping() {
//     mapping(address => uint256) public balances;
      
//     function mapFunc() {
//         balances[msg.sender] = 123; ---> set data
//         uint bal = balance[msg.sender];  ---> get data  
//         balances[msg.sender] = 456    ---> update data
//         balances[msg.sender] += 345   ---> increment data  // 345 + 123
//         delete balance[msg.sender];   ---> delete data    // 0
//     } 
// }



//https://scarlet-uneven-rodent-526.mypinata.cloud/ipfs/QmSn7ib8wozfZ1UreUh7RQvvaMVTX4fUz8UyUcEWZPUAfu?_gl=1*1il03it*_ga*MjAzMzA3MTYxNi4xNjkyNzMzNTQw*_ga_5RMPXG14TE*MTY5MjgwODEzNS40LjEuMTY5MjgwODMwMi42MC4wLjA.