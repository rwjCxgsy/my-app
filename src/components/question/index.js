import React, {Component} from 'react'
import styles from './index.module.less'
import { Pagination, BackTop} from 'antd';
import XRadio from './radio'
import {connect} from 'react-redux'


// let questionList = []
let container = null
class Question extends Component {
    state = {
        pageSize: 10,
        current: 1
    }
    render () {
        const {pageSize} = this.state
        let {current} = this.state
        const {questionList, isClick, selected} = this.props
        console.log('更新了')
        current = current - 1
        const showQuestion = []
        
        questionList.forEach((v, i) => {
            if (i >= current * pageSize && i < (current + 1) * pageSize) {
                showQuestion.push(<XRadio onSelected={selected}  onIsClick={isClick} radioInfo={v} key={'jz_' + i} index={i}/>)
            }
        })
        return ( 
            <div className={styles.question}>
                <div className={styles.main}  ref={e => container = e}>
                    <div>
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
                        total={questionList.length}
                    />
                </div>
                {/* <BackTop target={() => container} visibilityHeight={300}/> */}
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
        this.setState({
            current,
            pageSize
        })
        if (container) {
            console.log(container)
            container.scrollTop = 0
        }
    }

    async getInit () {
        // if (localStorage.question) {
        //     questionList = JSON.parse(localStorage.question)
        // } else {
        //     const d = await fetch(`http://47.102.114.90/api/jztk/query?subject=1&model=c1&testType=&=&key=9dfec6241e5d1f579010fa9fecf7d393`)
        //     const json = await d.json()
        //     const {result, error_code, reason} = json
        //     if (error_code) {
        //         return
        //     }
        //     localStorage.question = JSON.stringify(result)
        //     questionList = result            
        // }
        const d = await fetch(`http://47.102.114.90/api/jztk/query?subject=1&model=c1&testType=&=&key=9dfec6241e5d1f579010fa9fecf7d393`)
        const json = await d.json()
        const {result, error_code, reason} = json
        if (error_code) {
            return
        }
        const {addData} = this.props
        addData(result)
    }

    componentWillMount () {
        this.getInit()
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps)
    }
}

const mapState = (state, some) => {
    return {
        questionList: state.question
    }
}

const mapDispatch = (dispatch, two) => {
    return {
        addData: function (data) {
            dispatch({
                type: "ADDDATA",
                data
            })
        },
        isClick: function (id) {
            dispatch({
                type: "CLICK",
                id
            })
        },
        selected (id, value) {
            dispatch({
                type: "SELECT",
                value,
                id
            })
        }
    }
}

export default connect(mapState, mapDispatch)(Question)