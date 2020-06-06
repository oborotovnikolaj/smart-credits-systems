import Web3 from 'web3';

let _web3;

if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {
  // We are in the browser and metamask is running.
  _web3 = new Web3(window.web3.currentProvider);
} else {
    // We are on the server *OR* the user is not running metamask
    const provider = new Web3.providers.HttpProvider(
        'https://rinkeby.infura.io/v3/b6e6c6ef497740e2a730d1bd45e1d613'
    );
    _web3 = new Web3(provider);
}

export default _web3;
