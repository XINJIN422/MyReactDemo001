import React, {Component} from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import DashenInfo from '../dashen-info/dashen-info'
import LaobanInfo from '../laoban-info/laoban-info'
import Laoban from '../laoban/laoban'
import Dashen from '../dashen/dashen'
import Message from '../message/message'
import Personal from '../personal/personal'
import Chat from '../chat/chat'
import NotFound from '../../components/not-found/not-found'
import {connect} from 'react-redux'
import Cookies from 'js-cookie'
import {getRedirectTo} from "../../utils";
import {getUser} from "../../redux/actions";
import {NavBar} from 'antd-mobile'
import NavFooter from '../../components/nav-footer/nav-footer'

class Main extends Component{
    // 给组件对象添加属性
    navList = [ // 包含所有导航组件的相关信息数据
        {
            path: '/laoban', // 路由路径
            component: Laoban,
            title: '大神列表',
            icon: 'dashen',
            text: '大神'
        },
        {
            path: '/dashen', // 路由路径
            component: Dashen,
            title: '老板列表',
            icon: 'laoban',
            text: '老板'
        },
        {
            path: '/message', // 路由路径
            component: Message,
            title: '消息列表',
            icon: 'message',
            text: '消息'
        },
        {
            path: '/personal', // 路由路径
            component: Personal,
            title: '用户中心',
            icon: 'personal',
            text: '个人'
        }
    ]
    componentDidMount(){
        const userid = Cookies.get("userid")
        const {id} = this.props.user
        if (userid && !id){
            this.props.getUser()
        }
    }
    render(){
        const userid = Cookies.get("userid")
        if (!userid){
            return <Redirect to='/login'/>
        }
        const {user, unReadCount} = this.props
        if (!user.id){
            return null
        } else {
            let path = this.props.location.pathname;
            if (path === "/"){
                path = getRedirectTo(user.type,  user.header);
                return <Redirect to={path}/>
            }
        }

        const {navList} = this
        const path = this.props.location.pathname
        const currentNav = navList.find(navList => navList.path === path)
        if (currentNav){
            if (user.type === 'laoban' ){
                navList[1].hide = true
            } else {
                navList[0].hide = true
            }
        }
        return (
            <div>
                {currentNav ? <NavBar className='sticky-header'>{currentNav.title}</NavBar> : null }
                <Switch>
                    {
                        navList.map(nav => <Route key={nav.path} path={nav.path} component={nav.component}/>)
                    }
                    <Route path='/laobaninfo' component={LaobanInfo}/>
                    <Route path='/dasheninfo' component={DashenInfo}/>
                    <Route path='/chat/:userid' component={Chat}/>
                    <Route component={NotFound}/>
                </Switch>
                {currentNav ? <NavFooter navList={navList} unReadCount={unReadCount}>底部导航</NavFooter> : null }
            </div>
        )
    }
}

export default connect(
    state => ({user: state.user, unReadCount: state.chat.unReadCount}),
    {getUser}
)(Main)