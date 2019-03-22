import React, {Component} from 'react';
import PropTypes from 'prop-types';

class AddComponent extends Component{
    constructor(){
        super();
        this.handleAdd = this.handleAdd.bind(this);
    }
    handleAdd(){
        const addValue = this.refs.add.value.trim();
        if (!addValue)
            return;
        this.props.addMethod(addValue);
    }
    render(){
        return <div>
            <input placeholder={'请输入TODO ITEM'} ref="add"/>
            <button onClick={this.handleAdd}>添加</button>
        </div>
    }
}
// AddComponent.propTypes = {
//     addMethod: PropTypes.func.isRequired
// }
export default AddComponent;