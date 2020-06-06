import * as React from "react";
import {Link} from "react-router-dom";
import {Button, Card} from "semantic-ui-react";
import Layout from "../Layout";
import {BLOCKCHAIN_DATA} from "../../Constants";
import {connect} from "react-redux";
import {fetchBankCredits, fetchData} from "../../actions";

class ShowBank extends React.Component {

    componentDidMount() {
        this.props.fetchBankCredits(this.props.match.params.id);
    }

    renderListOfItems = (itemName, linkName) => {
        console.log(this.props.bankReducer);
        if (!!!this.props.bankReducer) {
            return;
        }
        const items = this.props.bankReducer.map(el => {
            return {
                header: el.address,
                description: (
                    <Link to={`/${linkName}/${el.address}`}>
                        <a>View {linkName}</a>
                    </Link>
                ),
                fluid: true
            };
        });

        return <Card.Group items={items}/>
    };


    render() {
        return (
            <div>
                <div>
                    <h3>Registred credits</h3>
                    {this.renderListOfItems("credits", "credit")}
                </div>
            </div>

        )
    }
}

const mapStateToProps = (state) => {
    return {
        blockChainData: state.fabricReducer[BLOCKCHAIN_DATA],
        bankReducerList: Object.values(state.bankReducer),
        bankReducer: Object.values(state.bankReducer)
    };
};

export default connect(mapStateToProps, {fetchBankCredits})(ShowBank);
