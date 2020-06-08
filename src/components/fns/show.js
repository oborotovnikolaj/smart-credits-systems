import * as React from "react";
import {Button, Form, Input, Message} from "semantic-ui-react";
import Layout from "../Layout";
import {OFD} from "../../Constants";
import {connect} from "react-redux";
import {fetchOfd} from "../../actions";
import _web3 from "../../ethereum/web3";
import ofd from "../../ethereum/connections/ofd";
import fns from "../../ethereum/connections/fns";

class ShowFns extends React.Component {

    state = {
        valueOfd: '',
        loadingOfd: false,
        errorMessageOfd: '',
    };

    componentDidMount() {
        // this.props.fetchOfd(this.props.match.params.id);
    }

    onRegisterOfd = async event => {
        event.preventDefault();
        const { valueOfd } = this.state;

        this.setState({ loadingOfd: true, errorMessageOfd: '' });

        try {
            const accounts = await _web3.eth.getAccounts();
            await fns(this.props.match.params.id).methods
                .registerOfd(valueOfd)
                .send({ from: accounts[0] });
        } catch (err) {
            this.setState({ errorMessageOfd: err.message });
        }

        this.setState({ loadingOfd: false });
        // this.props.fetchOfd(this.props.match.params.id);
    };

    render() {
        return (
            <Layout>
                <h2>Active fns {this.props.match.params.id}</h2>

                <Form onSubmit={this.onRegisterOfd} error={!!this.state.errorMessageOfd}>
                    <Form.Field>
                        <label>Add Shop</label>
                        <Input
                            value={this.state.valueOfd}
                            onChange={event =>
                                this.setState({ valueOfd: event.target.value })}
                        />
                    </Form.Field>
                    <Message error header="Oops!" content={this.state.errorMessageOfd} />
                    <Button primary loading={this.state.loadingOfd}>
                        register
                    </Button>
                </Form>
            </Layout>
        );
    }

}

const mapStateToProps = (state) => {
    return {
    };
};

export default connect(mapStateToProps, {})(ShowFns);
