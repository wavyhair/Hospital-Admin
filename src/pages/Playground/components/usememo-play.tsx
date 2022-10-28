/*
 * @Author: CHENJIE
 * @Date: 2022-10-28 11:18:55
 * @LastEditors: CHENJIE
 * @LastEditTime: 2022-10-28 13:41:05
 * @FilePath: \hrss-react-ts\src\pages\Playground\components\usememo-play.tsx
 * @Description: useMemo hooks
 */
import React, { useMemo, useState } from 'react'

interface Props {
    data: {}
}
export default function Usememoplay() {
    const [num, setNum] = useState(0)
    const [data, setData] = useState({ a: 2 })
    // 第一个参数是一个回调函数 通过回调函数的返回值来指定要 “缓存” 的对象
    const memoData = useMemo(() => {
        return {
            name: '嘻嘻' + num
        }
    }, [num])
    return (
        <>
            <span>num:{num}</span>
            <span>data:{data.a}</span>
            <button onClick={() => { setData(data) }}>changeData</button>
            <button onClick={() => { setNum(num + 1) }}>addNum</button>
            {/* 使用 react.memo */}
            <A data={data} />
            {/* 使用 react.memo + useMemo 处理 */}
            <B data={memoData} />
        </>
    )
}
const A = React.memo(({ data }: Props) => {
    console.log('组件A Render')
    return <div>组件A</div>
})
const B = React.memo(({ data }: Props) => {
    console.log('组件B Render')
    return <div>组件B</div>
})
