import React, {Component} from 'react'
import PropTypes from 'prop-types'

export default class Counter extends Component {
    static propTypes = {
        count: PropTypes.number.isRequired,
        increment: PropTypes.func.isRequired,
        decrement: PropTypes.func.isRequired,
    }

    increment = ()=>{
        const number = this.select.value*1
        this.props.increment(number)
        // this.props.store.dispatch(actions.increment(number))
    }
    decrement = ()=>{
        const number = this.select.value*1
        this.props.decrement(number)
        // this.props.store.dispatch(actions.decrement(number))
    }
    render() {
        const {count} = this.props
        // const count = this.props.store.getState()
        return (
            <div>
                <p>click {count} times</p>
                <div>
                    <select ref={select => this.select = select}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                    </select>{' '}
                    <button onClick={this.increment}>+</button>{' '}
                    <button onClick={this.decrement}>-</button>
                </div>
            </div>
        )
    }
}