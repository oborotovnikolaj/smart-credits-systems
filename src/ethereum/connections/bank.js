import _web3 from "../web3";
import Bank from '../build/Bank.json';

export default address => {
  // console.log(JSON.parse(Bank.Bank.abi), address);
  return new _web3.eth.Contract(Bank.Bank.abi, address);
};
