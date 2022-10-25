/*
 * @Author: CHENJIE
 * @Date: 2022-10-25 14:58:14
 * @LastEditors: CHENJIE
 * @LastEditTime: 2022-10-25 15:37:06
 * @FilePath: \hrss-react-ts\src\components\Loading\index.tsx
 * @Description: Loading
 */
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import { useEffect } from "react";
import NProgress from "nprogress";
import styles from './index.module.scss'
import "nprogress/nprogress.css";

NProgress.configure({
    showSpinner: false,
});

function Loading() {
    NProgress.start();
    useEffect(() => {
        NProgress.done();
    }, []);
    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
    return <div className={styles.root}><Spin indicator={antIcon} /></div>;
}

export default Loading;
