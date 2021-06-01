/* eslint-disable no-script-url,no-param-reassign */
import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
  Card,
  Row,
  Col,
  Button,
  Tree,
  Table,
  message,
  Pagination,
  Dropdown,
  Menu,
  Spin,
  Modal,
  Popconfirm,
  Space,
  Empty
} from 'antd';
import { PageContainer, GridContent } from '@ant-design/pro-layout';
import { FormOutlined } from '@ant-design/icons';
import { pattern } from '@/utils/prompt';
import sha1 from 'js-sha1';
import FormModal from '@/components/FormModal';

const namespace = 'organizational';
const { confirm } = Modal;

function updateTreeData(list, key, children) {
  return list.map((node) => {
    if (node.key === key) {
      return { ...node, children };
    }

    if (node.children) {
      return { ...node, children: updateTreeData(node.children, key, children) };
    }
    return node;
  });
}

const deptColumns = [
  {
    key: 'deptName',
    title: '名称',
    rules: [
      {
        required: true
      }
    ]
  },
  {
    key: 'sort',
    title: '排序'
  }
];
const otherColumns = [
  {
    key: 'userPwd',
    title: '密码',
    formType: 'password',
    updateShow: false
  },
  {
    key: 'avatar',
    title: '头像',
    formType: 'upload',
    hide: true
  }
]; //列表不显示
/* eslint react/no-multi-comp:0 */
@connect(({ organizational, authority, loading }) => ({
  organizational,
  authority,
  treeLoading: loading.effects[`${namespace}/fetchDept`],
  userLoading: loading.effects[`${namespace}/queryUser`],
  addDept: loading.effects[`${namespace}/addDept`],
  resetting: loading.effects[`${namespace}/resetPassword`]
}))

class Organizational extends PureComponent {


  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: `${namespace}/fetchDept`
    });
    dispatch({
      type: 'authority/fetchRole'
    });
  }

  createHandler = (values, {}, callback) => {
    const {
      dispatch,
      [namespace]: { selectedKey }
    } = this.props;
    dispatch({
      type: `${namespace}/addDept`,
      payload: {
        ...values,
        parentDept: selectedKey
      },
      callback
    });
  };

  editHandler = (values, {}, callback) => {
    const {
      dispatch,
      [namespace]: { selectedKey, itemDate }
    } = this.props;
    dispatch({
      type: `${namespace}/updateDept`,
      payload: {
        ...values,
        deptId: selectedKey,
        parentDept: itemDate.parentDept || ''
      },
      callback
    });
  };

  deleteHandler = () => {
    const {
      dispatch,
      [namespace]: { selectedKey }
    } = this.props;
    dispatch({
      type: `${namespace}/dvalidate`,
      payload: {
        deptId: selectedKey
      }
    });
  };

  createUserHandler = (values, {}, callback) => {
    const {
      dispatch,
      [namespace]: { selectedKey, photoPath }
    } = this.props;
    if (selectedKey === '') {
      message.error('请选择一个部门');
    } else {
      dispatch({
        type: `${namespace}/addUser`,
        payload: {
          ...values,
          photoPath,
          deptId: selectedKey
        },
        callback
      });
    }
  };

  editUserHandler = (values, { userId }, callback) => {
    const { dispatch, [namespace]: { photoPath } } = this.props;
    dispatch({
      type: `${namespace}/updateUser`,
      payload: {
        ...values,
        photoPath,
        userId
      },
      callback
    });
  };

  confirm = (id) => {
    const { dispatch } = this.props;
    dispatch({
      type: `${namespace}/deleteUser`,
      payload: {
        userId: id
      }
    });
  };

  handlerUpload = (value) => {
    const { dispatch } = this.props;
    dispatch({
      type: `${namespace}/uploadAvatar`,
      payload: value
    });
  };

  createUserBox = (columns) => {
    const {
      [namespace]: { selectedKey }
    } = this.props;
    return (
      <div>
        <FormModal
          record={{}}
          columns={[...columns, ...otherColumns]}
          onOk={this.createUserHandler}
          onUpload={(values) => this.handlerUpload(values)}
        >
          {selectedKey !== '' ? <Button type="primary">
            添加用户
          </Button> : null}

        </FormModal>
      </div>
    );
  };

  handlerTreeSelect = (key) => {
    const { dispatch, [namespace]: { pagination, treeData } } = this.props;
    const { nowPage, pageSize } = pagination;
    if (key.length > 0) {
      dispatch({
        type: `${namespace}/save`,
        payload: {
          selectedKey: key,
          itemData: treeData.find(item => item.deptId === Number(key)) || {}
        }
      });
      dispatch({
        type: `${namespace}/queryUser`,
        payload: {
          deptId: key.join(''),
          nowPage,
          pageSize
        }
      });
    } else {
      message.error('未选择菜单');
      dispatch({
        type: `${namespace}/save`,
        payload: {
          selectedKey: ''
        }
      });
    }
  };

  pageChangeHandler = page => {
    const {
      dispatch,
      [namespace]: { pagination, selectedKey }
    } = this.props;
    dispatch({
      type: `${namespace}/updatePagination`,
      payload: {
        ...pagination,
        nowPage: page
      }
    });
    dispatch({
      type: `${namespace}/queryUser`,
      payload: {
        nowPage: page,
        pageSize: pagination.pageSize,
        deptId: selectedKey
      }
    });
  };

  onShowSizeChange = (current, pageSize) => {
    const { dispatch, [namespace]: { pagination, selectedKey }, authority: { roleData } } = this.props;
    dispatch({
      type: `${namespace}/updatePagination`,
      payload: {
        ...pagination,
        pageSize
      }
    });
    dispatch({
      type: `${namespace}/queryUser`,
      payload: {
        nowPage: current,
        pageSize,
        deptId: selectedKey
      }
    });
  };

  menu = () => {
    const { addDept, [namespace]: { selectedKey, itemData } } = this.props;
    return (
      <Menu>
        <Menu.Item>
          <FormModal
            type="drawer"
            record={{}}
            columns={deptColumns}
            onOk={this.createHandler}
            confirmLoading={addDept}>
            <Button type="primary" size="small" ghost>
              新建
            </Button>
          </FormModal>
        </Menu.Item>
        {
          selectedKey !== '' ?
          <>
            <Menu.Item>
              <FormModal
                type="drawer"
                record={itemData}
                columns={deptColumns}
                onOk={this.editHandler}
                confirmLoading={addDept}>
                <Button
                  type="primary"
                  size="small"
                  ghost
                  style={{ marginRight: '5px' }}
                >
                  修改
                </Button>
              </FormModal>
            </Menu.Item>
            <Menu.Item>
              <Button
                type="primary"
                size="small"
                ghost
                style={{ marginRight: '5px' }}
                onClick={() => this.showDeleteConfirm()}
              >
                删除
              </Button>
            </Menu.Item>
          </>
                             :
          null
        }
      </Menu>
    );
  };
  onLoadData = ({ key, children }) => {
    const { [namespace]: { treeData }, dispatch } = this.props;
    return new Promise((resolve) => {
      if (children) {
        resolve();
        return;
      }
      dispatch({
        type: `${namespace}/fetchChildren`,
        payload: {
          parentId: key
        },
        callback: res => {
          dispatch({
            type: `${namespace}/save`,
            payload: {
              treeData: updateTreeData(treeData, key, res)
            }
          });
        }
      }).then(() => {
        resolve();
      });
    });
  };

  showDeleteConfirm = () => {
    const {
      [namespace]: { selectedKey }
    } = this.props;
    if (selectedKey === '') {
      message.error('请选择一个部门');
    } else {
      confirm({
        title: '删除',
        content: '删除后不可恢复,请谨慎操作',
        okText: '确定',
        okType: 'danger',
        cancelText: '取消',
        onOk: () => this.deleteHandler(),
        onCancel() {
          console.log('Cancel');
        }
      });
    }
  };

  resetPassword = (values, { userId }, callback) => {
    const { dispatch } = this.props;
    const { userPwd } = values;
    dispatch({
      type: `${namespace}/resetPassword`,
      payload: {
        userPwd: sha1(userPwd),
        userId
      },
      callback
    });
  };

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({
      type: `${namespace}/clear`
    });
    this.setState = () => false;
  }

  render() {
    const {
      [namespace]: { treeData, userData, pagination, selectedKey },
      treeLoading,
      userLoading,
      authority
    } = this.props;
    const { nowPage, pageSize, totalCount } = pagination;
    const { roleData } = authority;
    const passwordColumns = [
      {
        title: '重置密码',
        dataIndex: 'userPwd',
        key: 'userPwd'
      }
    ];
    const columns = [
      {
        title: '序号',
        dataIndex: 'key',
        key: 'key',
        hide: true
      },
      {
        title: '用户名',
        dataIndex: 'userName',
        key: 'userName'
      },
      {
        title: '角色',
        dataIndex: 'roleId',
        key: 'roleId',
        formType: 'radio',
        options: roleData,
        rules: [
          {
            required: true
          }
        ],
        render: (text) => {
          if (roleData.length > 2) {
            return roleData.find(item => item.roleId === Number(text)).roleName;
          }
        }
      },
      {
        title: '手机号',
        dataIndex: 'userPhone',
        key: 'userPhone',
        rules: [{
          pattern: pattern('phone')
        }],
        render: val => {
          if (val && val !== '') {
            return val;
          }
          return '未填写';
        }
      },
      {
        title: '邮箱',
        dataIndex: 'userEmail',
        key: 'userEmail',
        rules: [{
          pattern: pattern('email')
        }],
        render: val => {
          if (val && val !== '') {
            return val;
          }
          return '未填写';
        }
      },
      {
        title: '真实姓名',
        dataIndex: 'userRealName',
        key: 'userRealName',
        rules: [
          {
            required: true
          }
        ]
      },
      {
        title: '性别',
        dataIndex: 'userSex',
        key: 'userSex',
        formType: 'gender',
        rules: [
          {
            required: true
          }
        ],
        render: (val) => {
          if (val === '0') {
            return '男';
          }
          if (val === '1') {
            return '女';
          }
          return '-';
        }
      },
      {
        title: '年龄',
        dataIndex: 'userAge',
        key: 'userAge',
        formType: 'number'
      },
      {
        title: '操作',
        hide: true,
        render: (text, record) => (
          <Space size="middle">
            <FormModal
              record={record}
              loading={this.props.addDept}
              columns={[...columns, ...otherColumns]}
              onOk={this.editUserHandler}
              onUpload={(values) => this.handlerUpload(values)}
            >
              <a href="#">修改</a>
            </FormModal>
            <Popconfirm
              title="确定要删除吗?"
              onConfirm={() => this.confirm(record.userId)}
              okText="确定"
              cancelText="取消"
            >
              <a href="#">删除</a>
            </Popconfirm>
            <FormModal
              record={{ userId: record.userId }}
              loading={this.props.resetting}
              columns={passwordColumns}
              onOk={this.resetPassword}
            >
              <a href="#">重置密码</a>
            </FormModal>
          </Space>
        )
      }
    ];
    return (
      <PageContainer title="用户管理">
        <GridContent>
          <Row gutter={[24, 24]}>
            <Col lg={6} md={24}>
              <Card
                bordered={false}
                title="组织机构管理"
                extra={
                  <Dropdown overlay={this.menu()} placement="bottomCenter">
                    <FormOutlined />
                  </Dropdown>
                }
              >
                {treeLoading ? (
                  <div style={{ textAlign: 'center' }}>
                    <Spin />
                  </div>
                ) : (
                   <Tree
                     blockNode
                     defaultCheckedKeys={[]}
                     onSelect={this.handlerTreeSelect}
                     loadData={this.onLoadData}
                     treeData={treeData}
                   />
                 )}
              </Card>
            </Col>
            <Col lg={18} md={24}>
              <Card title='用户管理' extra={this.createUserBox(columns)}>
                {
                  selectedKey !== '' ?
                  <>
                    <Table
                      bordered={false}
                      columns={columns}
                      loading={userLoading}
                      dataSource={userData}
                      rowKey={record => record.userId}
                      pagination={false}
                    />
                    <Pagination
                      className="ant-table-pagination"
                      total={parseInt(totalCount, 10)}
                      current={parseInt(nowPage, 10)}
                      pageSize={parseInt(pageSize, 10)}
                      onChange={this.pageChangeHandler}
                      showSizeChanger
                      onShowSizeChange={this.onShowSizeChange}
                    />
                  </>
                                     :
                  <Empty description="未选择部门" />
                }

              </Card>
            </Col>
          </Row>
        </GridContent>
      </PageContainer>
    );
  }
}

export default Organizational;
