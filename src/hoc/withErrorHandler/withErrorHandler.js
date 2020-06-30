import React, { Component } from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Auxilliary/auxiliary';

const withErrorHandler = (WrappedComponent, axios) =>{
    return class extends Component {
        // constructor(props){
        //     super(props);
        //     this.state = {
        //         error: null
        //     };
        //     axios.interceptors.request.use(req => {
        //         this.setState( {error: null} );
        //         return req
        //     })
        //     axios.interceptors.response.use(res => res , error => {
        //         console.log(error);
        //         this.setState( {error: error} )
        //     });
        // }
    
        state = {
            error: null,
        }

        componentWillMount() {
            console.log(this);
            this.reqInterceptor = axios.interceptors.request.use(req => {
                this.setState( {error: null} );
                return req
            })
            this.resInterceptor = axios.interceptors.response.use(res => res , error => {
                console.log(error);
                this.setState( {error: error} )
            });
        }

        componentWillUnmount() {
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }

        errorConfirmedHanlder = () => {
            this.setState( {error: null} );
        }

        render() {
            return(
            <Aux>
                <Modal 
                    show={this.state.error} 
                    modalClosed={this.errorConfirmedHanlder} >
                    {this.state.error ? this.state.error.message : null}
                </Modal>
            <WrappedComponent {...this.props}/>
            </Aux>
            );
        }
    }
}

export default withErrorHandler;