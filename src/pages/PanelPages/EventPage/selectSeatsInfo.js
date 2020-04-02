
import { Row, Col } from 'antd';
import * as React from 'react';


class SelectSeatsInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  componentDidMount() { }



  render() {
    const { } = this.props;
    return (
    <Row className="seats-info" gutter={[8]}>
      <Col xs={24} sm={12}>
      <div className="seats-selected">
         Row: <span> 1 </span> Seat: <span>12</span> Price: <span>1000 $</span> <i> remove</i>
        </div> 
      </Col>   <Col xs={24} sm={12}>
      <div className="seats-selected">
         Row: <span> 1 </span> Seat: <span>12</span> Price: <span>1000 $</span> <i> remove</i>
        </div> 
      </Col>   <Col xs={24} sm={12}>
      <div className="seats-selected">
         Row: <span> 1 </span> Seat: <span>12</span> Price: <span>1000 $</span> <i> remove</i>
        </div> 
      </Col>
      
      </Row>
    );
  }
}

export default SelectSeatsInfo
