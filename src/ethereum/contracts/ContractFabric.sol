pragma solidity >=0.5.0 <0.7.0;

import "./TargetCredit.sol";
import "./Bank.sol";

contract ContractFabric {

    mapping(address => address[]) private clientsToCredits;
    address[] private banks;
    address[] private shops;
    address[] private ofdList;
    address[] private fnsList;

    function createSmartCredit() public {
        TargetCredit credit = new TargetCredit(msg.sender);
        //        address[] storage contracts =  clientsToCredit[msg.sender];
        //        contracts.push(credit.getSelfAddress());
        address[] storage contracts =  clientsToCredits[msg.sender];
        contracts.push(credit.getSelfAddress());
        clientsToCredits[msg.sender] = contracts;
    }

    function createBank() public {
        Bank bank = new Bank(msg.sender);
        banks.push(bank.getSelfAddress());
    }


    function createShop() public {
        Shop shop = new Shop(msg.sender);
        shops.push(shop.getSelfAddress());
    }

    function createOfd() public {
        Ofd ofd = new Ofd(msg.sender);
        ofdList.push(ofd.getSelfAddress());
    }


    function createFns() public {
        Fns fns = new Fns(msg.sender);
        fnsList.push(fns.getSelfAddress());
    }

    function getBanks() public view returns (address[] memory) {
        return banks;
    }

    function getShops() public view returns (address[] memory) {
        return shops;
    }

    function getOfdList() public view returns (address[] memory) {
        return ofdList;
    }

    function getFnsList() public view returns (address[] memory) {
        return fnsList;
    }

    function getCredits(address myAddress) public view returns(address[] memory){
        return clientsToCredits[myAddress];
    }

    function getSelfAddress() public view returns(address) {
        return address(this);
    }

}

