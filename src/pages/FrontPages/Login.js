import { checkUserAuthorized } from '../../utilities/Functions/SetupFunctions'
import { AnimatedWayPointDiv } from '../../utilities/components/AnimatedWayPoint'
import { signIn } from '../../utilities/Functions/SetupFunctions'
import AuthApis from '../../api/componentApi/AuthApis'
import * as Param from '../../redux/Param'
import { connect } from 'react-redux'
import * as React from 'react';
import {
  Form, Icon,
  Input, Button, Typography
} from 'antd';


const { Title } = Typography;
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.authServices = new AuthApis()
  }

  componentDidMount() {
   // checkUserAuthorized(true)
    if (this.props.history.action === 'PUSH') {
      window.scroll({ top: 0, left: 0, behavior: 'smooth' })
    }
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.authServices.login(values, (response) => {
          signIn(response.data.token, response.data.user)
        })
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="login-page-container">
        <AnimatedWayPointDiv className="login-form-container">
          <Title level={4} style={{ color: '#2490ff', textAlign: 'center', marginBottom: 40 }}>TAX ADVISOR LOGIN</Title>
          <Form onSubmit={this.handleSubmit} className="login-form">
            <Form.Item>
              {getFieldDecorator('email', {
                rules: [{ required: true, message: 'Please input your email!' }],
              })(
                <Input
                  prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="Email"
                />,
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: 'Please input your Password!' }],
              })(
                <Input
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  type="password"
                  placeholder="Password"
                />,
              )}
            </Form.Item>
            <Form.Item>
              <Button loading={this.props.loading_api} type="primary" htmlType="submit" className="login-form-button">
                {'Log in'}
              </Button>
            </Form.Item>
          </Form>
        </AnimatedWayPointDiv>
      </div>
    );
  }
}
const WrappedNormalLoginForm = Form.create({ name: 'login' })(Login);


const mapDispatchToProps = (dispatch) => {
  return {
    dispatch: dispatch
  }
}
const mapStateToProps = (state) => ({
  loading_api: state.param[Param.LOADING_API]
});

export default connect(mapStateToProps, mapDispatchToProps)(WrappedNormalLoginForm)
