/**
 * @author Lowkey
 * @date 2020/12/30 10:48:33
 * @Description:
 */

import React from 'react';
import { Form, Button, Row, Col } from 'antd';
import { connect } from 'umi';
import { rules } from '@/utils/prompt';
import { averArr, formatCreateValues } from '@/utils/utils';
import { createFormData } from '@/utils/initData';
import CreateForm from '@/components/CreateForm';
import styles from './index.less';

const formItemLayout = {
  labelCol: {
    span: 8
  },
  wrapperCol: {
    span: 14
  }
};


const Step1 = (props) => {
  const { dispatch, createProject: { formData } } = props;
  const [form] = Form.useForm();
  const { validateFields } = form;

  const onValidateForm = async () => {
    const values = await validateFields();
    if (dispatch) {
      dispatch({
        type: 'createProject/saveStepFormData',
        payload: formatCreateValues(values)
      });
      dispatch({
        type: 'createProject/saveCurrentStep',
        payload: 'groups'
      });
    }
  };

  return (
    <Form
      {...formItemLayout}
      form={form}
      layout="horizontal"
      className={styles.stepForm}
      initialValues={formData}
    >
      <Row gutter={24}>
        <Col xs={24} sm={24} md={12} lg={12}>
          <CreateForm data={averArr(createFormData)['front']} />
        </Col>
        <Col xs={24} sm={24} md={12} lg={12}>
          <CreateForm data={averArr(createFormData)['last']} />
          <Form.Item
            wrapperCol={{
              xs: {
                span: 24,
                offset: 0
              },
              sm: {
                span: formItemLayout.wrapperCol.span,
                offset: formItemLayout.labelCol.span
              }
            }}
          >
            <Button type="primary" onClick={onValidateForm}>
              下一步
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default connect(({ createProject }) => ({
  createProject
}))(Step1);
