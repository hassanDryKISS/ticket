/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Carousel, Row, Col, Card, Button, Typography } from 'antd';
import { Wrapper } from './style';
import img1 from '../../images/home-page/seven-sisters-1200.png';
import img2 from '../../images/home-page/ironfest-1200.jpg';

import messages from './messages';

export default function HomePage () {
  return (
    <Wrapper>
      <Carousel >
        <div>
          <Row type='flex' justify='space-between' align='bottom'>
            <Col xs={12} sm={14}>
              <div className='img-box'>
                <img src={img1} alt="banner" title="Baneer" />
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
                </div>
                <Button type='primary' block>
                  <FormattedMessage {...messages.getTicket} />
                </Button>
              </Card>
            </Col>
          </Row>
        </div>
        <div>
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
                </div>
                <Button type='primary' block>
                  <FormattedMessage {...messages.getTicket} />
                </Button>
              </Card>
            </Col>
          </Row>
        </div>
      </Carousel>

      <section>
        <Row>
          <Col xs={24} sm={16}>
          <Typography.Title>
        Trending Events
        </Typography.Title>
          </Col>
          <Col xs={24} sm={8}></Col>
        </Row>


      </section>
      <FormattedMessage {...messages.header} />
    </Wrapper>
  );
}
