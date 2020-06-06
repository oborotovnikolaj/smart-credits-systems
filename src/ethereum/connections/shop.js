import _web3 from "../web3";
import Shop from '../build/Shop.json';

export default address => {
  return new _web3.eth.Contract(Shop.Shop.abi, address);
};
