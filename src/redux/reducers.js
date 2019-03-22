import {combineReducers} from 'redux'
import {AUTH_SUCCESS, ERROR_MSG, RECEIVE_USER, RESET_USER, RECEIVE_USER_LIST
        ,RECEIVE_MSG_LIST , RECEIVE_MSG, READ_MSG} from './action-types'
import {getRedirectTo} from '../utils/index'

const initUser = {
    username: '',
    type: '',
    msg: '',
    redirectTo: ''
}
function user(state = initUser, action){
    switch (action.type) {
        case AUTH_SUCCESS:
            const {type, header} = action.data
            return {...action.data, redirectTo: getRedirectTo(type, header)}
        case ERROR_MSG:
            return {...state, msg: action.data}
        case RECEIVE_USER:
            return action.data
        case RESET_USER:
            return {...initUser, msg: action.data}
        default: return state
    }
}

const initUserList = []
function userlist(state = initUserList, action) {
    switch (action.type) {
        case RECEIVE_USER_LIST:
            return action.data
        default:    return state
    }
}

const initChat = {
    users: {},
    chatMsgs: [],
    unReadCount: 0
}
function chat(state=initChat, action){
    switch (action.type) {
        case RECEIVE_MSG_LIST:
            const {users, chatMsgs, userid} = action.data
            return {
                users,
                chatMsgs,
                unReadCount: chatMsgs.reduce((total, msg) => total += (msg.to === userid && !msg.read ? 1 : 0), 0)
            }
        case RECEIVE_MSG:
            const {chatMsg} = action.data
            return {
                ...state,
                unReadCount: state.unReadCount + (chatMsg.to === action.data.userid && !chatMsg.read ? 1 : 0),
                chatMsgs:[...state.chatMsgs, chatMsg]
            }
        case READ_MSG:
            const {from, to, count} = action.data
            const handledMsgs = state.chatMsgs.map(msg => {
                if (msg.from === from && msg.to === to && !msg.read) {
                    return {...msg, read: true}
                } else{
                    return msg
                }
            })
            return {
                ...state,
                unReadCount: state.unReadCount - count,
                chatMsgs: handledMsgs
            }
        default:
            return state
    }
}


export default combineReducers({
    user, userlist, chat
})

//向外暴露的state状态结构为: { user, userlist}