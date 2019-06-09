import React, {Component} from 'react'
import styles from './index.module.less'
import { Pagination, BackTop} from 'antd';
import XRadio from './radio'


let questionList = []
let container = null
export default class Question extends Component {
    state = {
        pageSize: 10,
        current: 1
    }
    render () {
        const {pageSize} = this.state
        let {current} = this.state
        current = current - 1
        const showQuestion = []
        questionList.forEach((v, i) => {
            if (i >= current * pageSize && i < (current + 1) * pageSize) {
                showQuestion.push(<XRadio key={'jz_' + i} radioInfo={v}/>)
            }
        })
        return ( 
            <div className={styles.question}>
                <div className={styles.main}>
                    <div  ref={e => container = e}>
                        {
                            showQuestion
                        }
                    </div>
                </div>
                <div className={styles.fenye}>
                    <Pagination
                        showSizeChanger
                        pageSizeOptions={['10', '20', '30']}
                        onChange={this.onShowSizeChange.bind(this)}
                        onShowSizeChange={this.onShowSizeChange.bind(this)}
                        defaultCurrent={current}
                        total={30}
                    />
                </div>
                <BackTop target={() => container} visibilityHeight={300}/>
            </div>
        )
    }

    // onChange = (page, pageSize) => {
    //     this.setState({
    //         current: page,
    //         pageSize
    //     })
    // }

    onShowSizeChange = (current, pageSize) => {
        console.log(current, pageSize)
        questionList = JSON.parse(localStorage.question)
        this.setState({
            current,
            pageSize
        })
        if (container) {
            console.log(container)
            container.scrollTo = 0
            container.scrollTo = 0
        }
    }

    async getInit () {
        if (localStorage.question) {
            questionList = JSON.parse(localStorage.question)
        } else {
            const d = await fetch(`http://47.102.114.90/api/jztk/query?subject=1&model=c1&testType=&=&key=9dfec6241e5d1f579010fa9fecf7d393`)
            const json = await d.json()
            const {result, error_code, reason} = json
            if (error_code) {
                return
            }
            localStorage.question = JSON.stringify(result)
            questionList = result            
        }
        const {current, pageSize} = this.state
        this.onShowSizeChange(current, pageSize)
    }

    componentWillMount () {
        this.getInit()
    }
}