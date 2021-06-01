/**
 * @author Lowkey
 * @date 2021/01/07 15:20:29
 * @Description:增删改查Table
 */
import React, {useState, useEffect} from 'react';
import {Space, Modal, Form, Table, Button, Card, Popconfirm} from 'antd';
import {connect} from 'umi';
import EditTable from './components/editTable';
import FormModal from './components';


const CrudTable = (props) => {
  const {
    title,
    columns,
    isCurd = true,
    result = false,
    loading,
    edit = false,
    onSubmit = null,
    tableSave = null,
    onCalculateAll = null,
    onCalculateItem = null,
    cloneVal,
    onChangeType = null,
    onDelete = null,
    data,
    conf,
    useReflectColumns = [],
    reflectColumns = {}
  } = props;
  const [cloneData, setCloneData] = useState({});
  const action = {
    title: '操作',
    key: 'action',
    fixed: 'right',
    render: (text, record) => (
      <Space size="middle">
        <FormModal conf={conf} type="drawer" record={record} onOk={onSubmit} columns={columns}
                   useReflectColumns={useReflectColumns} reflectColumns={reflectColumns}><a>修改</a></FormModal>
        {onDelete ? <Popconfirm title='确定删除？' onConfirm={() => onDelete(record)}><a>删除</a></Popconfirm> : null}
        {onCalculateItem ? <Popconfirm title='确定计算吗？'
                                       onConfirm={() => onCalculateItem(record)}><a>计算</a></Popconfirm> : null}
      </Space>
    )
  };

  const renderExtra = (isCurd) => {

    if (isCurd) {
      return (
        <FormModal type="drawer" cloneVal={cloneVal} onOk={onSubmit} onClone={onClone} onChangeType={onChangeType}
                   record={{}}
                   conf={conf}
                   cloneData={cloneData}
                   columns={columns}
                   useReflectColumns={useReflectColumns}
                   reflectColumns={reflectColumns}
        >
          <Button type="primary">新建</Button>
        </FormModal>);
    }
    if (result && onCalculateAll) {
      return <Button type="primary" onClick={onCalculateAll}>计算结果</Button>;
    }
    return null;
  };

  const onClone = (val) => {
    const res = data.find(item => item.cqbbm === val || item.yqcbm === val);
    setCloneData(res);
  };

  return (
    <Card
      title={title}
      extra={renderExtra(isCurd, result)}>
      {
        edit ?
          <EditTable loading={loading} conf={conf} columns={columns} dataSource={data} tableSave={tableSave}/>
          :
          <Table
            bordered
            loading={loading}
            columns={[...(Array.isArray(columns) ? columns : columns.infoColumns), isCurd ? action : {}]}
            dataSource={data}
            scroll={{x: 'max-content'}}
          />
      }
    </Card>
  );
};


export default CrudTable
