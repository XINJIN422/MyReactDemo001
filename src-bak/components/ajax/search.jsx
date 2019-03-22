import React, {Component} from 'react'
import PubSub from 'pubsub-js'
import PropTypes from 'prop-types'

export default class Search extends Component{
    /*static propTypes = {
        setSearchName: PropTypes.func.isRequired
    }*/
    handleClick = ()=>{
        const searchName = this.input.value.trim();
        if (searchName){
            // this.props.setSearchName(searchName)
            PubSub.publish('search', searchName)
        }
    }
    render(){
        return <section className="jumbotron">
            <h3 className="jumbotron-heading">Search Github Users</h3>
            <div>
                {/* 非受控组件的方式2---获取值 */}
                <input type="text" placeholder="enter the name you search" ref={input => this.input = input}/>
                <button onClick={this.handleClick}>Search</button>
            </div>
        </section>
    }
}