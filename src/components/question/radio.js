import React, {Component} from 'react'
import styles from './radio.module.less'
import { Radio, Alert, Button, message } from 'antd';

export default class XRadio extends Component {
    state = {
        value: '',
        isClick: false
    }
    render () {
        const radioStyle = {
            display: 'block',
            height: '30px',
            lineHeight: '30px',
        };
        const setItem = (questionInfo) => {
            return Object.keys(questionInfo).filter(v => v.indexOf('item') !== -1)
        }
        const {radioInfo} = this.props
        const {isClick, value} = this.state
        return ( 
            <div className={styles.xradio}>
                <strong>{radioInfo.question}</strong>
                <div className={styles['radio-group']}>
                    <div className={styles.left}>
                        <Radio.Group onChange={this.onChange.bind(this)} value={this.state.value}>
                            {
                                setItem(radioInfo).map((item, index) => {
                                    return (
                                        <Radio style={radioStyle} key={index} value={item}>{["A", "B", "C", "D"][index]}: {radioInfo[item]}</Radio>
                                    )
                                })
                            }
                        </Radio.Group>
                        {radioInfo.url ? <img src={radioInfo.url} alt={radioInfo.explains}/> : ''}
                    </div>
                    <div className={styles.right}>
                        <Button type="primary" disabled={isClick} size={'large'} onClick={this.look.bind(this)}>揭晓答案</Button>
                    </div>
                </div>
                {
                    !isClick ? '' :
                    <div className={styles.explains}>
                        <Alert message={radioInfo.explains} type={value === 'item' + radioInfo.answer ? 'success' : 'error'} />
                    </div>
                }
            </div>
        )
    }

    look = (e) => {
        if (!this.state.value) {
            message.warn('选择后才能揭晓答案')
            return false
        }
        this.setState({
            ...this.state,
            isClick: true
        })
        const {radioInfo} = this.props
        const question = JSON.parse(localStorage.question)
        for (const iterator of question) {
            if (iterator.id === radioInfo.id) {
                iterator.isClick = true
            }
        }
        localStorage.question = JSON.stringify(question)
    }

    onChange = (e) => {
        this.setState({
            value: e.target.value,
        });

        const {radioInfo} = this.props
        const question = JSON.parse(localStorage.question)
        for (const iterator of question) {
            if (iterator.id === radioInfo.id) {
                iterator.value = e.target.value
            }
        }
        localStorage.question = JSON.stringify(question)
    }

    componentWillMount () {
        this.setState({
            isClick: this.props.isClick,
            value: this.props.value
        })
    }
}