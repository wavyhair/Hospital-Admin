/*
 * @Author: CHENJIE
 * @Date: 2022-10-31 21:06:05
 * @LastEditors: CHENJIE
 * @LastEditTime: 2022-11-01 10:49:33
 * @FilePath: \hrss-react-ts\src\utils\index.ts
 * @Description: 
 */
// 将列表转化成树形结构数据的方法
// 递归方法 自己调用自己, 每次调用自己时 需要传入不同的参数  而且要有跳出条件
// list  [] => [{children: [{ chilrenr=}]}]
import { depts } from "@/types/employees"

export function transListToTreeData(list: depts[], rootValue: string) {
    // 不能直接对 list 数据进行 forEach并且添加新的属性 TypeError: can't define property "x": "obj" is not extensible
    // 可以克隆一份 list数据进行操作
    const copyList: depts[] = JSON.parse(JSON.stringify(list))
    var arr: any = []
    copyList.forEach(item => {
        // 如果了节点的话
        if (item.pid === rootValue) {
            // 找到了节点 => 要继续寻找该节点有没有子节点
            // 返回的数组 是 item的所有的子节点的集合
            const children = transListToTreeData(list, item.id)
            if (children?.length) {
                item.children = children
            }
            arr.push(item) // 把节点push到数组里面
        }
    })
    return arr
}
