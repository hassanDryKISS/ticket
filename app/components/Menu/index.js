import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { PropTypes } from 'prop-types';

import { Menu } from 'antd';



function MenuComponent ({ pathname }) {
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
    },{
      id: 4,
      route: '/sell-tickets',
      title: 'SELL TICKETS',
    },
  ];
  const activeMenu = menu.find(item => item.route === pathname);
  return (

    <Menu
      onClick={e => console.log(e)}
      defaultSelectedKeys={[`${activeMenu ? activeMenu.id : '1'}`]}
      mode='horizontal'
      style={{borderBottom: 'none'}}
    >
      {menu.map(item => (
        <Menu.Item key={`${item.id}`}>
          <Link to={item.route}>
            {/* <Icon type={item.icon} /> */}
            <span>{item.title}</span>
          </Link>
        </Menu.Item>
      ))}
    </Menu>
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
