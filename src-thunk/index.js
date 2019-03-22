import React from 'react';
import ReactDOM from 'react-dom';
// import App from './App';
import App from './containers/app'
import store from './redux/store'
import {Provider} from  'react-redux'

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>
    , document.getElementById('root'));


/*//在没用react-redux之前,方法:
function render(){
    ReactDOM.render(<App store={store}/>, document.getElementById('root'));
}
//初始化渲染
render()
//订阅监听(store中的状态变化了
store.subscribe(render)*/
