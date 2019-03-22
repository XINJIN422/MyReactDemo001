import React, {Component} from 'react';

class MyComponent3 extends Component{
    constructor(){
        super();
        this.state = {
            value : ''
        }
        this.showValue = this.showValue.bind(this)
    }
    showValue(event){
        // const value = this.refs.no1.value;
        const value = event.target.value;
        this.setState({value})
    }
    render(){
        const value = this.state.value;
        return (<div>
            <input placeholder={'请输入'}
                   autoFocus={true}
                   onBlur={this.showValue}
                   ref="no1"
            />
            <div>{value}</div>
        </div>)
    }
}
export default MyComponent3;