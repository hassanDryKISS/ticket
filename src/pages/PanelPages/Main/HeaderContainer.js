import * as React from 'react';
import { Layout, Menu, Icon, Avatar, Dropdown } from 'antd';
import { Link } from 'react-router-dom';

import { logout } from '../../../utilities/Functions/SetupFunctions'

const { Header } = Layout;

class HeaderContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menu : [
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
        }, 
        // {
        //   id: 5,
        //   // route: '/login',
        //   title: 'Login',
        //   onClick: () => setVisibleLogin(true)
        // },
      ]
    };
  }



  render() {
    const { user, toggle, collapsed } = this.props

    const userAction = (
      <div className="profile-container">
        <Menu>
          <Menu.Item style={{ minWidth: 200 }} onClick={() => {
            logout('success', 'Success', 'You have successfully loged out')
          }}>
            <span >
              <Icon style={{ fontSize: '15px', marginRight: 10 }} type={'poweroff'} />
              <span className="user-text">{'Logout'}</span>
            </span>
          </Menu.Item>
          ghjgh
          {this.state.menu.map(item => (
          <Menu.Item key={`${item.id}`} onClick={item.onClick || null}>
            <Link to={item.route}>
              {/* <Icon type={item.icon} /> */}
              <span>{item.title}</span>
            </Link>
          </Menu.Item>
        ))}

        </Menu>
      </div>
    );

    return (
      <Header>
        <Icon
          style={{ fontSize: '20px', color: collapsed ? 'white' : 'white' }}
          className={"trigger"}
          type={collapsed ? 'menu' : 'close'}
          onClick={toggle}
        />
         <Menu  
          // defaultSelectedKeys={[`${activeMenu ? activeMenu.id : '1'}`]}
        mode='horizontal'
        style={{ borderBottom: 'none' }}>
          <Menu.Item style={{ minWidth: 200 }} onClick={() => {
            logout('success', 'Success', 'You have successfully loged out')
          }}>
            <span >
              <Icon style={{ fontSize: '15px', marginRight: 10 }} type={'poweroff'} />
              <span className="user-text">{'Logout'}</span>
            </span>
          </Menu.Item>
            {this.state.menu.map(item => (
          <Menu.Item key={`${item.id}`} onClick={item.onClick || null}>
            <Link to={item.route}>
              {/* <Icon type={item.icon} /> */}
              <span>{item.title}</span>
            </Link>
          </Menu.Item>
        ))}

        </Menu>
        <Dropdown overlay={userAction}>
          <div className="user-action">
            <span style={{ marginRight: 10 }}>{user !== undefined ? user.name : ''}</span>
            <Avatar icon="user" src={user !== undefined ? user.image : ''} />
          </div>
        </Dropdown>
      </Header>
    );
  }
}

export default HeaderContainer;
