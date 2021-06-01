/**
 * @author Lowkey
 * @date 2021/02/04 11:26:47
 * @Description: 通用表单弹窗
 */
import React, { useState, useEffect, useRef } from 'react';
import {
  Modal,
  Form,
  Upload,
  DatePicker,
  Radio,
  Drawer,
  Button,
  Input,
  Select,
  Divider,
  InputNumber,
  Popconfirm,
  message,
  Row,
  Col
} from 'antd';
import moment from 'moment';
import { connect } from 'umi';
import { LoadingOutlined, DeleteOutlined, PlusOutlined, PoweroffOutlined } from '@ant-design/icons';
import styles from './index.less';

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

const EditOption = (props) => {
  const { item, onOk } = props;
  const { value, label } = item;
  const onDelete = (value) => {
    onOk(value);
  };


  return (
    <div className={styles.option}>
      <span style={{ marginRight: 10 }}>{label}</span>
      <Popconfirm title='确定删除？' onConfirm={() => onDelete(value)}><DeleteOutlined /></Popconfirm>
    </div>
  );
};

const formItemLayout = {
    labelCol: {
      span: 8
    },
    wrapperCol: {
      span: 10
    }
  },
  dateFormat = 'YYYY-MM-DD',
  getInitialValues = (obj) => {
    Object.keys(obj).map(item => {
      if (item === 'kspjsj' || item === 'jzpjsj' || item === 'tcsj' || item === 'fxsj') {
        if (obj[item]) {
          obj[item] = moment(obj[item], 'YYYY-MM-DD');
        }
      }
    });
    return obj;
  };


const FormModal = (props) => {
  const { children, columns, type, record, confirmLoading = false } = props;
  const [form] = Form.useForm();
  const { validateFields } = form;
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const inputEl = useRef(null);
  const [photoPath, setPhotoPath] = useState(record.photoPath);
  const [loading, setLoading] = useState(false);
  useEffect(() => {

  }, [record]);

  const beforeUpload = (file) => {
    const { onUpload } = props;
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('文件必须小于2M!');
      return false;
    }
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('只能上传图片格式文件!');
    }
    getBase64(file, photoPath => {
      setPhotoPath(photoPath);
      setLoading(setLoading);
    });
    const formData = new FormData();
    formData.append('formNames', 'avatar');
    formData.append('avatar', file);
    onUpload(formData);

    return false;
  };


  const showModelHandler = e => {
    if (e) e.stopPropagation();
    form.resetFields();
    form.setFieldsValue(getInitialValues(record));
    setVisible(true);
  };

  const hideModelHandler = () => {
    setVisible(false);
    setPhotoPath(record.photoPath);
    form.resetFields();
  };

  const addItem = (recall) => {
    recall(inputEl.current.state.value);
  };

  const okHandler = async (record) => {
    const { onOk } = props;
    const values = await validateFields();
    onOk(values, record, hideModelHandler, JSON.stringify(record) !== '{}' ? "update" : "create");
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div className="ant-upload-text">上传</div>
    </div>
  );

  const renderUpload = (key) => {
    return (
      <Row key={key}>
        <Col span={2} offset={6}> <span>修改头像:</span></Col>
        <Col span={8}>
          <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            beforeUpload={beforeUpload}
          >
            {photoPath ? <img src={photoPath} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
          </Upload>
        </Col>
      </Row>
    );
  };

  const renderGender = () => {
    return (
      <Radio.Group>
        <Radio value="0">男</Radio>
        <Radio value="1">女</Radio>
      </Radio.Group>
    );
  };

  const getFormType = ({ formType, options = [], events = {} }) => {
    const { add, remove } = events;
    if (formType === 'select') return <Select />;
    if (formType === 'selectDrop') return (
      <Select
        placeholder="请选择"
        // open={open}
        optionLabelProp="label"
        // onFocus={() => setOpen(true)}
        // onBlur={() => setOpen(false)}
        dropdownRender={menu => (
          <div>
            {menu}
            <Divider style={{ margin: '4px 0' }} />
            <div style={{ display: 'flex', flexWrap: 'nowrap', padding: 8 }}>
              <Input ref={inputEl} style={{ flex: 'auto' }} />
              <a
                style={{ flex: 'none', padding: '8px', display: 'block', cursor: 'pointer' }}
                onClick={() => addItem(add)}
              >
                <PlusOutlined /> 添加
              </a>
            </div>
          </div>
        )}
      >
        {options.map(item => (
          <Option key={item.value} label={item.label}><EditOption item={item} onOk={remove} /></Option>
        ))}
      </Select>
    );
    if (formType === 'number') return <InputNumber />;
    if (formType === 'password') return <Input.Password />;
    if (formType === 'gender') return renderGender();
    if (formType === 'datePicker') return <DatePicker format={dateFormat} />;
    if (formType === 'radio') return (
      <Radio.Group>
        {
          options.map(item => <Radio key={item.roleId.toString()}
                                     value={item.roleId.toString()}>{item.roleName}</Radio>)
        }
      </Radio.Group>
    );
    return <Input />;
  };

  const renderFormItem = () => {
    return (
      columns && columns.map(item => {
        const { key, hide = false, canEdit = true, title, rules, formType, updateShow = true } = item;
        if (!hide) {
          if (!updateShow && JSON.stringify(record) !== '{}') {
            return;
          }
          return (
            <div key={key}>
              <Form.Item
                name={key}
                label={title}
                disabled={!canEdit}
                rules={rules}
              >
                {getFormType(item)}
              </Form.Item>
            </div>
          );
        }
        if (formType === 'upload') {
          return renderUpload(key);
        }
      })
    );
  };
  return (
    <span>
        <span onClick={showModelHandler}>{children}</span>
      {type === 'drawer'
       ?
       <Drawer
         title={JSON.stringify(record) !== '{}' ? "修改" : "新建"}
         width={720}
         onClose={hideModelHandler}
         visible={visible}
         bodyStyle={{ paddingBottom: 80 }}
         footer={
           <div
             style={{
               textAlign: 'right'
             }}
           >
             <Button onClick={hideModelHandler} style={{ marginRight: 8 }}>
               取消
             </Button>
             <Button loading={confirmLoading} onClick={() => okHandler(record)} type="primary">
               确定
             </Button>
           </div>
         }
       >
         <Form form={form} {...formItemLayout} layout='horizontal'>
           {renderFormItem()}
         </Form>
       </Drawer>
       :
       <Modal
         width='60vw'
         title={JSON.stringify(record) !== '{}' ? "修改" : "新建"}
         visible={visible}
         onOk={() => okHandler(record)}
         onCancel={hideModelHandler}
         confirmLoading={confirmLoading}
       >
         <Form form={form} {...formItemLayout} layout='horizontal'>
           {renderFormItem()}
         </Form>
       </Modal>
      }
      </span>
  );
};


export default FormModal;
