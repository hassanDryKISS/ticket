import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { PropTypes } from 'prop-types';

import { Menu } from 'antd';
import Login2 from "../Login";



function MenuComponent({ pathname }) {
  const menu = [
    {
      id: 1,
      route: '/Home',
      title: 'HOME',
    },
    {
      id: 2,
      route: '/search-event',
      title: 'SEARCH EVENTs',
    },
    {
      id: 3,
      route: '/my-ticket',
      title: 'MY TICKETS',
    }, {
      id: 4,
      route: '/sell-tickets',
      title: 'SELL TICKETS',
    }, {
      id: 5,
      // route: '/login',
      title: 'Login',
      onClick: () => setVisibleLogin(true)}
  ];
  const activeMenu = menu.find(item => item.route === pathname);
  const [visibleLogin,setVisibleLogin] = useState(false);
  const handleCancelVisibleLogin = () => {
    setVisibleLogin(false)
  }
  return (
    <>
      <Login2 visible={visibleLogin} cancel={handleCancelVisibleLogin}/>
      <Menu
        // onClick={e => console.log(e)}
        defaultSelectedKeys={[`${activeMenu ? activeMenu.id : '1'}`]}
        mode='horizontal'
        style={{ borderBottom: 'none' }}
      >
        {menu.map(item => (
          <Menu.Item key={`${item.id}`} onClick={item.onClick || null}>
            <Link to={item.route}>
              {/* <Icon type={item.icon} /> */}
              <span>{item.title}</span>
            </Link>
          </Menu.Item>
        ))}
      </Menu>
    </>
  );
}

MenuComponent.propTypes = {};

const mapStateToProps = state => ({
  pathname: state.router.location.pathname,
  search: state.router.location.search,
  hash: state.router.location.hash,
});

MenuComponent.propTypes = {
  pathname: PropTypes.any,
};

export default connect(mapStateToProps)(MenuComponent);
