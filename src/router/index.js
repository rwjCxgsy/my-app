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
        component: Home,
        exact: true,
        title: '妖道',
        children: [
            {
                path: '/weather',
                component: Weather,
                title: '天气预报'
            },
            {
                path: '/news',
                component: News,
                title: '新闻快讯'
            },
            {
                path: '/utils/question',
                component: Question,
                title: '快递查询'
            },
            {
                path: '/utils/qr',
                component: QR,
                title: '老黄历'
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