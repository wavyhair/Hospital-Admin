/*
 * @Author: CHENJIE
 * @Date: 2022-10-20 11:36:55
 * @LastEditors: CHENJIE
 * @LastEditTime: 2022-12-06 20:25:08
 * @FilePath: \hrss-react-ts\src\App.tsx
 * @Description: App
 */
import { unstable_HistoryRouter as HistoryRouter } from "react-router-dom";
import { customHistory } from '@/utils/history'
import {useAppRoutes} from './routes/inedx';
function App() {
  return (
    <HistoryRouter history={customHistory} >
       {useAppRoutes()}
    </HistoryRouter>
  );
}

export default App;
