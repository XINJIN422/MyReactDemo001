import React, {Component} from 'react'
import {connect} from 'react-redux'
import UserList from '../../components/user-list/user-list'
import {getUserList} from '../../redux/actions'

class LaoBan extends Component{
    componentDidMount(){
        this.props.getUserList("dashen")
    }
    render(){
        return <UserList userList={this.props.userlist}/>
    }
}
export default connect(
    state => ({userlist: state.userlist}),
    {getUserList}
)(LaoBan)
