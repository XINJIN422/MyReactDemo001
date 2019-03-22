import React, {Component} from 'react'
import {
    NavBar,
    WingBlank,
    List,
    WhiteSpace,
    InputItem,
    Radio,
    Button
} from 'antd-mobile'
import Logo from '../../components/logo/logo'
import {connect} from 'react-redux'
import {register} from '../../redux/actions'
import {Redirect} from 'react-router-dom'

const ListItem = List.Item
class Register extends Component{
    state = {
        username: '',
        password: '',
        password2: '',
        type: 'dashen'
    }
    register = ()=>{
        this.props.register(this.state)
    }
    handleChange = (name, val)=>{
        this.setState({
            [name]: val
        })
    }
    toLogin = ()=>{
        this.props.history.replace("/login")
    }
    render(){
        const {type} = this.state
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
                    <WhiteSpace/>
                    <InputItem placeholder="确认密码" type="password" onChange={value => {this.handleChange("password2", value)}}>确认密码:</InputItem>
                    <ListItem>
                        <span>用户类型:</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <Radio checked={type==='dashen'} onChange={()=>this.handleChange("type", "dashen")}>大神</Radio>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <Radio checked={type==='laoban'} onChange={()=>this.handleChange("type", "laoban")}>老板</Radio>
                    </ListItem>
                    <Button type="primary" onClick={this.register}>注&nbsp;&nbsp;&nbsp;册</Button>
                    <Button onClick={this.toLogin}>已有账户</Button>
                </List>
            </WingBlank>
        </div>
    }
}

export default connect(
    state => ({user: state.user}),
    {register})(Register)