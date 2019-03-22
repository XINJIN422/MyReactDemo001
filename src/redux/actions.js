import {AUTH_SUCCESS, ERROR_MSG, RECEIVE_USER, RESET_USER, RECEIVE_USER_LIST
        , RECEIVE_MSG, RECEIVE_MSG_LIST, READ_MSG} from './action-types'
import {reqRegister, reqLogin, reqUpdateUser, reqUser, reqUserList
        , reqChatMsgList, reqReadMsg} from '../api'     //api目录下的index文件是默认指定的, 所以这里可以省略
import io from 'socket.io-client'

function initIO(dispatch, userid) {
    if (!io.socket) {
        io.socket = io('ws://localhost:8086')
        io.socket.on('receiveMsg', function (data) {
            if (data.from === userid || data.to === userid) {
                dispatch(receiveMsg(data, userid))
            }
            console.log('客户端接受消息: ', data)
        })
    }
}

export const sendMsg = ({from, to, content}) => {
    return dispatch => {
        io.socket.emit('sendMsg', {from, to, content})
    }
}

//授权成功同步action
const authSuccess = (user) => ({type: AUTH_SUCCESS, data: user})

//错误提示信息的同步action
const errorMsg = (msg) => ({type: ERROR_MSG, data: msg})

//接受用户同步action
const receiveUser = (user) => ({type: RECEIVE_USER, data: user})

//重置用户同步action
export const resetUser = (msg) => ({type: RESET_USER, data: msg})

//接受用户列表同步action
export const receiveUserList = (userList) => ({type: RECEIVE_USER_LIST, data: userList})

//获取该用户所有消息列表
export const receiveMsgList = (users, chatMsgs, userid) => ({type: RECEIVE_MSG_LIST, data: {users, chatMsgs, userid}})

//获取一条信息
const receiveMsg = (chatMsg, userid)=>({type: RECEIVE_MSG, data: {chatMsg, userid}})

//读取消息
const readMsg = (from, to, count)=>({type: READ_MSG, data: {from, to, count}})

//异步获取消息列表
async function getMsgList(dispatch, userid){
    initIO(dispatch, userid)
    const response = await reqChatMsgList()
    const result = response.data
    if (result.code === 0){
        const {users, chatMsgs} = result.data
        dispatch(receiveMsgList(users, chatMsgs, userid))
    }
}

//注册异步action
export const register = (user) => {
    const {username, password, password2, type} = user
    if (!username) {
        return errorMsg("必须输入用户名!")
    } else if (password !== password2) {
        return errorMsg("2次密码不一致!")
    }
    return async dispatch => {
        const response = await reqRegister({username, password, type})
        const result = response.data
        if (result.code === 0) {    //成功
            getMsgList(dispatch, result.data.id)
            dispatch(authSuccess(result.data))
        } else {
            dispatch(errorMsg(result.msg))
        }

    }
}

//登录异步action
export const login = (user) => {
    const {username, password} = user
    if (!username) {
        return errorMsg("用户名不能为空!")
    } else if (!password) {
        return errorMsg("密码不能为空!")
    }
    return async dispatch => {
        const response = await reqLogin(user)
        const result = response.data
        if (result.code === 0) {    //成功
            getMsgList(dispatch, result.data.id)
            dispatch(authSuccess(result.data))
        } else {
            dispatch(errorMsg(result.msg))
        }
    }
}

//更新用户异步action
export const updateUser = (user) => {
    return async dispatch => {
        const response = await reqUpdateUser(user)
        const result = response.data
        if (result.code === 0){
            dispatch(receiveUser(result.data))
        } else {
            dispatch(resetUser(result.msg))
        }
    }
}

//自动登录
export const getUser = () => {
    return async dispatch => {
        const response = await reqUser()
        const result = response.data
        if (result.code === 0){
            getMsgList(dispatch, result.data.id)
            dispatch(receiveUser(result.data))
        } else {
            dispatch(resetUser(result.msg))
        }
    }
}

export const getUserList = (type)=>{
    return async dispatch => {
        const response = await reqUserList(type)
        const result = response.data
        if (result.code === 0){
            dispatch(receiveUserList(result.data))
        }
    }
}

export const toReadMsgs = (from, to)=>{
    return async dispatch => {
        const response = await reqReadMsg(from, to)
        const result = response.data
        if (result.code === 0){
            dispatch(readMsg(from, to, result.data))
        }
    }
}