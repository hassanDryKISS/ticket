
import { AnimatedWayPointDiv } from '../../../utilities/components/AnimatedWayPoint'
import {
  Breadcrumb, Spin, Row, Col,
  Descriptions, Typography,
  Card, Modal, Steps,
  Button, message, Form, Input, Radio
} from 'antd';

import queryString from 'query-string'
import EventApis from '../../../api/componentApi/EventApis'
import HomesApis from '../../../api/componentApi/HomeApis'

import { Link } from 'react-router-dom'
import * as Param from '../../../redux/Param'
import { connect } from 'react-redux'
import * as React from 'react';
import store from "../../../redux/store";
import { setParam } from '../../../redux/actions'
// import SeatPicker from 'react-seat-picker'
import SeatPicker from '../../../utilities/components/SeatPicker'

const { Title } = Typography;
const { Step } = Steps;



class EventPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentStep: 0,
      showSelectSeatModal: false,
      titleSeatModal: '',
      loading: false,
      rows: [
        [

        ],

      ],
      eventInfo: [],
      eventMoreInfo: {
        name: '',
        hall: {
          name: '',
          description: ''
        }
      },
      selectSeatsId: [],
      fields: [],
      bookInfo: {}

    };
    this.EventServices = new EventApis()
    this.HomeServices = new HomesApis()
    this.steps = [
      {
        title: 'First',
        content: 'this.renderStepFirs(this.state)',
        description: "This is a description."
      },
      {
        title: 'Second',
        content: 'Second-content',
      },
      {
        title: 'Last',
        content: 'Last-content',
      },
    ];
  }
  renderStepFirs = (state) => {
    return <>{state.loading ? <div className="loading-box"><Spin size="large" /></div> : <>
      <div className="guide">
        {/* <h5>Colors guide:</h5> */}
        <ul>
          <li>
            <span className="box selected"></span>
            <span className="means">Selected</span>
          </li>
          <li>
            <span className="box available"></span>
            <span className="means">Available</span>
          </li>
          <li>
            <span className="box unavailable"></span>
            <span className="means" >Being booked</span>
          </li>
          <li>
            <span className="box book "></span>
            <span className="means">Not Available</span>
          </li>
        </ul>
      </div>

      <SeatPicker rows={state.rows}
        addSeat={(e) => this.selectSeat(e)}
        removeSeat={(e) => this.selectSeat(e)} />
      <div className="info-box">
        <span></span>
      </div>

    </>}</>
  }

  renderStepSecond = (state) => {
    const { getFieldDecorator } = this.props.form;
    return <>
      <Form >
        User Information
        <Row gutter={[8]}>
          <Col xs={24} sm={12}>
            <Form.Item
              label={'Full Name'}
            >
              {getFieldDecorator('fullname', {
                rules: [{ required: true, message: 'Please input Full Name' }],
              })(
                <Input
                  placeholder="Full Name"
                />,
              )}
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item
              label={'Email Address'}
            >
              {getFieldDecorator('email', {
                rules: [{ required: true, message: 'Please input Email' }],
              })(
                <Input
                  placeholder="Email"
                />,
              )}
            </Form.Item>
          </Col>
          {this.renderFelids(state.fields)}
        </Row>


        {/* <Form.Item>
          <Button loading={this.props.loading_api} type="primary" htmlType="submit" className="login-form-button">
            {'Create Creditor'}
          </Button>
        </Form.Item> */}
      </Form>
    </>
  }

  renderFelids = (fields) => {
    const { getFieldDecorator } = this.props.form;
    return fields.map((item) => {
      return <>
        <Col xs={24} sm={12}>
          <Form.Item
            label={item.label}
          >
            {getFieldDecorator(`${item.name}`, {
              rules: [{ required: item.required, message: `Please input ${item.name}` }],
            })(
              <Input
                placeholder={`${item.name}`}
              />,
            )}
          </Form.Item>
        </Col>
      </>
    })

  }
  renderStepThree = () => {
    const { order_id, service_fee, currency,
      seats, payable_amount, total_price, extra_per_seat_price, total_price_label,
      credit, available_gateways, extra_per_seat_price_type, email_registered } = this.state.bookInfo
    return <>
      <Descriptions title="User Info">
        <Descriptions.Item label="Full Name">{}</Descriptions.Item>
        <Descriptions.Item label="Email">{}</Descriptions.Item>
        <Descriptions.Item label="Cell">{}</Descriptions.Item>
      </Descriptions>

      <Descriptions title="Performance Information">
        <Descriptions.Item label="Event">{}</Descriptions.Item>
        <Descriptions.Item label="Email">{}</Descriptions.Item>
        <Descriptions.Item label="Performance">{}</Descriptions.Item>
      </Descriptions>
      <Descriptions title="Ticket Information">
        {false && seats.map(seat => <Descriptions.Item label="">Position {seat.block}, Row {seat.row}, Seat number {seat.no}</Descriptions.Item>)}
      </Descriptions>
      <Descriptions title="Payment Information">
        Collective price:
      <Descriptions.Item label="Collective Price">{}</Descriptions.Item>
        <Descriptions.Item label="Amount Payable">{}</Descriptions.Item>

      </Descriptions>
      <Descriptions title="Select a payment gateway:">
        <Radio.Group onChange={this.onChange} defaultValue="a">
          {false && available_gateways.map(gateway => <Radio.Button value={gateway.gateway}>{gateway.name}</Radio.Button>)}
          <Radio.Button value="a">رزرو بلیت   </Radio.Button>
        </Radio.Group>
      </Descriptions>
    </>
  }
  onChange = (e) => {
    console.log(`radio checked:${e.target.value}`);
  }
  componentDidMount() {
    this.getEventInfo();
    this.getFieldsInfo();
    if (this.props.events) {
      this.setState({
        eventMoreInfo: this.props.events.filter((item) => item.id === this.props.match.params.id)[0]
      })
    } else {
      this.getEventsList()
    }
  }



  next = () => {
    console.log('next ')
    if (this.state.currentStep === 1) {
      this.props.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          this.createNewOrder(values)
          // this.EventServices.create(values, (response) => {
          //   this.props.form.setFieldsValue({
          //     name: '',
          //   });
          //   this.props.success()
          // })
        }
      });
    }
    const currentStep = this.state.currentStep + 1;
    this.setState({ currentStep });
  }

  prev = () => {
    if (this.state.currentStep === 0) {
      this.setState({ showSelectSeatModal: false })
    } else {
      const currentStep = this.state.currentStep - 1;
      this.setState({ currentStep });
    }
  }
  createNewOrder = (values) => {
    const { id } = this.props.match.params
    var body = new FormData();
    body.append("performance_id", id)
    let custom_fields = {}
    this.state.fields.map(field => {
      return custom_fields[`${field.name}`] = `${values[field.name]}`
    })
    body.append("custom_fields", JSON.stringify(custom_fields));
    body.append("fullname", values.fullname)
    body.append("email", values.email)
    body.append("order_id", '')
    this.EventServices.create(`orders/new`, body, (response) => {
      this.setState({ bookInfo: response.data })
      console.log(response)
    })


  }

  getEventsList = () => {
    this.HomeServices.get({
    }, (response) => {
      this.setState({ eventMoreInfo: response.data.filter((item) => item.id === this.props.match.params.id)[0] })
      store.dispatch(setParam(Param.EVENTS, response.data))
    })
  }


  getEventInfo = () => {
    const { id, hallId } = this.props.match.params
    this.EventServices.get(`events/hall/${hallId}/${id}`, {}, (response) => {
      this.setState({ eventInfo: response.data })
    })
  }
  getFieldsInfo = () => {
    const { id } = this.props.match.params
    this.EventServices.get(`events/event/${id}/fields`, {}, (response) => {
      this.setState({ fields: response.data })
    })
  }

  getSeatInfo = (blockSeatId) => {
    const { id } = this.props.match.params;
    let rows = [];
    this.setState({ loading: true })
    this.EventServices.get(`events/performance/${id}/${blockSeatId}/seat-info?no-cache=true`, {}, (response) => {
      // { id: 1, number: 1, isSelected: true, tooltip: 'Reserved by you' }
      Object.keys(response.data).map((item, index) => {
        const i = item.split(`${blockSeatId}-`)[1].split('-')[0] - 1;
        const j = item.split(`${blockSeatId}-`)[1].split('-')[1] - 1;
        const { s, p, c } = response.data[item]
        if (!Array.isArray(rows[i])) {
          rows[i] = []
        }
        return rows[i][j] = { id: item, number: j + 1, isSelected: true, state: s, price: p, currency: c }
      })
      return this.setState({ rows: rows, loading: false })

    }, true)
  }
  renderBlock = (setMap) => {
    return Object.keys(setMap.map).map((item, index) => {
      if (setMap.map[item].name !== 'VIP') {
        return <div className="block" key={index} onClick={() => this.handleSelectBlock(setMap.map[item], item)}> {setMap.map[item].name}</div>
      }
      return ''
    })
  }
  renderVip = (setMap) => {
    return Object.keys(setMap.map).map((item, index) => {
      if (setMap.map[item].name === 'VIP') {
        return <div className="vip" key={index} onClick={() => this.handleSelectBlock(setMap.map[item], item)}> {setMap.map[item].name}</div>
      }
      return ''
    })
  }
  handleSelectBlock = (selectItem, blockSeatId) => {
    this.getSeatInfo(blockSeatId)
    this.setState({
      showSelectSeatModal: true,
      titleSeatModal: selectItem.name,
    })
  }
  selectSeat = (selectSeats) => {
    // https://vision-idea.com/backend/events/performance/homayoon-live-2020/lock/seats
    let selectId = this.state.selectSeatsId;
    selectId.push(JSON.parse(selectSeats).id);
    this.setState({
      selectSeatsId: selectId
    }, () => this.handleLockSeat(this.state.selectSeatsId))
  }

  handleLockSeat = (seatsId) => {
    const { id } = this.props.match.params;
    var body = new FormData();
    seatsId.map(id => {
      return body.append("seats[]", id);
    })
    this.EventServices.create(`events/performance/${id}/lock/seats`, body, (response) => {
      // this.setState({ eventInfo: response.data })
    })

  }


  render() {
    const { loading_api } = this.props;
    const { eventInfo, eventMoreInfo, titleSeatModal, showSelectSeatModal, rows, loading, currentStep } = this.state;
    return (<AnimatedWayPointDiv>
      <Breadcrumb>
        <Breadcrumb.Item href="/">
          Home
        </Breadcrumb.Item>
        <Breadcrumb.Item>Event</Breadcrumb.Item>
        {/* <Breadcrumb.Item> <Title>{eventMoreInfo.name}</Title></Breadcrumb.Item> */}
      </Breadcrumb>
      <Title>{eventMoreInfo.name}</Title>
      {loading_api ? (<div className="spin-box">
        <Spin size="large" spinning={loading_api} />
      </div>) : (<Row gutter={[16, 16]}>
        <Col xs={24} sm={16}>
          {/* <SeatPicker rows={rows} /> */}
          {eventMoreInfo && eventMoreInfo.hall && eventMoreInfo.hall.extra_info && <Card title="Seat Select" className="seat-map" loading={loading_api}>
            <div className="stage">Stage</div>
            {this.renderVip(eventMoreInfo.hall.extra_info)}
            <div className="block-box">
              {this.renderBlock(eventMoreInfo.hall.extra_info)}
            </div>
          </Card>}
        </Col>
        <Col xs={24} sm={8}>
          <Descriptions bordered layout='vertical' style={{ marginTop: '5px' }}>
            <Descriptions.Item label="Name" span={3}>{eventMoreInfo && eventMoreInfo.hall && eventMoreInfo.hall.name}</Descriptions.Item>
            <Descriptions.Item label="Date" span={3}>{eventMoreInfo && eventMoreInfo.dates && eventMoreInfo.dates[0].localized_date}</Descriptions.Item>
            <Descriptions.Item label="Time" span={3}>{eventMoreInfo && eventMoreInfo.dates && eventMoreInfo.dates[0].localized_doors_opening_date}</Descriptions.Item>
            <Descriptions.Item label="Address" span={3}>{eventInfo.address}</Descriptions.Item>
            <Descriptions.Item label="Locations" span={3}>{eventMoreInfo && eventMoreInfo.hall &&
              <a href={eventMoreInfo.hall.map_url} target="blank">
                <div className="img-box" style={{ background: `url('${eventMoreInfo.hall.map_image}') center center` }}></div>
              </a>
            }</Descriptions.Item>
          </Descriptions>
        </Col>
      </Row>)
      }
      <Modal
        width='915px'
        title={titleSeatModal}
        loading={loading}
        visible={showSelectSeatModal}
        onOk={() => this.next()}
        onCancel={() => this.setState({ showSelectSeatModal: false })}
        footer={[
          <Button key="back" onClick={this.prev}>
            {currentStep === 0 ? 'Cancel' : 'Back'}
          </Button>,
          <Button key="submit" type="primary" loading={loading} onClick={this.next}>
            Submit
          </Button>,
        ]}
      >

        <Steps current={this.state.currentStep}>
          {this.steps.map(item => (
            <Step key={item.title} title={item.title} description={item.description} />
          ))}
        </Steps>

        <div className="steps-content">
          {(currentStep === 0) && this.renderStepFirs(this.state)}
          {(currentStep === 1) && this.renderStepSecond(this.state)}
          {(currentStep === 2) && this.renderStepThree()}
        </div>
        {/* {rows.length > 2 && <SeatPicker rows={rows} />} */}
      </Modal>
    </AnimatedWayPointDiv>
    );
  }
}



const mapDispatchToProps = (dispatch) => {
  return {
    dispatch: dispatch
  }
}
const mapStateToProps = (state) => ({
  loading_api: state.param[Param.LOADING_API],
  events: state.param[Param.EVENTS]
});


const WrappedCreateForm = Form.create({ name: 'user-information' })(connect(mapStateToProps, mapDispatchToProps)(EventPage));

export default WrappedCreateForm
