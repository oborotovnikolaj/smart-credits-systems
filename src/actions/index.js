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

    console.log(await targetCredit(credits[1]).methods.getSummary(accounts[0]).call());

    const creditsInfo = await Promise.all(
        Array(parseInt(credits.length))
            .fill()
            .map((element, index) => {
                return targetCredit(credits[index]).methods.getSummary(accounts[0]).call();
            })
    );

    const creditsInfoObj =
        // creditsInfo.map(el => {return {address: el[0], regInBank: el[1], approvedByClient: el[2], regInShop: el[3], isPaid: el[4], isClosed: el[5], category: el[6], money: el[7] }});
        creditsInfo.map(el => {return {address: el[0], regInBank: el[1], approvedByBank: el[2], approvedByClient: el[3], regInShop: el[4], isPaid: el[5], isClosed: el[6], category: el[7], money: el[8] }});

    console.log("creditsInfo");
    console.log(creditsInfo);
    console.log(creditsInfoObj);
    // dispatch({ type: FETCH_BANK_DATA, payload: creditsInfo});
    dispatch({ type: FETCH_BANK_DATA, payload: creditsInfoObj});
};
