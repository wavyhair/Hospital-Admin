/*
 * @Author: CHENJIE
 * @Date: 2022-10-24 10:57:31
 * @LastEditors: CHENJIE
 * @LastEditTime: 2022-10-25 17:24:13
 * @FilePath: \hrss-react-ts\src\pages\Playground\index.tsx
 * @Description: 
 */

import { useEffect, useState } from "react"
const Playground: React.FC = () => {

    const [count, setCount] = useState(0)
    const [num, setNum] = useState(0)
    // useEffect(() => {
    //     // 执行时机：该 effect 会在组件第一次渲染以及每次组件更新后执行
    //     document.title = `当前点击${count}次`
    // })
    // useEffect(() => {
    //     /**
    //      *     跳过不必要的执行，只在 count 变化时，才执行相应的 effect
    //      *     useEffect(()=>{},[依赖项]) 依赖项的值变化才会执行 effect
    //      *     如果 useEffect 回调函数中用到了某个数据，但是，没有出现在依赖项数组中，就会导致一些 Bug 出现
    //      *     不要对依赖项撒谎 不要对依赖项撒谎 不要对依赖项撒谎
    //      */
    //     document.title = `当前点击${count}次`
    // }, [count])
    useEffect(() => {
        /**
         * useEffect 的第二个参数，还可以是一个空数组（[]）
          *  表示只在组件第一次渲染后执行 effect
           * 该 effect 只会在组件第一次渲染后执行，因此可以执行像事件绑定等只需要执行一次的操作。
          *  相当于 class 组件的 componentDidMount 钩子函数的作用
          * effect 的返回值是可选的，可省略。也可以返回一个清理函数，用来执行事件解绑等清理操作
          * 清理函数的执行时机：
        *      清理函数会在组件卸载时以及下一次副作用回调函数调用的时候执行，用于清除上一次的副作用。
             *     如果依赖项为空数组，那么会在组件卸载时会执行。相当于组件的componetWillUnmount
         */
        // window.addEventListener('resize', () => {
        //     console.log(' resize')
        // })
        let timer = setInterval(() => {
            setNum(num => num + 1)
            console.log('我是定时器')
        }, 1000)
        return () => clearInterval(timer)
    }, [])
    return (
        <>
            <div>
                <span>{count}</span>
                <button onClick={() => setCount(count + 1)}>CountAdd</button>
            </div>
            <br />
            <div>
                <span>{num}</span>
                <button onClick={() => setNum(num + 1)}>NumAdd</button>
            </div>
        </>
    )
}
export default Playground
