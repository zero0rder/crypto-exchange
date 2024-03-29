import React from 'react';

const FirebaseContext = React.createContext(null);

//HOC: returns a component with firebase support
export const withFireBase = Component => props => (
    <FirebaseContext.Consumer>
        { firebase => <Component {...props} firebase={firebase}/> }
    </FirebaseContext.Consumer>
);

export default FirebaseContext;