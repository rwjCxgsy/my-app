import React, {Component} from 'react'
import {withRouter} from "react-router-dom";
import styles from './index.module.less'
import LoginForm from '../../components/loginForm'
import { message } from 'antd';

class Login extends Component {

    // eslint-disable-next-line no-useless-constructor
    constructor (props, context) {
        super(props, context);
    }
    render () {
        return(<div className={styles.login}>
            <div className={styles['login-warp']}>
                <strong>登录页面</strong>
                <LoginForm callback={this.callback.bind(this)} />
            </div>
        </div>)
    }
    callback = () => {
        console.log(this.props.history.replace('/'));
    }

    componentDidMount () {
        message.info('账号密码随便输入就行', 5)
    }
}

export default withRouter(Login)