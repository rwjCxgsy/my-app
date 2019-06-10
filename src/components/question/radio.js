import React, {Component} from 'react'
import styles from './radio.module.less'
import { Radio, Alert, Button, message } from 'antd';

class XRadio extends Component {
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
        const {onIsClick, onSelected} = this.props
        return ( 
            <div className={styles.xradio}>
                <strong>{radioInfo.question}</strong>
                <div className={styles['radio-group']}>
                    <div className={styles.left}>
                        <Radio.Group
                            disabled={radioInfo.value && radioInfo.isClick}
                        onChange={(e) => {
                            onSelected(radioInfo.id, e.target.value)
                        }} value={radioInfo.value}>
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
                        <Button type="primary" disabled={radioInfo.isClick} size={'large'} onClick={() => {
                            if (!radioInfo.value) {
                                message.warn('你还没有选择答案呢')
                                return
                            }
                            onIsClick(radioInfo.id)
                        }}>揭晓答案</Button>
                    </div>
                </div>
                {
                    !radioInfo.isClick ? '' :
                    <div className={styles.explains}>
                        {radioInfo.value === 'item' + radioInfo.answer ? <strong>正确</strong> : <strong>错误</strong>}
                        <Alert message={radioInfo.explains} type={radioInfo.value === 'item' + radioInfo.answer ? 'success' : 'error'} />
                    </div>
                }
            </div>
        )
    }
    componentWillReceiveProps (nextProps) {
        console.log(nextProps)
    }
    componentWillUpdate () {
        console.log('改变了')
    }
}


export default XRadio