import * as React from 'react';

class SeatPicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {

  }
  handleClick = (e) => {
    const { id, seat, state } = e.target.dataset;
    if (state !== '1' && state !== '5') {
      return
    }
    
    const { addSeat, removeSeat, selectSeats } = this.props;
    const isSelectBefore = selectSeats.find((item) => item.id === id);
    if (!isSelectBefore) {
      addSeat(JSON.parse(seat), () => {});
    } else {
      removeSeat(JSON.parse(seat), () => console.log('remove call back'))
    }
  }

  renderState = (state, id) => {
    const isSelect = this.props.selectSeats.find((item) => item.id === id);
    isSelect && console.log('rooooo',this.props.selectSeats)
    if (isSelect) {
      return 'select'
    } else {
      switch (state) {
        case 0:
          return 'disable'
        case 1:
          return 'blue'
        case 2:
          return 'yellow'
        case 4:
        case 3:
          return 'red'
        case 5:
          return 'blue'
        default:
          return 'default'
      }
    }
  }

  // NOT_AVAILABLE = 0
  //   AVAILABLE = 1
  //   BOOKING = 2
  //   BOOKED = 3
  //   BOOKED_BY_YOU = 4
  //   BOOKING_BY_YOU = 5
  //   RESERVED = 6


	/*
		Seat status proposal
		0: Not available (Red)
		1: Available (blue)
		2: Reserved (Payment process) (Yellow)
		3: Sold ( Red ) book
		5: selected !!( Orang )
	*/


  render() {
    const { rows } = this.props;
    console.log('hooooooooo',this.props)
    return (
      <div className="seat-picker" onClick={(e) => this.handleClick(e)}>
        {
          rows.map((row, index) => {
            return <div className="row" key={index}>
              {row.map((seat, seatIndex) => {
                if (seatIndex === 0) return <div className="seat-name" data-disable={true} key={seatIndex}>{index + 1}</div>
                if (seat == null) return <div className="seat separator" key={seatIndex}>00</div>
                return <div className={`seat ${this.renderState(seat.state, seat.id)}`}
                  data-id={seat.id}
                  data-seat={JSON.stringify(seat)}
                  data-state={seat.state}
                  key={seat.id}
                >{seat.number}</div>
              })}
            </div>
          })
        }
      </div>
    );
  }
}
SeatPicker.defaultProps = {
  rows: [[{ state: 'dd', id: 1, number: 1 }]],
  state: '',
  addSeat: () => console.log(),
  removeSeat: () => console.log(),
}

export default SeatPicker
