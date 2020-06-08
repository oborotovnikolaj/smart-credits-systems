import * as React from "react";
import {Button, Form, Input, Message, Table} from "semantic-ui-react";
import Layout from "../Layout";
import {ACTIVE_CREDIT_DATA} from "../../Constants";
import {connect} from "react-redux";
import {fetchCredit} from "../../actions";
import SmartCreditRowInCredit from "./SmartCreditRowInCredit";
import targetCredit from "../../ethereum/connections/targetCredit";
import _web3 from "../../ethereum/web3";

class ShowCredit extends React.Component {

    state = {
        valueBank: '',
        valueShop: '',
        loadingBank: false,
        loadingShop: false,
        errorMessageShop: '',
        errorMessageBank: ''
    };

    componentDidMount() {
        this.props.fetchCredit(this.props.match.params.id);
    }

    renderRows() {

        console.log("this.props.creditReducer");
        console.log(this.props.creditReducer);

        if (!!!this.props.creditReducer) {
            return;
        }
        return (
            <SmartCreditRowInCredit
                key={0}
                id={0}
                creditInfo={this.props.creditReducer}
                creditAddress={this.props.match.params.id}
            />
        );
    }

    onSubmitBank = async event => {
        event.preventDefault();
        const { valueBank } = this.state;

        this.setState({ loadingBank: true, errorMessageBank: '' });

        try {
            const accounts = await _web3.eth.getAccounts();
            await targetCredit(this.props.match.params.id).methods
                .setBank(valueBank)
                .send({ from: accounts[0] });
        } catch (err) {
            this.setState({ errorMessageBank: err.message });
        }

        this.setState({ loadingBank: false });
        this.props.fetchCredit(this.props.match.params.id);
    };

    onSubmitShop = async event => {
        event.preventDefault();
        const { valueShop } = this.state;

        this.setState({ loadingShop: true, errorMessageShop: '' });

        try {
            const accounts = await _web3.eth.getAccounts();
            await targetCredit(this.props.match.params.id).methods
                .setShop(valueShop)
                .send({ from: accounts[0] });
        } catch (err) {
            this.setState({ errorMessageShop: err.message });
        }
        this.setState({ loadingShop: false });
        this.props.fetchCredit(this.props.match.params.id);
    };

    render() {
        const {Header, Row, HeaderCell, Body} = Table;

        return (
            <Layout>
                <h2>Active credit {this.props.match.params.id}</h2>
                <Table>
                    <Header>
                        <Row>
                            <HeaderCell>approvedByBank</HeaderCell>
                            <HeaderCell>approvedByClient</HeaderCell>
                            <HeaderCell>isPaid</HeaderCell>
                            <HeaderCell>isClosed</HeaderCell>
                            <HeaderCell>Register in Bank</HeaderCell>
                            <HeaderCell>Approve</HeaderCell>
                            <HeaderCell>Register in Shop</HeaderCell>
                        </Row>
                    </Header>
                    <Body>{this.renderRows()}</Body>
                </Table>

                <h3> Bank : {this.props.creditReducer ? this.props.creditReducer.bank : null}</h3>

                <Form onSubmit={this.onSubmitBank} error={!!this.state.errorMessageBank}>
                    <Form.Field>
                        <label>Bank</label>
                        <Input
                            value={this.state.valueBank}
                            onChange={event =>
                                this.setState({ valueBank: event.target.value })}
                        />
                    </Form.Field>
                    <Message error header="Oops!" content={this.state.errorMessageBank} />
                    <Button primary loading={this.state.loadingBank}>
                        Set
                    </Button>
                </Form>

                <h3> Shop : {this.props.creditReducer ? this.props.creditReducer.shop : null}</h3>

                <Form onSubmit={this.onSubmitShop} error={!!this.state.errorMessageShop}>
                    <Form.Field>
                        <label>Shop</label>
                        <Input
                            value={this.state.valueShop}
                            onChange={event =>
                                this.setState({ valueShop: event.target.value })}
                        />
                    </Form.Field>
                    <Message error header="Oops!" content={this.state.errorMessageShop} />
                    <Button primary loading={this.state.loadingShop}>
                        Set
                    </Button>
                </Form>
            </Layout>
        );
    }

}

const mapStateToProps = (state) => {
    return {
        creditReducer: state.creditReducer[ACTIVE_CREDIT_DATA],
    };
};

export default connect(mapStateToProps, {fetchCredit})(ShowCredit);
