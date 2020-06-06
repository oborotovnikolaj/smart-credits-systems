pragma solidity >=0.5.0 <0.7.0;
import "./Bank.sol";
import "./Shop.sol";

contract TargetCredit {

    address public fabric;
    address public client;
    address public shop;
    Product[] public shopBasket;
    string  public paper;
    address public bank;
    bool    public isRegisteredInBank;
    bool    public isApprovedByClient;
    bool    public isRegisteredInShop;
    bool    public isPaid;
    bool    public isClosed;

    address public smartBill;

    struct Product {
        //        address shop;
        uint category;
        uint money;
    }

    constructor(address _client) public {
        fabric = msg.sender;
        client = _client;
        isApprovedByClient = false;
        isRegisteredInBank = false;
        isRegisteredInShop = false;
        isPaid = false;
        isClosed = false;
    }

    function addProduct (uint _category, uint _money) public {
        require(msg.sender == client);
        Product memory newProduct = Product({
            category: _category,
            money: _money
            });

        shopBasket.push(newProduct);
    }

    function registerInBank() public {
        require(client == msg.sender);
        require(!isRegisteredInBank);
        Bank smartBank = Bank(bank);
        smartBank.registerCredit();
        isRegisteredInBank = true;
    }

    function approveByClient(string memory clientPaper) public {
        require(client == msg.sender);
        require( keccak256(abi.encodePacked(paper)) == keccak256(abi.encodePacked(clientPaper)));
        require(!isApprovedByClient);
        isApprovedByClient = true;
    }

    function registerInShop() public {
        require(client == msg.sender);
        require(isApprovedByClient);
        require(isRegisteredInBank);
        require(!isRegisteredInShop);
        Shop shopContract = Shop(shop);
        shopContract.registerCredit();
        isRegisteredInShop = true;
    }

    function buyShopBasket(address bill) public {
        require(msg.sender == shop);
        require(isApprovedByClient);
        require(isRegisteredInBank);
        require(isRegisteredInShop);
        require(!isPaid);

        Bank smartBank = Bank(bank);
        smartBill = bill;
        smartBank.closePayment();

        isPaid = true;
    }

    function close() public {
        require(msg.sender == bank);
        require(isRegisteredInShop);
        require(isRegisteredInBank);
        require(isPaid);

        isClosed = true;
    }

    function setBank(address _bank) public {
        require(msg.sender == client);
        bank = _bank;
    }

    function setShop(address _shop) public {
        require(msg.sender == client);
        shop = _shop;
    }

    function setPaper(string memory _paper) public {
        require(msg.sender == bank);
        paper = _paper;
    }

    function getBank() public view returns (address) {
        return bank;
    }

    function getShop() public view returns(address) {
        return shop;
    }

    function getPaper() public view returns(string memory) {
        return paper;
    }

    function getShopBasket() public returns (uint[] memory, uint[] memory) {
        uint[] memory categories = new uint[](shopBasket.length);
        uint[] memory money = new uint[](shopBasket.length);

        for (uint i = 0; i < shopBasket.length; i++) {
            Product storage product = shopBasket[i];
            categories[i] = product.category;
            money[i] = product.money;
        }

        return (categories, money);
    }

    function getApprovedByClient() public view returns (bool) {
        return isApprovedByClient;
    }

    function getRegisteredInShop() public view returns (bool) {
        return isRegisteredInShop;
    }

    function getRegisteredInBank() public view returns (bool) {
        return isRegisteredInBank;
    }

    function getPaid() public view returns (bool) {
        return isPaid;
    }

    function getClosed() public view returns (bool)  {
        return isClosed;
    }

    function getSmartBill() public view returns (address)  {
        return smartBill;
    }

    function getSelfAddress() public view returns(address) {
        return address(this);
    }
}