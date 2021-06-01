/**
 * @author Lowkey
 * @date 2021/04/15 11:35:04
 * @Description:
 */
import React, { Component } from 'react';
import { connect } from 'dva';
import {
  Card,
  Button,
  Table,
  message,
  Pagination,
  Switch,
  Spin,
  Space,
  Popconfirm
} from 'antd';
import { PageContainer, GridContent } from '@ant-design/pro-layout';
import FormModal from '@/components/FormModal';

const roleColumns = [
  {
    key: 'roleName',
    title: '角色名称'
  },
  {
    key: 'sortId',
    title: '排序'
  }
];
const namespace = 'authority';

/* eslint react/no-multi-comp:0 */
@connect(({ authority, loading }) => ({
  authority,
  adding: loading.effects[`${namespace}/addRole`],
  updating: loading.effects[`${namespace}/updateRole`],
  roleLoading: loading.effects[`${namespace}/fetchRole`],
  saveLoading: loading.effects[`${namespace}/saveAuthority`]
}))

class Authority extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuData: []
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: `${namespace}/fetchMenu`
    });
    dispatch({
      type: `${namespace}/fetchRole`
    });
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({
      type: `${namespace}/clear`
    });
    this.setState({
      menuData: []
    });
  }

  createRole = (values, { roleId }, callback, type) => {
    const { dispatch } = this.props;
    dispatch({
      type: `${namespace}/${type === 'create' ? 'addRole' : 'updateRole'}`,
      payload: {
        ...values,
        roleId
      },
      callback
    });
  };


  handlerChange = (id, menuId) => {
    const { [namespace]: { roleData } } = this.props;
    const index = roleData.findIndex((item => item.roleId === id));
    if (index === -1) {
      roleData.push({
        roleId: id,
        roleMenus: menuId
      });
    } else {
      const menuDataArr = roleData[index].roleMenus ? roleData[index].roleMenus.split(',') : [];
      const i = menuDataArr.indexOf(menuId);
      if (menuDataArr.includes(menuId)) {
        menuDataArr.splice(i, 1);
        roleData[index].roleMenus = menuDataArr.join(',');
      } else {
        menuDataArr.push(menuId);
        roleData[index].roleMenus = menuDataArr.join(',');
      }
    }
    this.setState({
      menuData: roleData
    });
  };

  onDelete = ({ roleId }) => {
    const { dispatch } = this.props;
    dispatch({
      type: `${namespace}/deleteRole`,
      payload: {
        roleId
      }
    });
  };

  saveAuthority = () => {
    const { dispatch } = this.props;
    const { menuData } = this.state;
    dispatch({
      type: `${namespace}/saveAuthority`,
      payload: {
        menuData: JSON.stringify(menuData)
      }
    });
  };

  getColumns = () => {
    const { [namespace]: { menuData }, updating } = this.props;
    const result = [];
    const action = {
      title: '操作',
      key: 'action',
      fixed: 'right',
      render: (text, record) => (
        <Space size="middle">
          <FormModal confirmLoading={updating} record={record} onOk={this.createRole}
                     columns={roleColumns}><a>修改</a></FormModal>
          <Popconfirm title='确定删除？' onConfirm={() => this.onDelete(record)}><a>删除</a></Popconfirm>
        </Space>
      )
    };
    const columns = [
      {
        title: '角色',
        dataIndex: 'roleName',
        key: 'roleName'
      }
    ];
    menuData.map((item) => {
      result.push({
        title: item.menuName,
        dataIndex: item.menuId,
        key: item.menuId,
        render: (text, record) => {
          const { roleMenus = '', roleId } = record;
          const arr = roleMenus.split(',');
          return (
            <Switch
              defaultChecked={arr.indexOf(item.menuId) !== -1}
              onChange={() => this.handlerChange(roleId, item.menuId)}
            />
          );
        }
      });
    });
    return [...columns.concat(result), action];
  };

  buttonBox = () => {
    const { saveLoading, adding } = this.props;
    return (
      <>
        <FormModal record={{}} columns={roleColumns} onOk={this.createRole} confirmLoading={adding}>
          <Button type="primary" style={{ marginRight: 10 }}>新建角色</Button>
        </FormModal>
        <Button loading={saveLoading} type="primary" onClick={this.saveAuthority}>保存</Button>
      </>
    );
  };

  render() {
    const {
      [namespace]: { roleData },
      roleLoading
    } = this.props;
    return (
      <PageContainer title="权限管理">
        <GridContent>
          <Card title='权限列表' extra={this.buttonBox()}>
            <Table
              bordered={false}
              columns={this.getColumns()}
              loading={roleLoading}
              dataSource={roleData}
              rowKey={record => record.roleId}
              pagination={false}
              scroll={{ x: 'max-content' }}
            />
          </Card>
        </GridContent>
      </PageContainer>
    );
  }
}

export default Authority;
