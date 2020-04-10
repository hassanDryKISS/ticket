
import { Row, Col } from 'antd';
import * as React from 'react';
import { CloseOutlined } from '@ant-design/icons'


class SelectSeatsInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  componentDidMount() { }

  separateRowAndSeat = (blockId, seatId='') => {
    const rowNum = seatId.split(`${blockId}-`)[1].split('-')[0] || 0
    const seatNum = seatId.split(`${blockId}-`)[1].split('-')[1] || 0
    return { row: rowNum, seat: seatNum }
  }

  calcTotalPrice = (selectSeats) => selectSeats.reduce((accumulator, currentValue) => accumulator + currentValue.price, 0)



  render() {
    const { selectSeats, blockId } = this.props;
    return (
      <Row className="seats-info" gutter={[8]}>
        {selectSeats.map((seatInfo) => {
          return <Col xs={24} sm={9} key={seatInfo.id}>
            <div className="seats-selected">
              Row: <span> {this.separateRowAndSeat(blockId, seatInfo.id).row}</span>
              Seat: <span>
                {this.separateRowAndSeat(blockId, seatInfo.id).seat}</span>
              Price: <span>{`${seatInfo.price}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} $</span> <i> <CloseOutlined onClick={() => this.props.removeSeat(seatInfo,()=> console.log('remove'))} /></i>
            </div>
          </Col>
        })}
        {
         selectSeats.length> 0 &&  <Col xs={24}>
         Total Price: <span>{`${this.calcTotalPrice(selectSeats)}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} </span>
       </Col>
        }
      </Row>
    );
  }
}

SelectSeatsInfo.defaultProps = {
  selectSeats: [{ id: '1', price: 0 }],
  blockId: ''


}

export default SelectSeatsInfo
