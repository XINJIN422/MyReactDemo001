import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
// import MyComponent from './MyComponent'
import MyComponent2 from './MyComponent2'
// import MyComponent3 from './MyComponent3'
// import AddComponent from './AddComponent'
// import ListComponent from './ListComponent'

class App extends Component {
  constructor(){
    super();
    this.state = {
      todos:["nihao", "xiexie", "zaijian"]
    }
    this.handleAdd = this.handleAdd.bind(this);
  }
  handleAdd(newValue){
    let todos = this.state.todos;
    todos.push(newValue)
    this.setState({todos})
  }
  render() {
    // const array1 = ["nihao", "xiexie", "zaijian"];
    const todos = this.state.todos;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          {/*<ul>*/}
          {/*{array1.map((ele, index) => <li key={index}>{ele}</li>)}*/}
          {/*</ul>*/}
          {/*<MyComponent/>*/}
          {/*<MyComponent2 name={'YK'}/>*/}
          {/*<MyComponent2 name={'WSY'}/>*/}
          <MyComponent2/>
          {/*<MyComponent3/>*/}
          {/*<AddComponent addMethod={this.handleAdd}/>*/}
          {/*<ListComponent todoLists={todos}/>*/}
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
