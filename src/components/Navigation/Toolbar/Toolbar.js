import React from 'react';
import classes from './Toolbar.css';
import Logo from '../Logo/Logo';

const toolBar = (props) => {
    return(
        <header className={classes.Toolbar}>
            <div>Menu</div>
           <Logo></Logo>
            <nav>
                ...
                {/* <ul>...</ul> */}
            </nav>
        </header>
    );
}

export default toolBar;