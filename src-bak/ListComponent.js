import React, {Component} from 'react';
import PropTypes from 'prop-types';

class ListComponent extends Component{
    constructor(props){
        super(props);
    }
    render(){
        console.log(this.props.todoLists)
        let todos = this.props.todoLists
        return <ul>
            {todos.map((ele, index) => <li key={index}>{ele}</li>)}
        </ul>
    }
}

ListComponent.propTypes = {
    todoLists : PropTypes.array.isRequired                                                                                                                                                  .isRequired
}
export default ListComponent;