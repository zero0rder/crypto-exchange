import React, { useContext } from 'react';
import { /*useNavigate,*/ Link } from 'react-router-dom';
import { withFireBase } from '../../utils/firebase/index';
import { compose } from 'recompose';
import { Button, Form, Input, Row, Col, Divider } from 'antd';
import { createUser } from '../../api/accounts/user';
import useLocalStorage from '../../hooks/useLocalStorage';

const SignUpPage = () => {
    return (
        <Row className='page-container-row'>
            <Col span={18}>
                <section className='sign-up-page'>
                    <div>
                        <h2>Sign Up</h2>
                        <Divider />
                    </div>
                    <SignUpForm /> 
                </section>
            </Col>
        </Row>
    )
}

const SignUpFormBase = ({ firebase }) => {
    const [localUser, setLocalUser ] = useLocalStorage('local_user');
    // const navigate = useNavigate();
    
    const onFinish = ({ email, password, firstName, lastName }) => {
        firebase.getCreateUserWithEmailAndPassword(email, password)
        .then(res => {
            const { user: { uid } } = res;
            const newAuthUser = {
                auth_id: uid,
                first_name: firstName,
                last_name: lastName,
                email: email,
                purchases: [],
                balance: 100000.00
            };
            
            const createDBUser = createUser(newAuthUser);
            const getDBUser = async () => {
                const res = await createDBUser;
                setLocalUser(res);
            }

            getDBUser();
            // navigate('/');
        })
        .catch(error => {
            console.error('error signing up...', error);
            // navigate('/notFound', { state: error });
        });
    }

    return (
        <Form
            name='sign-in'
            labelCol={{span: 4,}}
            wrapperCol={{span: 16,}}
            initialValues={{remember: true,}}
            onFinish={onFinish}
            autoComplete='off'
            className='sign-up-form'>
            <Form.Item
                label='First Name'
                name='firstName'
                rules={[{
                required: true,
                message: 'Please input your first name!',
                type: 'first_name'
            }]}>
                <Input />
           </Form.Item>
            <Form.Item
                label='Last Name'
                name='lastName'
                rules={[{
                required: true,
                message: 'Please input your last name!',
                type: 'last_name'
            }]}>
                <Input />
           </Form.Item>
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
    )

}

const SignUpForm = compose(withFireBase)(SignUpFormBase);
const SignUpLink = () => <div className='sign-up-link'><span>Don't have an account? <Link to='/signup'>Sign Up</Link></span></div>;

export default SignUpPage;
export { SignUpLink }