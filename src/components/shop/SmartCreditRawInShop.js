import React, {Component} from 'react';
import {Button, Table} from 'semantic-ui-react';
import _web3 from "../../ethereum/web3";
import bank from "../../ethereum/connections/bank";
import {connect} from "react-redux";
import {fetchShopCredits} from "../../actions";
import shop from "../../ethereum/connections/shop";
import {CREDITS} from "../../Constants";

class SmartCreditRawInShop extends Component {

    state = {
        errorMessageApprove: '',
        loadingApprove: false,
    };

    onApprove = async () => {

        this.setState({loadingApprove: true, errorMessageApprove: ''});

        try {
            const {creditInfo} = this.props;
            // console.log(creditInfo);
            const accounts = await _web3.eth.getAccounts();
            await shop(this.props.shopAddress).methods.approveByShopOwner(creditInfo.address).send({
                from: accounts[0]
            });
            this.props.fetchShopCredits(this.props.shopAddress);
        } catch (err) {
            this.setState({errorMessageApprove: err.message});
        }

        this.setState({loadingApprove: false});
        this.props.fetchShopCredits(this.props.shopAddress);
    };

    render() {
        const {Row, Cell} = Table;
        const {creditInfo} = this.props;

        console.log(creditInfo);

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
                    {creditInfo.isPaid ? null : (
                        <Button color="green" loading={this.state.loadingApprove} basic onClick={this.onApprove}>
                            Approve
                        </Button>
                    )}
                </Cell>
            </Row>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        shopReducer: Object.values(state.shopReducer[CREDITS]),
    };
};

export default connect(mapStateToProps, {fetchShopCredits})(SmartCreditRawInShop);
