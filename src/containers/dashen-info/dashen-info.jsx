import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {NavBar, InputItem, Button} from 'antd-mobile'
import HeaderSelector from '../../components/header-selector/header-selector'
import {updateUser} from "../../redux/actions";

class DashenInfo extends Component{
    state = {
        header: '',
        post: '',
        info: ''
    }
    setHeader = (header)=>{
        this.setState({header})
    }
    handleChange = (name, value) => {
        this.setState({[name]: value})
    }
    save = ()=>{
        this.props.updateUser(this.state)
    }
    render(){
        const {header, type} = this.props.user
        if (header){
            const path = type === 'dashen' ? '/dashen' : '/laoban'
            return <Redirect to={path}/>
        }
        return (
            <div>
                <NavBar>dashen信息完善</NavBar>
                <HeaderSelector setHeader={this.setHeader}/>
                <InputItem placeholder='请输入求职岗位' onChange={value => this.handleChange('post', value)}>求职岗位</InputItem>
                <InputItem placeholder='请输入个人介绍' onChange={value => this.handleChange('info', value)}>个人介绍</InputItem>
                <Button type='primary' onClick={this.save}>保&nbsp;&nbsp;&nbsp;存</Button>
            </div>
        )
    }
}
export default connect(
    state => ({user: state.user}),
    {updateUser}
)(DashenInfo)