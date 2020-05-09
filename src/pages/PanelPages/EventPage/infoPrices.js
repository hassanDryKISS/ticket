
import { 
  Descriptions, 
} from 'antd';
import * as React from 'react';


class InfoPrices extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  componentDidMount() {}

  render() {
    const { eventInfo, eventMoreInfo, } = this.props;
    return (
      <Descriptions bordered title="Price List" size={'small'} style={{ marginTop: '5px' }}>
        <Descriptions.Item label="VIP" span={3}>{`250 $ / 200 $`}</Descriptions.Item>
        <Descriptions.Item label="B" span={3}>{`180 $`}</Descriptions.Item>
        <Descriptions.Item label="A,C" span={3}>{`160 $`}</Descriptions.Item>
        <Descriptions.Item label="E" span={3}>{`130 $`}</Descriptions.Item>
        <Descriptions.Item label="D,F" span={3}>{`100 $`}</Descriptions.Item>
        {/* <Descriptions.Item label="Date" span={3}>{eventMoreInfo && eventMoreInfo.dates && eventMoreInfo.dates[0].localized_date}</Descriptions.Item>
        <Descriptions.Item label="Time" span={3}>{eventMoreInfo && eventMoreInfo.dates && eventMoreInfo.dates[0].localized_time}</Descriptions.Item>
   */}
      
      </Descriptions>
    );
  }
}

export default InfoPrices
