import { Row, Col, Table } from "antd";
import * as React from "react";
import { CloseOutlined } from "@ant-design/icons";

class SelectSeatsInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.selectSeats,
      columns: [
        {
          title: "Name",
          dataIndex: "name",
          key: "name",
          render: (_, data) => (
            <span>{this.separateBlockRowSeat(data.id).blockName}</span>
          ),
        },
        {
          title: "Row",
          dataIndex: "id",
          key: "id",
          render: (_, data) => (
            <span>{this.separateBlockRowSeat(data.id).row}</span>
          ),
        },
        {
          title: "Seat",
          dataIndex: "id",
          key: "id",
          render: (_, data) => (
            <span>{this.separateBlockRowSeat(data.id).seat}</span>
          ),
        },
        {
          title: "Price",
          dataIndex: "id",
          key: "id",
          render: (_, data) => (
            <span>
              {`${data.price}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")} $
            </span>
          ),
        },
        {
          title: "Action",
          key: "action",
          render: (_, data) => (
            <div
              onClick={() =>
                this.props.removeSeat(data, () => console.log("remove"))
              }
            >
              <a>Delete</a>
            </div>
          ),
        },
      ],
    };
  }

  componentDidMount() {}

  separateBlockRowSeat = (seatId = "") => {
    const arraySplitSeatId = seatId.split("-").reverse();
    const seatNum = arraySplitSeatId[0];
    const rowNum = arraySplitSeatId[1];
    const blockName = arraySplitSeatId[2].toUpperCase();
    return { blockName, row: rowNum, seat: seatNum };
  };

  calcTotalPrice = (selectSeats) =>
    selectSeats.reduce(
      (accumulator, currentValue) => accumulator + currentValue.price,
      0
    );

  render() {
    const { selectSeats, blockId } = this.props;
    return (
      <Row className="seats-info" gutter={[8]}>
        <Col xs={24}>
          <Table columns={this.state.columns} dataSource={selectSeats} pagination={false} size="small"/>
        </Col>
        {selectSeats.length > 0 && (
          <Col xs={24}>
            Total Price:{" "}
            <span>
              {`${this.calcTotalPrice(selectSeats)}`.replace(
                /\B(?=(\d{3})+(?!\d))/g,
                ","
              )}{" "}
            </span>
          </Col>
        )}
      </Row>
    );
  }
}

SelectSeatsInfo.defaultProps = {
  selectSeats: [{ id: "1", price: 0 }],
  blockId: "",
};

export default SelectSeatsInfo;
