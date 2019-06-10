import React, {Component} from 'react'
import styles from './index.module.less'

import { Tabs } from 'antd';
import List from './list'
const { TabPane } = Tabs;

const newsType = [
    {
      name: '头条',
      value: 'top'
    },
    {
      name: '社会',
      value: 'shehui'
    },
    {
      name: '国内',
      value: 'guonei'
    },
    {
      name: '国际',
      value: 'guoji'
    },
    {
      name: '娱乐',
      value: 'yule'
    },
    {
      name: '体育',
      value: 'tiyu'
    },
    {
      name: '军事',
      value: 'junshi'
    },
    {
      name: '科技',
      value: 'keji'
    },
    {
      name: '财经',
      value: 'caijing'
    },
    {
      name: '时尚',
      value: 'shishang'
    }
]

export default class News extends Component {
  state = {
    list: new Array(30).fill(0)
  }
    render () {
      const {list} = this.state
        return ( 
            <div className={styles.news}>
                <Tabs defaultActiveKey={'0'} className={styles.tabs} onChange={this.callback.bind(this)}>
                    {
                        newsType.map((v, i) => {
                            return (
                                <TabPane tab={v.name} key={v.value} />
                            )
                        })
                    }
                </Tabs>
                <div className={styles.main}>
                  <List list={list}/>
                </div>
            </div>
        )
    }
    callback = (key) => {
        this.initData(key)
    }

    getData = (url) => {
      return fetch(url)
    }

    async initData (type = 'toutiao') {
      const d = await this.getData(`http://47.102.114.90/api/toutiao/index?type=${type}&key=4b4fbad0b071dd8654ec37ac1f831df3`)
      const _json = await d.json()
      const {data} = _json.result
      this.setState({
        list: data
      })
    }
  
    componentWillMount () {
      this.initData()
      // loading('加载中...')
      // setTimeout(this.initData.bind(this), 350)
      // setTimeout(destory, 1000)
    }
}