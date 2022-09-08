import React, { useContext } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
import { withFireBase } from '../../utils/firebase/index';
import { compose } from 'recompose';
import { SignUpLink } from "./signUp";
import { Button, Form, Input, Row, Col, Divider } from 'antd';
import { fetchUser } from '../../api/accounts/user';
import useLocalStorage from '../../hooks/useLocalStorage';

const SignInPage = () => {
    return (
        <Row className='page-container-row'>
            <Col span={18}>
                <section className='sign-in-page'>
                    <div>
                        <h2>Sign In</h2>
                        <Divider />
                    </div>
                    <SignInForm/>
                    <SignUpLink/>
                </section>
            </Col>
        </Row>
    )
}

const SignInFormBase = ({ firebase }) => {
    const [localUser, setLocalUser] = useLocalStorage('local_user');

    const onFinish = ({ email, password }) => {
        firebase.getSignInWithEmailAndPassword(email, password)
        .then(res => {
            const { user: { uid } } = res;
            const fetchedUser = fetchUser(uid);
            const setDBUser = async () => {
                const res = await fetchedUser;
                setLocalUser(res);
            }

            setDBUser();
            //navigate('/');
        })
        .catch(error => {
            console.error('error signing in...', error);
        });
    }

    return (
        <>
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
                    <Button type='primary' htmlType='submit'>Submit</Button>
                </Form.Item>
            </Form>
        </>
    )
}

const SignInForm = compose(withFireBase)(SignInFormBase)

export default SignInPage;
export { SignInForm };