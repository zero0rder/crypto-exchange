import React from 'react';
import { AuthUserContext } from './index';
import { withFireBase } from '../firebase/index';

const withAuth = Component => {

    class WithAuth extends React.Component {
        constructor(props){
            super(props);
            this.state = {
                authUser: null
            };
        }

        //This observer gets called whenever the user's sign-in state changes
        componentDidMount(){
            this.props?.firebase?.getOnAuthStateChanged(user => user ? this.setState({ authUser: user.uid }) : this.setState({ authUser: null }));
        }

        // componentWillUnmount(){}

        render (){
            return (
                <AuthUserContext.Provider value={this.state.authUser}>
                    <Component {...this.props} /> 
                </AuthUserContext.Provider>
            )
        }
    }

    return withFireBase(WithAuth);
}

export default withAuth;