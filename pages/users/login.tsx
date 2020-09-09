import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Form, Input, Button, Checkbox, Modal } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import { auth } from '../../firebase';
import { checkRef } from '../../firebase';

interface PropsLogin {
  changeAuthPage: (data: string) => void;
  changeRole: (data: string) => void;
  changeAuthorization: () => void;
}

const Login: React.FC<PropsLogin> = ({ changeAuthPage, changeRole, changeAuthorization }) => {
  const router = useRouter();
  const [notify, setNotification] = useState('');
  const [visible, setVisible] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [form] = Form.useForm();

  const handleClick = (data: string) => {
    changeAuthPage(data);
  };

  const onReset = () => {
    form.resetFields();
  };

  const onFinish = (values: any) => {
    const { email, password } = values;
    setUserEmail(email);
    auth.signInWithEmailAndPassword(email, password).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      setNotification(`${errorMessage} - ${errorCode}`);
      setVisible(true);
      console.error(`${errorMessage} - ${errorCode}`);
    });
    console.log('Received values of form: ', values);
  };

  const isSubscribe = auth.onAuthStateChanged((user) => {
    if (user) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  });

  useEffect((): (() => void) => {
    if (loggedIn && isSubscribe) {
      goToMainPage();
    }
    return () => isSubscribe();
  }, [loggedIn]);

  const onCancel = () => {
    setVisible(false);
    setNotification('');
  };

  const goToMainPage = () => {
    let role = '';
    checkRef.on('value', (snapshot) => {
      const users = snapshot.val();
      for (let key in users) {
        if (users[key].email === userEmail) {
          role = users[key].roles[0];
          changeRole(role);
          changeAuthorization();
        }
      }
    });
  };

  return (
    <>
      <main>
        <div>
          <Form
            name="normal_login"
            form={form}
            className="login-form"
            initialValues={{ remember: true }}
            onFinish={onFinish}
          >
            {
              <Modal visible={visible} title="Error!" onOk={onCancel} onCancel={onCancel}>
                {notify}
              </Modal>
            }
            <img
              className="login-image"
              src="/static/images/logo-rs-school.svg"
              alt="RS School Logo"
            />

            <Form.Item
              name="email"
              rules={[
                {
                  type: 'email',
                  message: 'The input is not valid E-mail!',
                },
                {
                  required: true,
                  message: 'Please input your E-mail!',
                },
              ]}
            >
              <Input
                prefix={<MailOutlined className="site-form-item-icon" />}
                placeholder="Email"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: 'Please input your Password!' }]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>

              <a className="login-form-forgot" href="">
                Forgot password
              </a>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button">
                Log in
              </Button>
              <Button htmlType="button" onClick={onReset}>
                Reset
              </Button>
              <p className={'register__now_text'}>
                Or <a onClick={() => handleClick('register')}>register now!</a>
              </p>
            </Form.Item>
          </Form>
        </div>
      </main>
    </>
  );
};

export default Login;
