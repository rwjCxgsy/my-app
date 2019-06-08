import React, {Component} from 'react'
import {createHashHistory} from 'history'
import {HashRouter} from 'react-router-dom'

import routers from './router.js'
import Home from '../views/home'
import Login from '../views/login'

import Weather from '../components/weather'
import News from '../components/news'

const history = createHashHistory()

const router = [
    {
        path: '/',
        component: Home,
        exact: true,
        title: '妖道',
        children: [
            {
                path: '/',
                component: News,
                title: '天气预报'
            },
            {
                path: '/news',
                component: News,
                title: '新闻快讯'
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