pragma solidity >=0.5.0 <0.7.0;

import "./TargetCredit.sol";
import "./Fns.sol";
import "./Bill.sol";

contract Ofd {

    address public owner;
    address public fns;
    address public contractFabric;

    mapping(address => bool) shops;
    address[] credits;

    constructor (address _owner) public {
        contractFabric = msg.sender;
        owner = _owner;
    }

    function receivePaidSmartCredit(address smartCredit) public returns (address){
        require(shops[msg.sender]);
        TargetCredit credit = TargetCredit(smartCredit);
        require(credit.getApprovedByClient());
        require(!credit.getPaid());

        Bill bill = new Bill(smartCredit, fns);
        credits.push(smartCredit);
        return bill.getSelfAddress();
    }

    //    нужна еще логика по отчистке этого списка
    function sendToFns() public {
        require(msg.sender == owner);
        Fns smartFns = Fns(fns);
        smartFns.receiveSmartCredits(credits);
    }

    function addShop(address smartShop) public {
        shops[smartShop] = true;
    }

    function setFns(address _fns) public {
        require(msg.sender == owner);
        fns = _fns;
    }

    function getFns() public view returns (address) {
        return fns;
    }

    function getAllCredits() public view returns (address[] memory) {
        return credits;
    }

    function getSelfAddress() public view returns (address) {
        return address(this);
    }

}

