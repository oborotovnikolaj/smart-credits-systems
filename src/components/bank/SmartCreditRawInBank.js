import React, {Component} from 'react';
import {Button, Table} from 'semantic-ui-react';
import _web3 from "../../ethereum/web3";
import bank from "../../ethereum/connections/bank";
import {connect} from "react-redux";
import {fetchBankCredits} from "../../actions";
import {BLOCKCHAIN_DATA} from "../../Constants";

class SmartCreditRawInBank extends Component {

    state = {
        errorMessageApprove: '',
        loadingApprove: false,
        errorMessageClose: '',
        loadingClose: false
    };

    onApprove = async () => {

        // event.preventDefault();

        this.setState({loadingApprove: true, errorMessageApprove: ''});

        try {
            const {creditInfo} = this.props;
            const accounts = await _web3.eth.getAccounts();
            // await bank.methods.approveCredit(this.props.creditAddress, this.props.paper).send({
            await bank(this.props.bankAddress).methods.approveCredit(creditInfo.address, "1").send({
                from: accounts[0]
            });
            this.props.fetchBankCredits(this.props.bankAddress);
        } catch (err) {
            this.setState({errorMessageApprove: err.message});
        }

        this.setState({loadingApprove: false});
        this.props.fetchBankCredits(this.props.bankAddress);
    };

    onClose = async () => {

        this.setState({loadingClose: true, errorMessageClose: ''});

        try {
            const {creditInfo} = this.props;
            const accounts = await _web3.eth.getAccounts();
            await  bank(this.props.bankAddress).methods.closeCredit(creditInfo.address).send({
                from: accounts[0]
            });
            this.props.fetchBankCredits(this.props.bankAddress);
        } catch (err) {
            this.setState({errorMessageClose: err.message});
        }

        this.setState({loadingClose: false});
        this.props.fetchBankCredits(this.props.bankAddress);
    };

    render() {
        const {Row, Cell} = Table;
        const {creditInfo} = this.props;

        return (
            <Row
                disabled={creditInfo.isClosed}
                positive={creditInfo.approvedByClient}
            >
                <Cell>{creditInfo.address.toString()}</Cell>
                <Cell>{creditInfo.approvedByBank.toString()}</Cell>
                <Cell>{creditInfo.approvedByClient.toString()}</Cell>
                <Cell>{creditInfo.isPaid.toString()}</Cell>
                <Cell>{creditInfo.isClosed.toString()}</Cell>
                <Cell>
                    {creditInfo.approvedByBank ? null : (
                        <Button color="green" loading={this.state.loadingApprove} basic onClick={this.onApprove}>
                            Approve
                        </Button>
                    )}
                </Cell>
                <Cell>
                    {creditInfo.isClosed ? null : (
                        <Button color="teal" loading={this.state.loading} basic onClick={this.onClose}>
                            Close
                        </Button>
                    )}
                </Cell>
            </Row>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        blockChainData: state.fabricReducer[BLOCKCHAIN_DATA],
        bankReducer: Object.values(state.bankReducer),
    };
};

export default connect(mapStateToProps, {fetchBankCredits})(SmartCreditRawInBank);
