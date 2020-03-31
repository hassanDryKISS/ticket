
import { AnimatedWayPointDiv } from '../../../utilities/components/AnimatedWayPoint'
import { Carousel, Row, Col, Card, Button, Typography, Spin} from 'antd';
import HomesApis from '../../../api/componentApi/HomeApis'
import { Link } from 'react-router-dom'
import * as Param from '../../../redux/Param'
import { connect } from 'react-redux'
import * as React from 'react';
import store from "../../../redux/store";
import { setParam } from '../../../redux/actions';



const { Meta } = Card;








class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      eventsList: []
    };
    this.HomeServices = new HomesApis()
  }


  componentDidMount() {
    this.getEventsList();
  }


  getEventsList = () => {
    this.HomeServices.get({}, (response) => {
      this.setState({ eventsList: response.data })
      store.dispatch(setParam(Param.EVENTS, response.data))
    })
  }

  render() {
    const {loading_api} =this.props;
    const {eventsList} =this.state;
    return (<>

<div className="carousel-box">
        {loading_api ? <Spin size="large" /> :

          <AnimatedWayPointDiv style={{width : '100%'}}>
            <Carousel>
              {eventsList.length > 0 && eventsList.map((item) => {
                return (
                  <div>
                    <Row type='flex' justify='space-between' align='bottom'>
                      <Col xs={12} sm={14}>
                        <div className='img-box'>
                          <img src={item.image} alt={item.name} title={item.name} />
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
                          <Button type='primary'>
                            <Link to={`/event/${item.hall.id}/${item.id}`}>
                            GET TICKET
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
            </Carousel>
          </AnimatedWayPointDiv>
        }
      </div>



      <AnimatedWayPointDiv className="section">
        <Row gutter={16} loading={loading_api}>
          <Col xs={24}>
            <Typography.Title>
              Trending Events
            </Typography.Title>
          </Col>
          <Col xs={24} sm={24}>
            {loading_api ?
              <div className="loading-box">
                <Spin size="large" />
              </div>
              : <Row gutter={[8, 8]}>
                {eventsList.length > 0 && eventsList.map((item) => {
                  return (
                    <Col xs={24} sm={8}>
                      <Link to={`/event/${item.hall.id}/${item.id}`}>
                        <Card
                          hoverable
                          cover={
                            <img
                              alt={item.name}
                              src={item.image}
                            />
                          }
                          actions={[
                            <Button type='primary' block>
                            Get Ticket
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
              </Row>}



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


      </AnimatedWayPointDiv>
      {/* <FormattedMessage {...messages.header} /> */}
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
  loading_api: state.param[Param.LOADING_API]
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)
