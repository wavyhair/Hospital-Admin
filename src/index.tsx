/*
 * @Author: CHENJIE
 * @Date: 2022-10-20 11:36:55
 * @LastEditors: CHENJIE
 * @LastEditTime: 2022-10-20 16:39:19
 * @FilePath: \hrss-react-ts\src\index.tsx
 * @Description: index
 */
import ReactDOM from 'react-dom/client';
import store from './store';
import { Provider } from 'react-redux'
import App from './App';

import 'antd/dist/antd.css';
import './styles/index.css'

import reportWebVitals from './reportWebVitals';
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  // <React.StrictMode>
  <Provider store={store}><App /></Provider>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
