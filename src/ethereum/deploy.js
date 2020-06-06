const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const compiledFabric = require('./build/ContractFabric.json');

const provider = new HDWalletProvider(
    'brand glue chronic game click resemble vehicle absent owner zone replace mercy',
    'https://rinkeby.infura.io/v3/b6e6c6ef497740e2a730d1bd45e1d613'
);
const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log('Attempting to deploy from account', accounts[0]);

  const result = await new web3.eth.Contract(compiledFabric.ContractFabric.abi)
      .deploy({ data: '0x' + compiledFabric.ContractFabric.evm.bytecode.object}) // add bytecode
      .send({ from: accounts[0] }); // remove gas

  console.log('Contract deployed to', result.options.address);
};
deploy();
