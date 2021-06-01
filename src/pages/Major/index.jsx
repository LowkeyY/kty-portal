import React, { Component } from 'react';
import { connect, history } from 'umi';
import { PageContainer, GridContent } from '@ant-design/pro-layout';
import { Menu, Button, Table, Space, Popconfirm, Empty } from 'antd';
import { EditableProTable } from '@ant-design/pro-table';
import FormModal from '@/components/FormModal';
import styles from './style.less';


const { Item } = Menu;

const formItem = [
  {
    key: 'zymc',
    title: '专业名称'
  },
  {
    key: 'zybz',
    title: '备注'
  }
];


class Major extends Component {
  main = undefined;

  constructor(props) {
    super(props);
    this.state = {
      mode: 'inline',
      selectKey: ''
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'major/fetchList'
    });
    dispatch({
      type: 'major/fetchModelType'
    });
    window.addEventListener('resize', this.resize);
    this.resize();
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    window.removeEventListener('resize', this.resize);
    dispatch({
      type: 'major/clear'
    });
  }

  getMenu = () => {
    const { list } = this.props.major;
    return list.map((item) => <Item key={item.zybm}>{item.zymc}</Item>);
  };

  selectKey = (key) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'major/fetchModel',
      payload: {
        zybm: key
      }
    });
    this.setState({
      selectKey: key
    });
  };

  resize = () => {
    if (!this.main) {
      return;
    }
    requestAnimationFrame(() => {
      if (!this.main) {
        return;
      }

      let mode = 'inline';
      const { offsetWidth } = this.main;

      if (this.main.offsetWidth < 641 && offsetWidth > 400) {
        mode = 'horizontal';
      }
      if (window.innerWidth < 768 && offsetWidth > 400) {
        mode = 'horizontal';
      }
      this.setState({
        mode
      });
    });
  };

  confirm = ({ mkbm }) => {
    const { dispatch } = this.props;
    const { selectKey } = this.state;
    dispatch({
      type: 'major/deleteModel',
      payload: {
        mkbm,
        zybm: selectKey
      }
    });
  };

  renderChildren = (columns, modelItem) => {
    const { selectKey } = this.state;
    const { loadingModel, major, addModel } = this.props;
    const { majorInfo: { ptMkxxList = [], zybm = '' } } = major;
    return (
      selectKey !== '' ?
      <>
        <Table
          loading={loadingModel}
          columns={columns}
          rowKey={record=>record.mkbm}
          dataSource={ptMkxxList}
          pagination={false}
        />
        <FormModal
          type="drawer"
          record={{}}
          columns={modelItem}
          onOk={this.handelCreateModel}
          confirmLoading={addModel}
        >
          <Button type="dashed" block>
            添加模块
          </Button>
        </FormModal>
      </>
                       :
      <Empty description="未选择专业" />
    );
  };

  handelCreateMajor = (values, record, callback, type) => { //新建、修改
    const { dispatch } = this.props;
    const { zybm } = record;
    dispatch({
      type: `major/${type === 'create' ? 'createMajor' : 'updateMajor'}`,
      payload: { ...values, zybm },
      callback
    });
  };

  handelCreateModel = (values, { mkbm }, callback, type) => {
    const { dispatch } = this.props;
    const { selectKey } = this.state;
    dispatch({
      type: `major/${type === 'create' ? 'createModel' : 'updateModel'}`,
      payload: {
        ...values,
        mkbm,
        sszy: selectKey
      },
      callback
    });
  };

  handelCreateModelType = (value) => {
    const { dispatch } = this.props;
    if (value !== '') {
      dispatch({
        type: 'major/createModelType',
        payload: {
          lxmc: value
        }
      });
    }
  };

  handelDeleteModelType = (value) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'major/deleteModelType',
      payload: {
        lxbm: value
      }
    });
  };

  onDelete = () => {
    const { dispatch } = this.props;
    const { selectKey } = this.state;
    dispatch({
      type: 'major/deleteMajor',
      payload: { zybm: selectKey },
      callback: () => this.setState({ selectKey: '' })
    });
  };


  renderButtons = (majorInfo) => {
    const { selectKey } = this.state;
    return (
      <div className={styles.btn}>
        <FormModal
          type="drawer"
          record={{}}
          columns={formItem}
          onOk={this.handelCreateMajor}
          confirmLoading={this.props.addMajor}
        >
          <Button type="primary" style={{ marginBottom: '10px' }}>
            创建专业
          </Button>
        </FormModal>
        {
          selectKey !== '' ?
          <>
            <FormModal
              type="drawer"
              record={majorInfo}
              columns={formItem}
              onOk={this.handelCreateMajor}
              confirmLoading={this.props.updateMajor}
            >
              <Button type="primary" style={{ margin: '0 10px 10px 10px' }}>
                修改
              </Button>
            </FormModal>
            <Popconfirm title='确定删除？' onConfirm={() => this.onDelete()}> <Button type="primary"
                                                                                 style={{ marginBottom: '10px' }}>
              删除
            </Button></Popconfirm>
          </>
                           :
          null
        }
      </div>
    );
  };

  render() {
    const { mode, selectKey } = this.state;
    const { majorInfo, modelType } = this.props.major, { zymc = '' } = majorInfo;
    const modelItem = [
      {
        key: 'mkmc',
        title: '模块名称'
      },
      {
        key: 'useUri',
        title: '调用地址'
      },
      {
        key: 'mklx',
        title: '模块类型',
        formType: 'selectDrop',
        options: modelType,
        events: {
          add: this.handelCreateModelType,
          remove: this.handelDeleteModelType
        }
      },
      {
        key: 'mkbz',
        title: '备注'
      }
    ];
    const columns = [
      {
        title: '模块名称',
        key: 'mkmc',
        dataIndex: 'mkmc'
      },
      {
        title: '模块类型',
        key: 'mklx',
        dataIndex: 'mklx'
      },
      {
        title: '创建时间',
        key: 'createDate',
        dataIndex: 'createDate',
        hide: true
      },
      {
        title: '更新时间',
        key: 'updateDate',
        dataIndex: 'updateDate',
        hide: true
      },
      {
        title: '操作',
        valueType: 'option',
        width: 200,
        hide: true,
        render: (text, record) =>(
          <Space size="middle">
            <FormModal
              type="drawer"
              record={record}
              columns={modelItem}
              onOk={this.handelCreateModel}
              confirmLoading={this.props.updateModel}
            >
              <a>修改</a>
            </FormModal>
            <Popconfirm title='确定删除？' onConfirm={(e) => this.confirm(record, e)}><a>删除</a></Popconfirm>
          </Space>
        )
      }
    ];
    return (
      <PageContainer>
        <GridContent>
          <div
            className={styles.main}
            ref={(ref) => {
              if (ref) {
                this.main = ref;
              }
            }}
          >
            <div className={styles.leftMenu}>
              <Menu mode={mode} selectedKeys={[selectKey]} onClick={({ key }) => this.selectKey(key)}>
                {this.getMenu()}
              </Menu>
            </div>
            <div className={styles.right}>
              <div className={styles.header}>
                <div className={styles.title}>{zymc}</div>
                {this.renderButtons(majorInfo)}
              </div>
              {this.renderChildren(columns, modelItem)}
            </div>
          </div>
        </GridContent>
      </PageContainer>
    );
  }
}

export default connect(({ major, loading }) => ({
  major,
  loadingMajor: loading.effects['major/fetchList'],
  loadingModel: loading.effects['major/fetchModel'],
  addMajor: loading.effects['major/createMajor'],
  updateMajor: loading.effects['major/updateMajor'],
  addModel: loading.effects['major/createModel'],
  updateModel: loading.effects['major/updateModel']
}))(Major);
