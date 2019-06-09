import React, {Component} from 'react'
import styles from './index.module.less'
import {Button, message} from 'antd'
import QRCode from 'qrcode'

export default class QR extends Component {
    state = {
        msg: '',
        url: ''
    }
    render () {
        const {msg, url} = this.state
        return ( 
            <div className={styles.qr}>
                <div className={styles.main}>
                    <section>
                        <div>
                            <textarea value={msg} placeholder="输入生成二维码内容" onChange={(e) => {
                                this.setState({
                                    msg: e.target.value
                                })
                            }}></textarea>
                        </div>
                        <Button onClick={this.generateQR.bind(this)}>生成二维码</Button>
                    </section>
                    <section className={styles.right}>
                        <div>
                            <img src={url} alt="二维码"/>
                        </div>
                        <Button type="primary" shape="round" icon="download" size='large'>
                            下载
                        </Button>
                    </section>
                </div>
            </div>
        )
    }

    generateQR = () => {
        QRCode.toDataURL(this.state.msg || window.location.href, {width: 200}).then(url => {
            console.log(url)
            this.setState({
                url,
                msg: this.state.msg
            })
        }).catch(e => {
            message.error(e)
        })
    }
    componentWillMount () {
        this.generateQR()
    }
}