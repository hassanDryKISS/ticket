import { AnimatedWayPointDiv } from "../../../utilities/components/AnimatedWayPoint";
import Discover from "../../../utilities/components/Discover";
import SubscripForUpdate from "../../../utilities/components/SubscribeForUpdate";
import {
  Select,
  Row,
  Col,
  Card,
  Button,
  Typography,
  Modal,
  Form,
  Input,
} from "antd";
import EventApis from "../../../api/componentApi/EventApis";
import HomesApis from "../../../api/componentApi/HomeApis";
import { Link } from "react-router-dom";
import * as Param from "../../../redux/Param";
import { connect } from "react-redux";
import * as React from "react";
import store from "../../../redux/store";
import { setParam } from "../../../redux/actions";
import {
  LeftOutlined,
  ClockCircleOutlined,
  ShareAltOutlined,
  CalendarOutlined,
} from "@ant-design/icons";

const { Meta } = Card;
const { Title } = Typography;
const { Option } = Select;

class EventDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visibleRemainderModal: false,
      eventInfo: [],
      eventMoreInfo: [],
    };
    this.EventServices = new EventApis();
    this.HomeServices = new HomesApis();
  }

  componentDidMount() {
    this.getEventInfo();
    if (this.props.events) {
      this.setState({
        eventMoreInfo: this.props.events.filter(
          (item) => item.id === this.props.match.params.id
        )[0],
      });
    } else {
      this.getEventsList();
    }
  }

  getEventInfo = () => {
    const { id, hallId } = this.props.match.params;
    this.EventServices.get(`events/hall/${hallId}/${id}`, {}, (response) => {
      this.setState({ eventInfo: response.data });
    });
  };

  getEventsList = () => {
    this.HomeServices.get({}, (response) => {
      this.setState({
        eventMoreInfo: response.data.filter(
          (item) => item.id === this.props.match.params.id
        )[0],
      });
      store.dispatch(setParam(Param.EVENTS, response.data));
    });
  };

  handleOk = (e) => {
    console.log(e);
    this.setState({
      visibleRemainderModal: false,
    });
  };

  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visibleRemainderModal: false,
    });
  };
  handleChange = (value) => {
    console.log(`selected ${value}`);
  };
  render() {
    const { loading_api } = this.props;
    const { eventMoreInfo, eventInfo } = this.state;
    console.log(this.state);
    return (
      <div className="event-detail">
        <header className="header ">
          <div className="header-back">
            <LeftOutlined style={{ fontSize: "22px" }} />
          </div>
          <div className="header-logo"> Vision.Idea</div>
        </header>
        <div className="main">
          <Row>
            <Col xs={24} sm={18} offset={3}>
              <div className="intro-img">
                {/* <img src={eventMoreInfo.image} alt={eventMoreInfo.name} /> */}
                <img src='https://cdn.ticketbooth.com.au/home/wp-content/uploads/2019/06/07202848/elements-1200-1.jpg' alt={eventMoreInfo.name} />
              </div>
              <div className="main-card">
                <div className="main-card-header header--right header--gray">
                  <div className="">
                    <a href="#">
                      <img
                        src="/icon/share.svg"
                        style={{
                          margin: "0 5px 0 15px",
                          display: "inline-block",
                          width: "14px",
                          height: "14px",
                        }}
                      />
                      Website
                    </a>
                    <a href="#">
                      <ShareAltOutlined style={{ margin: "0 5px 0 15px" }} />
                      Share
                    </a>
                    <div
                      href="#"
                      onClick={() =>
                        this.setState({ visibleRemainderModal: true })
                      }
                    >
                      <CalendarOutlined style={{ margin: "0 5px 0 15px" }} />
                      Add To Calendar
                    </div>
                    <a href="#">
                      <ClockCircleOutlined style={{ margin: "0 5px 0 15px" }} />
                      Set Remainder
                    </a>
                  </div>
                </div>
                <div className="main-card-main">
                  <Row gutter={[32, 32]}>
                    <Col xs={24} sm={16}>
                      <div className="main-card-content-header">
                        <time className="date-box">
                          <div className="month">OCT</div>
                          <div className="day">05</div>
                        </time>
                        <div style={{ width: "fit-content" }}>
                          <Title level={3}>
                            {" "}
                            Silvestre Technique Training Process - Adelaide
                          </Title>

                          <div
                            style={{
                              marginTop: "-12px",
                              fontSize: "14px !important",
                              color: "#6d6d6d",
                            }}
                          >
                            Mon. 5 Oct, 2020 at 9:00am ACDT
                          </div>
                        </div>
                      </div>
                      <div className="event-spec-box">
                        <div className="event-spec">143 days away </div>
                      </div>
                      <div style={{ fontSize: "8pt" }}>
                        <strong>
                          Proudly Presented by Global Arts & Cultural Connection
                          in association with Soul Sambistas and with thanks to
                          the generous support of Blueprint Health.
                        </strong>
                      </div>
                      <div>
                        <p>
                          "Dance translates what I cannot say in words. Dance
                          connects me with the Universe. Dance connects me with
                          you." - Mestra Rosangela Silvestre
                        </p>

                        <p>
                          Up to 6 hours of world-class tuition daily, for 6
                          blissful days... Program schedule released in May.
                        </p>
                        <p>
                          The training is open to all and we welcome this space
                          for everyone, all dancers - who move for personal
                          benefit, as a way of life, or for professional
                          practice.
                        </p>
                        <p>
                          It will be a great honour to participate in completing
                          the dance training practice process in Adelaide, as we
                          can do in Brazil with certified Silvestre Technique
                          Teachers, musicians and dance music composers who
                          collectively create the unique environment of this
                          training process.
                        </p>
                        <p>
                          Under the guidance of Mestra Rosangela Silvestre and
                          her expert team, participants will spend 6 days
                          exploring the elements of Silvestre Technique -
                          contemporary dance technique with the objective of
                          conditioning the dancer through physical and
                          expressive training, regardless of level or previous
                          experience.
                        </p>
                        <p>
                          Attendees will grow to understand the Symbology of
                          Orixa Dances - a study of the connections between the
                          rhythms and the traditional movement, archetype and
                          story, of the Orixa dances interpreted as an art form,
                          to discover how the sacred inspires the body to dance.
                        </p>
                      </div>
                    </Col>
                    <Col xs={24} sm={8}>
                      <div className="main-card">
                        <div className="main-card-header header--small header--blue">
                          Select <strong>Tickets</strong>
                        </div>
                        <div className="main-card-main bg--gray">
                          {true ? (
                            "Online sales are currently paused."
                          ) : (
                            <>ddd</>
                          )}
                        </div>
                      </div>

                      {/* venue */}

                      <div className="main-card" style={{ margin: "15px 0" }}>
                        <div className="main-card-header header--small header--blue">
                          Venue Details
                        </div>
                        <div className="main-card-main bg--gray">
                          <div className="map-box">
                            <div className="map">
                              {/* {eventMoreInfo && eventMoreInfo.hall && (
                                <a
                                  href={eventMoreInfo.hall.map_url}
                                  target="blank"
                                >
                                  <img src={eventMoreInfo.hall.map_image} />
                                </a>
                              )}  */}
                               { (
                                <a
                                  href='#'
                                  target="blank"
                                >
                                  <img src='https://vision-idea.com/media/hall/map/istanbul-congress-center-integrated-vip_map_001.jpeg' />
                                </a>
                              )}
                            </div>
                            <div>{eventInfo.address}</div>
                          </div>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </div>
                <div className="main-card-footer">
                  <div className="footer-links">
                    <ul>
                      <li>
                        <a href="#" target="_blank">
                          Support
                        </a>
                      </li>
                      <li>
                        <a href="#" target="_blank">
                          Terms of Service{" "}
                        </a>
                      </li>
                      <li>
                        <a href="#" target="_blank">
                          Privacy Policy
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="ticket-copy">
                  © 2020 Ticketbooth on behalf of Monte Cristo Lounge Pty Limited.  
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </div>
        <Modal
          title="Set a Reminder"
          visible={this.state.visibleRemainderModal}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={false}
        >
          <Form
            name="basic"
            initialValues={{
              remember: true,
            }}
            // onFinish={onFinish}
            // onFinishFailed={onFinishFailed}
          >
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please input your email!",
                },
              ]}
            >
              <Input style={{ width: 200 }} />
            </Form.Item>

            <Form.Item
              label="How many days before the event would you like to be sent a reminder?"
              name="day"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Select
                defaultValue="1"
                style={{ width: 200 }}
                onChange={this.handleChange}
              >
                <Option value="1">1 day</Option>
                <Option value="3">3 day</Option>
                <Option value="5">5 day</Option>
                <Option value="1week">1 Week</Option>
                <Option value="2week">2 Waek</Option>
              </Select>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
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
  events: state.param[Param.EVENTS],
});

export default connect(mapStateToProps, mapDispatchToProps)(EventDetails);
