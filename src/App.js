import React, { Component } from 'react';
import Aux from './hoc/Auxilary/Taher';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';

class App extends Component {
  render() {
    return (
      <Aux>
        <Layout>
          <BurgerBuilder></BurgerBuilder>
          <Checkout></Checkout>
        </Layout>
      </Aux>
    );
  }
}

export default App;
