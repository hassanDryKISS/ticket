
import { 
  Descriptions, 
} from 'antd';
import * as React from 'react';


class InfoTicket extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  componentDidMount() {}

  render() {
    const { eventInfo, eventMoreInfo, } = this.props;
    return (
      <Descriptions bordered layout='vertical' size={'small'} style={{ marginTop: '5px' }}>
        <Descriptions.Item label="Name" span={3}>{eventMoreInfo && eventMoreInfo.hall && eventMoreInfo.hall.name}</Descriptions.Item>
        <Descriptions.Item label="Date" span={3}>{eventMoreInfo && eventMoreInfo.dates && eventMoreInfo.dates[0].localized_date}</Descriptions.Item>
        <Descriptions.Item label="Time" span={3}>{eventMoreInfo && eventMoreInfo.dates && eventMoreInfo.dates[0].localized_doors_opening_date}</Descriptions.Item>
        <Descriptions.Item label="Address" span={3}>{eventInfo.address}</Descriptions.Item>
        <Descriptions.Item label="Locations" span={3}>{eventMoreInfo && eventMoreInfo.hall &&
          <a href={eventMoreInfo.hall.map_url} target="blank">
            <div className="img-box" style={{ background: `url('${eventMoreInfo.hall.map_image}') center center`, height: '280px' }}></div>
          </a>
        }</Descriptions.Item>
      </Descriptions>
    );
  }
}

export default InfoTicket
