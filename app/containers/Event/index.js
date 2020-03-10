/**
 *
 * Event
 *
 */

import React, { memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';

// eslint-disable-next-line no-unused-vars
import { Breadcrumb, Spin, Row, Col, Carousel, Descriptions, Typography, Button } from 'antd';
import SeatPicker from 'react-seat-picker';
import { createStructuredSelector } from 'reselect';
import { getEventListAction } from '../HomePage/actions';
import { selectEventList } from '../HomePage/selectors';


import request from '../../utils/request';


import saga from './saga';
import messages from './messages';

import { Wrapper } from './style';

import img2 from '../../images/home-page/ironfest-1200.jpg';
const { Title } = Typography;



export function Event({ match, eventList, getEventListDispatch }) {
  useInjectSaga({ key: 'event', saga });
  const [event, setEvent] = useState({})
  const [eventInfo, setEventInfo] = useState({})
  const [loading, setLoading] = useState(true)
  const [size] = useState('middle ')

  useEffect(() => {
    const { params } = match;
   // getEvent(params);
    getEventListDispatch();
    setEventInfo({});
  }, [eventList])
  console.log('eventlist', eventList)

  const getEvent = (params) => {
    const { hallId, id } = params;
    request
      .get(`backend/events/hall/${hallId}/${id}`)
      .then(res => {
        console.log(res)
        setEvent(res.data)
        setLoading(false)
      })
      .catch(_ => console.log('errrrpprpr', _));
  }
  const image = event.image && event.image.split("https://tickets.berimconcert.com");
  console.log('event', event)
  console.log('eventInfo', eventInfo);
  const rows = [
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
  ]
  return (
    <Wrapper>
      <Breadcrumb>
        <Breadcrumb.Item href="/">
          Home
        </Breadcrumb.Item>
        <Breadcrumb.Item>Event</Breadcrumb.Item>
        <Breadcrumb.Item>{match.params.id}</Breadcrumb.Item>
      </Breadcrumb>
      {loading ? (<div className="spin-box">
        <Spin size="large" spinning={loading} />
      </div>) : (<Row gutter={[16, 16]}>
        <Col xs={24} sm={16}>
          <Title>{eventInfo.name}</Title>
          {/* <div>
            <Carousel autoplay>
              <div>
                <div className='img-box carousel'>
                  <img src={`https://vision-idea.com${img[1]}`} alt={item.name} title={item.name} />
                  <img src={img2} alt='title' title='title' />
                </div>
              </div>
            </Carousel>
          </div> */}
          <Button type="primary">Select Ticket</Button>

          <div>
            <SeatPicker
              addSeatCallback={(e) => console.log('addSeatCallback',e)}
              removeSeatCallback={() => console.log('removeSeatCallback')}
              rows={rows}
              maxReservableSeats={3}
              alpha
              visible
              selectedByDefault
              loading={loading}
              tooltipProps={{ multiline: true }}
            />
          </div>

        </Col>
        <Col xs={24} sm={8}>
          <Descriptions bordered title="Detail" size={size}>
            <Descriptions.Item span={3}>
              <div className="img-box">
                <img src={`https://vision-idea.com${image[1]}`} alt="alt" title="title" />
              </div>
            </Descriptions.Item>
            <Descriptions.Item label="Name" span={3}>{eventInfo && eventInfo.hall && eventInfo.hall.name}</Descriptions.Item>
            <Descriptions.Item label="Address" span={3}>{event.address}</Descriptions.Item>
            <Descriptions.Item label="description" span={3}>{eventInfo && eventInfo.hall && eventInfo.hall.description}</Descriptions.Item>
          </Descriptions>

        </Col>
      </Row>)
      }




      <FormattedMessage {...messages.header} />
    </Wrapper>
  );
}

Event.propTypes = {
  dispatch: PropTypes.func.isRequired,
  match: PropTypes.object,
  eventList: PropTypes.array,
  getEventListDispatch: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  eventList: selectEventList(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    getEventListDispatch: () => dispatch(getEventListAction()),


  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Event);
