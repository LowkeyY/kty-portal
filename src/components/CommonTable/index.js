/**
 * @author Lowkey
 * @date 2021/04/11 14:50:38
 * @Description:
 */
import React, { useState, useEffect } from 'react';
import { Space, Table, Button, Spin, Card, Popconfirm } from 'antd';
import { connect } from 'umi';
import { LoadingOutlined } from '@ant-design/icons';
import FormModal from '@/components/FormModal';


const CommonTable = (props) => {
  const { title, columns, isCurd = true, loading, canUpdate = true, onSubmit = null, handlerEvaluate = null, dataSource, onDelete = null, loadingList = null } = props;
  const action = {
    title: '操作',
    key: 'action',
    fixed: 'right',
    render: (text, record) => (
      <Space size="middle">
        {canUpdate ? <FormModal type="drawer" record={record} onOk={onSubmit}
                                columns={columns}><a>修改</a></FormModal> : null}
        {onDelete ? <Popconfirm title='确定删除？' onConfirm={() => onDelete(record)}><a>删除</a></Popconfirm> : null}
        {handlerEvaluate ? <a
          onClick={() => handlerEvaluate(record)} >开始评价</a> : null}
      </Space>
    )
  };

  const renderExtra = (isCurd) => {
    if (isCurd) {
      return (
        <FormModal type="drawer" onOk={onSubmit} record={{}} columns={columns}>
          <Button type="primary">新建</Button>
        </FormModal>);
    }
    return null;
  };

  return (
    <Card
      title={title}
      extra={renderExtra(isCurd)}>
      <Table
        rowKey={record => record.xmbm}
        loading={loading}
        columns={[...columns, isCurd ? action : {}]}
        dataSource={dataSource}
        scroll={{ x: 'max-content' }}
      />
    </Card>
  );
};


export default CommonTable;
