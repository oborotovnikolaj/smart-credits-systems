import _web3 from "../web3";
import Fns from '../build/Fns.json';

export default address => {
  return new _web3.eth.Contract(Fns.Fns.abi, address);
};
