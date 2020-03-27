import * as React from 'react';
import { Layout, Menu, Icon } from 'antd';

const { Sider } = Layout;
const { SubMenu } = Menu;

class SideMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  menuType(item, index) {
    if (item.subMenu.length > 0) {
      return <SubMenu
        selectedKeys={[this.props.subPageIndex]}
        key={index}
        title={
          <span>
            <Icon style={{ fontSize: '22px', marginLeft: -4 }} type={item.icon} />
            <span className="menu-text">{item.text}</span>
          </span>
        }
      >
        {item.subMenu.map((itemJ, indexJ) => (
          <Menu.Item className="menu-sub-text" key={(index + indexJ).toString()}>{itemJ.text}</Menu.Item>
        ))}
      </SubMenu>
    }
    else {
      return <Menu.Item onClick={() => this.props.history.push(item.page)} key={index}>
        <Icon style={{ fontSize: '22px', marginLeft: -4 }} type={item.icon} />
        <span className="menu-text">{item.text}</span>
      </Menu.Item>
    }
  }

  render() {
    const { menu, collapsed } = this.props
    return (
      <Sider width={250} trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" style={{
          justifyContent: !collapsed ?
            'flex-start' : 'center'
        }}>
          {collapsed ? 'TAX-A' : 'Tax Advisor Admin'}
        </div>
        <Menu theme="dark" selectedKeys={[this.props.pageIndex]} mode="inline">
          {menu.map((item, index) => (
            this.menuType(item, index)
          ))}
        </Menu>
      </Sider>
    );
  }
}

export default SideMenu;
