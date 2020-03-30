import { checkUserAuthorized } from '../../utilities/Functions/SetupFunctions'
import { AnimatedWayPointDiv } from '../../utilities/components/AnimatedWayPoint'
import { signIn } from '../../utilities/Functions/SetupFunctions'
import AuthApis from '../../api/componentApi/AuthApis'
import * as Param from '../../redux/Param'
import { connect } from 'react-redux'
import * as React from 'react';
import {
  Form, Icon,
  Input, Button, Typography,
  Tabs,
} from 'antd';
const { TabPane } = Tabs;



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

  handleSubmitLogin = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      const { username, password } = values;
      if (!err.username && !err.pass ) {
        this.authServices.login({signfactor: username, password}, (response) => {
          signIn(response.data.token, response.data.user)
        })
      }
    });
  };
  handleSubmitRegister = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      const { emailRegister, cell, fullname, passwordRegister } = values;
      if (!err.emailRegister && !err.cell && !err.fullname && !err.passwordRegister) {
        this.authServices.register({ cell, fullname, email: emailRegister, password: passwordRegister}, (response) => {
          signIn(response.data.token, response.data.user)
        })
      }
    });
  };

  renderLoginHtml = () => {
    const { getFieldDecorator } = this.props.form
    return <Form onSubmit={this.handleSubmitLogin} className="login-form">
      <Form.Item>
        {getFieldDecorator('username', {
          rules: [{ required: true, message: 'Please input your User Name!' }],
        })(
          <Input
            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder="User Name"
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
  }
  renderRegisterHtml = () => {
    const { getFieldDecorator } = this.props.form
    return <Form onSubmit={this.handleSubmitRegister} className="login-form">
      <Form.Item>
        {getFieldDecorator('fullname', {
          rules: [{ required: true, message: 'Please input your Full Name!' }],
        })(
          <Input
            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder="Full Name"
          />,
        )}
      </Form.Item>
      <Form.Item>
        {getFieldDecorator('cell', {
          rules: [{ required: true, message: 'Please input your Cell!' }],
        })(
          <Input
            prefix={<Icon type="phone" style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder="Cell"
          />,
        )}
      </Form.Item>
      <Form.Item>
        {getFieldDecorator('emailRegister', {
          rules: [{ required: true, message: 'Please input your email!' }],
        })(
          <Input
            prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder="Email"
          />,
        )}
      </Form.Item>
      <Form.Item>
        {getFieldDecorator('passwordRegister', {
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
          {'Register'}
        </Button>
      </Form.Item>
    </Form>
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="login-page-container">
        <AnimatedWayPointDiv className="login-form-container">
          <Title level={4} style={{ color: '#2490ff', textAlign: 'center', marginBottom: 40 }}>LOGIN / REGISTER</Title>


          <Tabs defaultActiveKey="2" size='large' style={{ textAlign: 'center' }} >
            <TabPane tab="Login" key="1">
              {this.renderLoginHtml()}

            </TabPane>
            <TabPane tab="Register" key="2">
              {this.renderRegisterHtml()}
            </TabPane>
          </Tabs>
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
