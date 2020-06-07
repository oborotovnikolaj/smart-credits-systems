import fabric from "../ethereum/connections/fabric";
import history from "../history";
import {
    FETCH_BANK_DATA,
    FETCH_CREDIT_DATA,
    FETCH_CREDITS,
    FETCH_DATA,
    FETCH_OFD,
    FETCH_SHOP,
    FETCH_SHOP_DATA
} from "./types";
import _web3 from "../ethereum/web3";
import bank from "../ethereum/connections/bank";
import targetCredit from "../ethereum/connections/targetCredit";
import shop from "../ethereum/connections/shop";
import ofd from "../ethereum/connections/ofd";

export const fetchData = () =>  async dispatch => {

    const accounts = await _web3.eth.getAccounts();
    const credits = await fabric.methods.getCredits(accounts[0]).call();
    const banks = await fabric.methods.getBanks().call();
    const shops = await fabric.methods.getShops().call();
    const ofdList = await fabric.methods.getOfdList().call();
    const fnsList = await fabric.methods.getFnsList().call();
    dispatch({ type: FETCH_DATA, payload: { credits, banks, shops, ofdList, fnsList } });
    history.push('/');
};

export const fetchBankCredits = (addressBank) =>  async dispatch => {

    const accounts = await _web3.eth.getAccounts();
    const credits = await bank(addressBank).methods.getAllCredits(accounts[0]).call();
    const creditsInfo = await Promise.all(
        Array(parseInt(credits.length))
            .fill()
            .map((element, index) => {
                return targetCredit(credits[index]).methods.getSummary(accounts[0]).call();
            })
    );
    const creditsInfoObj =
        creditsInfo.map(el => {return {address: el[0], bank: el[1], shop: el[2], regInBank: el[3], approvedByBank: el[4],
            approvedByClient: el[5], regInShop: el[6], isPaid: el[7], isClosed: el[8], category: el[9], money: el[10] }});

    dispatch({ type: FETCH_BANK_DATA, payload: creditsInfoObj});
};

export const fetchCredit = (addressCredit) =>  async dispatch => {

    const accounts = await _web3.eth.getAccounts();
    const credit = await targetCredit(addressCredit).methods.getSummary(accounts[0]).call();
    const creditsInfoObj =
        {address: credit[0], bank: credit[1], shop: credit[2], regInBank: credit[3], approvedByBank: credit[4],
            approvedByClient: credit[5], regInShop: credit[6], isPaid: credit[7], isClosed: credit[8], category: credit[9], money: credit[10] };
    dispatch({ type: FETCH_CREDIT_DATA, payload: creditsInfoObj});
};

export const fetchShopCredits = (addressShop) =>  async dispatch => {

    const accounts = await _web3.eth.getAccounts();
    const credits = await shop(addressShop).methods.getAllCredits(accounts[0]).call();
    const creditsInfo = await Promise.all(
        Array(parseInt(credits.length))
            .fill()
            .map((element, index) => {
                return targetCredit(credits[index]).methods.getSummary(accounts[0]).call();
            })
    );
    const creditsInfoObj =
        creditsInfo.map(el => {return {address: el[0], bank: el[1], shop: el[2], regInBank: el[3], approvedByBank: el[4],
            approvedByClient: el[5], regInShop: el[6], isPaid: el[7], isClosed: el[8], category: el[9], money: el[10] }});

    dispatch({ type: FETCH_SHOP_DATA, payload: creditsInfoObj});
};

export const fetchShop = (addressShop) =>  async dispatch => {

    const accounts = await _web3.eth.getAccounts();
    const ofd = await shop(addressShop).methods.getOfd().call();
    const creditsInfoObj = {ofd};

    dispatch({ type: FETCH_SHOP, payload: creditsInfoObj});
};


export const fetchOfd = (addressOfd) =>  async dispatch => {

    const accounts = await _web3.eth.getAccounts();
    const fns = await ofd(addressOfd).methods.getFns().call();
    const creditsInfoObj = {fns};

    dispatch({ type: FETCH_OFD, payload: creditsInfoObj});
};


