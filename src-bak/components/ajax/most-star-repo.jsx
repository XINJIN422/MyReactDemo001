import React, {Component} from 'react'

import Main from './main'
import Search from './search'

export default class MostStarRepo extends Component{
/*    state = {
        searchName: ''
    }*/
/*    setSearchName = (searchName)=>{
        this.setState({searchName})
    }*/
//改用pubsub-js来传递
    render(){
        return <div className="container">
                {/*<Search setSearchName={this.setSearchName}/>*/}
                {/*<Main searchName={this.state.searchName}/>*/}
                <Search/>
                <Main/>
        </div>
    }
}