import React from 'react';
import Aux from '../../hoc/Taher';
import Classes from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';

const layout = (props) => (
    <Aux>
        <Toolbar></Toolbar>
        <main className={Classes.Content}>
            {props.children}
        </main>
    </Aux>
);

export default layout;