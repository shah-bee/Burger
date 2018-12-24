import React from 'react';
import Aux from '../../hoc/Taher';
import Classes from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/Sidedrawer/Sidedrawer';

const layout = (props) => (
    <Aux>
        <Toolbar></Toolbar>
        <SideDrawer></SideDrawer>
        <main className={Classes.Content}>
            {props.children}
        </main>
    </Aux>
);

export default layout;