import * as React from 'react';

class SeatPicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectSeats: [],
    };
  }

  componentDidMount() {

  }
  handleClick = (e) => {
    const { id, seat, state } = e.target.dataset;
    if (state !== '1') {
      return
    }
    const { addSeat, removeSeat } = this.props;
    const { selectSeats } = this.state;
    const isSelectBefore = this.state.selectSeats.find((item) => item === id);
    if (!isSelectBefore) {
      let newSeats = selectSeats;
      newSeats.push(id);
      this.setState({
        selectSeats: newSeats
      }, ()=> addSeat(seat))
      ;
    } else {
      let newSeats = selectSeats.filter(item => item !== id);
      this.setState({
        selectSeats: newSeats
      }, ()=> removeSeat(seat))
    }
  }

  renderState = (state, id) => {
    const isSelect = this.state.selectSeats.find((item) => item === id);
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
        default:
          return ''
        case 3:
          return 'red'
      }
    }
  }


	/*
		Seat status proposal
		0: Not available (Red)
		1: Available (blue)
		2: Reserved (Payment process) (Yellow)
		3: Sold ( Red )
	*/


  render() {
    const { rows, addSeat, removeSeat } = this.props;
    // console.log(rows)
    return (
      <div className="seat-picker" onClick={(e) => this.handleClick(e)}>
        {
          rows.map((row, index) => {
            return <div className="row">
              {row.map((seat, seatIndex) => {
                if (seatIndex === 0) {
                  return <><div className="seat-name" data-disable={true}>{index + 1}</div><div className={`seat ${this.renderState(seat.state)}`} data-blockId={seat.id}>{seat.number}</div></>
                }
                return <div className={`seat ${this.renderState(seat.state, seat.id)}`}
                  data-id={seat.id}
                  data-seat={JSON.stringify(seat)}
                  data-state={seat.state}
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
  addSeat: () => console.log(),
  removeSeat: () => console.log(),
}

export default SeatPicker
