import _web3 from "../web3";
import ContractFabric from '../build/ContractFabric.json';

const fabric = new _web3.eth.Contract(
    ContractFabric.ContractFabric.abi,
    '0xb868c530F09405De38DdF5D5cf74A3e781129D0A',
    // '0xb15688b5350007cDD362E6bE64D41c93E4d2646f',
    // '0xae9b488553D83A1199294186fB9AE34ED7adEB97'
);

export default fabric;
