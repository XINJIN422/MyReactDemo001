import React, {Component} from 'react'
import PropTypes from 'prop-types'
import CommentItem from '../comment-item/comment-item'
import './commentList.css'

export default class CommentList extends Component{
    //static表示对组件类添加属性, 没有则表示组件对象
    static propTypes = {
        comments: PropTypes.array.isRequired,
        deleteComment: PropTypes.func.isRequired
    }
    render(){
        const {comments, deleteComment} = this.props;
        const display = comments.length==0 ? 'block':'none'
        return <div className="col-md-8">
            <h3 className="reply">评论回复: </h3>
            <h2 style={{display}}>暂无评论, 点击左侧添加评论!!!</h2>
            <ul className="list-group">
                {comments.map((comment, index) => <CommentItem comment={comment} key={index} deleteComment={deleteComment} index={index}/>)}
            </ul>
        </div>
    }
}
/*
//上面有相同作用的替代
CommentList.propTypes = {
    comments: PropTypes.array.isRequired
}*/
