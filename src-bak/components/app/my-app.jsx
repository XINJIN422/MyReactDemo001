import React, {Component} from 'react'
import CommentAdd from '../comment-add/comment-add'
import CommentList from '../comment-list/comment-list'

export default class App extends Component{
    // constructor(){
    //     super();
    //     this.state = {
    //         comments: [
    //             {username: 'Tom', content: 'React简单'},
    //             {username: 'Jack', content: 'React真难'}
    //         ]
    //     }
    // }
    // 给主键对象指定state属性,作用同上
    state = {
        comments: [
            {username: 'Tom', content: 'React简单'},
            {username: 'Jack', content: 'React真难'}
        ]
    }
    addComment = (comment) => {
        const {comments} = this.state
        comments.unshift(comment)
        this.setState({comments})
    }
    deleteComment = (index) => {
        const {comments} = this.state
        comments.splice(index, 1)
        this.setState({comments})
    }
    render(){
        const {comments} = this.state;
        return <div>
            <header className="site-header jumbotron">
                <div className="container">
                    <div className="row"></div>
                    <div className="col-xs-12">
                        <h1>请发表对React的评论</h1>
                    </div>
                </div>
            </header>
            <div className="container">
                <CommentAdd addComment={this.addComment}/>
                <CommentList comments={comments} deleteComment={this.deleteComment}/>
            </div>
        </div>
    }
}