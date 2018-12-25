import React, { Component } from 'react';
import classes from './Modal.css';
import BackDrop from '../BackDrop/BackDrop';
import Aux from '../../../hoc/Auxilary/Taher';

class Modal extends Component {

    componentWillUpdate(){
        console.log('[Update Modal] WillUpdate Modal.js');
    }

    shouldComponentUpdate( nextProps, nextState) {
        return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
    }
    
    render() {
        return (
            <Aux>
                <BackDrop show={this.props.show} cancel={this.props.cancel}></BackDrop>
                <div className={classes.Modal} style={{
                    transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity: this.props.show ? '1' : '0'
                }}>
                    {this.props.children}
                </div>
            </Aux >
        )
    }
}

export default Modal;