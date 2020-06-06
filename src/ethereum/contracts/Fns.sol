pragma solidity >=0.5.0 <0.7.0;

contract Fns {

    address public owner;
    address public contractFabric;

    mapping(address => bool) private registeredOfd;
    mapping(address => bool) private creditRegistered;

    constructor (address _owner) public {
        contractFabric = msg.sender;
        owner = _owner;
    }

    function registerOfd(address ofd) public {
        require(msg.sender == owner);
        registeredOfd[ofd] = true;
    }

    function receiveSmartCredits(address[] memory credits) public {
        require(registeredOfd[msg.sender]);
        //        uint index;
        //        for (index; index < credits.length; index++) {
        //            creditRegistered[]
        //        }
        //        }
    }

    function getSelfAddress() public view returns(address) {
        return address(this);
    }

}

