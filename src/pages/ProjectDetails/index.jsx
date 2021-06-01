/**
 * @author Lowkey
 * @date 2021/03/24 19:17:51
 * @Description: 没时间拆分组件了
 */
import React, { Component } from 'react';
import { PageContainer, RouteContext } from '@ant-design/pro-layout';
import {
  Card,
  Col,
  Form,
  Row,
  Steps,
  Empty,
  Button,
  List,
  Input,
  Space,
  Modal,
  Select,
  Switch,
  message,
  Collapse,
  Popconfirm,
  Upload,
  Progress,
  Tag,
  Menu,
  Dropdown
} from 'antd';
import TaskCard from './components/TaskCard';
import MembersCard from './components/MebmersCard';
import classNames from 'classnames';
import Info from './components/Infos';
import moment from 'moment';
import FormModal from '@/components/FormModal';
import { connect, history } from 'umi';
import { renderSize, formatCreateValues } from '@/utils/utils';
import {
  ExclamationCircleOutlined,
  InboxOutlined,
  DownOutlined,
  PlusOutlined,
  MoreOutlined
} from '@ant-design/icons';
import styles from './index.less';

const progressItem = [
  {
    key: 'wcd',
    title: '完成进度',
    formType: 'number'
  },
  {
    key: 'bz',
    title: '备注'
  }
];
const versionItem = [
  {
    key: 'bbbz',
    title: '版本备注'
  }
];
const { Dragger } = Upload;
const { confirm } = Modal;
const { Panel } = Collapse;
const { Step } = Steps;
const props = {
  name: 'file',
  multiple: true,
  action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  onChange(info) {
    const { status } = info.file;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  }
};


class ProjectDetails extends Component {

  constructor(props) {
    super(props);
    this.state = {
      editable: false,
      visible: false
    };
    this.menu = (
      <Menu>
        <Menu.Item key="2" onClick={() => this.showConfirm('lock')}>锁定</Menu.Item>
      </Menu>
    );
  }

  componentDidMount() {
    const { xmbm = '' } = this.props.location.query;
    const { dispatch } = this.props;
    dispatch({
      type: 'projectDetails/fetchList'
    });
    dispatch({
      type: 'projectDetails/fetchTask'
    });
    dispatch({
      type: 'projectDetails/fetchMembers'
    });
    dispatch({
      type: 'projectDetails/fetchCountry'
    });
    dispatch({
      type: 'projectDetails/fetchInfo',
      payload: {
        xmbm
      }
    });
  }

  getIcon = (type = 'file') => {
    if (RegExp(/pdf/)
      .exec(type)) {
      return '/icons/PDF.svg';
    } else if (RegExp(/word/)
      .exec(type)) {
      return '/icons/DOCX.svg';
    } else if (RegExp(/xlsb/)
      .exec(type)) {
      return '/icons/EXCEL.svg';
    } else if (RegExp(/ppt/)
      .exec(type)) {
      return '/icons/PPT.svg';
    } else if (RegExp(/^(\s|\S)+(jpeg|jpg|png|JPG|PNG|)+$/)
      .exec(type)) {
      return '/icons/IMAGE.svg';
    }
    return '/icons/file.svg';
  };

  getClassName = ({ status }) => {
    switch (Number(status)) {
      case 1 :
        return 'going';
      case 2 :
        return 'complete';
      default :
        return 'noStarted';
    }
  };

  cancel = () => {
    this.setState({
      editable: false
    });
  };

  getTitle = (status) => {
    return (
      <div>
        <span style={{ marginRight: 10 }}>
          项目详情
           <Tag style={{ marginLeft: 6 }} color="cyan">{status}</Tag>
        </span>
        <Select defaultValue="v1.0" style={{ width: 120 }}>
          <Select.Option value="v1.0">v1.0</Select.Option>
          <Select.Option value="v1.2">v1.2</Select.Option>
          <Select.Option value="v1.3">v1.3</Select.Option>
        </Select>
        <FormModal
          type="modal"
          record={{}}
          columns={versionItem}
          onOk={this.handlerNewVersion}
          confirmLoading={this.props.addVersionLoading}
        >
          <Button
            style={{ marginLeft: 6 }}
            type="primary"
            shape="circle"
            icon={<PlusOutlined />}
            size='small'
          />
        </FormModal>
      </div>
    );
  };

  handlerNewVersion = (values, {}, callback) => {
    const { dispatch, location: { query } } = this.props;
    const { xmbm = '' } = query;
    dispatch({
      type: 'projectDetails/addVersion',
      payload: {
        ...values,
        xmbm
      },
      callback
    });
  };
  handlerAfresh = () => {

  };
  showConfirm = (key) => {
    const title = {
      afresh: '确定要重新评价该项目吗?'
    };
    const event = {
      afresh: this.handlerAfresh
    };
    confirm({
      title: title[key] || '',
      icon: <ExclamationCircleOutlined />,
      content: '操作不可撤回',
      onOk() {
        event[key]();
      },
      onCancel() {
        console.log('Cancel');
      }
    });
  };

  showModal = () => {
    this.setState({
      visible: true
    });
  };

  handleOk = () => {
    this.setState({
      visible: false
    });
  };

  onSubmit = (values) => {
    const { dispatch, location: { query } } = this.props;
    const { xmbm = '' } = query;
    dispatch({
      type: 'projectDetails/updateInfo',
      payload: {
        ...formatCreateValues(values),
        xmbm
      },
      callback: this.cancel
    });
  };

  handleCancel = () => {
    this.setState({
      visible: false
    });
  };

  renderForm = () => {
    return (
      <div>
        <Form
          name="basic"
        >
          <Form.Item
            label="文件名称"
            name="Username"
            rules={[{ required: true, message: '文件名称须填写!' }]}
          >
            <Input />
          </Form.Item>

          <Dragger {...props}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">将文件拖拽至此处上传</p>
          </Dragger>
        </Form>
      </div>

    );
  };

  handelUpdateProgress = (values, {}, callback) => {
    const { dispatch, location: { query } } = this.props;
    const { xmbm = '' } = query;
    dispatch({
      type: 'projectDetails/updateProgress',
      payload: {
        ...values,
        xmbm
      },
      callback
    });
  };

  render() {
    const { list, members, country, taskData, info } = this.props.projectDetails;
    const { xmzt = {} } = info, { wcd = 0, dqzt = '' } = xmzt;
    const { location: { query } } = this.props;
    const { xmbm = '' } = query;
    const { editable } = this.state;
    // @ts-ignore
    const description = (
      <>
        <Row gutter={[24, 24]}>
          <Col xs={24} sm={24} md={20} lg={20}>
            <Collapse ghost>
              <Panel header={<div className={styles.tips}>项目公告</div>} key="1">
                <p>1、该项目工期提前，请个负责人加班处理。</p>
                <p>2、辛苦了。</p>
              </Panel>
            </Collapse>,
          </Col>
          <Col xs={24} sm={24} md={4} lg={4}>
            <FormModal
              type="modal"
              record={xmzt}
              columns={progressItem}
              onOk={this.handelUpdateProgress}
              confirmLoading={this.props.updateProgressLoading}
            >
              <Progress
                style={{ align: 'right' }}
                width={80}
                strokeWidth={16}
                type="circle"
                strokeColor={{
                  '0%': '#108ee9',
                  '100%': '#87d068'
                }}
                percent={wcd}
              />
            </FormModal>
          </Col>
        </Row>
        <div className={styles.title}>
          <div className={styles.tips}>项目概况</div>
          <Space>
            编辑
            <Switch checked={editable} onChange={(checked) => this.setState({ editable: checked })} />
          </Space>
        </div>
        <Info
          country={country}
          editable={editable}
          cancel={this.cancel}
          onOk={this.onSubmit}
          updateLoading={this.props.updateInfoLoading}
          fetchLoading={this.props.fetchInfoLoading}
        />
      </>
    );
    return (
      <PageContainer
        title={this.getTitle(dqzt)}
        extra={
          <Dropdown.Button type="primary" overlay={this.menu} onClick={() => this.showConfirm('afresh')}>
            重新评价
          </Dropdown.Button>
        }
        breadcrumb
        content={description}
        onBack={() => history.goBack()}
      >
        <Card title="流程进度" style={{ marginBottom: 24 }}>
          <Steps current={1} percent={60} style={{ padding: '0 14px', marginBottom: '30px' }}>
            {
              taskData && taskData.map(item =>
                <Step
                  key={item.id}
                  title={
                    <span
                      className={classNames(styles.step, styles[this.getClassName(item)])}
                    >
                        {item.text}
                        </span>
                  }
                />)
            }
          </Steps>
          <Row gutter={[24, 24]} justify="space-around">
            {
              taskData && taskData.map(item => <Col key={item.id} xs={24} sm={24} md={12} lg={6}>
                <TaskCard data={item} xmbm={xmbm} />
              </Col>)
            }
          </Row>
        </Card>
        <Row gutter={[24, 24]}>
          <Col xs={24} sm={24} md={18} lg={18}>
            <Card title="资料共享" extra={<Upload {...props}>
              <a onClick={this.showModal}>上传资料</a>
            </Upload>}>
              <List
                itemLayout="horizontal"
                dataSource={list}
                renderItem={item =>
                  <List.Item
                    key={item.id}
                    extra={
                      <span>{moment(item.createDate).format('YYYY-MM-DD')}</span>
                    }>
                    <div className={styles.doc}>
                      <img style={{ width: '28px', marginRight: '10px' }}
                           src={this.getIcon(item.type)} alt="" />
                      <div className={styles.info}>
                        <div className={styles.docName}>{item.title}</div>
                        <div className={styles.docSize}>{renderSize(item.size)}</div>
                      </div>
                    </div>
                  </List.Item>
                }
              />
            </Card>
          </Col>
          <Col xs={24} sm={24} md={6} lg={6}>
            <MembersCard data={members} />
          </Col>
        </Row>
        <Modal title="上传资料" visible={this.state.visible} onOk={this.handleOk} onCancel={this.handleCancel}>
          {this.renderForm()}
        </Modal>
      </PageContainer>
    );
  }
}

export default connect(({ projectDetails, loading }) => ({
  projectDetails,
  updateInfoLoading: loading.effects['projectDetails/updateInfo'],
  fetchInfoLoading: loading.effects['projectDetails/fetchInfo'],
  updateProgressLoading: loading.effects['projectDetails/updateProgress'],
  addVersionLoading: loading.effects['projectDetails/addVersion']
}))(ProjectDetails);
