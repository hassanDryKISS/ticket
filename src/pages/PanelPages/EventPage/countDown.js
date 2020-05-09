import { Statistic } from "antd";
import * as React from "react";

const { Countdown } = Statistic;

function onFinish() {
  console.log("finished!");
}
class CountDown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {}

  render() {
    const { eventInfo, eventMoreInfo } = this.props;
    // const deadline = Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 30; // Moment is also OK
    const deadline = Date.now(eventMoreInfo && eventMoreInfo.dates && eventMoreInfo.dates[0].timestamp) // Moment is also OK

    return (
      <Countdown
        title=""
        value={deadline}
        onFinish={onFinish}
      />
    );
  }
}

export default CountDown;
