/*
 * @Author: CHENJIE
 * @Date: 2022-10-28 10:41:42
 * @LastEditors: CHENJIE
 * @LastEditTime: 2022-10-28 13:46:33
 * @FilePath: \hrss-react-ts\src\pages\Playground\components\memo-play.tsx
 * @Description: memo-play 高阶组件
 */
import React, { useCallback, useMemo, useState } from 'react'

interface Props {
    fn: () => void
}
export default function Memoplay() {
    const [num, setNum] = useState(0)
    const [age, setAge] = useState(18)
    const fn = () => {
        console.log('fn执行', age)
    }
    // 只有依赖项发生改变的时候 emmoFn 函数才会被重新创建
    // const memoFn = useCallback(fn, [age])
    // 使用 useMemo 模拟 useCallback
    const memoFn = useMemo(() => {
        return () => {
            console.log('memoFn执行', age)
        }
    }, [age])
    return (
        <>
            <button onClick={() => setNum(num + 1)}>addNum</button>
            <button onClick={() => setAge(age + 1)}>addAge</button>
            {/* 不做任何处理 */}
            <A fn={fn} />
            {/*  React.memo 处理 */}
            <B fn={fn} />
            {/* React.memo useCallback 缓存 */}
            <C fn={memoFn} />
        </>
    )
}
// 普通组件 未做任何处理
const A = ({ fn }: Props) => {
    console.log('A Render')
    return <div >A</div>
}
// 通过 React.memo 避免不必要的组件更新
const B = React.memo(({ fn }: Props) => {
    console.log('B Render')
    return <div>B</div>
})
const C = React.memo(({ fn }: Props) => {
    console.log('C Render')
    return <div>C</div>
})
