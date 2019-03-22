import React, {Component} from 'react'
import {connect} from 'react-redux'
import {List, Badge} from 'antd-mobile'

const Item = List.Item
const Brief = Item.Brief

function getLastMsgs(chatMsgs, userid) {
    const lastMsgObjs = {}
    chatMsgs.forEach(msg => {
        if (msg.to === userid && !msg.read){
            msg.unReadCount = 1
        } else {
            msg.unReadCount = 0
        }
        const chatId = msg.chat_id
        if (!lastMsgObjs[chatId]) {
            lastMsgObjs[chatId] = msg
        } else {
            const unReadCount = lastMsgObjs[chatId].unReadCount + msg.unReadCount
            if (msg.create_time > lastMsgObjs[chatId].create_time) {
                lastMsgObjs[chatId] = msg
            }
            lastMsgObjs[chatId].unReadCount = unReadCount
        }
     })
    let lastMsgs = Object.values(lastMsgObjs)
    lastMsgs.sort(function (m1, m2) {
        return m2.create_time - m1.create_time
    })
    return lastMsgs
}

class Message extends Component{
    render(){
        const {user} = this.props
        const {users, chatMsgs} = this.props.chat
        const lastMsgs = getLastMsgs(chatMsgs, user.id)

        return <List style={{marginTop: 50, marginBottom: 50}}>
            {
                lastMsgs.map((msg, index) => {
                    const targetId = msg.from === user.id ? msg.to : msg.from
                    const targetUser = users[targetId]
                    return <Item extra={<Badge text={msg.unReadCount}/>}
                                 key={index}
                                 thumb={targetUser.header ? require(`../../assets/images/${targetUser.header}.png`) : null}
                                 arrow='horizontal'
                                 onClick={()=>this.props.history.push(`/chat/${targetId}`)}
                    >
                        {msg.content}
                        <Brief>{targetUser.username}</Brief>
                    </Item>
                })
            }
        </List>
    }
}
export default connect(
    state => ({user: state.user, chat: state.chat}),
    {}
)(Message)
