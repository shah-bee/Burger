import React, { Component } from 'react';
import Aux from '../Auxilary/Taher';
import Modal from '../../components/UI/Modal/Modal';

const withErrorHandler = (WrappedComponent, axios) => {

    return class extends Component {

        state = {
            error: null
        }

        componentDidMount() {
            axios.interceptors.request.use(req => {
                this.setState({
                    error: null
                });
                return req;

            });

            axios.interceptors.response.use(res => res, err => {
                this.setState({
                    error: err.message
                });
            }
            );
        }

        errorModalHandle = () => {
            this.setState({
                error: null
            });

        }


        render() {

            return (
                <Aux>
                    <Modal show={this.state.error} cancel={this.errorModalHandle}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props}></WrappedComponent>
                </Aux>
            )
        }
    }
}

export default withErrorHandler;