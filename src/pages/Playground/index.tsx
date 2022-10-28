/*
 * @Author: CHENJIE
 * @Date: 2022-10-24 10:57:31
 * @LastEditors: CHENJIE
 * @LastEditTime: 2022-10-28 11:22:15
 * @FilePath: \hrss-react-ts\src\pages\Playground\index.tsx
 * @Description: 
 */
import { NavLink, Outlet } from 'react-router-dom'
import styles from './index.module.scss'

export default function Playground() {
    return (
        <div className={styles.root}>
            <div className='nav-link'>
                <NavLink to="effect" >effect-play</NavLink>
                <NavLink to="purecom" >purecom-play</NavLink>
                <NavLink to="memocom" >memo-play</NavLink>
                <NavLink to="usememo" >usememo-play</NavLink>
            </div>
            <Outlet />
        </div>
    )
}




