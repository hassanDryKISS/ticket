
import { AnimatedWayPointDiv } from '../../../utilities/components/AnimatedWayPoint'
import Discover from '../../../utilities/components/Discover'
import SubscripForUpdate from '../../../utilities/components/SubscribeForUpdate'
import {
  Breadcrumb, Spin, Row, Col,
  Typography,
  Card, Avatar
} from 'antd';

import SearchesApis from '../../../api/componentApi/SearchesApis'

import queryString from 'query-string'
import * as Param from '../../../redux/Param'

import { connect } from 'react-redux'
import * as React from 'react';
import store from "../../../redux/store";
import { setParam } from '../../../redux/actions'

const { Title } = Typography;

const { Meta, } = Card;



class SearchPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      result : []

    };
    this.SearchServices = new SearchesApis()

  }

  getSearch = (keyword) => {

   
    this.SearchServices.get(`events/${keyword}`, {}, (response) => {
      this.setState({ result: response.data })
    })
  }

  componentDidMount() {
    let params = queryString.parse(this.props.history.location.search)
    if(params.keyword){
      this.getSearch()
    }
  }




  render() {
    const { loading_api } = this.props;
    const params = queryString.parse(this.props.history.location.search)

    const { } = this.state;
    return (<>
      <Breadcrumb>
        <Breadcrumb.Item href="/">
          Home
        </Breadcrumb.Item>
        <Breadcrumb.Item >Search</Breadcrumb.Item>
      </Breadcrumb>
    <Title>Events matching "{params.keyword}"</Title>
      <AnimatedWayPointDiv>
        {loading_api ? (<div className="spin-box">
          <Spin size="large" spinning={loading_api} />
        </div>) : (<Row gutter={[16, 16]}>
          <Col xs={24} sm={16}>
            <Card style={{ marginBottom: 16 }} loading={loading_api}>
              <Meta
                avatar={
                  <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                }
                title="Card title"
                description="This is the description"
              />
            </Card>


            <p>
              Try making your search parameters more brief, or trying searching part of the event name. If you are still unable to find an event
              please contact visit our contact us section of our website and one of our staff will be happy to assist.
            </p>
          </Col>
          <Col xs={24} sm={8}>
            <SubscripForUpdate />
            <Discover />
          </Col>
        </Row>)
        }
      </AnimatedWayPointDiv>

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
  loading_api: state.param[Param.LOADING_API],
});


const WrappedCreateForm = connect(mapStateToProps, mapDispatchToProps)(SearchPage);

export default WrappedCreateForm
