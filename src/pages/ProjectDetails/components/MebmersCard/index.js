import React from 'react';
import { Card, Avatar, Image, Tag } from 'antd';
import styles from './index.less';

const MembersCard = (props) => {

  const { data } = props;

  return (
    <Card
      title="成员"
      extra={<a href="#">添加成员</a>}
    >
      {
        data && data.map(item => <div key={item.id}>
          <div className={styles.item}>
            <div>
              <Avatar
                size="small"
                src={<Image src={item.avatar} />}
              />
              {item.name}
            </div>
            <div className={styles.duty}>
              <Tag color="purple">{item.duty}</Tag>
            </div>
          </div>
        </div>)
      }
    </Card>
  );
};

export default MembersCard;
