//引入客户端io
import io from 'socket.io-client'

//连接服务器, 得到代表连接的socket对象
const socket = io('ws://localhost:8086')

//绑定'receiveMsg'的监听, 来接受服务器发送的信息
socket.on('receiveMsg', function (data) {
    console.log('浏览器端接收到消息: ', data)
})

//向服务器发送消息
socket.emit('sendMsg', {name: 'Tom', date: Date.now()})
console.log('浏览器向服务器发送消息: ', {name: 'Tom', date: Date.now()})