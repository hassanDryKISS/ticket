import React from 'react';
import { Row, Col, AutoComplete, Input, Button, Icon } from 'antd';
import logo from '../../images/logo/tickit_blue.png';
import { Wrapper } from './style';
// const { SubMenu, Item } = Menu;

import Menu from '../Menu';
const { Option } = AutoComplete;

export default function Header () {
  return (
    <Wrapper>
      <header style={{ boxShadow: '0 2px 8px #f0f1f2', textAlign: 'right' }}>
        <Row type='flex' justify='space-between'>
          <Col xs={12} sm={3}>
            <a href="/" className='logo-box'>
              <img src={logo} title="logo" alt="logo" />
            </a>
          </Col>
          <Col xs={0} sm={6}>
            <AutoComplete
              className='global-search'
              size='large'
              style={{ width: '100%', marginTop: '7px' }}
              // dataSource={dataSource.map(renderOption)}
              // onSelect={onSelect}
              // onSearch={this.handleSearch}
              placeholder='input here'
              optionLabelProp='text'
            >
              <Input
                suffix={
                  <Button
                    className='search-btn'
                    style={{ marginRight: -12 }}
                    size='large'
                    type='primary'
                  >
                    <Icon type='search' />
                  </Button>
                }
              />
            </AutoComplete>
          </Col>
          <Col xs={24} sm={10}>
            <Menu />
          </Col>
        </Row>
      </header>
    </Wrapper>
  );
}
