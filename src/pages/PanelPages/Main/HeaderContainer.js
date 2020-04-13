import * as React from 'react';
import { Layout, Menu, Icon, Row, Col, Input, Button, AutoComplete } from 'antd';
import { Link } from 'react-router-dom';

// import { logout } from '../../../utilities/Functions/SetupFunctions'

const { Header } = Layout;

class HeaderContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menu: [
        {
          id: 1,
          route: '/Home',
          title: 'HOME',
        },
        // {
        //   id: 2,
        //   route: '/search-event',
        //   title: 'SEARCH EVENTs',
        // },
        // {
        //   id: 3,
        //   route: '/my-ticket',
        //   title: 'MY TICKETS',
        // }, {
        //   id: 4,
        //   route: '/sell-tickets',
        //   title: 'SELL TICKETS',
        // },
        {
          id: 5,
          route: '/login',
          title: 'Login / Register',
          // onClick: () => setVisibleLogin(true)
        },
      ],
      searchParams: ''
    };
  }

  handleSearch = () => {
    const { searchParams } = this.state;
    window.location.href = `/search?keyword=${searchParams}`;
  }

  handleChange = (value) => {
    this.setState({
      searchParams: value
    })
  }



  render() {

    // const userAction = (
    //   <div className="profile-container">
    //     <Menu>
    //       <Menu.Item style={{ minWidth: 200 }} onClick={() => {
    //         logout('success', 'Success', 'You have successfully loged out')
    //       }}>
    //         <span >
    //           <Icon style={{ fontSize: '15px', marginRight: 10 }} type={'poweroff'} />
    //           <span className="user-text">{'Logout'}</span>
    //         </span>
    //       </Menu.Item>

    //       {this.state.menu.map(item => (
    //         <Menu.Item key={`${item.id}`} onClick={item.onClick || null}>
    //           <Link to={item.route}>
    //             {/* <Icon type={item.icon} /> */}
    //             <span>{item.title}</span>
    //           </Link>
    //         </Menu.Item>
    //       ))}

    //     </Menu>
    //   </div>
    // );

    return (
      <Header style={{ display: 'flex', alignItems: 'flex-end' }}>

        <Row type='flex' justify='space-between' style={{ width: '100%', height: '100%' }}>
          <Col xs={12} sm={3}>
            <a href="/" className='logo-box'>
              {/* <img src={logo} title="logo" alt="logo" /> */}
              <h1><span className="underline">Vision.</span>&shy;<span className="descriptionColor">Idea</span></h1>
            </a>
          </Col>
          <Col xs={0} sm={6}>
            <AutoComplete
              className='global-search'
              size='large'
              style={{ width: '100%', marginTop: '7px' }}
              // dataSource={dataSource.map(renderOption)}
              // onSelect={onSelect}
              onSearch={this.handleChange}
              placeholder='input here'
              optionLabelProp='text'
            >
              <Input
                suffix={
                  <Button
                    onClick={this.handleSearch}

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
          <Col xs={12} sm={10} type='flex' style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end' }}>
            <Menu
              // defaultSelectedKeys={[`${activeMenu ? activeMenu.id : '1'}`]}
              mode='horizontal'
              style={{ borderBottom: 'none' }}>

              {this.state.menu.map(item => (
                <Menu.Item key={`${item.id}`} onClick={item.onClick || null}>
                  <Link to={item.route}>
                    {/* <Icon type={item.icon} /> */}
                    <span>{item.title}</span>
                  </Link>
                </Menu.Item>
              ))}

            </Menu>
          </Col>
        </Row>
      </Header>
    );
  }
}

export default HeaderContainer;
