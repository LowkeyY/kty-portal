/**
 * @author Lowkey
 * @date 2021/01/05 15:34:18
 * @Description:
 */

import React from 'react';
import {
  Avatar,
  Card,
  message,
  Popconfirm,
  Space,
  Row,
  Col,
  Badge,
  Button,
  Modal,
  Slider,
  Tag,
  Table,
  Progress
} from 'antd';
import { renderState } from '@/utils/utils.ts';
import { history } from 'umi';
import classNames from 'classnames';
import styles from './index.less';

const TaskCard = (props) => {

  const columns = [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
      render: text => <a>{text}</a>
    },
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action'
    }
  ];

  const data = [
    {
      key: '1',
      name: '付小小',
      action: '更新了进度'
    },
    {
      key: '2',
      name: '乐哥',
      action: '访问了资源评价模块'
    }
  ];


  const { data: { text = '勘探评价', img, id = 1, status = 0, progress, current = false, utils, members } } = props;
  const [visible, setVisible] = React.useState(false);
  const [num, setNum] = React.useState(progress);
  const [newProgress, setNewProgress] = React.useState(progress);

  const confirm = (e) => {
    setVisible(false);
    setNewProgress(num);
    message.success('进度更新成功');
  };

  const handlerEditClick = () => {
    setVisible(true);
  };

  const handlerSliderChange = (val) => {
    setNum(val);
  };
  const SliderBox = (progress) => {
    return (
      <Modal
        title="更新进度"
        visible={visible}
        okText={
          <Popconfirm
            title="是否更新当前进度?"
            onConfirm={confirm}
            okText="确认"
            cancelText="取消"
          >
            确定
          </Popconfirm>
        }
        onCancel={handleCancel}
      >
        <Slider
          min={1}
          max={100}
          defaultValue={typeof progress === 'number' ? progress : 0}
          onChange={handlerSliderChange}
        />
      </Modal>
    );
  };

  const log = () => {
    Modal.info({
      title: '操作日志',
      width: '70vh',
      content: (
        <Table columns={columns} dataSource={data} />
      ),
      okText: '关闭'
    });
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handlerTableClick = () => {
    history.push({
      pathname: '/project/resultTable',
      query: {
        id
      }
    });
  };

  const handleConnectClick = ({ path, clientId }) => {
    const { xmbm = '' } = props;
    if (path) {
      history.push({
        pathname: path,
        query: { xmbm }
      });
    } else {
      history.push({
        pathname: '/remoteDesktop',
        query: {
          clientId
        }
      });
    }
  };

  return (
    <Card
      className={classNames(styles.outer, { [styles.current]: current })}
      hoverable
      cover={
        <div
          className={styles.imgbox}>
          <img className={styles.img}
               alt="example"
               src={img}
          />
          <div className={styles.btnbox}>
            {utils && utils.map((item, i) => {
              if (i > 0 && !item.path) {
                return <Tag style={{ marginBottom: '10px' }} key={i} color="blue"
                            onClick={() => handleConnectClick(item)}>{item.name}</Tag>;
              }
              return <div key={i}>
                <Button type="primary" style={{ marginBottom: '10px' }}
                        onClick={() => handleConnectClick(item)}>{item.name}</Button>
              </div>;
            })}
          </div>
        </div>
      }
      // extra={
      //   <Tag color={renderState(status)['color']}>
      //     {renderState(status)['text']}
      //   </Tag>}
      actions={[
        <span onClick={handlerTableClick}>生成报告</span>,
        <span onClick={handlerEditClick}>更新进度</span>,
        <span onClick={log}>操作日志</span>
      ]}
    >
      <div style={{ marginBottom: '8px' }}>
        <div className={styles.top}>
          <div className={styles.members}>
            {members && members.map(((item, i) =>
              <Tag
                key={i}
                color="green"
                style={{ marginBottom: '6px' }}>{item.name}
              </Tag>))}
          </div>
          <Progress
            width={60}
            strokeWidth={16}
            type="circle"
            strokeColor={{
              '0%': '#108ee9',
              '100%': '#87d068'
            }}
            percent={newProgress}
          />
        </div>
      </div>
      {SliderBox(newProgress)}
    </Card>
  );
};

export default TaskCard;
