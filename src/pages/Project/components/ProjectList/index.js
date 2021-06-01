import React, { useState } from 'react';
import { DownOutlined } from '@ant-design/icons';
import {
  Avatar,
  Button,
  Card,
  Col,
  Input,
  Table,
  Menu,
  Modal,
  Progress,
  Row,
  Radio,
  Space,
  Tag,
  Popconfirm
} from 'antd';
import { connect, history } from 'umi';
import moment from 'moment';
import { statusStyle } from '@/utils/utils.ts';
import styles from './index.less';

const RadioButton = Radio.Button;

const RadioGroup = Radio.Group;
const { Search } = Input;
const { inProgress, completed } = statusStyle;

const tabList = [
  {
    key: 'total',
    tab: '全部项目'
  },
  {
    key: 'mine',
    tab: '我的项目'
  }
];

export const ProjectList = (props) => {
  const { dispatch, data, loading } = props;
  const [tab, setTab] = useState('total');
  const extraContent = (
    <div className={styles.extraContent}>
      <RadioGroup defaultValue="all">
        <RadioButton value="all">全部</RadioButton>
        <RadioButton value="progress">进行中</RadioButton>
        <RadioButton value="waiting">已完成</RadioButton>
      </RadioGroup>
      <Search className={styles.extraContentSearch} placeholder="请输入" onSearch={() => ({})} />
    </div>
  );
  const confirm = ({ xmbm = '' }, e) => {
    dispatch({
      type: 'project/deleteProject',
      payload: {
        xmbm
      }
    });
  };
  const columns = [
    {
      title: '项目',
      dataIndex: 'xmmc',
      key: 'xmmc'
    },
    {
      title: '版本号',
      dataIndex: 'bbmc',
      key: 'bbmc'
    },
    {
      title: '负责人',
      dataIndex: 'createUser',
      key: 'createUser'
    },
    {
      title: '创建时间',
      dataIndex: 'createDate',
      key: 'createDate',
      render: date => (
        moment(date).format('YYYY-MM-DD')
      )
    },
    {
      title: '结束时间',
      dataIndex: 'endDate',
      key: 'endDate',
      render: date => (
        moment(date).format('YYYY-MM-DD')
      )
    },
    {
      title: '状态',
      key: 'status',
      dataIndex: 'status',
      render: (text, record) => {
        const { xmzt = {} } = record, { dqzt } = xmzt;
        return (
          <Tag color={dqzt === '进行中' ? inProgress : completed}>
            {dqzt}
          </Tag>
        );
      }
    },
    {
      title: '进度',
      key: 'percent',
      dataIndex: 'percent',
      render: (text, record) => {
        const { xmzt = {} } = record, { wcd } = xmzt;
        return (
          <Progress percent={wcd} size="small" />
        );
      }
    },
    {
      title: '操作',
      hide: true,
      render: (text, record) => {
        return (
          <Popconfirm
            title="确定要删除吗?"
            onConfirm={(e) => confirm(record, e)}
            okText="确定"
            cancelText="取消"
          >
            <a onClick={e => {
              e.stopPropagation();
              e.preventDefault();
            }} href="#">删除</a>
          </Popconfirm>
        );
      }
    }
  ];
  const handleRowClick = (e, { xmbm = '' }) => {
    if (e.target.tagName !== "TD") {
      return false;
    } else {
      history.push({
        pathname: '/project/projectDetails',
        query: {
          xmbm
        }
      });
    }

  };

  return (
    <div className={styles.standardList}>
      <Card
        className={styles.listCard}
        bordered={false}
        tabList={tabList}
        activeTabKey={tab}
        onTabChange={key => {
          setTab(key);
        }}
        bodyStyle={{
          padding: '0 32px 40px 32px'
        }}
      >
        {extraContent}
        <Table
          onRow={record => {
            return {
              onClick: event => handleRowClick(event, record) // 点击行
            };
          }}
          rowKey={(record => record.xmbm)}
          loading={loading}
          columns={columns}
          dataSource={data} />
      </Card>
    </div>
  );
};
export default ProjectList;
