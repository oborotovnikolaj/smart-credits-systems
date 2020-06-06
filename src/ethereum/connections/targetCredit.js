import _web3 from "../web3";
import TargetCredit from '../build/TargetCredit.json';

export default address => {
  return new _web3.eth.Contract(TargetCredit.TargetCredit.abi, address);
};
