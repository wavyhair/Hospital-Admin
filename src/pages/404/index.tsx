/*
 * @Author: CHENJIE
 * @Date: 2022-10-20 13:13:23
 * @LastEditors: CHENJIE
 * @LastEditTime: 2022-12-19 10:56:26
 * @FilePath: \hrss-react-ts\src\pages\404\index.tsx
 * @Description: 404
 */
import { Result, Button } from "antd";
import { useNavigate } from "react-router-dom";

function NotFound() {
    const navigate = useNavigate();

    return (
        <Result
            status="404"
            title="404"
            subTitle="找不到页面"
            extra={
                <Button type="primary" onClick={() => navigate("/syt/dashboard")}>
                    返回首页
                </Button>
            }
        />
    );
}

export default NotFound;
