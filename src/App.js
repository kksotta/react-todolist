import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {connect} from 'react-redux';
class App extends Component {
  constructor(props){
    console.log(props)
    super(props);
    this.state={
      count:0,
      value: '',
      todos:[]
    }
  }

  getDiffId() {
    return new Date().getTime();
  }

  clear() {
    let self = this;
    if (!self.state.value.trim()){
      return
    }
    
    self.setState({
      value: ''
    })


    self.props.addTodo({
      id: self.getDiffId(),
      text: self.state.value,
    });
  }

  handleChange(event){
    this.setState({
      value: event.target.value
    });
  }

  render() {
    let todolist = this.props.todos;
    let showType = this.props.visibilityFilter;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">add your todolist</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        {/* 添加代办项目 */}
        <p>
          <input placeholder='添加todo' value={this.state.value} onChange={this.handleChange.bind(this)}  />
          <button onClick={this.clear.bind(this)}>addToDoList</button>
        </p>
        {/* 显示列表 */}
        <ul style={{width:'320px', margin:'0 auto', paddingBottom: '20px'}}>
          {
            todolist.map((el, i) => {
              return (<li key={el.id} {...el} style={{
                textDecoration: el.completed ? 'line-through' :'none'
              }} onClick={ () => { this.props.toggleTodo(el.id) }} >
                {el.completed ? el.text: <a href="javascript:">{el.text}</a>}
              </li>)
            })
          }
        </ul>
        {/* 控制显示类型 */}
        <p>
          显示类型：{showType === 'SHOW_ALL' ? '显示全部' : <a href="javascript:" onClick={() => {this.props.changeVisible('SHOW_ALL')}}>显示全部</a> }
          {"，"}
          {showType === 'SHOW_COMPLETED' ? '显示未完成' : <a href="javascript:" onClick={() => {this.props.changeVisible('SHOW_COMPLETED')}}>显示未完成</a> }
          {"，"}
          {showType === 'SHOW_ACTIVE' ? '显示已完成' : <a href="javascript:" onClick={() => {this.props.changeVisible('SHOW_ACTIVE')}}>显示已完成</a> }
        </p>


        {/* 更改counter 测试 */}
        <button onClick={this.props.deCrease}>count减一</button>
        <button onClick={this.props.addCounter}>添加counter</button>
        <p>{this.props.count}</p>
      </div>
    );
  }
}

const getVisibleTodo = (todos, filter) => {
  switch (filter) {
    case 'SHOW_ALL':
      return todos
    case 'SHOW_COMPLETED':
      return todos.filter(t => !t.completed)
    case 'SHOW_ACTIVE':
      return todos.filter(t => t.completed)
  }
}

function mapStateToProps(state) {
  return {
    count: state.count,
    todos: getVisibleTodo(state.todos, state.visibilityFilter),
    visibilityFilter: state.visibilityFilter
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addCounter:() => {
          dispatch({
          type: "increase"
        })
    },
    deCrease:() => {
      dispatch({
        type: 'decrease'
      })
    },
    addTodo: (data) => {
      dispatch({
        type: 'ADD_TODO',
        data
      })
    },
    toggleTodo: (en) => {
      dispatch({
        type:'TOGGLE_TODO',
        id: en
      })
    },
    changeVisible:(filter) => {
      dispatch({
        type: 'SET_VISIBILITY_FILTER',
        visibilityFilter:filter
      })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
