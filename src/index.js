/*
    入口JS
 */
import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter, Route, Switch} from 'react-router-dom'
import Login from './containers/login/login'
import Main from './containers/main/main'
import Register from './containers/register/register'
import {Provider} from 'react-redux'
import store from './redux/store'

import './assets/css/index.less'

//测试
// import './test/socketio_test'

ReactDOM.render(
    <Provider store={store}>
        <HashRouter>
            <Switch>
                <Route path='/login' component={Login}></Route>
                <Route path='/register' component={Register}></Route>
                <Route component={Main}></Route>
                {/*没有path路径匹配到,则加载第一无路径的;无路径匹配任意路径,所以必须放在最后*/}
            </Switch>
        </HashRouter>
    </Provider>
    , document.getElementById('root'));
