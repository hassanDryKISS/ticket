
import { AnimatedWayPointDiv } from '../../../utilities/components/AnimatedWayPoint'
import {
  Breadcrumb, Spin, Row, Col,
  Descriptions, Typography,
  Card, Modal
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



class EventPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showSelectSeatModal: false,
      titleSeatModal: '',
      loading: false,
      rows: [
        [
          { id: 1, number: 1, isSelected: true, state: 'd ', tooltip: 'Reserved by you' },
          { id: 2, number: 2, isSelected: true, state: 'd ', tooltip: 'Reserved by you' },

        ],

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
    console.log('getEventsList')
    this.HomeServices.get({
    }, (response) => {
      this.setState({ eventMoreInfo: response.data.filter((item) => item.id === this.props.match.params.id)[0] })
      store.dispatch(setParam(Param.EVENTS, response.data))
    })
  }


  getEventInfo = () => {
    console.log('getEventInfo')
    const { id, hallId } = this.props.match.params
    this.EventServices.get(`hall/${hallId}/${id}`, {}, (response) => {
      this.setState({ eventInfo: response.data })
    })
  }

  getSeatInfo = (blockSeatId) => {
    console.log('getSeatInfo')
    const { id } = this.props.match.params;
    let rows = [];
    this.setState({loading : true})
    this.EventServices.get(`performance/${id}/${blockSeatId}/seat-info?no-cache=true`, {}, (response) => {
      // { id: 1, number: 1, isSelected: true, tooltip: 'Reserved by you' }
      Object.keys(response.data).map((item, index) => {
        const i = item.split(`${blockSeatId}-`)[1].split('-')[0] - 1;
        const j = item.split(`${blockSeatId}-`)[1].split('-')[1] - 1;
        if (!Array.isArray(rows[i])) {
          rows[i] = []
        }
        rows[i][j] = { id: item, number: j + 1, isSelected: true, tooltip: 'Reserved by you' }
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


  render() {
    const { loading_api } = this.props;
    const { eventInfo, eventMoreInfo, titleSeatModal, showSelectSeatModal, rows, loading } = this.state;
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
        loading={loading}
        visible={showSelectSeatModal}
        onOk={() => console.log('oko')}
        onCancel={() => this.setState({ showSelectSeatModal: false })}
      >
        {loading ? <div className="loading-box"><Spin size="large" /></div> : <>
        
        
        <SeatPicker rows={rows} />
        <div className="info-box">
          
        </div>
        </> }
        {/* {rows.length> 2 &&  <SeatPicker
          addSeatCallback={(e) => console.log('addSeatCallback', e)}
          removeSeatCallback={() => console.log('removeSeatCallback')}
          rows={rows}
          maxReservableSeats={3}

          visible
          selectedByDefault
          loading_api={loading_api}
          tooltipProps={{ multiline: true }}
          continuous
        />} */}
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

export default connect(mapStateToProps, mapDispatchToProps)(EventPage)
