import React, { Component } from 'react'
import {withRouter} from "react-router-dom";
import styles from './index.module.less'
import {Layout, Row, Col, Avatar, Menu, Icon, Input, message} from 'antd'
import {createHashHistory} from 'history'
const { SubMenu }  = Menu;
const { Header, Footer, Sider, Content } = Layout;

const Search = Input.Search;

const typeColor = {
    1: 'red',
    0: 'black'
}

let type = 1

class Home extends Component {
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
                            <Col span={3} >
                                <h2>妖道</h2>
                            </Col>
                            <Col span={7} className={styles.search}>
                                <Search
                                    placeholder=""
                                    enterButton="百度一下"
                                    size="large"
                                    onSearch={this.searchHandle.bind(this)}
                                />
                            </Col>
                            <Col span={11} />
                            <Col span={3} >
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

    searchHandle = (text) => {
        if (!text.trim()) {
            message.warn('请输入关键字')
            return false
        }
        window.open(`https://www.baidu.com/s?word=${encodeURIComponent(text)}`)
    }
}

export default withRouter(Home)