import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

// import { FormattedMessage } from 'react-intl';
// import messages from './messages';
import { Modal, Form, Input, Button, Tabs } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons';
import request from '../../utils/request';
import { Wrapper } from './style';
// import BannerRight from '../../images/banner/banner.png';
const { TabPane } = Tabs;

function Login(props) {
  const { visible, cancel } = props;

  const {
    getFieldDecorator,
    validateFields
  } = props.form;

  const handleLogin = (value) => {
    const { username, password } = value;
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    const url = "https://vision-idea.com/backend/events/user/signin";
    request
      .post(proxyurl + url, { signfactor: username, password })
      .then(res => {
        // eslint-disable-next-line no-console
        console.log(res)
      })
      // eslint-disable-next-line no-console
      .catch(_ => console.log(_));

  }
  const handleRegister = (value) => {
    const { email, password, cell } = value;
    const proxyurl = "https://cors-anywhere.herokuapp.com/";

    const url = "https://vision-idea.com/backend/events/user/signup";
    request
      .post(proxyurl + url, {cell, email,password})
      .then(res => {
        console.log(res)
      })
      .catch(_ => console.log(_));

  }

  const handleSubmitLogin = e => {
    e.preventDefault();
    validateFields((err, values) => {
      console.log(values)
      if (!err) {
        handleLogin(values)
      }
    });
  };

  const handleSubmitRegister = e => {
    e.preventDefault();
    validateFields((err, values) => {
      // eslint-disable-next-line no-console
      console.log(values)
      if (!err) {
        handleRegister(values)
      }
    });
  };

  const renderLoginHtml = () => (
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{
        remember: true,
      }}
      onSubmit={handleSubmitLogin}
    >

      <Form.Item >
        {getFieldDecorator('username', {
          rules: [{ required: true, message: 'Please input your Username!' }],

        })(
          <Input
            style={{ width: '100%' }}
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Username"
          />,
        )}
      </Form.Item>
      <Form.Item >
        {getFieldDecorator('password', {
          rules: [{ required: true, message: 'Please input your Password!' }],

        })(
          <Input
            style={{ width: '100%' }}
            prefix={<LockOutlined className="site-form-item-icon" />}
            placeholder="Password"
            type="password"
          />,
        )}
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Log in
        </Button>
      </Form.Item>
    </Form>
  )

  const renderRegisterHtml = () => (
    <Form
      name="register"
      className="login-form"
      onSubmit={handleSubmitRegister}
    >

      <Form.Item >
        {getFieldDecorator('email', {
          rules: [{ required: true, message: 'Please input your email!' }],

        })(
          <Input
            style={{ width: '100%' }}
            prefix={<MailOutlined className="site-form-item-icon" />}
            placeholder="Email"
          />,
        )}
      </Form.Item>
      <Form.Item >
        {getFieldDecorator('cell', {
          rules: [{ required: true, message: 'Please input your cell!' }],

        })(
          <Input
            style={{ width: '100%' }}
            prefix={<PhoneOutlined className="site-form-item-icon" />}
            placeholder="Cell phone"
          />,
        )}
      </Form.Item>
      <Form.Item >
        {getFieldDecorator('password', {
          rules: [{ required: true, message: 'Please input your Password!' }],

        })(
          <Input
            style={{ width: '100%' }}
            prefix={<LockOutlined className="site-form-item-icon" />}
            placeholder="Password"
            type="password"
          />,
        )}
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Sign Up
        </Button>
      </Form.Item>
    </Form>
  )


  return (
    <Wrapper>
      <Modal
        title="Login"
        style={{ top: 20 }}
        // visible={this.state.modal1Visible}
        visible={visible}
        // onOk={() => this.setModal1Visible(false)}
        onCancel={() => cancel()}
      >
        <Tabs defaultActiveKey="1" size='large' >
          <TabPane tab="Login" key="1">
            {renderLoginHtml()}

          </TabPane>
          <TabPane tab="Register" key="2">
            {renderRegisterHtml()}
          </TabPane>
        </Tabs>
      </Modal>
    </Wrapper>
  );
}

Login.propTypes = {
  visible: PropTypes.bool,
  cancel: PropTypes.func,
  form: PropTypes.any,
};

export default Form.create()(Login);
