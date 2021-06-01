/**
 * @author Lowkey
 * @date 2021/01/25 16:02:41
 * @Description: 登录状态加载动画
 */
import React, { useState, useEffect } from 'react';
import { Progress } from 'antd';
import { connect } from 'umi';
import styles from "./index.less";


const LoginProgress = (props) => {
  const [percent, setPercent] = useState(0);
  const { loginProgress, text = '正在登录系统...' } = props;
  useEffect(() => {

    let intervalId = setInterval(() => {
      setPercent(percent => {
        if (percent < 98) {
          return percent + 1;
        } else {
          return 98;
        }
      });

    }, 100);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className={styles.mask} style={{ display: loginProgress ? 'block' : 'none' }}>
      <Progress percent={percent} size="small" strokeWidth={30} status="active" />
      <div>{text}</div>
    </div>
  );
};


export default LoginProgress;
