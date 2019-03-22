import React, {Component} from 'react'
import {
    NavBar,
    WingBlank,
    List,
    WhiteSpace,
    InputItem,
    Button
} from 'antd-mobile'
import Logo from '../../components/logo/logo'
import {connect} from 'react-redux'
import {login} from '../../redux/actions'
import {Redirect} from 'react-router-dom'

class Login extends Component{
    state = {
        username: '',
        password: ''
    }
    toRegister = ()=>{
        this.props.history.replace("/register")
    }
    handleChange = (name, val)=>{
        this.setState({
            [name]: val
        })
    }
    login = ()=>{
        this.props.login(this.state)
    }
    render(){
        const {msg, redirectTo} = this.props.user
        if (redirectTo){
            return <Redirect to={redirectTo}/>
        }
        return <div>
            <NavBar>硅{' '}谷{' '}直{' '}接</NavBar>
            <Logo/>
            <WingBlank>
                <List>
                    {msg ? <div className='error-msg'>{msg}</div> : null}
                    <WhiteSpace/>
                    <InputItem placeholder="请输入用户名" onChange={value => {this.handleChange("username", value)}}>用户名:</InputItem>
                    <WhiteSpace/>
                    <InputItem placeholder="请输入密码" type="password" onChange={value => {this.handleChange("password", value)}}>密&nbsp;&nbsp;&nbsp;码:</InputItem>
                    <Button type="primary" onClick={this.login}>登&nbsp;&nbsp;&nbsp;录</Button>
                    <Button onClick={this.toRegister}>还没有账户</Button>
                </List>
            </WingBlank>
        </div>
    }
}


export default connect(
    state => ({user: state.user}),
    {login})(Login)