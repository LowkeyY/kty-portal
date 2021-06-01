import React from 'react';
import { Statistic, Divider } from 'antd';
import ProjectGauge from '../ProjectGauge';
import styles from './index.less';


const ProjectStatistics = (props) => {

  const Item = ({ title, num, color = '#000' }) => {

    return (
      <div className={styles.item}>
        <span className={styles.itemTitle}>{title}</span>
        <span className={styles.itemNum} style={{ color: color }}>{num}</span>
      </div>
    );
  };

  return (
    <>
      {/*<div className={styles.title}><span className={styles.tips}>项目统计</span></div>*/}
      <div className={styles.content}>
        <Item title="项目" num={5} />
        <Divider type="vertical" />
        <Item title="进行中" num={4} color="#ffc442" />
        <Divider type="vertical" />
        <Item title="已完成" num={1} color="#22d7bb" />
      </div>
      <ProjectGauge />
    </>
  );
};

export default ProjectStatistics;
