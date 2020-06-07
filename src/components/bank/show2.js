// import * as React from "react";
// import {Link} from "react-router-dom";
// import {Button, Card} from "semantic-ui-react";
// import Layout from "../Layout";
// import {BLOCKCHAIN_DATA} from "../../Constants";
// import {connect} from "react-redux";
// import {fetchBankCredits, fetchData} from "../../actions";
// import {FETCH_BANK_DATA} from "../../actions/types";
//
// class ShowBank extends React.Component {
//
//     componentDidMount() {
//         this.props.fetchBankCredits(this.props.match.params.id);
//     }
//
//     renderListOfItems = (itemName, linkName) => {
//         console.log("this.props.bankReducer");
//         console.log(this.props.bankReducer);
//         if (!!!this.props.bankReducer) {
//             return;
//         }
//         // this.props.bankReducer.forEach(info => info.
//         const items = this.props.bankReducer.map(info => {
//             console.log(info);
//             return {
//                 header: info.address,
//                 description: (
//                     <Link to={`/${linkName}/${info.address}`}>
//                         <a>View {linkName}</a>
//                     </Link>
//                 ),
//                 fluid: true
//             };
//         });
//
//         return <Card.Group items={items}/>
//     };
//
//
//     render() {
//         return (
//             <div>
//                 <div>
//                     <h3>Registred credits</h3>
//                     {this.renderListOfItems("credits", "credit")}
//                 </div>
//             </div>
//
//         )
//     }
// }
//
// const mapStateToProps = (state) => {
//     return {
//         blockChainData: state.fabricReducer[BLOCKCHAIN_DATA],
//         bankReducer: Object.values(state.bankReducer),
//         // bankReducer: Object.values(state.bankReducer[FETCH_BANK_DATA]),
//         // bankReducer2: state.bankReducer,
//         // bankReducer: state.bankReducer
//     };
// };
//
// export default connect(mapStateToProps, {fetchBankCredits})(ShowBank);
