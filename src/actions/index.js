import fabric from "../ethereum/connections/fabric";
import history from "../history";
import {FETCH_BANK_DATA, FETCH_CREDITS, FETCH_DATA} from "./types";
import _web3 from "../ethereum/web3";
import bank from "../ethereum/connections/bank";
import targetCredit from "../ethereum/connections/targetCredit";


export const fetchData = () =>  async dispatch => {

    const accounts = await _web3.eth.getAccounts();
    console.log(accounts);


    const credits = await fabric.methods.getCredits(accounts[0]).call();
    const banks = await fabric.methods.getBanks().call();
    const shops = await fabric.methods.getShops().call();
    const ofdList = await fabric.methods.getOfdList().call();
    const fnsList = await fabric.methods.getFnsList().call();
    console.log("fetchData");
    console.log({ credits, banks, shops, ofdList, fnsList });
    dispatch({ type: FETCH_DATA, payload: { credits, banks, shops, ofdList, fnsList } });
    history.push('/');
};


export const fetchBankCredits = (addressBank) =>  async dispatch => {
    const accounts = await _web3.eth.getAccounts();
    console.log(accounts);
    const credits = await bank(addressBank).methods.getAllCredits(accounts[0]).call();
    console.log("fetchBankCredits");
    console.log(credits);

    const creditsInfo = await Promise.all(
        Array(parseInt(credits.length))
            .fill()
            .map((element, index) => {
                return targetCredit(credits[index]).methods.getSummary(accounts[0]).call();
            })
    );
    console.log("creditsInfo");
    console.log(creditsInfo);
    console.log({ type: FETCH_BANK_DATA, payload: creditsInfo});
    dispatch({ type: FETCH_BANK_DATA, payload: creditsInfo});
};
