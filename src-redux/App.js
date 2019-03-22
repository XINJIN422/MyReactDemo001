import React, { Component } from 'react';
import * as actions from './redux/actions'

class App extends Component {
  increment = ()=>{
    const number = this.select.value*1
    this.props.store.dispatch(actions.increment(number))
  }
  decrement = ()=>{
      const number = this.select.value*1
      this.props.store.dispatch(actions.decrement(number))
  }
  render() {
    const count = this.props.store.getState()
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

export default App;
