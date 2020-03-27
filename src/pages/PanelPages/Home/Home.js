
import { AnimatedWayPointDiv } from '../../../utilities/components/AnimatedWayPoint'
import { Row, Col } from 'antd';
import HomesApis from '../../../api/componentApi/HomeApis'
import * as Param from '../../../redux/Param'
import { connect } from 'react-redux'
import * as React from 'react';







class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
    this.HomeServices = new HomesApis()
  }


  componentDidMount() {
  }

  render() {
    return (
      <AnimatedWayPointDiv>
        <Row>
          <Col>
            dfdf
          </Col>
        </Row>
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
  loading_api: state.param[Param.LOADING_API]
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)
