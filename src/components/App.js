import React from 'react';
import {Router, Route, Switch} from "react-router-dom";

import SmartContractFabric from "./fabric";
import Header from "./Header";
import history from "../history";
import BankNew from "./bank/new";
import ShopNew from "./shop/new";
import OfdNew from "./ofd/new";
import FnsNew from "./fns/new";
import CreditNew from "./credit/new";
import ShowBank from "./bank/show";

class App extends React.Component {
    render() {
        return (
            <div>
                <Router history={history}>
                    <div>
                        <Header className={"ui container"}/>
                        <Switch>
                            <Route path={"/"} exact component={SmartContractFabric}/>
                            <Route path={"/bank/new"} exact component={BankNew}/>
                            <Route path={"/bank/:id"} exact component={ShowBank}/>
                            <Route path={"/shop/new"} exact component={ShopNew}/>
                            {/*<Route path={"/shop/:id"} exact component={StreamDelete}/>*/}
                            <Route path={"/ofd/new"} exact component={OfdNew}/>
                            {/*<Route path={"/ofd/:id"} exact component={StreamNew}/>*/}
                            <Route path={"/fns/new"} exact component={FnsNew}/>
                            {/*<Route path={"/fns/:id"} exact component={StreamDelete}/>*/}
                            <Route path={"/credit/new"} exact component={CreditNew}/>
                            {/*<Route path={"/credit/:id"} exact component={StreamDelete}/>*/}
                        </Switch>
                    </div>
                </Router>
            </div>
        )
    }
}

export default App;