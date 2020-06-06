import fabric from "../../ethereum/connections/fabric";
import React, {Component} from 'react';
import {Button, Form, Message} from 'semantic-ui-react';
import Layout from '../../components/Layout';
import web3 from '../../ethereum/web3';
import {connect} from "react-redux";
import {fetchData} from "../../actions";
import {BLOCKCHAIN_DATA} from "../../Constants";


class CreditNew extends Component {

    state = {
        errorMessage: '',
        loading: false
    };

    onSubmit = async event => {
        event.preventDefault();

        this.setState({loading: true, errorMessage: ''});

        try {
            const accounts = await web3.eth.getAccounts();
            await fabric.methods
                .createSmartCredit()
                .send({
                    from: accounts[0]
                });

            this.props.fetchData();
        } catch (err) {
            this.setState({errorMessage: err.message});
        }

        this.setState({loading: false});
    };

    render() {
        return (
            <Layout>
                <h3>Create a SmartCredit</h3>

                <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                    <Message error header="Oops!" content={this.state.errorMessage}/>
                    <Button loading={this.state.loading} primary>
                        Create!
                    </Button>
                </Form>
            </Layout>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        blockChainData: state.fabricReducer[BLOCKCHAIN_DATA]
    };
};

export default connect(mapStateToProps, {fetchData})(CreditNew);