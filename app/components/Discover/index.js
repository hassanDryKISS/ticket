import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Card, Avatar } from 'antd';
import img from '../../images/tabularasa-300.jpg';

import messages from './messages';

import { Wrapper } from './style';
const { Meta } = Card;

function Discover(props) {



  return (
    <Wrapper>
      <Card title='DISOVER  '>
        {Array(5).fill('').map((item) => (
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
