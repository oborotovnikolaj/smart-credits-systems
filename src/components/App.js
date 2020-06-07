import React from 'react';
import {Route, Router, Switch} from "react-router-dom";

import SmartContractFabric from "./fabric";
import history from "../history";
import BankNew from "./bank/new";
import ShopNew from "./shop/new";
import OfdNew from "./ofd/new";
import FnsNew from "./fns/new";
import CreditNew from "./credit/new";
import ShowBank from "./bank/show";
import ShowCredit from "./credit/show";
import ShowShop from "./shop/show";
import ShowOfd from "./ofd/show";

class App extends React.Component {
    render() {
        return (
            <div>
                <Router history={history}>
                    <div>
                        {/*<Header className={"ui container"}/>*/}
                        <Switch>
                            <Route path={"/"} exact component={SmartContractFabric}/>
                            <Route path={"/bank/new"} exact component={BankNew}/>
                            <Route path={"/bank/:id"} exact component={ShowBank}/>
                            <Route path={"/shop/new"} exact component={ShopNew}/>
                            <Route path={"/shop/:id"} exact component={ShowShop}/>
                            <Route path={"/ofd/new"} exact component={OfdNew}/>
                            <Route path={"/ofd/:id"} exact component={ShowOfd}/>
                            <Route path={"/fns/new"} exact component={FnsNew}/>
                            {/*<Route path={"/fns/:id"} exact component={}/>*/}
                            <Route path={"/credit/new"} exact component={CreditNew}/>
                            <Route path={"/credit/:id"} exact component={ShowCredit}/>
                        </Switch>
                    </div>
                </Router>
            </div>
        )
    }
}

export default App;