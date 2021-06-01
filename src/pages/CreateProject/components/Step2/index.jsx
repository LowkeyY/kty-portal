/**
 * @author Lowkey
 * @date 2020/12/30 10:48:42
 * @Description:
 */

import React, { useRef, useState } from 'react';
import { EditableProTable } from '@ant-design/pro-table';
import { connect } from 'umi';
import { Button, Table, Input, message, Space, Tag, Card } from 'antd';
import { PlusOutlined } from '@ant-design/icons';


const waitTime = (time = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};
const defaultData = [
  {
    id: 624748504,
    userName: '李刚',
    role: 'optimization'
  },
  {
    id: 624691229,
    userName: '李铁',
    role: 'investment'
  }
];
const columns = [
  {
    title: '姓名',
    key: 'userName',
    dataIndex: 'userName',
    formItemProps: {
      rules: [
        {
          required: true,
          message: '此项为必填项'
        }
      ]
    }
  },
  {
    title: '角色',
    key: 'role',
    dataIndex: 'role',
    valueType: 'checkbox',
    valueEnum: {
      explorationEvaluation: { text: '勘探评价' },
      optimization: {
        text: '油藏开发'
      },
      investment: {
        text: '投资评估'
      },
      economics: {
        text: '经济评价'
      }
    }
  },
  {
    title: '操作',
    valueType: 'option',
    width: 200,
    render: (text, record, _, action) => [
      <a key="editable" onClick={() => {
        var _a;
        (_a = action.startEditable) === null || _a === void 0 ? void 0 : _a.call(action, record.id);
      }}>
        编辑
      </a>
    ]
  }
];

const Step2 = (props) => {
  const [editableKeys, setEditableRowKeys] = useState([]);
  const [dataSource, setDataSource] = useState([]);
  const [newRecord, setNewRecord] = useState({
    id: (Math.random() * 1000000).toFixed(0)
  });
  const { dispatch, createProject: { formData } } = props;

  const onPrev = () => {
    if (dispatch) {
      dispatch({
        type: 'createProject/saveStepFormData',
        payload: { ...formData }
      });
      dispatch({
        type: 'createProject/saveCurrentStep',
        payload: 'info'
      });
    }
  };

  const onValidateForm = async () => {
    if (dispatch) {
      dispatch({
        type: 'createProject/submitStepForm',
        payload: { ...formData }
      });
    }
  };


  return (
    <>
      <div style={{ margin: '10px 0' }}>
        <EditableProTable
          rowKey="id"
          recordCreatorProps={{
            position: 'top',
            record: newRecord,
            title: '添加'
          }}
          rowSelection={{
            selections: [Table.SELECTION_ALL, Table.SELECTION_INVERT]
          }}
          columns={columns}
          request={async () => ({
            data: defaultData,
            total: 3,
            success: true
          })}
          value={dataSource}
          onChange={setDataSource}
          editable={{
          editableKeys,
          onSave: async () => {
            await waitTime(2000);
            setNewRecord({
              id: (Math.random() * 1000000).toFixed(0)
            });
          },
          onChange: setEditableRowKeys
        }} />
      </div>
      <Button type="primary" onClick={onValidateForm}>
        提交
      </Button>
      <Button
        onClick={onPrev}
        style={{
          marginLeft: 8
        }}
      >
        上一步
      </Button>
    </>
  );
};

export default connect(({ createProject }) => ({
  createProject
}))(Step2);
