
import { Result, Button, Descriptions } from 'antd';
import { Link } from 'react-router-dom'
import * as React from 'react';







class FailBook extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  returnInfo = () => {
    const { fullname, email, orderId } = this.props.match.params
    return <>
      <Descriptions bordered title="Ticket Info" size='small'>
        <Descriptions.Item label="Order Id">{orderId}</Descriptions.Item>
        <Descriptions.Item label="Full Name">{fullname}</Descriptions.Item>
        <Descriptions.Item label="Email">{email}</Descriptions.Item>
      </Descriptions>
    </>
  }


  componentDidMount() {
  }




  render() {
    return (<>
      <Result
        status="error"
        title="Get Ticket Fail :("
        subTitle={this.returnInfo()}
        extra={[
          <Button type="primary" >
            <Link to="/">
              HOME
                            </Link>
          </Button>,
          <Button key="buy">

            <Link to="/">
              Buy Again
                            </Link></Button>,
        ]} />
    </>
    );
  }
}


export default FailBook
