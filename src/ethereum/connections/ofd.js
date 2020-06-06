import _web3 from "../web3";
import Ofd from '../build/Ofd.json';

export default address => {
  return new _web3.eth.Contract(Ofd.Ofd.abi, address);
};
