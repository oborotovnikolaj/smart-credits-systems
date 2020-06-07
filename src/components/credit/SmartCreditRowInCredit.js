import React, {Component} from 'react';
import {Button, Table} from 'semantic-ui-react';
import _web3 from "../../ethereum/web3";
import {connect} from "react-redux";
import {fetchBankCredits, fetchCredit} from "../../actions";
import {BLOCKCHAIN_DATA} from "../../Constants";
import targetCredit from "../../ethereum/connections/targetCredit";

class SmartCreditRowInCredit extends Component {

    state = {
        errorRegInBank: '',
        loadingRegInBank: false,
        errorMessageApprove: '',
        loadingApprove: false,
        errorRegInShop: '',
        loadingRegInShop: false
    };


    onRegisterInBank = async () => {
        this.setState({loadingRegInBank: true, errorRegInBank: ''});

        try {
            const {creditInfo} = this.props;
            const accounts = await _web3.eth.getAccounts();
            await targetCredit(creditInfo.address).methods.registerInBank().send({
                from: accounts[0]
            });
            this.props.fetchBankCredits(this.props.bankAddress);
        } catch (err) {
            this.setState({errorRegInBank: err.message});
        }

        this.setState({loadingRegInBank: false});
        this.props.fetchCredit(this.props.creditInfo.address);
    };

    onApprove = async () => {
        this.setState({loadingApprove: true, errorMessageApprove: ''});

        try {
            const {creditInfo} = this.props;
            const accounts = await _web3.eth.getAccounts();
            await targetCredit(creditInfo.address).methods.approveByClient("1").send({
                from: accounts[0]
            });
            this.props.fetchBankCredits(this.props.bankAddress);
        } catch (err) {
            this.setState({errorMessageApprove: err.message});
        }

        this.setState({loadingApprove: false});
        this.props.fetchCredit(this.props.creditInfo.address);
    };


    onRegisterInShop = async () => {
        this.setState({loadingRegInShop: true, errorRegInShop: ''});

        try {
            const {creditInfo} = this.props;
            const accounts = await _web3.eth.getAccounts();
            await targetCredit(creditInfo.address).methods.registerInShop().send({
                from: accounts[0]
            });
            this.props.fetchBankCredits(this.props.bankAddress);
        } catch (err) {
            this.setState({errorRegInShop: err.message});
        }

        this.setState({loadingRegInShop: false});
        this.props.fetchCredit(this.props.creditInfo.address);
    };

    render() {

        const {Row, Cell} = Table;
        const {creditInfo} = this.props;

        return (
            <Row
                disabled={creditInfo.isClosed}
                positive={creditInfo.approvedByClient}
            >
                <Cell>{creditInfo.approvedByBank.toString()}</Cell>
                <Cell>{creditInfo.approvedByClient.toString()}</Cell>
                <Cell>{creditInfo.isPaid.toString()}</Cell>
                <Cell>{creditInfo.isClosed.toString()}</Cell>
                <Cell>
                    {creditInfo.regInBank ? null : (
                        <Button color="green" loading={this.state.loadingRegInBank} basic onClick={this.onRegisterInBank}>
                            Register
                        </Button>
                    )}
                </Cell>
                <Cell>
                    {creditInfo.approvedByClient ? null : (
                        <Button color="green" loading={this.state.loadingApprove} basic onClick={this.onApprove}>
                            Approve
                        </Button>
                    )}
                </Cell>
                <Cell>
                    {creditInfo.regInShop ? null: (
                        <Button color="green" loading={this.state.loadingRegInShop} basic onClick={this.onRegisterInShop}>
                            Register
                        </Button>
                    )}
                </Cell>
            </Row>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        creditReducer: Object.values(state.creditReducer),
    };
};

export default connect(mapStateToProps, {fetchCredit})(SmartCreditRowInCredit);
