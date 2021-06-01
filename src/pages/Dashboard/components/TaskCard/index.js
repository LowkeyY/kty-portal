import React from 'react';
import { Badge, Avatar, Progress, Tag, Image } from 'antd';
import styles from './index.less';

const TaskCard = (props) => {

  const Item = () => {
    return (
       <div className={styles.item}>
         <div className={styles.top}>
           <div>
             <Tag color="#108ee9">资源评价</Tag>
           </div>
           <Avatar.Group maxCount={2} maxStyle={{ color: '#f56a00', backgroundColor: '#fde3cf' }} size="small">
             <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
             <Avatar style={{ backgroundColor: '#e0f53f' }}>Z</Avatar>
             <Avatar style={{ backgroundColor: '#f56a00' }}>K</Avatar>
             <Avatar style={{ backgroundColor: '#f50a28' }}>Y</Avatar>
           </Avatar.Group>
         </div>
         <div className={styles.content}>
           <div>所属项目：CNOBC-421 美国Maverick盆地页岩油气资产项目</div>
           <Badge color="#f50" text="进行中" />
           <div className={styles.modal}>
             <Tag color="blue">资源评价模块</Tag>
           </div>
           <div>开始时间：2021年1月1日</div>
           <div>结束时间：2021年1月10日</div>
         </div>
         <Progress percent={30} size="small" />
       </div>
    );
  };

  return (
    <>
      {/*<div className={styles.title}><span className={styles.tips}>我的任务</span></div>*/}
      <div className={styles.outer}>
        <Item />
      </div>
      <div className={styles.outer}>
        <Item />
      </div>
    </>
  );
};

export default TaskCard;
