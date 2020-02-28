import React from 'react';
// import PropTypes from 'prop-types';
// import { FormattedMessage } from 'react-intl';
import { Card, Avatar } from 'antd';
import img from '../../images/tabularasa-300.jpg';

// import messages from './messages';

import { Wrapper } from './style';
const { Meta } = Card;

function Discover() {



  return (
    <Wrapper>
      <Card title='DISOVER ' className="card-box">
        {Array(4).fill('').map(() => (
          <Card style={{ marginTop: 5 }} hoverable bordered={false} loading={false}>
            <Meta
              avatar={
                <Avatar shape="square" size={64} src={img} />
              }
              title="Tabularasa Pres. Casa Rasa"
              description=" - Feb 29th, 2020"
            />
          </Card>))}
      </Card>
    </Wrapper>
  );
}

Discover.propTypes = {

};

export default Discover;
