import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { withFireBase } from '../../utils/firebase/index'
import { fetchUser } from '../../api/accounts/user'
import { compose } from 'recompose'
import { SignUpLink } from "./signUp"
import useLocalStorage from '../../hooks/useLocalStorage'
import { Button, Form, Input, Row, Col, Divider } from 'antd'
import { GoogleOutlined } from '@ant-design/icons'

const SignInPage = () => {
    return (
        <Row className='page-container-row'>
            <Col span={18}>
                <section className='sign-in-page'>
                    <SignInForm/>
                    <SignUpLink/>
                </section>
            </Col>
        </Row>
    )
}

const SignInFormBase = ({ firebase }) => {
    const [localUser, setLocalUser] = useLocalStorage('local_user')
    const navigate = useNavigate()
    let userId = null

    const { refetch } = useQuery(['getUser', userId], () => fetchUser(userId), { 
        enabled: false, 
        onSuccess: (data) => {
            setLocalUser(() => data)
            navigate('/')
        }, 
        onError: (error) => {
            console.error('error fetching user...', error)
        }
    })

    const onFinish = ({ email, password }) => {
        firebase.getSignInWithEmailAndPassword(email, password)
        .then(res => {
            const { user: { uid } } = res
            userId = uid
            refetch()
        })
        .catch(error => {
            console.error('error signing in...', error)
        })
    }

    const openGooglePopup = () => firebase.getSignInWithPopup().then((user) => {
        userId = user.uid
        refetch()
    })

    return (
        <>
            <div className='google-signin'>
                <Button type='primary' shape='round' size='large' 
                onClick={() => openGooglePopup()}><GoogleOutlined />Sign in with Google</Button>
            </div>
            <Divider>Or Email</Divider>
            <Form
                name='sign-in'
                labelCol={{span: 4,}}
                wrapperCol={{span: 16,}}
                initialValues={{remember: true,}}
                onFinish={onFinish}
                autoComplete='off'
                className='sign-in-form'>
                <Form.Item
                    label='Email'
                    name='email'
                    rules={[{
                    required: true,
                    message: 'Please input your email!',
                    type: 'email'
                }]}>
                    <Input />
                </Form.Item>
                <Form.Item
                    label='Password'
                    name='password'
                    rules={[{
                    required: true,
                    message: 'Please input your password!',
                    type: 'password'
                }]}>
                    <Input.Password/>
                </Form.Item>
                <Form.Item
                    wrapperCol={{
                    span: 24,
                }}>
                    <Button type='primary' shape='round' htmlType='submit'>Submit</Button>
                </Form.Item>
            </Form>
        </>
    )
}

const SignInForm = compose(withFireBase)(SignInFormBase)
export default SignInPage
export { SignInForm }