/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React, { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { Carousel, Row, Col, Card, Button, Typography, Skeleton } from 'antd';
import { Link } from 'react-router-dom';
import request from '../../utils/request';
import { Wrapper } from './style';
// import SubscripForUpdate from '../../components/SubscribeForUpdate';
// import Discover from '../../components/Discover';
// import img1 from '../../images/home-page/seven-sisters-1200.png';
// import img2 from '../../images/home-page/ironfest-1200.jpg';

import messages from './messages';

const { Meta } = Card;

export default function HomePage() {

  const [eventsList, setEventsList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getListEvent();
  }, [])

  const getListEvent = () => {
    request
      .get('backend/events/list')
      .then(res => {

        setEventsList(res.data)
        setLoading(false)
      })
      .catch(_ => console.log(_));
  }


  return (
    <Wrapper>
      {loading ? <Skeleton size="large" loading={loading} paragraph={{ rows: 9, width: 70 }} title="hassan" active /> :
        <Carousel >
          {eventsList.length > 0 && eventsList.map((item) => {
            const img = item.image.split("https://tickets.berimconcert.com");
            return (
              <div>
                <Row type='flex' justify='space-between' align='bottom'>
                  <Col xs={12} sm={14}>
                    <div className='img-box'>
                      <img src={`https://vision-idea.com${img[1]}`} alt={item.name} title={item.name} />
                    </div>
                  </Col>
                  <Col xs={12} sm={10} style={{ alignSelf: 'stretch' }}>
                    <Card className='card' bordered={false} style={{ height: '100%' }}>
                      <div>
                        <p>{item.dates[0].localized_date}</p>
                        <p>{item.name}</p>
                        <p>
                          {item.description}
                        </p>
                      </div>
                      <Button type='primary' block>
                        <Link to={`/event/${item.hall.id}/${item.id}`}>
                          <FormattedMessage {...messages.getTicket} />
                        </Link>
                      </Button>
                    </Card>
                  </Col>
                </Row>

              </div>
            )
          })}

          {/* <div>
        <Row type='flex' justify='space-between' align='bottom'>
          <Col xs={12} sm={14}>
            <div className='img-box'>
              <img src={img2} alt="banner" title="Baneer" />
            </div>
          </Col>
          <Col xs={12} sm={10} style={{ alignSelf: 'stretch' }}>
            <Card className='card' bordered={false} style={{ height: '100%' }}>
              <div>
                <p>Mar 13-15, 2020</p>
                <p>Ironfest 2020 – Gothic</p>
                <p>
                  For people new to Ironfest, it is a cool arts festival with
                  a metal edge, featuring art exhibitions, stalls, live music,
                  dance, street performance, blacksmith demonstrations,
                  historical re-enactments, including Medieval jousting,
                  historical melees, the Birds of Prey & other era battle
                  re-enactments!
                </p>
              </div>SUBSCRIBE
              <Button type='primary' block>
                <FormattedMessage {...messages.getTicket} />
              </Button>
            </Card>
          </Col>
        </Row>
      </div> */}
        </Carousel>}


      <section className="section">
        <Row gutter={16} loading={loading}>
          <Col xs={24}>
            <Typography.Title>
              Trending Events
            </Typography.Title>
          </Col>
          <Col xs={24} sm={24}>
            {loading ?
              <Row gutter={[8, 8]}>
                <Col xs={24} sm={8}>
                  <Card loading={loading} />
                </Col>
                <Col xs={24} sm={8}>
                  <Card loading={loading} />
                </Col>
                <Col xs={24} sm={8}>
                  <Card loading={loading} />
                </Col>
              </Row>
              : <Row gutter={[8, 8]}>
                {eventsList.length > 0 && eventsList.map((item) => {
                  const img = item.image.split("https://tickets.berimconcert.com")
                  return (
                    <Col xs={24} sm={8}>
                      <Link to={`/event/${item.hall.id}/${item.id}`}>
                        <Card
                          hoverable
                          cover={
                            <img
                              alt={item.name}
                              src={`https://vision-idea.com${img[1]}`}
                            />
                          }
                          actions={[
                            <Button type='primary' block>
                              <FormattedMessage {...messages.getTicket} />
                            </Button>
                          ]}
                        >
                          <Meta
                            title={item.name}
                            description={`${item.description} ${item.dates[0].localized_date}`}
                          />
                        </Card>
                      </Link>

                    </Col>
                  )
                })

                }
              </Row> }



          </Col>
          <Col xs={0} sm={0} >
            {/* <SubscripForUpdate /> */}
            {/* <Discover /> */}
          </Col>
        </Row>
        <Row gutter={[8, 8]} >
          <Col xs={0}>
            <Typography.Title>
              Music
            </Typography.Title>
          </Col>
          {Array(4).fill(1).map(() => (
            <Col xs={0} sm={0}>
              <Card
                hoverable

                cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
                actions={[
                  <div >
                    <div>Bay Park, Mt Martha, VIC</div>
                    <div>Mar 13th, 2020</div>
                  </div>
                ]}
              >
                <Meta title="Europe Street beat" description="www.instagram.com" />
              </Card>
            </Col>
          ))}
        </Row>


      </section>
      {/* <FormattedMessage {...messages.header} /> */}
    </Wrapper>
  );
}
