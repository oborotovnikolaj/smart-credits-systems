import * as React from "react";
import {Link} from "react-router-dom";
import {Button, Form, Input, Message, Table} from "semantic-ui-react";
import Layout from "../Layout";
import {BLOCKCHAIN_DATA, CREDITS, SHOP} from "../../Constants";
import {connect} from "react-redux";
import {fetchBankCredits, fetchShop, fetchShopCredits} from "../../actions";
import SmartCreditRawInBank from "./SmartCreditRawInShop";
import _web3 from "../../ethereum/web3";
import targetCredit from "../../ethereum/connections/targetCredit";
import shop from "../../ethereum/connections/shop";

class ShowShop extends React.Component {

    state = {
        valueOfd: '',
        loadingOfd: false,
        errorMessageOfd: ''
    };

    componentDidMount() {
        this.props.fetchShopCredits(this.props.match.params.id);
        this.props.fetchShop(this.props.match.params.id);
    }

    renderRows() {
        if (!!!this.props.shopReducerCredit || this.props.shopReducerCredit.length === 0) {
            return;
        }

        return this.props.shopReducerCredit.map((creditInfo, index) => {
            return (
                <SmartCreditRawInBank
                    key={index}
                    id={index}
                    creditInfo={creditInfo}
                    shopAddress={this.props.match.params.id}
                />
            );
        });
    }

    onSubmitOfd = async event => {
        event.preventDefault();
        const { valueOfd } = this.state;

        this.setState({ loadingOfd: true, errorMessageOfd: '' });

        try {
            const accounts = await _web3.eth.getAccounts();
            await shop(this.props.match.params.id).methods
                .setOfd(valueOfd)
                .send({ from: accounts[0] });
        } catch (err) {
            this.setState({ errorMessageOfd: err.message });
        }

        this.setState({ loadingOfd: false });

        this.props.fetchShop(this.props.match.params.id);
    };


    render() {

        console.log("shopReducerShop");
        console.log(this.props.shopReducerShop);

        const { Header, Row, HeaderCell, Body } = Table;

        return (
            <Layout>
                <h2>Active Shop {this.props.match.params.id}</h2>
                <h3>Registered credits</h3>
                <Table>
                    <Header>
                        <Row>
                            <HeaderCell>address</HeaderCell>
                            <HeaderCell>approvedByBank</HeaderCell>
                            <HeaderCell>approvedByClient</HeaderCell>
                            <HeaderCell>isPaid</HeaderCell>
                            <HeaderCell>isClosed</HeaderCell>
                            <HeaderCell>Approve</HeaderCell>
                        </Row>
                    </Header>
                    <Body>{this.renderRows()}</Body>
                </Table>
                <div>Found {this.props.shopReducerCredit.length} credits.</div>


                <h3> Ofd : {this.props.shopReducerShop ? this.props.shopReducerShop[0] : null}</h3>

                <Form onSubmit={this.onSubmitOfd} error={!!this.state.errorMessageOfd}>
                    <Form.Field>
                        <label>Ofd</label>
                        <Input
                            value={this.state.valueOfd}
                            onChange={event =>
                                this.setState({ valueOfd: event.target.value })}
                        />
                    </Form.Field>
                    <Message error header="Oops!" content={this.state.errorMessageOfd} />
                    <Button primary loading={this.state.loadingOfd}>
                        Set
                    </Button>
                </Form>
            </Layout>
        );
    }

}

const mapStateToProps = (state) => {
    return {
        shopReducerCredit: Object.values(state.shopReducer[CREDITS]),
        shopReducerShop: Object.values(state.shopReducer[SHOP])
    };
};

export default connect(mapStateToProps, {fetchShopCredits, fetchShop})(ShowShop);
