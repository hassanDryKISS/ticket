
import { AnimatedWayPointDiv } from '../../../utilities/components/AnimatedWayPoint'
import {
  Breadcrumb, Spin, Row, Col,
  Carousel, Descriptions, Typography,
  Button, Card, Modal
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
import SeatPicker from 'react-seat-picker'

const { Title } = Typography;



class EventPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showSelectSeatModal: false,
      titleSeatModal: '',
      contentSeatModal: '',
      rows: [
        [
          { id: 1, number: 1, isSelected: true, tooltip: 'Reserved by you' },
          { id: 2, number: 2, tooltip: 'Cost: 15$' },
          { id: 2, number: 2, tooltip: 'Cost: 15$' },
          { id: 2, number: 2, tooltip: 'Cost: 15$' },
          { id: 2, number: 2, tooltip: 'Cost: 15$' },
          { id: 2, number: 2, tooltip: 'Cost: 15$' },
          null,
          { id: 3, number: '3', isReserved: true, orientation: 'east', tooltip: 'Reserved by Rogger' },
          { id: 4, number: '4', orientation: 'west' },
          { id: 4, number: '4', orientation: 'west' },
          { id: 4, number: '4', orientation: 'west' },
          { id: 4, number: '4', orientation: 'west' },
          { id: 4, number: '4', orientation: 'west' },
          null,
          { id: 5, number: 5 }, { id: 6, number: 6 },
          { id: 5, number: 5 }, { id: 6, number: 6 },
          { id: 5, number: 5 }, { id: 6, number: 6 },
          { id: 5, number: 5 }, { id: 6, number: 6 },
          { id: 5, number: 5 }, { id: 6, number: 6 },
          { id: 5, number: 5 }, { id: 6, number: 6 },
          { id: 5, number: 5 }, { id: 6, number: 6 },
        ],
        [
          { id: 7, number: 1, isReserved: true, tooltip: 'Reserved by Matthias Nadler' },
          { id: 8, number: 2, isReserved: true },
          null,
          { id: 9, number: '3', isReserved: true, orientation: 'east' },
          { id: 10, number: '4', orientation: 'west' },
          null,
          { id: 11, number: 5 },
          { id: 12, number: 6 }
        ],
        [{ id: 13, number: 1 },
        { id: 14, number: 2 },
          null,
        { id: 15, number: 3, isReserved: true, orientation: 'east' },
        { id: 16, number: '4', orientation: 'west' },
          null,
        { id: 17, number: 5 },
        { id: 18, number: 6 }
        ],
        [
          { id: 19, number: 1, tooltip: 'Cost: 25$' },
          { id: 20, number: 2 },
          null,
          { id: 21, number: 3, orientation: 'east' },
          { id: 22, number: '4', orientation: 'west' },
          null,
          { id: 23, number: 5 },
          { id: 24, number: 6 }
        ],
        [
          { id: 25, number: 1, isReserved: true },
          { id: 26, number: 2, orientation: 'east' },
          null,
          { id: 27, number: '3', isReserved: true },
          { id: 28, number: '4', orientation: 'west' },
          null,
          { id: 29, number: 5, tooltip: 'Cost: 11$' },
          { id: 30, number: 6, isReserved: true }
        ]
      ],
      eventInfo: [],
      eventMoreInfo: {
        name: '',
        hall: {
          name: '',
          description: ''
        }
      }
    };
    this.EventServices = new EventApis()
    this.HomeServices = new HomesApis()
  }

  componentDidMount() {
    this.getEventInfo();
    if (this.props.events) {
      this.setState({
        eventMoreInfo: this.props.events.filter((item) => item.id === this.props.match.params.id)[0]
      })
    } else {
      this.getEventsList()
    }
  }

  getEventsList = () => {
    this.HomeServices.get({
    }, (response) => {
      this.setState({ eventMoreInfo: response.data.filter((item) => item.id === this.props.match.params.id)[0] })
      store.dispatch(setParam(Param.EVENTS, response.data))
    })
  }


  getEventInfo = () => {
    const { params } = this.props.match;
    this.EventServices.get(params, (response) => {
      this.setState({ eventInfo: response.data })
    })
  }
  renderBlock = (setMap) => {
    return Object.keys(setMap.map).map((item, index) => {
      if (setMap.map[item].name !== 'VIP') {
        return <div className="block" key={index} onClick={() => this.handleSelectBlock(setMap.map[item])}> {setMap.map[item].name}</div>
      }
      return ''
    })
  }
  renderVip = (setMap) => {
    return Object.keys(setMap.map).map((item, index) => {
      if (setMap.map[item].name === 'VIP') {
        return <div className="vip" key={index} onClick={() => this.handleSelectBlock(setMap.map[item])}> {setMap.map[item].name}</div>
      }
      return ''
    })
  }
  handleSelectBlock = (selectItem) => {
    console.log(selectItem)
    this.setState({
      showSelectSeatModal: true,
      titleSeatModal: selectItem.name,
      contentSeatModal: 'selectItem.name',
    })
  }


  render() {
    const { loading_api, match, events } = this.props;
    const { eventInfo, eventMoreInfo, titleSeatModal, contentSeatModal, showSelectSeatModal, rows } = this.state;

    return (<>

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
          {/* <Title>{eventMoreInfo.name}</Title> */}
          {/* <div>
              <Carousel autoplay>
                <div>
                  <div className='img-box carousel'>
                    <img src={eventInfo.image} alt={eventInfo.name} title={eventInfo.name} />
                    <img src={eventInfo.image} alt='title' title='title' />
                  </div>
                </div>
              </Carousel>
            </div> */}
          {/* <Button type="primary">Select Ticket</Button> */}

          <div>
            {/* <SeatPicker
              addSeatCallback={(e) => console.log('addSeatCallback',e)}
              removeSeatCallback={() => console.log('removeSeatCallback')}
              rows={rows}
              maxReservableSeats={3}
              alpha
              visible
              selectedByDefault
              loading_api={loading_api}
              tooltipProps={{ multiline: true }}
            /> */}
          </div>
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

            {/* <Descriptions.Item span={3}>
              <div className="img-box">
                <img src={eventInfo.image} alt="alt" title="title" />
              </div>
            </Descriptions.Item> */}
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
        visible={showSelectSeatModal}
        onOk={() => console.log('oko')}
        onCancel={() => this.setState({ showSelectSeatModal: false })}
      >
        <SeatPicker
          addSeatCallback={(e) => console.log('addSeatCallback', e)}
          removeSeatCallback={() => console.log('removeSeatCallback')}
          rows={rows}
          maxReservableSeats={3}
              
          visible
          selectedByDefault
          loading_api={loading_api}
          tooltipProps={{ multiline: true }}
        />
      </Modal>
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

export default connect(mapStateToProps, mapDispatchToProps)(EventPage)
