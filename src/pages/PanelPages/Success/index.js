
import { Result, Button, Descriptions } from 'antd';
import { Link } from 'react-router-dom'
import * as React from 'react';







class SuccessPage extends React.Component {
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
      
      


        render() {
    return (<>
          <Result
            status="success"
            title="با سلام،
            ایمیل رزرو تا ۲۴ ساعت آینده برای شما ارسال خواهد شد. صندلیهای مورد نظر شما برای مدت ۷۲ ساعت رزرو شد. برای پرداخت با شما تماس گرفته خواهد شد.
            رزرو انجام شده به منزله خرید قطعی بلیت شما نمی‌باشد و تا پرداخت صورت نگیرد بعد از ۳ روز این صندلی‌ها جهت خریداری دیگران در دسترس قرار خواهند گرفت."
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
    
    
    export default SuccessPage
