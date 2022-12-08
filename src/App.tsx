/*
 * @Author: CHENJIE
 * @Date: 2022-10-20 11:36:55
 * @LastEditors: CHENJIE
 * @LastEditTime: 2022-12-08 21:37:42
 * @FilePath: \hrss-react-ts\src\App.tsx
 * @Description: App
 */
import { UseAppRoutes } from './routes/index';
import withAuthorization from '@/components/withAuthorization'
function App() {
  return (
      <UseAppRoutes />
  );
}

export default withAuthorization(App);
