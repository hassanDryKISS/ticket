import React from 'react';

import { Card, Avatar, Typography } from 'antd';
// import img from '../../images/tabularasa-300.jpg';


const { Meta } = Card;
const { Title } = Typography;

function Discover() {



  return (
    <>
      <Card title={(<Title level={4} style={{marginBottom: 0}}>DISOVER</Title>)} className="card-box" size="small">
        {Array(4).fill('').map(() => (
          <Card style={{ marginTop: 5 }} hoverable bordered={false} loading={false} size="small">
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
