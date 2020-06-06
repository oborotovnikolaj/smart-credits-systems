import _web3 from "../web3";
import Bill from '../build/Bill.json';

export default address => {
  return new _web3.eth.Contract(Bill.Bill.abi, address);
};
