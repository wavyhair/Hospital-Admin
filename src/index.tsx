/*
 * @Author: CHENJIE
 * @Date: 2022-10-20 11:36:55
 * @LastEditors: CHENJIE
 * @LastEditTime: 2022-12-27 14:42:53
 * @FilePath: \hrss-react-ts\src\index.tsx
 * @Description: index
 */
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom'
import { customHistory } from '@/utils/history'

import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import ReactDOM from 'react-dom/client'
import store from './store'
import { Provider } from 'react-redux'
import App from './App'

// import 'antd/dist/antd.css'; // issue下有描述原因： react-script 升级到 5.0.0 之后，所有通过 create-react-app 创建的项目，引入 antd.css 之后都会看到这个警告
// import 'antd/dist/antd.min.css' 升级 5.0 不需要引入
import './styles/index.css'

import reportWebVitals from './reportWebVitals'
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <HistoryRouter history={customHistory}>
      <ConfigProvider
        locale={zhCN}
        theme={{
          token: {
            colorPrimary: '#00b96b',
          },
        }}>
        <App />
      </ConfigProvider>
    </HistoryRouter>
  </Provider>
  // </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
