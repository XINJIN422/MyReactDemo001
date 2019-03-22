import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './MyComponent.css'

class MyComponent2 extends Component {
    constructor(props){
        super(props);
        this.state = {
            walk : true,
            opacity: 1
        };
        this.changeStateValue = this.changeStateValue.bind(this);
    }
    changeStateValue(){
        // let walk = !this.state.walk;
        // this.setState({walk});
        clearInterval(this.intervalId);
    }
    componentDidMount(){
        this.intervalId = setInterval(function() {
            let {opacity} = this.state;
            opacity -= 0.05;
            if (opacity <= 0){
                opacity = 1
            }
            this.setState({opacity})
        }.bind(this), 100)
    }
    render(){
        let {walk,opacity} = this.state;
        const name = this.props.name;
        return <h1 style={{opacity:opacity}} onClick={this.changeStateValue}> {walk? name+':一起去散步吧!' : name+':好啊'}</h1>;
    }
}
MyComponent2.defaultProps = {name:'hhh'}
MyComponent2.propTypes = {
    age: PropTypes.number
}
export default MyComponent2;