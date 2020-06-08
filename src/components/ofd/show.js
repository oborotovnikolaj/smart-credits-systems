import * as React from "react";
import {Button, Form, Input, Message} from "semantic-ui-react";
import Layout from "../Layout";
import {OFD} from "../../Constants";
import {connect} from "react-redux";
import {fetchOfd} from "../../actions";
import _web3 from "../../ethereum/web3";
import ofd from "../../ethereum/connections/ofd";

class ShowOfd extends React.Component {

    state = {
        valueFns: '',
        loadingFns: false,
        errorMessageFns: '',
        valueAddShop: '',
        loadingAddShop: false,
        errorMessageAddShop: '',
    };

    componentDidMount() {
        this.props.fetchOfd(this.props.match.params.id);
    }

    onSubmitFns = async event => {
        event.preventDefault();
        const { valueFns } = this.state;

        this.setState({ loadingFns: true, errorMessageFns: '' });

        try {
            const accounts = await _web3.eth.getAccounts();
            await ofd(this.props.match.params.id).methods
                .setFns(valueFns)
                .send({ from: accounts[0] });
        } catch (err) {
            this.setState({ errorMessageFns: err.message });
        }

        this.setState({ loadingFns: false });
        this.props.fetchOfd(this.props.match.params.id);
    };

    onAddShop = async event => {
        event.preventDefault();
        const { valueAddShop } = this.state;

        this.setState({ loadingAddShop: true, errorMessageAddShop: '' });

        try {
            const accounts = await _web3.eth.getAccounts();
            await ofd(this.props.match.params.id).methods
                .addShop(valueAddShop)
                .send({ from: accounts[0] });
        } catch (err) {
            this.setState({ errorMessageAddShop: err.message });
        }

        this.setState({ loadingAddShop: false });
        this.props.fetchOfd(this.props.match.params.id);
    };

    render() {
        return (
            <Layout>
                <h2>Active ofd {this.props.match.params.id}</h2>

                <Form onSubmit={this.onSubmitFns} error={!!this.state.errorMessageFns}>
                    <Form.Field>
                        <label>Fns</label>
                        <Input
                            value={this.state.valueFns}
                            onChange={event =>
                                this.setState({ valueFns: event.target.value })}
                        />
                    </Form.Field>
                    <Message error header="Oops!" content={this.state.errorMessageFns} />
                    <Button primary loading={this.state.loadingFns}>
                        Set
                    </Button>
                </Form>

                <Form onSubmit={this.onAddShop} error={!!this.state.errorMessageAddShop}>
                    <Form.Field>
                        <label>Add Shop</label>
                        <Input
                            value={this.state.valueAddShop}
                            onChange={event =>
                                this.setState({ valueAddShop: event.target.value })}
                        />
                    </Form.Field>
                    <Message error header="Oops!" content={this.state.errorMessageAddShop} />
                    <Button primary loading={this.state.loadingAddShop}>
                        Set
                    </Button>
                </Form>

                <h3>Fns : {this.props.ofdReducer ? this.props.ofdReducer.fns : null}</h3>
            </Layout>
        );
    }

}

const mapStateToProps = (state) => {
    return {
        ofdReducer: state.ofdReducer[OFD],
    };
};

export default connect(mapStateToProps, {fetchOfd})(ShowOfd);
