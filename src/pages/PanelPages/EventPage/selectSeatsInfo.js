import { Row, Col, Table } from "antd";
import * as React from "react";
import { CloseOutlined } from "@ant-design/icons";

class SelectSeatsInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          key: "1",
          name: "John Brown",
          age: 32,
          address: "New York No. 1 Lake Park",
          tags: ["nice", "developer"],
        },
        {
          key: "2",
          name: "Jim Green",
          age: 42,
          address: "London No. 1 Lake Park",
          tags: ["loser"],
        },
        {
          key: "3",
          name: "Joe Black",
          age: 32,
          address: "Sidney No. 1 Lake Park",
          tags: ["cool", "teacher"],
        },
      ],
      columns: [
        {
          title: "Name",
          dataIndex: "name",
          key: "name",
          render: (text) => <a>{text}</a>,
        },
        {
          title: "Row",
          dataIndex: "id",
          key: "id",
          render: (id, data) => (
            <span>
              {this.separateRowAndSeat(props.blockId, id).row}
            </span>
          ),
          // render: (id,data) => <span> {console.log(id,data)}</span>,
        },
        {
          title: "Seat",
          dataIndex: "id",
          key: "id",
          // render: text =>  {this.separateRowAndSeat(blockId, seatInfo.id).seat}</span>,
          render: (id, data) => <span> {console.log(id, data)}</span>,
        },
        {
          title: "Price",
          dataIndex: "id",
          key: "id",
          // render: text =>  {this.separateRowAndSeat(blockId, seatInfo.id).pri}</span>,
          // render: (id,data) => <span>{`${seatInfo.price}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} $</span>,
        },
        {
          title: "Action",
          key: "action",
          render: (text, record) => (
            <span>delete</span>
            // <div onClick={() => this.props.removeSeat(seatInfo,()=> console.log('remove'))}>Delete</div>
          ),
        },
      ],
    };
  }

  componentDidMount() {}

  separateRowAndSeat = (blockId, seatId = "") => {
    console.log('blockId',blockId)
    console.log('seatId',seatId)
    const rowNum = seatId.split(`${blockId}-`)[1] && seatId.split(`${blockId}-`)[1].split("-")[0] || 0;
    const seatNum = seatId.split(`${blockId}-`)[1]&&  seatId.split(`${blockId}-`)[1].split("-")[1] || 0;
    return { row: rowNum, seat: seatNum };
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
        {selectSeats.map((seatInfo) => {
          return (
            <Col xs={24} key={seatInfo.id}>
              <div className="seats-selected">
                Row:{" "}
                <span>
                  {" "}
                  {this.separateRowAndSeat(blockId, seatInfo.id).row}
                </span>
                Seat:{" "}
                <span>
                  {this.separateRowAndSeat(blockId, seatInfo.id).seat}
                </span>
                Price:{" "}
                <span>
                  {`${seatInfo.price}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")} $
                </span>{" "}
                <i>
                  {" "}
                  <CloseOutlined
                    onClick={() =>
                      this.props.removeSeat(seatInfo, () =>
                        console.log("remove")
                      )
                    }
                  />
                </i>
              </div>
            </Col>
          );
        })}
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
        <Col xs={24}>
          <Table columns={this.state.columns} dataSource={selectSeats} />
        </Col>
      </Row>
    );
  }
}

SelectSeatsInfo.defaultProps = {
  selectSeats: [{ id: "1", price: 0 }],
  blockId: "",
};

export default SelectSeatsInfo;
