import React, {Component} from 'react'
import {createHashHistory} from 'history'
import {HashRouter} from 'react-router-dom'

import routers from './router.js'
import Home from '../views/home'
import Login from '../views/login'

import Weather from '../components/weather'
import News from '../components/news'
import Question from '../components/question'
import QR from '../components/qr'

const history = createHashHistory()

const router = [
    {
        path: '/',
        redirect: '/home/weather',
        exact: true,
        title: '妖道',
        component: Home,
    },
    {
        path: '/home',
        component: Home,
        exact: true,
        title: '妖道',
        children: [
            {
                path: '/home/weather',
                component: Weather,
                title: '天气预报'
            },
            {
                path: '/home/news',
                component: News,
                title: '新闻快讯'
            },
            {
                path: '/home/utils/question',
                component: Question,
                title: '驾照题库'
            },
            {
                path: '/home/utils/qr',
                component: QR,
                title: '生成二维码'
            }
        ]
    },
    {
        path: '/login',
        component: Login,
        exact: true,
        title: '用户登录'
    }
]

export default class AppRouter extends Component {
    render () {
        return <HashRouter history={history}>
            {routers(router)}
        </HashRouter>
    }
}