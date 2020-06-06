import React, {Component} from 'react';
import {Button, Card} from 'semantic-ui-react';
import shop from "../ethereum/connections/shop";
import bank from "../ethereum/connections/bank";
import ofd from "../ethereum/connections/ofd";
import fns from "../ethereum/connections/fns";

import Layout from '../components/Layout';
import {Link} from 'react-router-dom';
import {fetchData} from "../actions";
import {connect} from "react-redux";
import {BLOCKCHAIN_DATA} from "../Constants";

class SmartContractFabric extends Component {

    componentDidMount() {
        this.props.fetchData();
    }

    renderListOfItems = (itemName, linkName) => {
        console.log(this.props.blockChainData);
        if (!!!this.props.blockChainData) {
            return ;
        }
        const items = this.props.blockChainData[itemName].map(address => {
            return {
                header: address,
                description: (
                    <Link to={`/${linkName}/${address}`}>
                        <a>View {linkName}</a>
                    </Link>
                ),
                fluid: true
            };
        });

        return <Card.Group items={items}/>
    };

    renderCreateButton = (itemName, linkName) => {
        return (
            <Link to={`/${linkName}/new`}>
                <a>
                    <Button
                        floated="right"
                        content={"Create " + linkName}
                        icon="add circle"
                        primary
                    />
                </a>
            </Link>
        )
    };

    render() {
        return (
            <Layout>
                <div>
                    <h3>Open Banks</h3>
                    {this.renderCreateButton("banks", "bank")}
                    {this.renderListOfItems("banks", "bank")}
                </div>
                <div>
                    <h3>Open Shops</h3>
                    {this.renderCreateButton("shops", "shop")}
                    {this.renderListOfItems("shops", "shop")}
                </div>
                <div>
                    <h3>Open Ofd</h3>
                    {this.renderCreateButton("ofdList", "ofd")}
                    {this.renderListOfItems("ofdList", "ofd")}
                </div>
                <div>
                    <h3>Open fns</h3>
                    {this.renderCreateButton("fnsList", "fns")}
                    {this.renderListOfItems("fnsList", "fns")}
                </div>
                <div>
                    <h3>Open credits</h3>
                    {this.renderCreateButton("credits", "credit")}
                    {this.renderListOfItems("credits", "credit")}
                </div>
            </Layout>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        blockChainData: state.fabricReducer[BLOCKCHAIN_DATA]
    };
};

export default connect(mapStateToProps, {fetchData})(SmartContractFabric);