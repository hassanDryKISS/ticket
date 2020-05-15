import React from 'react';
import PropTypes from 'prop-types';
import { Form, Select, Input, Button, Card, Typography } from 'antd';


const { Option } = Select;
const { Title } = Typography;


function SubscribeForUpdate(props) {
  const { getFieldDecorator } = props.form;


  const handleSelectChange = value => {
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
    <>
      <Card title={(<Title level={4} style={{marginBottom: 0}}>SUBSCRIBE FOR UPDATES</Title>)} style={{marginBottom:'10px'}} size="small">
        <Form onSubmit={handleSubmit}>
          <Form.Item >
            {getFieldDecorator('fullname', {
              rules: [{ required: true, message: 'Please input your name!' }],
            })(<Input placeholder='Fullname' />)}
          </Form.Item>
          <Form.Item >
            {getFieldDecorator('gender', {
              rules: [{ required: true, message: `error` }],
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
    </>
  );
}

SubscribeForUpdate.propTypes = {
  form: PropTypes.any,
};

export default Form.create({ name: 'SubscribeForUpdate' })(SubscribeForUpdate);
