import React, {Component} from 'react'
import {connect} from 'react-redux'
import {NavBar, Icon, List, InputItem, Grid} from 'antd-mobile'
import {sendMsg, toReadMsgs} from '../../redux/actions'
import QueueAnim from 'rc-queue-anim'

const Item = List.Item

class Chat extends Component{
    state = {
        content: '',
        isShow: false
    }
    componentWillMount() {
        // 初始化表情列表数据
        const emojis = ['😀', '😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣','😀'
            ,'😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣'
            ,'😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣'
            ,'😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣']
        this.emojis = emojis.map(emoji => ({text: emoji}))
    }
    componentDidMount(){
        window.scroll(0, document.body.scrollHeight)
    }
    componentWillUnmount(){
        const from = this.props.match.params.userid
        const to = this.props.user.id
        this.props.toReadMsgs(from, to)
    }
    componentDidUpdate(){
        window.scroll(0, document.body.scrollHeight)
    }
    handleSend= ()=>{
        const from = this.props.user.id
        const to = this.props.match.params.userid
        const content = this.state.content.trim()
        if (content){
            this.props.sendMsg({from, to, content})
        }
        this.setState({content: '', isShow: false})
    }
    toggleShow= ()=>{
        const isShow = !this.state.isShow
        this.setState({isShow})
        if (isShow){
            setTimeout(()=>{
                window.dispatchEvent(new Event('resize'))
            }, 0)
        }
    }
    render(){
        const meId = this.props.user.id
        const targetId = this.props.match.params.userid
        const {users, chatMsgs} = this.props.chat
        if (!users[meId]) {
            return null
        }
        const msgs = chatMsgs.filter(msg => (msg.from === meId || msg.to === meId)&&(msg.from === targetId || msg.to === targetId))
        const targetHeader = users[targetId].header;
        const targetHeaderIcon = targetHeader ? require(`../../assets/images/${targetHeader}.png`) : null
        return <div id='chat-page'>
            <NavBar className='sticky-header'
                    icon={<Icon type='left'/>}
                    onLeftClick={()=>this.props.history.goBack()}
            >
                {users[targetId].username}
            </NavBar>
            <List style={{marginTop: 50, marginBottom: 50}}>
                <QueueAnim type='left' delay={100}>
                    {
                        msgs.map((msg,index) =>{
                            if (msg.from === meId){
                                return <Item key={index}
                                    className='chat-me'
                                    extra='我'
                                >
                                        {msg.content}
                                </Item>
                            } else {
                                return <Item key={index}
                                    thumb={targetHeaderIcon}
                                >
                                    {msg.content}
                                </Item>
                            }
                        })
                    }
                </QueueAnim>
            </List>

            <div className='am-tab-bar'>
                <InputItem
                    placeholder="请输入"
                    value={this.state.content}
                    onChange={value => this.setState({content: value})}
                    onFocus={()=>this.setState({isShow: false})}
                    extra={
                        <span>
                            <span onClick={this.toggleShow} style={{marginRight: 5}}>😊</span>
                            <span onClick={this.handleSend}>发送</span>
                        </span>
                    }
                />
                {this.state.isShow ? (<Grid
                    data={this.emojis}
                    columnNum={8}
                    carouselMaxRow={4}
                    isCarousel={true}
                    onClick={(item) => {
                        this.setState({content: this.state.content + item.text})
                    }}
                />) : null}
            </div>
        </div>
    }
}

export default connect(
    state => ({user: state.user, chat: state.chat}),
    {sendMsg, toReadMsgs}
)(Chat)