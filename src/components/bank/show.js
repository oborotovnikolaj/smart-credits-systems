import * as React from "react";
import {Link} from "react-router-dom";
import {Button, Table} from "semantic-ui-react";
import Layout from "../Layout";
import {BLOCKCHAIN_DATA} from "../../Constants";
import {connect} from "react-redux";
import {fetchBankCredits} from "../../actions";
import SmartCreditRawInBank from "./SmartCreditRawInBank";

class ShowBank extends React.Component {

    componentDidMount() {
        this.props.fetchBankCredits(this.props.match.params.id);
    }

    renderRows() {
        if (!!!this.props.bankReducer) {
            return;
        }
        return this.props.bankReducer.map((creditInfo, index) => {
            return (
                <SmartCreditRawInBank
                    key={index}
                    id={index}
                    creditInfo={creditInfo}
                    bankAddress={this.props.match.params.id}
                />
            );
        });
    }

    render() {
        const { Header, Row, HeaderCell, Body } = Table;

        return (
            <Layout>
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
                            <HeaderCell>Close</HeaderCell>
                        </Row>
                    </Header>
                    <Body>{this.renderRows()}</Body>
                </Table>
                <div>Found {this.props.bankReducer.length} credits.</div>
            </Layout>
        );
    }

}

const mapStateToProps = (state) => {
    return {
        blockChainData: state.fabricReducer[BLOCKCHAIN_DATA],
        bankReducer: Object.values(state.bankReducer),
    };
};

export default connect(mapStateToProps, {fetchBankCredits})(ShowBank);
