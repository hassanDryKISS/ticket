import { AnimatedWayPointDiv } from "../../../utilities/components/AnimatedWayPoint";
import Discover from "../../../utilities/components/Discover";
import SubscripForUpdate from "../../../utilities/components/SubscribeForUpdate";
import { Carousel, Row, Col, Card, Button, Typography, Spin } from "antd";
import HomesApis from "../../../api/componentApi/HomeApis";
import { Link } from "react-router-dom";
import * as Param from "../../../redux/Param";
import { connect } from "react-redux";
import * as React from "react";
import store from "../../../redux/store";
import { setParam } from "../../../redux/actions";

const { Meta } = Card;
const { Title } = Typography;

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      eventsList: [],
      mackSlider: [
        {
          title: "Lunar Electric Music Festival Maitland 2020",
          desc: `Lunar Electric Music Festival is a celebration of the EDM talent Australia has to offer. Electronic music lovers will be pleased with the incredible line up of DJs this year's festival will bring to New South Wales along with the diverse styles of EDM in Australia.`,
          img:
            "https://cdn.ticketbooth.com.au/home/wp-content/uploads/2019/08/07202848/lunar-1200-.png",
          date: "Sep 19, 2020",
          url: '/event-detail/istanbul-congress-center-integrated-vip/homayoon-live-2020'
        },
        {
          title: "Elements Festival 2020",
          desc: `The Elements Festival portal will be re-opening from 15th - 18th October and you are invited to enter this magical world for an unforgettable ride through some of the world’s best electronic music, art, performances, workshops and markets.`,
          img:
            "https://cdn.ticketbooth.com.au/home/wp-content/uploads/2019/06/07202848/elements-1200-1.jpg",
          date: "Oct 15 - 18, 2020",
          url: '/event-detail/istanbul-congress-center-integrated-vip/homayoon-live-2020'
        },
      ],
      mackEvent: [
        {
          name: "Camp No Fear 2021",
          description: `Gateway Worship & Performing Arts Centre, Seaford - VIC`,
          image:
            "https://cdn.ticketbooth.com.au/home/wp-content/uploads/2019/08/07202847/CAMP-NO-FEAR-2021-690.jpg",
          date: "Jan 21 - 24, 2021",
          url: '/event-detail/istanbul-congress-center-integrated-vip/homayoon-live-2020'
        },
        {
          name: "Henderson Waste Recovery Park Tour – June",
          description: `City of Cockburn Administration Centre, Spearwood - WA`,
          image:
            "https://cdn.ticketbooth.com.au/home/wp-content/uploads/2019/06/07202847/sust-living-690.jpg",
          date: "Jun 27, 2020",
          url: '/event-detail/istanbul-congress-center-integrated-vip/homayoon-live-2020'
        },
        {
          name: "Whisky & Dreams 2020",
          description: `Starward Distillery, Port Melbourne - VIC`,
          image:
            "https://cdn.ticketbooth.com.au/home/wp-content/uploads/2019/06/07202846/whisky-690.png",
          date: "Jun 26 - 27, 2020",
          url: '/event-detail/istanbul-congress-center-integrated-vip/homayoon-live-2020'
        },
      ],
      mackMusic: [
        {
          name: "The Three Amigos Roving Plus 1",
          image:
            "https://cdn.ticketbooth.com.au/home/wp-content/uploads/2019/08/07202846/amigos-486.jpg",
          address: `Murray Bridge Town Hall, Murray Bridge, SA`,
          date: "Jan 21 - 24, 2021",
          url: '/event-detail/istanbul-congress-center-integrated-vip/homayoon-live-2020'
        },
        {
          name: "Phil Walleystack Findjaway Concert",
          image:
            "https://cdn.ticketbooth.com.au/home/wp-content/uploads/2019/06/07202846/phil-486.jpg",
          address: `Multiple Locations, WA - Multiple Dates`,
          date: "Jun 27, 2020",
          url: '/event-detail/istanbul-congress-center-integrated-vip/homayoon-live-2020'
        },
        {
          name: "Phil Walleystack Findjaway Concert",
          image:
            "https://cdn.ticketbooth.com.au/home/wp-content/uploads/2019/06/07202846/phil-486.jpg",
          address: `Multiple Locations, WA - Multiple Dates`,
          date: "Jun 27, 2020",
          url: '/event-detail/istanbul-congress-center-integrated-vip/homayoon-live-2020'
        },
        {
          name: "Phil Walleystack Findjaway Concert",
          image:
            "https://cdn.ticketbooth.com.au/home/wp-content/uploads/2019/06/07202846/phil-486.jpg",
          address: `Multiple Locations, WA - Multiple Dates`,
          date: "",
          url: '/event-detail/istanbul-congress-center-integrated-vip/homayoon-live-2020'
        },
      ],
      mackCulture: [
        {
          name: "Sydney Author Event 2020",
          image:
            "https://cdn.ticketbooth.com.au/home/wp-content/uploads/2019/06/07202844/SYD-AUTH-486.jpg",
          address: `Ivy Sunroom, Sydney, NSW`,
          date: "Oct 10th, 2020",
          url: '/event-detail/istanbul-congress-center-integrated-vip/homayoon-live-2020'
        },
        {
          name: "Start a Social Enterprise",
          image:
            "https://cdn.ticketbooth.com.au/home/wp-content/uploads/2019/06/07202844/social-486.jpg",
          address: `Cockburn Health & Community Facilty, Success, WA`,
          date: "Jun 20th, 2020",
          url: '/event-detail/istanbul-congress-center-integrated-vip/homayoon-live-2020'
        },
        {
          name: "20th RSPCA Save the Paws Ball",
          image:
            "https://cdn.ticketbooth.com.au/home/wp-content/uploads/2019/06/07202843/rspca-486.png",
          address: `Grand Ballroom - DoubleTree by Hilton Hotel Esplanade Darwin, Darwin City, NT`,
          date: "Jun 27, 2020",
          url: '/event-detail/istanbul-congress-center-integrated-vip/homayoon-live-2020'
        },
        {
          name: "Sistahood Rising 2020",
          image:
            "https://cdn.ticketbooth.com.au/home/wp-content/uploads/2019/06/07202918/sistahood-486.png",
          address: `Fairbridge Village, PINJARRA, WA`,
          date: "Oct 30th, 2020",
          url: '/event-detail/istanbul-congress-center-integrated-vip/homayoon-live-2020'
        },
      ], mackSports: [
        {
          name: "Melbourne Cup Luncheon @ Hyde Park – 2020",
          image:
            "https://cdn.ticketbooth.com.au/home/wp-content/uploads/2019/05/07202843/MELB-CUP-486.jpg",
          address: `Doltone House Hyde Park, Sydney, NSW`,
          date: "Oct 10th, 2020",
          url: '/event-detail/istanbul-congress-center-integrated-vip/homayoon-live-2020'
        },
        {
          name: "Start a Social Enterprise",
          image:
            "https://cdn.ticketbooth.com.au/home/wp-content/uploads/2019/08/07202842/vic-hunt-486.jpg",
          address: `Cockburn Health & Community Facilty, Success, WA`,
          date: "Jun 20th, 2020",
          url: '/event-detail/istanbul-congress-center-integrated-vip/homayoon-live-2020'
        },
        {
          name: "Melbourne Cup Luncheon @ Hyde Park – 2020",
          image:
            "https://cdn.ticketbooth.com.au/home/wp-content/uploads/2019/05/07202843/MELB-CUP-486.jpg",
          address: `Doltone House Hyde Park, Sydney, NSW`,
          date: "Oct 10th, 2020",
          url: '/event-detail/istanbul-congress-center-integrated-vip/homayoon-live-2020'
        },
        {
          name: "Start a Social Enterprise",
          image:
            "https://cdn.ticketbooth.com.au/home/wp-content/uploads/2019/08/07202842/vic-hunt-486.jpg",
          address: `Cockburn Health & Community Facilty, Success, WA`,
          date: "Jun 20th, 2020",
          url: '/event-detail/istanbul-congress-center-integrated-vip/homayoon-live-2020'
        },
      ],
    };
    this.HomeServices = new HomesApis();
  }

  componentDidMount() {
    this.getEventsList();
  }

  getEventsList = () => {
    this.HomeServices.get({}, (response) => {
      this.setState({ eventsList: response.data });
      store.dispatch(setParam(Param.EVENTS, response.data));
    });
  };

  render() {
    const { loading_api } = this.props;
    const { eventsList } = this.state;
    return (
      <>
        <div className="carousel-box">
          {loading_api ? (
            <Spin size="large" />
          ) : (
            <AnimatedWayPointDiv style={{ width: "100%" }}>
              <Carousel autoplay>
                {this.state.mackSlider.map((item) => (
                  <div>
                    <Row type="flex" justify="space-between" align="bottom">
                      <Col xs={12} sm={14}>
                        <div className="img-box">
                          <img
                            src={item.img}
                            alt={item.title}
                            title={item.title}
                          />
                        </div>
                      </Col>
                      <Col xs={12} sm={10} style={{ alignSelf: "stretch" }}>
                        <Card
                          className="card"
                          bordered={false}
                          style={{ height: "100%" }}
                        >
                          <div>
                            <p style={{ fontWeight: "400" }}>{item.date}</p>
                            <Title level={4}>{item.title}</Title>
                            <p>{item.desc}</p>
                          </div>
                          <Button type="primary" style={{ marginTop: "auto" }}>
                            <Link to={item.url}>GET TICKET</Link>
                          </Button>
                        </Card>
                      </Col>
                    </Row>
                  </div>
                ))}
                {eventsList.length > 0 &&
                  eventsList.map((item) => {
                    return (
                      <div>
                        <Row type="flex" justify="space-between" align="bottom">
                          <Col xs={12} sm={14}>
                            <div className="img-box">
                              <img
                                src={item.image}
                                alt={item.name}
                                title={item.name}
                              />
                            </div>
                            <div className="dot-box">
                              <span className="dot active"></span>
                              <span className="dot"></span>
                              <span className="dot"></span>
                              <span className="dot"></span>
                            </div>
                          </Col>
                          <Col xs={12} sm={10} style={{ alignSelf: "stretch" }}>
                            <Card
                              className="card"
                              bordered={false}
                              style={{ height: "100%" }}
                            >
                              <div>
                                <p style={{ fontWeight: "400" }}>
                                  {item.dates[0].localized_date}
                                </p>
                                <Title level={4}>{item.name}</Title>
                                <p>{item.desc}</p>
                              </div>
                              <Button
                                type="primary"
                                style={{ marginTop: "auto" }}
                              >
                                <Link to={`/event/${item.hall.id}/${item.id}`}>
                                  GET TICKET
                                </Link>
                              </Button>
                            </Card>
                          </Col>
                        </Row>
                      </div>
                    );
                  })}
              </Carousel>
            </AnimatedWayPointDiv>
          )}
        </div>

        <AnimatedWayPointDiv className="section">
          <Row gutter={[32, 32]} loading={loading_api}>
            <Col xs={24} style={{ paddingBottom: "0" }}>
              <Typography.Title level={3} style={{ marginBottom: "0" }}>
                Trending Events
              </Typography.Title>
            </Col>
            <Col xs={24} sm={16}>
              {loading_api ? (
                <div className="loading-box">
                  <Spin size="large" />
                </div>
              ) : (
                <Row
                  gutter={[32, 32]}
                  style={{ display: "flex", flexWrap: "wrap" }}
                >
                  {eventsList.length > 0 &&
                    eventsList.map((item) => {
                      return (
                        <Col xs={24} sm={12}>
                          {/* <Link to={`/event/${item.hall.id}/${item.id}`}> */}
                          <Link to={item.url}>
                            <Card
                              hoverable
                              style={{
                                height: "100%",
                                display: "flex",
                                flexDirection: "column",
                              }}
                              cover={
                                <div style={{ height: "150px" }}>
                                  <img
                                    style={{
                                      width: "100%",
                                      display: "inline-block",
                                      height: "100%",
                                    }}
                                    alt={item.name}
                                    src={item.image}
                                  />
                                </div>
                              }
                              actions={[
                                <div style={{ padding: "0 12px" }}>
                                  <Button type="primary" block>
                                    Get Ticket
                                  </Button>
                                </div>,
                              ]}
                            >
                              <Meta
                                title={<Title level={4}>{item.name}</Title>}
                                description={
                                  <>
                                    <h4>{item.description}</h4>
                                    <h4>{item.dates[0].localized_date}</h4>
                                  </>
                                }
                              />
                            </Card>
                          </Link>
                        </Col>
                      );
                    })}
                  {this.state.mackEvent.map((item) => {
                    return (
                      <Col xs={24} sm={12}>
                        <Link to={item.url}>
                          <Card
                            style={{
                              height: "100%",
                              display: "flex",
                              flexDirection: "column",
                            }}
                            hoverable
                            cover={
                              <div style={{ height: "150px" }}>
                                <img
                                  style={{
                                    width: "100%",
                                    display: "inline-block",
                                    height: "100%",
                                  }}
                                  alt={item.name}
                                  src={item.image}
                                />
                              </div>
                            }
                            actions={[
                              <div style={{ padding: "0 12px" }}>
                                <Button type="primary" block>
                                  Get Ticket
                                </Button>
                              </div>,
                            ]}
                          >
                            <Meta
                              title={<Title level={4}>{item.name}</Title>}
                              description={
                                <>
                                  <h4>{item.description}</h4>
                                  <h4>{item.date}</h4>
                                </>
                              }
                            />
                          </Card>
                        </Link>
                      </Col>
                    );
                  })}
                </Row>
              )}
            </Col>
            <Col xs={0} sm={8}>
              <SubscripForUpdate />
              <Discover />
            </Col>
          </Row>
          <Row gutter={[32, 32]}>
            <Col xs={24} style={{ paddingBottom: "0" }}>
              <Typography.Title level={3} style={{ marginBottom: "0" }}>
                Music
              </Typography.Title>
            </Col>
            {this.state.mackMusic.map((item) => (
              <Col xs={24} sm={6}>
                <Link to={item.url}>
                  <Card
                    style={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                    }}
                    hoverable
                    cover={
                      <div style={{ height: "150px", position: "relative" }}>
                        <img
                          style={{
                            width: "100%",
                            display: "inline-block",
                            height: "100%",
                          }}
                          alt={item.name}
                          src={item.image}
                        />
                        <img
                          style={{
                            width: "70px",
                            height: "70px",
                            display: "inline-block",
                            position: "absolute",
                            bottom: "-20px",
                            left: "22px",
                            border: "4px solid #fff",
                            borderRadius: "5px",
                            boxShadow: "5px 5px 5px rgba(0,0,0,.1)",
                          }}
                          alt={item.name}
                          src={item.image}
                        />
                      </div>
                    }
                    actions={[
                      <div style={{ padding: "0 12px", textAlign: "left" }}>
                        <p>{item.address}</p>
                        <em>{item.date}</em>
                      </div>,
                    ]}
                  >
                    <Meta
                      title={
                        <Title level={4} style={{ marginTop: "20px" }}>
                          {item.name}
                        </Title>
                      }
                    />
                  </Card>
                </Link>
              </Col>
            ))}
          </Row>

          <Row gutter={[32, 32]}>
            <Col xs={24} style={{ paddingBottom: "0" }}>
              <Typography.Title level={3} style={{ marginBottom: "0" }}>
                Exhibitions & Culture
              </Typography.Title>
            </Col>
            {this.state.mackCulture.map((item) => (
              <Col xs={24} sm={6}>
                <Link to={item.url}>
                  <Card
                    style={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                    }}
                    hoverable
                    cover={
                      <div style={{ height: "150px", position: "relative" }}>
                        <img
                          style={{
                            width: "100%",
                            display: "inline-block",
                            height: "100%",
                          }}
                          alt={item.name}
                          src={item.image}
                        />
                        <img
                          style={{
                            width: "70px",
                            height: "70px",
                            display: "inline-block",
                            position: "absolute",
                            bottom: "-20px",
                            left: "22px",
                            border: "4px solid #fff",
                            borderRadius: "5px",
                            boxShadow: "5px 5px 5px rgba(0,0,0,.1)",
                          }}
                          alt={item.name}
                          src={item.image}
                        />
                      </div>
                    }
                    actions={[
                      <div style={{ padding: "0 12px", textAlign: "left" }}>
                        <p>{item.address}</p>
                        <em>{item.date}</em>
                      </div>,
                    ]}
                  >
                    <Meta
                      title={
                        <Title level={4} style={{ marginTop: "20px" }}>
                          {item.name}
                        </Title>
                      }
                    />
                  </Card>
                </Link>
              </Col>
            ))}
          </Row>
          <Row gutter={[32, 32]}>
            <Col xs={24} style={{ paddingBottom: "0" }}>
              <Typography.Title level={3} style={{ marginBottom: "0" }}>
                Sports
              </Typography.Title>
            </Col>
            {this.state.mackSports.map((item) => (
              <Col xs={24} sm={6}>
                <Link to={item.url}>
                  <Card
                    style={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                    }}
                    hoverable
                    cover={
                      <div style={{ height: "150px", position: "relative" }}>
                        <img
                          style={{
                            width: "100%",
                            display: "inline-block",
                            height: "100%",
                          }}
                          alt={item.name}
                          src={item.image}
                        />
                        <img
                          style={{
                            width: "70px",
                            height: "70px",
                            display: "inline-block",
                            position: "absolute",
                            bottom: "-20px",
                            left: "22px",
                            border: "4px solid #fff",
                            borderRadius: "5px",
                            boxShadow: "5px 5px 5px rgba(0,0,0,.1)",
                          }}
                          alt={item.name}
                          src={item.image}
                        />
                      </div>
                    }
                    actions={[
                      <div style={{ padding: "0 12px", textAlign: "left" }}>
                        <p>{item.address}</p>
                        <em>{item.date}</em>
                      </div>,
                    ]}
                  >
                    <Meta
                      title={
                        <Title level={4} style={{ marginTop: "20px" }}>
                          {item.name}
                        </Title>
                      }
                    />
                  </Card>
                </Link>
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
    dispatch: dispatch,
  };
};
const mapStateToProps = (state) => ({
  loading_api: state.param[Param.LOADING_API],
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
