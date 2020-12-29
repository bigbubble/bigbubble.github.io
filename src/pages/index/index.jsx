import React, { Component } from 'react';
import styles from './less/index.less';
import { Layout, Menu, Divider } from 'antd';
import MdParser from './components/MdParser';
import MdUrlContext from './context/context';
import mdUrlData from './datasource/mdurldata';

const { Sider, Content, Footer } = Layout;
const { SubMenu } = Menu;

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mdInfo: { name: '', url: '' },
      mdContent: '',
    };
  }

  // 获取md文件内容
  async getMdPage(mdInfo) {
    this.setState({
      mdInfo: mdInfo,
      mdContent: mdInfo.url,
    });
  }

  // 生成菜单数组
  generateMenu = menuData => {
    return menuData.map(m => {
      if (m.children && m.children.length > 0) {
        return (
          <SubMenu key={m.name} title={m.name}>
            {this.generateMenu(m.children)}
          </SubMenu>
        );
      } else {
        return (
          <Menu.Item key={m.name} onClick={() => this.getMdPage(m)}>
            {m.name}
          </Menu.Item>
        );
      }
    });
  };

  render() {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider theme={'light'} collapsible>
          <div className="logo" />
          <Menu theme="light" mode="inline" defaultSelectedKeys={['首页']}>
            {this.generateMenu(mdUrlData)}
          </Menu>
        </Sider>
        <Layout style={{ marginLeft: 0 }}>
          <Content style={{ margin: '10px 60px 0', overflow: 'initial' }}>
            <div style={{ textAlign: 'right' }}>{this.state.mdInfo.date}</div>
            <Divider plain style={{ margin: '4px 0' }}></Divider>
            <MdUrlContext.Provider value={{ mdPage: this.state.mdContent }}>
              <MdParser />
            </MdUrlContext.Provider>
          </Content>
          <Footer style={{ textAlign: 'center' }}>pengbo.me</Footer>
        </Layout>
      </Layout>
    );
  }
}
