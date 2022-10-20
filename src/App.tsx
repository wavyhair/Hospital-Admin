/*
 * @Author: CHENJIE
 * @Date: 2022-10-20 11:36:55
 * @LastEditors: CHENJIE
 * @LastEditTime: 2022-10-20 15:58:53
 * @FilePath: \hrss-react-ts\src\App.tsx
 * @Description: App
 */
import { HashRouter } from "react-router-dom";

import Router from './routes/inedx';
function App() {
  return (
    <HashRouter>
      <Router />
    </HashRouter>
  );
}

export default App;
