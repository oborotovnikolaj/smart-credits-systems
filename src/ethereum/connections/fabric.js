import _web3 from "../web3";
import ContractFabric from '../build/ContractFabric.json';

const fabric = new _web3.eth.Contract(
    ContractFabric.ContractFabric.abi,
    '0x946d9d5Fc1dd783A910fb6638a944AC79a4DAABA',
    // '0xb15688b5350007cDD362E6bE64D41c93E4d2646f',
    // '0xae9b488553D83A1199294186fB9AE34ED7adEB97'
);

export default fabric;
