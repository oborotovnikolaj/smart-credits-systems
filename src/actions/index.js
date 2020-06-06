import fabric from "../ethereum/connections/fabric";
import history from "../history";
import {FETCH_CREDITS, FETCH_DATA} from "./types";
import _web3 from "../ethereum/web3";


export const fetchData = () =>  async dispatch => {

    const accounts = await _web3.eth.getAccounts();
    console.log(accounts);


    const credits = await fabric.methods.getCredits().call();
    const banks = await fabric.methods.getBanks().call();
    const shops = await fabric.methods.getShops().call();
    const ofdList = await fabric.methods.getOfdList().call();
    const fnsList = await fabric.methods.getFnsList().call();
    console.log("fetchData");
    console.log({ credits, banks, shops, ofdList, fnsList });
    dispatch({ type: FETCH_DATA, payload: { credits, banks, shops, ofdList, fnsList } });
    history.push('/');
};

export const fetchCredit = () =>  async dispatch => {
    const accounts = await _web3.eth.getAccounts();
    const credits = await fabric.methods.getCredits().call();
    console.log("fetchData");
    console.log("accounts");
    console.log(accounts);
    console.log({ credits });
    dispatch({ type: FETCH_CREDITS, payload: { credits } });
    history.push('/');
};
