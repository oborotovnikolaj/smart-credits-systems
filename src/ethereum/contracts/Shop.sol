pragma solidity >=0.5.0 <0.7.0;
import "./Ofd.sol";
import "./TargetCredit.sol";

contract Shop {

    address[] private credits;

    address public owner;
    address public ofd;
    address public contractFabric;

    constructor (address _owner) public {
        contractFabric = msg.sender;
        owner = _owner;
    }

    function registerCredit() public {
        TargetCredit credit = TargetCredit(msg.sender);
        require(credit.getShop() == address(this));
        require(credit.getApprovedByClient());
        require(!credit.getRegisteredInShop());

        credits.push(msg.sender);
    }

    function approveByShopOwner(address smartCredit) public {
        require(msg.sender == owner);
        TargetCredit credit = TargetCredit(smartCredit);
        require(credit.getShop() == address(this));
        require(credit.getApprovedByClient());
        require(credit.getRegisteredInShop());
        require(!credit.getPaid());

        Ofd ofdContract = Ofd(ofd);
        address  smartBill = ofdContract.receivePaidSmartCredit(smartCredit);
        credit.buyShopBasket(smartBill);
    }

    function setOfd(address _ofd) public {
        require(msg.sender == owner);
        ofd = _ofd;
    }

    function getOfd() public view returns(address) {
        return ofd;
    }

    function getAllCredits(address _address) public view returns (address[] memory) {
        require(_address == owner);
        return credits;
    }

    function getSelfAddress() public view returns(address) {
        return address(this);
    }
}