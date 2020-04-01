
import {
  Card,
} from 'antd';
import * as React from 'react';


class SeatBlock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  componentDidMount() { }

  renderBlock = (setMap) => {
    return Object.keys(setMap.map).map((item, index) => {
      if (setMap.map[item].name !== 'VIP') {
        return <div className="block" key={index} onClick={() => this.props.handleSelectBlock(setMap.map[item], item)}> {setMap.map[item].name}</div>
      }
      return ''
    })
  }

  renderVip = (setMap) => {
    return Object.keys(setMap.map).map((item, index) => {
      if (setMap.map[item].name === 'VIP') {
        return <div className="vip" key={index} onClick={() => this.props.handleSelectBlock(setMap.map[item], item)}> {setMap.map[item].name}</div>
      }
      return ''
    })
  }


  render() {
    const { loading, eventMoreInfo, } = this.props;
    return (
      <Card title="Seat Select" className="seat-map" loading={loading}>
        <div className="stage">Stage</div>
        {this.renderVip(eventMoreInfo.hall.extra_info)}
        <div className="block-box">
          {this.renderBlock(eventMoreInfo.hall.extra_info)}
        </div>
      </Card>
    );
  }
}

export default SeatBlock
