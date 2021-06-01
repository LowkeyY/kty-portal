/**
 * @author Lowkey
 * @date 2020/12/29 15:02:36
 * @Description: 项目概况原子组件
 */
import React, { useState, useEffect } from 'react';
import { Form, Button, Progress, Row, Col, InputNumber, Skeleton } from 'antd';
import { connect } from 'umi';
import classNames from 'classnames';
import { createFormData } from '@/utils/initData';
import CreateForm from '@/components/CreateForm';
import { DownOutlined } from '@ant-design/icons';
import styles from './index.less';

const formItemLayout = {
  labelCol: {
    span: 8
  },
  wrapperCol: {
    span: 14
  }
};

const getData = (data) => data.filter(item => !item.editHide);

const Info = (props) => {
  const { editable = false, projectDetails: { info }, updateLoading = false, fetchLoading = false, onOk } = props;
  const [showAll, setShowAll] = useState(false);
  const toggleExpand = () => {
    setShowAll(!showAll);
  };
  const [form] = Form.useForm();
  const { validateFields } = form;
  useEffect(() => {
    form.resetFields();
    form.setFieldsValue(info);
  }, [info]);

  const handleSubmit = async () => {
    const values = await validateFields();
    onOk(values);
  };

  const handleCancel = () => {
    const { cancel } = props;
    setShowAll(false);
    cancel();
  };


  return (
    <>
      {
        fetchLoading ?
        <Skeleton loading={fetchLoading} active />
                     :
        <Form className={styles.form} {...formItemLayout} form={form}>
          <Row gutter={[24, 24]}>
            <CreateForm data={getData(showAll || editable ? createFormData : createFormData.slice(0, 10))}
                        editable={editable}
                        isEdit={true} initialValues={info} />
          </Row>
          {
            editable ?
            <Row justify="end">
              <Col>
                <Button style={{ marginRight: '10px' }} onClick={handleCancel}>
                  取消
                </Button>
                <Button loading={updateLoading} type="primary" onClick={handleSubmit}>
                  保存
                </Button>

              </Col>
            </Row>
                     :
            <a className={styles.expand} onClick={toggleExpand}>{showAll ? '收起' : '展开'}
              <DownOutlined className={classNames(styles.icon, { [styles.showOff]: showAll })} /></a>
          }
        </Form>
      }
    </>
  );
};

export default connect(({ projectDetails }) => ({
  projectDetails
}))(Info);
