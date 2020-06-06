const path = require('path');
const solc = require('solc');
const fs = require('fs-extra');

const buildPath = path.resolve(__dirname, 'build');
fs.removeSync(buildPath);

const targetCredit = path.resolve(__dirname, 'contracts', 'TargetCredit.sol');
const targetCreditSource = fs.readFileSync(targetCredit, 'utf8');


const Bank = path.resolve(__dirname, 'contracts', 'Bank.sol');
const BankSource = fs.readFileSync(Bank, 'utf8');


const Bill = path.resolve(__dirname, 'contracts', 'Bill.sol');
const BillSource = fs.readFileSync(Bill, 'utf8');


const ContractFabric = path.resolve(__dirname, 'contracts', 'ContractFabric.sol');
const ContractFabricSource = fs.readFileSync(ContractFabric, 'utf8');


const Fns = path.resolve(__dirname, 'contracts', 'Fns.sol');
const FnsSource = fs.readFileSync(Fns, 'utf8');


const Ofd = path.resolve(__dirname, 'contracts', 'Ofd.sol');
const OfdSource = fs.readFileSync(Ofd, 'utf8');


const Shop = path.resolve(__dirname, 'contracts', 'Shop.sol');
const ShopSource = fs.readFileSync(Shop, 'utf8');

var input = {
  language: 'Solidity',
  sources: {
    'TargetCredit.sol' : {
      content: targetCreditSource
    },
    'Bank.sol' : {
      content: BankSource
    }
    ,
    'Bill.sol' : {
      content: BillSource
    }
    ,
    'ContractFabric.sol' : {
      content: ContractFabricSource
    }
    ,
    'Fns.sol' : {
      content: FnsSource
    }
    ,
    'Ofd.sol' : {
      content: OfdSource
    }
    ,
    'Shop.sol' : {
      content: ShopSource
    }
  },
  settings: {
    outputSelection: {
      '*': {
        '*': [ '*' ]
      }
    }
  }
};

// console.log(JSON.parse(solc.compile(JSON.stringify(input))));

const output = JSON.parse(solc.compile(JSON.stringify(input))).contracts;

// console.log(output);

fs.ensureDirSync(buildPath);

for (let contract in output) {
  fs.outputJsonSync(
    path.resolve(buildPath, contract.replace('.sol', '') + '.json'),
    output[contract]
  );
}
