import reducer from './reducer';
// 引入redux
import { createStore, applyMiddleware } from 'redux';
// 引入redux日志系统中间件
import { createLogger } from 'redux-logger';

// 创建一个初始化的state
const initState = {};

export default createStore(reducer, initState, applyMiddleware(createLogger()));