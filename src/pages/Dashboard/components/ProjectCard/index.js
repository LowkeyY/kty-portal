import React from 'react';
import { Avatar, Image, Badge, Tag, Progress } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { renderState } from '@/utils/utils.ts';
import ProgressTag from '@/components/ProgressTag';
import styles from './index.less';

const ProjectCard = (props) => {

  const { data: { id = '', title = '', progress = 0, current = {}, members = 0, state = 1, leader = '', LeaderAvatar = '', lock = 0, version = '' }, handlerClick } = props;
  return (
    <div className={styles.outer} onClick={(e) => handlerClick(e, id)}>
      <div className={styles.title}>
        {
          lock === 1 ?
          <Tag style={{ marginRight: 10 }} color="magenta" size='small'>已锁定</Tag>
                     :
          null
        }
        {`${id} ${title} ${version}`}
      </div>
      <div className={styles.content}>
        <ProgressTag data={current} />
        <Progress
          width={40}
          type="circle"
          strokeColor={{
            '0%': '#108ee9',
            '100%': '#87d068'
          }}
          percent={progress}
        />
      </div>
      <div className={styles.info}>
        <div className={styles.leader}>
          <Avatar
            size="small"
            src={<Image src={LeaderAvatar} />}
          />
          <span>{leader}</span>
        </div>
        <div className={styles.right}>
          <div className={styles.group}>
            <UserOutlined />
            <span>{members}</span>
          </div>
          <Badge color={renderState(state)['color']} text={renderState(state)['text']} />
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
