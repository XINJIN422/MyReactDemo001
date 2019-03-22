import React, {Component} from 'react'
import {WingBlank, WhiteSpace, Card} from 'antd-mobile'
import PropTypes from 'prop-types'
import {withRouter} from 'react-router-dom'

const Header = Card.Header
const Body = Card.Body

class UserList extends Component{
    static propTypes = {
        userList: PropTypes.array.isRequired
    }
    render(){
        const {userList} = this.props
        return (
            <WingBlank style={{marginBottom:50, marginTop:50}}>
                {userList.map(user => (
                    <div key={user.id}>
                        <WhiteSpace/>
                        <Card onClick={()=>{this.props.history.push(`/chat/${user.id}`)}}>
                            <Header thumb={require(`../../assets/images/${user.header}.png`)}
                                    extra={user.username}/>
                            <Body>
                            <div>职位: {user.post}</div>
                            {user.company ? <div>公司: {}</div> : null}
                            {user.salary ? <div>月薪: {}</div> : null}
                            <div>描述: {user.info}</div>
                            </Body>
                        </Card>
                    </div>
                ))}
            </WingBlank>
        )
    }
}
export default withRouter(UserList)
