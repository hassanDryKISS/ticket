import * as React from 'react';

class SeatPicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {

  }
  handleClick = (e) => {
    console.log(e.target.dataset)
  }
  renderState = (state) => {
    // console.log(state)
    return 'hassan'

  }




  render() {
    const { rows } = this.props;
    // console.log(rows)
    return (
      <div className="seat-picker" onClick={(e) => this.handleClick(e)}>
        {/* <div className="row row--select" >
          <div className="seat-name">1</div>
          <div className="seat" data-blockId="dsd">1</div>
        </div>
        <div className="row ">
          <div className="seat-name">1</div>
          <div className="seat separator">1</div>
          <div className="seat separator">2</div>
        </div>
        <div className="row ">
          <div className="seat-name">1</div>
          <div className="seat">1</div>
        </div> */}


        {
          rows.map((row, index) => {
            return <div className="row">
              {row.map((seat, seatIndex) => {
                if (seatIndex === 0) {
                return <><div className="seat-name">{index + 1}</div><div className={`seat ${this.renderState(seat.state)}`} data-blockId={seat.id}>{seat.number}</div></>
                }
                return <div className={`seat ${this.renderState(seat.state)}`} data-blockId={seat.id}>{seat.number}</div>
              })}
            </div>
          })
        }
      </div>
    );
  }
}
SeatPicker.defaultProps = {
  rows: [[{ state: 'dd', id: 1, number: 1 }]]
}

export default SeatPicker
