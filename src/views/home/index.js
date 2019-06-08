import React, { Component } from 'react'
import {withRouter} from "react-router-dom";
import styles from './index.module.less'
import {Layout, Row, Col, Avatar, Menu, Icon} from 'antd'
import {createHashHistory} from 'history'
const { SubMenu }  = Menu;
const { Header, Footer, Sider, Content } = Layout;

const typeColor = {
    1: 'red',
    0: 'black'
}

let type = 1

class Home extends Component {
    
    // eslint-disable-next-line no-useless-constructor
    // constructor (props, context) {
    //     super(props, context);
    //     this.state = {
    //         collapsed: false,
    //     }
    // }
    state = {
        collapsed: false,
    }
    toggleCollapsed = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        })
    }
    render () {
        const {props} = this
        return (
            <div className={styles.home}>
                <Layout style={{
                    height: '100%'
                }}>
                    <Header className={styles.header}>
                        <Row gutter={24}>
                            <Col span={4} >
                                <h2>妖道</h2>
                            </Col>
                            <Col span={16} />
                            <Col span={4} >
                                {
                                    type === 1 ? 
                                    <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                                    : <Avatar style={{ backgroundColor: '#87d068' }} icon="user" />
                                }
                            </Col>
                        </Row>
                    </Header>
                    <Layout>
                        <Sider className={styles.sider}>
                            <Menu
                                defaultSelectedKeys={['1']}
                                defaultOpenKeys={['sub1']}
                                mode="inline"
                                onClick={this.jump.bind(this)}
                                theme="light">
                                <Menu.Item key="1" path="/weather">
                                    <Icon type="pie-chart" />
                                    <span>天气预报</span>
                                </Menu.Item>
                                <Menu.Item key="3" path="/new">
                                    <Icon type="inbox" />
                                    <span>新闻</span>
                                </Menu.Item>
                                <SubMenu
                                    key="sub1"
                                    title={
                                    <span>
                                        <Icon type="mail" />
                                        <span>工具集</span>
                                    </span>
                                    }>
                                    <Menu.Item key="5">快递</Menu.Item>
                                    <Menu.Item key="6">老黄历</Menu.Item>
                                </SubMenu>
                            </Menu>
                        </Sider>
                        <Content className={styles.content}>{props.children}</Content>
                    </Layout>
                    <Footer className={styles.footer}>footer</Footer>
                </Layout>
            </div>
        )
    }

    jump = ({ item }) => {
        const {path} = item.props
        console.log(item)
        createHashHistory().replace(path)
        // history.replace(path)
    }
}

export default withRouter(Home)