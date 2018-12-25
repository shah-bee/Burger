import React, { Component } from 'react';
import Aux from '../../hoc/Auxilary/Taher';
import Classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/Sidedrawer/Sidedrawer';

class Layout extends Component {
    state = {
        showSideDrawer: false
    }

    closeSideDrawerHandler = () => {
        this.setState({
            showSideDrawer: false
        });
    }

    toggleSideDrawerHandler = () => {
        this.setState((prevState) => {
            return ({ showSideDrawer: !prevState.showSideDrawer});
        });
    }

    render() {
        return (<Aux>
            <Toolbar show={this.toggleSideDrawerHandler}></Toolbar>
            <SideDrawer open={this.state.showSideDrawer} close={this.closeSideDrawerHandler} ></SideDrawer>
            <main className={Classes.Content}>
                {this.props.children}
            </main>
        </Aux>)
    }
}

export default Layout;