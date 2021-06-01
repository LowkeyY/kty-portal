/* eslint-disable no-script-url,no-param-reassign */
import React from 'react';
import { connect } from 'umi';
import {
  Card,
  Row,
  Col,
  Button,
  Tree,
  Icon,
  message,
  Spin,
  Form,
  Input,
  Empty,
  Modal,
  InputNumber
} from 'antd';
import FormModal from '@/components/FormModal';
import { PageContainer, GridContent } from '@ant-design/pro-layout';

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

const { confirm } = Modal;
const namespace = 'menuManage';
const FormItem = Form.Item;
const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 6 }
};

const columns = [
  {
    key: 'menuName',
    title: '名称'
  },
  {
    key: 'menuEntrance',
    title: '地址'
  },
  {
    key: 'menuIcon',
    title: '图标'
  },
  {
    key: 'sort',
    title: '排序'
  }
];

/* eslint react/no-multi-comp:0 */
@connect(({ menuManage, loading }) => ({
  menuManage,
  treeLoading: loading.effects[`${namespace}/fetchMenu`],
  adding: loading.effects[`${namespace}/addMenu`],
  updating: loading.effects[`${namespace}/updateMenu`],
  fetchingItem: loading.effects[`${namespace}/queryItemMenu`]
}))

class MenuManage extends React.Component {
  formRef = React.createRef();
  state = {
    disabled: true
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: `${namespace}/fetchMenu`
    });
  }

  createHandler = (values, {}, callback) => {
    const {
      dispatch,
      [namespace]: { selectedKey }
    } = this.props;
    dispatch({
      type: `${namespace}/addMenu`,
      payload: {
        ...values,
        pMenuId: selectedKey === '' ? undefined : selectedKey
      },
      callback
    });
  };

  editorSuccess = () => {
    this.setState({
      disabled: true
    });
  };

  editHandler = async () => {
    const { dispatch, [namespace]: { selectedKey, itemDate } } = this.props;
    const values = await this.formRef.current.validateFields();
    dispatch({
      type: `${namespace}/updateMenu`,
      payload: {
        ...values,
        menuId: selectedKey,
        pMenuId: itemDate.pMenuId || ''
      },
      callback: this.editorSuccess
    });
  };

  handlerUpdateClick = () => {
    this.setState({
      disabled: false
    });
  };

  deleteHandler = () => {
    const {
      dispatch,
      [namespace]: { selectedKey }
    } = this.props;
    dispatch({
      type: `${namespace}/deleteMenu`,
      payload: {
        menuId: selectedKey
      }
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

  editorUserBox = () => {
    const {
      [namespace]: { selectedKey },
      updating

    } = this.props;
    const { disabled } = this.state;
    return (
      <div>
        <Button disabled={selectedKey === ''}
                loading={updating}
                onClick={disabled ? this.handlerUpdateClick : this.editHandler}
                type="primary"
                size="small"
        >
          {disabled ? '修改' : '保存'}
        </Button>
        <Button
          style={{ marginLeft: 10 }}
          onClick={() => this.showDeleteConfirm()}
          disabled={selectedKey === ''}
          type="primary"
          size="small"
        >
          删除
        </Button>
      </div>
    );
  };

  setValue = (data) => {
    if (this.formRef.current) {
      this.formRef.current.setFieldsValue(data);
    }
  };

  handlerTreeSelect = (key, e) => {
    const { dispatch } = this.props;
    if (key.length > 0) {
      this.editorSuccess();
      dispatch({
        type: `${namespace}/save`,
        payload: {
          selectedKey: key
        }
      });
      dispatch({
        type: `${namespace}/queryItemMenu`,
        payload: {
          menuId: key.join('')
        },
        callback: this.setValue
      });

    } else {
      dispatch({
        type: `${namespace}/save`,
        payload: {
          selectedKey: ''
        }
      });
      message.error('未选择菜单');
    }
  };

  onLoadData = ({ key, children }) => {
    const { [namespace]: { menuData }, dispatch } = this.props;
    return new Promise((resolve) => {
      if (children) {
        resolve();
        return;
      }
      dispatch({
        type: `${namespace}/fetchChildren`,
        payload: {
          pMenuId: key
        },
        callback: res => {
          dispatch({
            type: `${namespace}/save`,
            payload: {
              menuData: updateTreeData(menuData, key, res)
            }
          });
        }
      }).then(() => {
        resolve();
      });
    });
  };

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({
      type: `${namespace}/clear`
    });
    this.setState = ()=>false;
  }


  render() {
    const {
      [namespace]: { selectedKey, menuData },
      treeLoading,
      adding
    } = this.props;
    const { disabled } = this.state;
    return (
      <PageContainer title="菜单管理">
        <GridContent>
          <Row gutter={24}>
            <Col lg={6} md={24}>
              <Card
                bordered={false}
                title="菜单管理"
                extra={
                  <FormModal record={{}} columns={columns} onOk={this.createHandler} confirmLoading={adding}>
                    <Button type="primary" size="small" ghost>
                      新建
                    </Button>
                  </FormModal>
                }
              >
                {treeLoading ? (
                  <div style={{ textAlign: 'center' }}>
                    <Spin />
                  </div>
                ) : (
                   <Tree
                     blockNode
                     defaultCheckedKeys={['/project']}
                     onSelect={this.handlerTreeSelect}
                     loadData={this.onLoadData}
                     treeData={menuData}
                   />
                 )}
              </Card>
            </Col>
            <Col lg={18} md={24}>
              <Card title='菜单管理' extra={this.editorUserBox()}>
                {
                  selectedKey === '' ?
                  <Empty description="未选择菜单" />
                                     :
                  <Form {...formItemLayout} layout='horizontal' ref={this.formRef}>
                    <FormItem
                      label="名称"
                      name='menuName'
                      required
                      rules={[
                        {
                          required: true
                        }
                      ]}
                    >
                      <Input disabled={disabled} />
                    </FormItem>
                    <FormItem
                      label="地址"
                      name='menuEntrance'
                      required
                      rules={[
                        {
                          required: true
                        }
                      ]}>
                      <Input disabled={disabled} />
                    </FormItem>
                    <FormItem label="图标" name='menuIcon'>
                      <Input disabled={disabled} />
                    </FormItem>
                    <FormItem label="排序" name='sort'>
                      <InputNumber disabled={disabled} />
                    </FormItem>
                  </Form>
                }
              </Card>
            </Col>
          </Row>
        </GridContent>
      </PageContainer>
    );
  }
}

export default MenuManage;
