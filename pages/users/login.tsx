import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { HomeTwoTone } from '@ant-design/icons';
import RequestAuth from './request';
import { Form, Input, Button, Checkbox } from 'antd';
import { MailOutlined, UserOutlined, LockOutlined } from '@ant-design/icons';
import { auth } from '../../firebase';

interface PropsLogin {
  changeAuthPage: (data: string) => void;
}

const Login: React.FC<PropsLogin> = ({ changeAuthPage }) => {
  const router = useRouter();
  const [form] = Form.useForm();
  const handleClick = (data: string) => {
    changeAuthPage(data);
  };

  const onReset = () => {
    form.resetFields();
  };

  const onFinish = (values: any) => {
    const { email, password } = values;
    auth.signInWithEmailAndPassword(email, password).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(`${errorMessage} - ${errorCode}`);
    });
    console.log('Received values of form: ', values);
  };

  return (
    <>
      <main>
        <div>
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{ remember: true }}
            onFinish={onFinish}
          >
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
