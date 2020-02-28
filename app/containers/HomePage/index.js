/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Carousel, Row, Col, Card, Button, Typography, Icon, Avatar } from 'antd';
import { Wrapper } from './style';
import SubscripForUpdate from '../../components/SubscribeForUpdate';
import Discover from '../../components/Discover';
import img1 from '../../images/home-page/seven-sisters-1200.png';
import img2 from '../../images/home-page/ironfest-1200.jpg';

import messages from './messages';

const { Meta } = Card;

export default function HomePage() {
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
                </div>SUBSCRIBE
                <Button type='primary' block>
                  <FormattedMessage {...messages.getTicket} />
                </Button>
              </Card>
            </Col>
          </Row>
        </div>
      </Carousel>

      <section className="section">
        <Row gutter={16}>
          <Col xs={24}>
            <Typography.Title>
              Trending Events
            </Typography.Title>
          </Col>
          <Col xs={24} sm={16}>
            <Row gutter={[8,8]}>
              {Array(3).fill(1).map(()=> (
                <Col xs={24} sm={12}>
                  <Card

                    cover={
                      <img
                        alt="example"
                        src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                      />
                    }
                    actions={[
                      <Button type='primary' block>
                        <FormattedMessage {...messages.getTicket} />
                      </Button>
                    ]}
                  >
                    <Meta
                      title="Nukara Music Festival 15th & Final Year 2020"
                      description="Downtown On Hindley, Adelaide - SA
                      Mar 20, 2020"
                    />
                  </Card>
                </Col>
              ))}
            </Row>


          </Col>
          <Col xs={24} sm={8} >
            <SubscripForUpdate />
            <Discover />
          </Col>
        </Row>
        <Row gutter={[8,8 ]} >
          <Col xs={24}>
            <Typography.Title>
            Music
            </Typography.Title>
          </Col>
          {Array(4).fill(1).map(()=> (
            <Col xs={24} sm={6}>
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
      <FormattedMessage {...messages.header} />
    </Wrapper>
  );
}
