import React, { Component } from 'react';
import Aux from './hoc/Auxilary/Taher';
import Layout from './hoc/Layout/Layout';
import { Route, Link, BrowserRouter, Switch } from 'react-router-dom';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';

class App extends Component {
  render() {
    return (
        <Aux>
          <Layout>
            <Switch>
              <Route path="/burger/checkout" exact component={Checkout}></Route>
              <Route path="/burger" exact component={BurgerBuilder}></Route>
            </Switch>
          </Layout>
        </Aux>
    );
  }
}

export default App;
