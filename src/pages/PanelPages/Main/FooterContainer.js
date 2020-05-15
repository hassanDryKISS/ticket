import * as React from "react";
import {
  Layout,
  Menu,
  Icon,
  Row,
  Col,
  Input,
  Button,
  Typography,
  Divider,
} from "antd";
import { Link } from "react-router-dom";
import {
  InstagramOutlined,
  LinkedinFilled,
  FacebookFilled,
} from "@ant-design/icons";

// import { logout } from '../../../utilities/Functions/SetupFunctions'

const { Footer } = Layout;
const { Title } = Typography;

class FooterContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleSearch = () => {
    const { searchParams } = this.state;
    window.location.href = `/search?keyword=${searchParams}`;
  };

  handleChange = (value) => {
    this.setState({
      searchParams: value,
    });
  };

  render() {
    return (
      <Footer
        className="footer"
        style={{ display: "flex", alignItems: "flex-end" }}
      >
        <Row
          type="flex"
          gutter={[32, 32]}
          justify="space-between"
          style={{ width: "100%", height: "100%" }}
        >
          <Col xs={24} sm={4} offset={3}>
            <Title
              style={{ fontSize: "18px", fontWeight: "500", color: "#444" }}
            >
              TICKET BUYERS
            </Title>
            <Button type="link" style={{ padding: 0, fontSize: "16px" }}>
              <Link to={`/login`}>My Ticket</Link>
            </Button>
            <Button type="link" style={{ padding: 0, fontSize: "16px" }}>
              <Link to={`/`}>Ticket Buyer Help</Link>
            </Button>
            <Button type="link" style={{ padding: 0, fontSize: "16px" }}>
              <Link to={`/`}>Lost or Stolen Tickets</Link>
            </Button>
            <Button type="link" style={{ padding: 0, fontSize: "16px" }}>
              <Link to={`/contact-us`}>Contact Us</Link>
            </Button>
          </Col>
          <Col xs={24} sm={4}>
            <Title
              style={{ fontSize: "18px", fontWeight: "500", color: "#444" }}
            >
              LEGAL
            </Title>
            <Button type="link" style={{ padding: 0, fontSize: "16px" }}>
              <Link to={`/login`}>Privacy Policy</Link>
            </Button>
            <Button type="link" style={{ padding: 0, fontSize: "16px" }}>
              <Link to={`/`}>Terms & Conditions</Link>
            </Button>
            <Button type="link" style={{ padding: 0, fontSize: "16px" }}>
              <Link to={`/`}>Cookie Notice</Link>
            </Button>
          </Col>
          <Col xs={24} sm={4}>
            <Title
              style={{ fontSize: "18px", fontWeight: "500", color: "#444" }}
            >
              PARTNER WITH US
            </Title>
            <Button type="link" style={{ padding: 0, fontSize: "16px" }}>
              <Link to={`/login`}>List Your Event</Link>
            </Button>
            <Button type="link" style={{ padding: 0, fontSize: "16px" }}>
              <Link to={`/`}>Event Ticketing Solution</Link>
            </Button>
            <Button type="link" style={{ padding: 0, fontSize: "16px" }}>
              <Link to={`/`}>Our Clients</Link>
            </Button>
            <Button type="link" style={{ padding: 0, fontSize: "16px" }}>
              <Link to={`/contact-us`}>Pricing Enquiry</Link>
            </Button>
          </Col>
          <Col xs={24} sm={4}>
            <Title
              style={{ fontSize: "18px", fontWeight: "500", color: "#444" }}
            >
              CONTACT & INFO
            </Title>
            <Button type="link" style={{ padding: 0, fontSize: "16px" }}>
              <Link to={`/login`}>Ticket Blog</Link>
            </Button>
            <Button type="link" style={{ padding: 0, fontSize: "16px" }}>
              <Link to={`/`}>Ticket Seller Login</Link>
            </Button>
            <Button type="link" style={{ padding: 0, fontSize: "16px" }}>
              <Link to={`/`}>Ticket Buyer Help</Link>
            </Button>
            <Button type="link" style={{ padding: 0, fontSize: "16px" }}>
              <Link to={`/contact-us`}>Contact Us</Link>
            </Button>
          </Col>
          <Col xs={24} sm={4}></Col>
          <Col xs={24} sm={18} offset={3}>
            <Divider color="blue" />
            <Row style={{display: 'flex'}}>
              <Col xs={10}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-around",
                  }}
                >
                  <a href="/" className="logo-box">
                    <h1>
                      <span className="underline">Vision.</span>&shy;
                      <span className="descriptionColor">Idea</span>
                    </h1>
                  </a>
                  <div>Event Ticketing For Professionals</div>
                </div>
              </Col>
              <Col xs={4}>
                <div
                  class="additional-img"
                  style={{
                    display: "inline-flex",
                    margin: "auto",
                    textAlign:
                      "center" /* margin-top: -20px; */ /* width: 100%; */,
                    flexFlow: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <img
                    src="https://cdn.ticketbooth.com.au/home/wp-content/uploads/2019/11/07202946/patron-black.png"
                    alt="patron-tech"
                    style={{ width: "100px", margin: 0 }}
                  />
                  <span
                    style={{
                      padding: "5px 0 10px 0",
                      display: "inline-block",
                      fontSize: "8px",
                      letterSpacing: ".5px",
                    }}
                  >
                    ` ⒸPatron technology 2020`
                  </span>
                </div>
              </Col>
              <Col xs={10} style={{ display: "flex" ,alignItems : 'center'}}>
                <div>
                  <span style={{ marginRight: "3px" }}>Terms of Use</span>|
                  <span style={{ marginLeft: "3px" }}>Privacy Policy</span>
                </div>
                <div style={{ marginLeft: "3px", display: 'flex',alignItems: 'center' }}>
                 @ Ticketbooth 2020
                </div>
                <div style={{ marginLeft: "3px" }}>
                  <InstagramOutlined style={{ margin: "0 3px" }} />
                  <FacebookFilled style={{ margin: "0 3px" }} />
                  <LinkedinFilled style={{ margin: "0 3px" }} />
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </Footer>
    );
  }
}

export default FooterContainer;
