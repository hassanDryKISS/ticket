
import { AnimatedWayPointDiv } from '../../../utilities/components/AnimatedWayPoint'
import {
  Breadcrumb, Spin, Row, Col,
  Descriptions, Typography,
  Card, Modal, Steps,
  Button, message, Form, Input, Radio 
} from 'antd';

import EventApis from '../../../api/componentApi/EventApis'
import HomesApis from '../../../api/componentApi/HomeApis'

import { Redirect } from 'react-router-dom'
import * as Param from '../../../redux/Param'
import { connect } from 'react-redux'
import * as React from 'react';
import store from "../../../redux/store";
import { setParam } from '../../../redux/actions'
// import SeatPicker from 'react-seat-picker'
import SeatPicker from '../../../utilities/components/SeatPicker'
import InfoTicket from './infoTicket'
import _ from 'lodash'
import SeatBlock from './seatBlock';
import SelectSeatsInfo from './selectSeatsInfo';

const { Title } = Typography;
const { Step } = Steps;



class EventPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentStep: 0,
      showSelectSeatModal: false,
      showBookProcess: false,
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
      blockSeatId: '',
      selectSeats: [],
      fields: [],
      bookInfo: {},
      userInfo: {
        custom_fields: { cell: '' }
      },
      gatewayoId: 1,
      isSuccess: false

    };
    this.EventServices = new EventApis()
    this.HomeServices = new HomesApis()
    this.steps = [
      {
        title: 'Select Seats',
        description: ""
      },
      {
        title: 'Enter User Info',
        description: "",
      },
      {
        title: 'Confirm',
        // description: "Select your desired seats"
      },
    ];

  }
  renderStepFirst = (state) => {
    return <>{state.loading ? <div className="loading-box"><Spin size="large" /></div> : <>
      Select your desired seats({state.titleSeatModal})
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
            <span className="box book"></span>
            <span className="means">Not Available</span>
          </li>
        </ul>
      </div>

      <SeatPicker
        rows={state.rows}
        selectSeats={state.selectSeats}
        addSeat={this.selectSeat}
        removeSeat={this.removeSeat} />
      <SelectSeatsInfo selectSeats={state.selectSeats} blockId={state.blockSeatId} removeSeat={this.removeSeat} />

    </>}</>
  }

  renderStepSecond = (state) => {
    const { getFieldDecorator } = this.props.form;
    return <>
      The seats you selected are now in reserved state and you have 15 minutes to fill in this form and take care of the payment process. After reserving your desired seats, you have 72 hours to pay the tickets
      <Form onSubmit={this.handleSubmit}>
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
      credit, available_gateways, extra_per_seat_price_type, email_registered } = this.state.bookInfo;
    const { eventMoreInfo, eventInfo } = this.state;
    const { dates } = eventMoreInfo;
    const { fullname, email, custom_fields: { cell } } = this.state.userInfo;
    return <>
      <Descriptions title="User Info">
        <Descriptions.Item label="Full Name">{fullname}</Descriptions.Item>
        <Descriptions.Item label="Email">{email}</Descriptions.Item>
        <Descriptions.Item label="Cell">{cell}</Descriptions.Item>
      </Descriptions>

      <Descriptions title="Performance Information">
        <Descriptions.Item label="Event">{eventMoreInfo.name}</Descriptions.Item>
        <Descriptions.Item label="Performance">{dates[0].localized_date} - {dates[0].localized_time} | {eventInfo.address}</Descriptions.Item>
      </Descriptions>
      <Descriptions title="Ticket Information">
        {seats && seats.map(seat => <Descriptions.Item label="">Position {seat.block}, Row {seat.row}, Seat number {seat.no}</Descriptions.Item>)}
      </Descriptions>
      <Descriptions title="Payment Information">
        Collective price:
    <Descriptions.Item label="Collective Price">{total_price_label} {currency}</Descriptions.Item>
        <Descriptions.Item label="Amount Payable">{payable_amount} {currency}</Descriptions.Item>

      </Descriptions>
      <Descriptions title="Select a payment gateway:">
      

      </Descriptions>
      <Radio.Group onChange={this.onChange} value={this.state.gatewayoId}>
          {available_gateways && available_gateways.map(gateway => <Radio.Button value={gateway.gateway}>{gateway.name}</Radio.Button>)}

        </Radio.Group>
    
    </>
  }
  onChange = (e) => {
  
    this.setState({
      gatewayoId: e.target.value
    })
  }
  scrollToTop = () => {
    window.document.body.scrollTop = 0;
    window.document.documentElement.scrollTop = 0;
  }
  componentDidMount() {

    this.scrollToTop()
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

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.createNewOrder(values)
        this.setState({ currentStep: this.state.currentStep + 1 })
      }
    });
  }

  handleConfirm = () => {
    this.approveTicket();
  }



  next = (e) => {
    if (this.state.currentStep === 1) { // Submit Step
      this.handleSubmit(e);
    } else if (this.state.currentStep === 2 && this.state.gatewayoId.length > 0) { // Confirm Step
      this.handleConfirm()

    } else {  // Select Seat Step
      const currentStep = this.state.currentStep + 1;
      this.setState({ currentStep }, () => {
        // switch (this.state.currentStep) {
        //   case 0:
        //     this.props.history.push('?select-seats')

        //     break;
        //   case 1:
        //     this.props.history.push('?&enter-user-info')
        //     break;
        //   case 2:
        //     this.props.history.push('?&confirm')

        //     // code block
        //     break;
        //   default:
        //   // code block
        // }
      })
    }

  }

  prev = () => {
    if (this.state.currentStep === 0) {
      this.setState({ showBookProcess: false, selectSeats: [] })
      this.scrollToTop()
    } else {
      const currentStep = this.state.currentStep - 1;
      this.setState({ currentStep });
    }
  }

  renderContentNext = () => {
    const { currentStep } = this.state;
    switch (currentStep) {
      case 0:
        return 'Next'
        break;
      case 1:
        return 'Submit'
        break;
      case 2:
        return 'Confirm'
        break;
      default:
      // code block
    }
  }

  renderContentPrev = () => {
    const { currentStep } = this.state;
    switch (currentStep) {
      case 0:
        return 'Cancel'
        break;
      case 1:
        return 'Change selected seats'
        break;
      case 2:
        return 'Change information'
        break;
      default:
      // code block
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
    this.setState({
      userInfo: {
        fullname: values.fullname,
        email: values.email,
        custom_fields,
      }
    })
    body.append("custom_fields", JSON.stringify(custom_fields));
    body.append("fullname", values.fullname)
    body.append("email", values.email)
    body.append("order_id", '')
    this.EventServices.create(`orders/new`, body, (response) => {
      this.setState({ bookInfo: response.data })
    })
  }
  approveTicket = () => {
    const { id } = this.props.match.params
    const { bookInfo: { order_id }, gatewayoId, userInfo } = this.state;

    var body = new FormData();
    body.append("gatewayo", gatewayoId)

    this.EventServices.create(`/orders/approve/${order_id}`, body, (response) => {
      // this.setState({ isSuccess: true})
      window.location.href = `/success/${userInfo.fullname}/${userInfo.email}/${order_id}`;
    }, (response) => {
      // this.setState({ isSuccess: true})
      window.location.href = `/error/${userInfo.fullname}/${userInfo.email}/${order_id}`;
    })
  }

  getEventsList = () => {
    this.HomeServices.get({
    }, (response) => {
      this.setState({ eventMoreInfo: response.data.filter((item) => item.id === this.props.match.params.id)[0] })
      store.dispatch(setParam(Param.EVENTS, response.data))
    })
  }

  getSeatInfo = (blockSeatId) => {
    this.scrollToTop()
    const { id } = this.props.match.params
    this.setState({ loading: true })
    this.EventServices.get(`events/performance/${id}/${blockSeatId}/seat-info?no-cache=true`, {}, (response) => {
      this.updateRows(blockSeatId, response.data)
    }, true)
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

  setRow = (blockSeatId, map, callback) => {
    const { rows, name } = map[blockSeatId]
    let newRows = [];
    rows.map(row => {
      const rowIndex = row.id.split(`${blockSeatId}-`)[1] - 1
      if (!Array.isArray(newRows[rowIndex])) {
        newRows[rowIndex] = []
      }
      row.seats.map((seat, index) => {
        if (_.isEmpty(seat)) { return newRows[rowIndex][index] = null }
        else { return newRows[rowIndex][index] = { id: seat.id, number: seat.name, state: 'default' } }
      })
      return newRows
    })
    this.setState({
      rows: newRows
    }, () => callback())

  }
  // NOT_AVAILABLE = 0
  //   AVAILABLE = 1
  //   BOOKING = 2
  //   BOOKED = 3
  //   BOOKED_BY_YOU = 4
  //   BOOKING_BY_YOU = 5
  //   RESERVED = 6
  updateRows = (blockSeatId, data) => {
    const { rows } = this.state
    let updateRows = rows
    Object.keys(data).map((seatId, ) => rows.map((row, rowIndex) => {
      for (let seatIndex = 0; seatIndex < row.length; seatIndex++) {
        if (row[seatIndex] && row[seatIndex].id === seatId) {
          const { p, s, c } = data[seatId]
          const { number, id } = row[seatIndex]
          updateRows[rowIndex][seatIndex] = { id, number, state: s, price: p, currency: c }
          if (s == 5) {
            this.setState({
              selectSeats: [...this.state.selectSeats, { id, number, state: s, price: p, currency: c }]
            })
          }
          break;
        }
      }

    }))
    this.setState({ rows: updateRows, loading: false })
  }

  selectSeat = (seat, callback) => {
    this.handleLockSeat(seat, () => {
      callback()
    })
  }
  removeSeat = (seat, callback) => {
    this.setState({
      selectSeats: this.state.selectSeats.filter(item => item.id !== seat.id) //remove select seat
    }, () => this.handleUnlockSeat(this.state.selectSeats, () => {
      callback()
    }))

  }



  handleUnlockSeat = (seats, callback) => {
    const { id } = this.props.match.params;
    const { selectSeats } = this.state;

    var body = new FormData();
    selectSeats.map(seat => {
      return body.append("seats[]", seat.id);
    })
    this.EventServices.create(`events/performance/${id}/lock/seats`, body, (response) => {

      callback()
    }, () => {
      this.setState({
        selectSeats: this.state.selectSeats.filter(item => item.id !== seats.id) //remove select seat
      })
    }, true)

  }



  handleLockSeat = (seats, callback) => {
    const { id } = this.props.match.params;
    const { selectSeats } = this.state;
    let selects = [];
    if (!selectSeats.find(seat => seat.id === seats.id)) {
      //selects = this.state.selectSeats;
      selects.push(seats);
      this.setState({
        selectSeats: [...this.state.selectSeats, ...selects]
      }, () => {

        var body = new FormData();
        this.state.selectSeats.map(seat => {
          return body.append("seats[]", seat.id);
        })
        this.EventServices.create(`events/performance/${id}/lock/seats`, body, (response) => {
          callback()
        }, () => {
          this.setState({
            selectSeats: this.state.selectSeats.filter(item => item.id !== seats.id) //remove select seat
          })
        }, true)
      })
    }

  }


  handleSelectBlock = (selectItem, blockSeatId) => {
    const { extra_info } = this.state.eventInfo
    this.setRow(blockSeatId, extra_info.map, () => this.getSeatInfo(blockSeatId))
    this.setState({
      showBookProcess: true,
      titleSeatModal: selectItem.name,
      blockSeatId,
    })
  }




  render() {
    const { loading_api } = this.props;
    const { eventInfo, eventMoreInfo, showBookProcess, loading, currentStep } = this.state;
    return (<>
      <Breadcrumb>
        <Breadcrumb.Item href="/">
          Home
        </Breadcrumb.Item>
        <Breadcrumb.Item onClick={() => this.setState({ showBookProcess: false })}>Event</Breadcrumb.Item>
        {showBookProcess && <Breadcrumb.Item>Booking</Breadcrumb.Item>}
      </Breadcrumb>
      {this.state.isSuccess && <Redirect to="/success" />}


      <Title>{eventMoreInfo.name}</Title>
      {loading_api ? (<div className="spin-box">
        <Spin size="large" spinning={loading_api} />
      </div>) : (<Row gutter={[16, 16]}>
        <Col xs={24} sm={16}>
          {!showBookProcess && eventMoreInfo && eventMoreInfo.hall && eventMoreInfo.hall.extra_info &&
            <AnimatedWayPointDiv>
              <SeatBlock eventMoreInfo={eventMoreInfo} eventInfo={eventInfo} handleSelectBlock={this.handleSelectBlock} loading={loading_api} />
            </AnimatedWayPointDiv>
          }
          {showBookProcess &&
            <AnimatedWayPointDiv>
              <Card>
                <Steps current={this.state.currentStep}>
                  {this.steps.map(item => (
                    <Step key={item.title} title={item.title} description={item.description} />
                  ))}
                </Steps>
                <div className="steps-content">
                  {(currentStep === 0) && this.renderStepFirst(this.state)}
                  {(currentStep === 1) && this.renderStepSecond(this.state)}
                  {(currentStep === 2) && this.renderStepThree()}
                  <div className="steps-footer">
                    <Button key="back" onClick={this.prev}>
                      {this.renderContentPrev()}
                    </Button>
                    <Button key="submit" type="primary" htmlType="submit" loading={loading} disabled={this.state.selectSeats.length === 0} onClick={this.next}>
                      {this.renderContentNext()}
                    </Button>
                  </div>
                </div>
              </Card>
            </AnimatedWayPointDiv>
          }
        </Col>
        <Col xs={24} sm={8}>
          <InfoTicket eventMoreInfo={eventMoreInfo} eventInfo={eventInfo} />
        </Col>
      </Row>)
      }
    </>
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
