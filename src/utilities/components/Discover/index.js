import React from 'react';

import { Card, Avatar } from 'antd';
// import img from '../../images/tabularasa-300.jpg';


const { Meta } = Card;

function Discover() {



  return (
    <>
      <Card title='DISOVER ' className="card-box">
        {Array(4).fill('').map(() => (
          <Card style={{ marginTop: 5 }} hoverable bordered={false} loading={false}>
            <Meta
              avatar={
                <Avatar shape="square" size={64} src='https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png' />
              }
              title="Tabularasa Pres. Casa Rasa"
              description=" - Feb 29th, 2020"
            />
          </Card>))}
      </Card>
    </>
  );
}

Discover.propTypes = {

};

export default Discover;
