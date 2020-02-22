import React, { useState } from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

// import { FormattedMessage } from 'react-intl';
// import messages from './messages';
import { Layout, Row, Col } from 'antd';
import Header from '../Header';
import { Wrapper } from './style';
import BannerRight from '../../images/banner/banner.png';

const { Content } = Layout;
function Layouts ({ children }) {
  return (
    <Wrapper>
      <Layout id='layout'>
        <Layout>
          <div style={{ background: '#fff', padding: 0 }}>
            <Header />
          </div>
          <Row style={{ marginTop: '25px' }}>
            <Col xs={0} sm={3}>
              <a href='/' tsrget='_blank' className='banner-box'>
                <img src={BannerRight} alt="banner" title="Baneer"/>
              </a>
            </Col>
            <Col xs={24} sm={18}>
              <Content
                style={{
                  // margin: '24px 16px',
                  padding: '0 24px',
                  background: '#fff',
                  minHeight: 280,
                }}
              >
                {children}
              </Content>
            </Col>
            <Col xs={0} sm={3}>
              <a href='/' tsrget='_blank' className='banner-box'>
                <img src={BannerRight} alt="banner" title="Baneer" />
              </a>
            </Col>
          </Row>
        </Layout>
      </Layout>
    </Wrapper>
  );
}

Layouts.propTypes = {
  children: PropTypes.any,
};

export default Layouts;
