import React from 'react'
import { useNavigate } from 'react-router-dom'
import { withFireBase } from '../../utils/firebase/index'
import useLocalStorage from '../../hooks/useLocalStorage'
import { Button } from 'antd'
import { compose } from 'recompose'

const SignOutBase = ({ firebase }) => {
    // eslint-disable-next-line
    const [localUser, setLocalUser ] = useLocalStorage('local_user')
    const navigate = useNavigate()

    const signOutHandler = () => {
        setLocalUser('')
        firebase.doSignOut()
        navigate('/signin')
    }

    return <Button type='primary' shape='round' onClick={() => signOutHandler()}>Sign Out</Button>
}

const SignOut = compose(withFireBase)(SignOutBase)
export default SignOut