/*
 * @Author: CHENJIE
 * @Date: 2022-10-20 11:36:55
 * @LastEditors: CHENJIE
 * @LastEditTime: 2022-12-08 14:45:07
 * @FilePath: \hrss-react-ts\src\App.tsx
 * @Description: App
 */
import { unstable_HistoryRouter as HistoryRouter } from "react-router-dom";
import { customHistory } from '@/utils/history'
import { UseAppRoutes } from './routes/index';
function App() {
  return (
    <HistoryRouter history={customHistory} >
      <UseAppRoutes />
    </HistoryRouter>
  );
}

export default App;
