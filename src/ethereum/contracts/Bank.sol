pragma solidity >=0.5.0 <0.7.0;

import "./TargetCredit.sol";

contract Bank {

    address public owner;
    address public contractFabric;

    address[] public credits;

    constructor (address _owner) public {
        owner = _owner;
        contractFabric = msg.sender;
    }

    function registerCredit() public {
        TargetCredit credit = TargetCredit(msg.sender);
        require(credit.getBank() == address(this));
        require(!credit.getRegisteredInBank());
        credits.push(msg.sender);
    }

    function approveCredit(address _credit, string memory _paper) public {
        require(msg.sender == owner);
        TargetCredit credit = TargetCredit(_credit);
        require(credit.getBank() == address(this));
        require(credit.getRegisteredInBank());
        require(!credit.getApprovedByClient());
        credit.setPaper(_paper);
    }

    function closePayment() public {
        TargetCredit credit = TargetCredit(msg.sender);
        require(credit.getBank() == getSelfAddress());
        require(credit.getRegisteredInBank());
        require(credit.getApprovedByClient());
        require(credit.getRegisteredInShop());
        require(!credit.getPaid());
    }

    function closeCredit(address smartCredit) public {
        TargetCredit credit = TargetCredit(smartCredit);
        require(credit.getBank() == getSelfAddress());
        require(credit.getRegisteredInBank());
        require(credit.getApprovedByClient());
        require(credit.getRegisteredInShop());
        require(credit.getPaid());
        require(!credit.getClosed());

        credit.close();
    }

    function getAllCredits() public view returns (address[] memory) {
        return credits;
    }

    function getSelfAddress() public view returns (address) {
        return address(this);
    }

}

