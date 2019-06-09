import React from 'react'

import {Route, Switch, Redirect} from 'react-router-dom'
// import Login from '../views/login'

const isLogin = true

export default function renderRoutes (route) {
    console.log('生成路由')
    return (
        <Switch>
            {
                route.map((v, i) => {
                    if (v.children) {
                        return <Route key={i} path={v.path} render={() => {
                            return (
                                <v.component>
                                    {
                                        renderRoutes(v.children)
                                    }
                                </v.component>
                            )
                        }} />
                    } else {
                        return <Route key={i} exact path={v.path} render={(props) => {
                            document.title = v.title || '妖道'
                            console.log(v.redirect)
                            return <v.component />
                            // return isLogin ? <v.component /> : <Redirect to="/login" />
                        }} />
                    }
                })
            }
        </Switch>
    )
}