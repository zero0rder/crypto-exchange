import React from 'react';
// import { useNavigate } from 'react-router-dom';
import { withFireBase } from '../../utils/firebase/index';
import useLocalStorage from '../../hooks/useLocalStorage';
import { Button } from 'antd';
import { compose } from 'recompose';

const SignOutBase = ({ firebase }) => {
    const [localUser, setLocalUser ] = useLocalStorage('local_user', '');
    // const navigate = useNavigate();

    const signOutHandler = () => {
        firebase.doSignOut();
        setLocalUser('');
        // navigate('/');
    }

    return <Button type='primary' onClick={() => signOutHandler()}>Sign Out</Button>;
}

const SignOut = compose(withFireBase)(SignOutBase);

export default SignOut;