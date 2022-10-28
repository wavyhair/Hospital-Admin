/*
 * @Author: CHENJIE
 * @Date: 2022-10-28 10:09:05
 * @LastEditors: CHENJIE
 * @LastEditTime: 2022-10-28 10:14:04
 * @FilePath: \hrss-react-ts\src\pages\Playground\components\purecom-play.tsx
 * @Description: purecom-play
 */
import { PureComponent } from "react"
interface Props {
    name?: string
    children?: any
    render?: (params: string) => void
}
interface State {
    name: string
}
class PlayPureCom extends PureComponent<Props, State> {
    state: State = {
        name: 'nh'
    }
    // 点击
    handleClick = () => {
        this.setState({ name: '77' })
    }
    render() {
        console.log('Playground render');
        return (
            <>
                <A name={this.state.name} render={(name) => <B name={name} />} >
                    {/* children render */}
                    {/* <B /> */}
                </A>
                <button onClick={this.handleClick}>update</button>
            </>
        )
    }
}

class A extends PureComponent<Props> {
    render() {
        console.log('A render');
        console.log('this.props.children', this.props.children)
        return (
            <>
                <h2>{this.props.name}</h2>
                {/* children render */}
                {/* <span>{this.props.children}</span> */}
                {this.props.render && this.props.render('可选链操作符？？？？？？？？')}
            </>
        )




    }
}

class B extends PureComponent<Props> {
    render() {
        return (
            <>
                <h2>我是B组件</h2>
                <h2>{this.props.name}</h2>
            </>
        )
    }
}
export default PlayPureCom