import ajax from './ajax'

//使用了代理, 转发请求到 http://127.0.0.1:8080
export const reqRegister = (user) => ajax('/ssm-demo02/react/register', user, 'POST')

export const reqLogin = ({username, password}) => ajax('/ssm-demo02/react/login', {username, password}, 'POST')

export const reqUpdateUser = (user) => ajax('/ssm-demo02/react/update', user, 'POST')

export const reqUser = ()=>ajax("/ssm-demo02/react/select")

export const reqUserList = (type)=>ajax("/ssm-demo02/react/userList", {type})

export const reqChatMsgList = ()=>ajax("/ssm-demo02/react/msgList")

export const reqReadMsg = (from, to)=>ajax("/ssm-demo02/react/readmsg",{from, to},"POST")