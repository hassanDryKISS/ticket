import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Row, Col, Form, Select, Input, Button, Card } from 'antd';
import messages from './messages';

import { Wrapper } from './style';

const { Option } = Select;

function SubscribeForUpdate(props) {
  const { getFieldDecorator } = props.form;


  const handleSelectChange = value => {
    console.log(value);
    props.form.setFieldsValue({
      note: `Hi, ${value === 'male' ? 'man' : 'lady'}!`,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }
  return (
    <Wrapper>
      <Card title='SUBSCRIBE FOR UPDATES'>
        <Form onSubmit={handleSubmit}>
          <Form.Item >
            {getFieldDecorator('fullname', {
              rules: [{ required: true, message: 'Please input your name!' }],
            })(<Input placeholder='Fullname' />)}
          </Form.Item>
          <Form.Item >
            {getFieldDecorator('gender', {
              rules: [{ required: true, message: `${<FormattedMessage {...messages.placeHolderSelectBox} />}` }],
            })(
              <Select
                placeholder="Select State "
                onChange={handleSelectChange}
              >
                <Option value="state">State</Option>
              </Select>,
            )}
          </Form.Item>
          <Form.Item >
            {getFieldDecorator('email', {
              rules: [{ required: true, message: 'Please input your email!' }],
            })(<Input placeholder='Email Address' />)}
          </Form.Item>
          <Form.Item >
            <Button block type="primary" htmlType="submit">
             SUBSCRIBE
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </Wrapper>
  );
}

SubscribeForUpdate.propTypes = {
  form: PropTypes.any,
};

export default Form.create({ name: 'SubscribeForUpdate' })(SubscribeForUpdate);
