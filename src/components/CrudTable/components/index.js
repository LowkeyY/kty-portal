/**
 * @author Lowkey
 * @date 2021/01/07 18:16:27
 * @Description: 表单弹窗
 */
import React, { useState, useEffect } from 'react';
import {
  Steps,
  Divider,
  Modal,
  Form,
  Tag,
  Row,
  Col,
  Drawer,
  Button,
  Input,
  Select,
  DatePicker,
  InputNumber
} from 'antd';
import { connect } from 'umi';

const dateFormat = 'YYYY-MM-DD';
const formItemLayout = {
  labelCol: {
    span: 10
  },
  wrapperCol: {
    span: 14
  }
};
const numberLayout = {
  labelCol: {
    span: 14
  },
  wrapperCol: {
    span: 10
  }
};
const selectLayout = {
  labelCol: {
    span: 8
  },
  wrapperCol: {
    span: 10
  }
};
const FormModal = (props) => {
  const {
    children,
    columns,
    type,
    record,
    cloneVal = [],
    cloneData,
    onClone,
    useReflectColumns = [],
    reflectColumns = {}
  } = props;
  const [form] = Form.useForm();
  const { validateFields } = form;
  const [visible, setVisible] = useState(false);
  const [changeKeyAndValue, setChangeKeyAndValue] = useState("{}");
  const [columnAlias, setColumnAlias] = useState({});

  useEffect(() => {
  }, [changeKeyAndValue]);
  useEffect(() => { //克隆赋值
    initValues(cloneData);
    form.resetFields();
    form.setFieldsValue(cloneData);
  }, [cloneData]);
  const showModelHandler = e => {
    if (e) e.stopPropagation();
    setVisible(true);
  };

  const hideModelHandler = () => {
    setVisible(false);
    form.resetFields();
  };


  const initValues = (value = {}) => {
    const initValue = {};
    useReflectColumns.map(k => {
      const k2 = k + "cs";
      if (value.hasOwnProperty(k) && value.hasOwnProperty(k2) && reflectColumns.hasOwnProperty(k2)) {
        initValue[k] = value[k];
        initValue[k2] = value[k2];
        const column = reflectColumns[k2];
        subColumnAlias(value[column.target], k2, "fbcs", value[k2]);
      }
    });
    if (Object.keys(initValue).length > 0) {
      form.setFieldsValue(initValue);
      setChangeKeyAndValue(JSON.stringify(initValue));
    }
  };

  useEffect(() => {
    initValues(record);
  }, []);

  const getReflectColumnValue = (key = "") => {
    if (!reflectColumns.hasOwnProperty(key)) return "";
    const useKey = reflectColumns[key].target;
    const changeKV = JSON.parse(changeKeyAndValue);
    return changeKV.hasOwnProperty(useKey) ? changeKV[useKey] : "";
  };

  const subChangeKeyAndValue = (key, value) => {
    const changeKV = JSON.parse(changeKeyAndValue);
    changeKV[key] = value;
    setChangeKeyAndValue(JSON.stringify(changeKV));
  };

  const subColumnAlias = (dictValue, key, curType, value) => {
    const { conf = {} } = props;
    if (value && curType && dictValue && key && reflectColumns.hasOwnProperty(key)) {
      const { data: currentDict = [] } = conf[curType][dictValue] || {}, aliasColumns = reflectColumns[key].list;
      const useDict = currentDict.length > 1 ? currentDict.find(e => e.id === value) || currentDict[0] : currentDict[0];
      if (useDict.text) {
        const useDicts = useDict.text.split(",");
        aliasColumns.map((k, i) => {
          columnAlias[k] = i >= useDicts.length ? "" : useDicts[i];
        });
        setColumnAlias(columnAlias);
      }
    }
  };


  const okHandler = async ({ cqbbm, yqcbm }) => {
    const { onOk } = props;
    const values = await validateFields();
    //覆盖隐藏列的值
    for (let att in columnAlias) {
      if (columnAlias[att] === "")
        values[att] = "";
    }
    onOk({ ...values, cqbbm, yqcbm }, hideModelHandler, cqbbm || yqcbm ? 'update' : 'create');
  };


  const linkage = (val, key, type, refColumns = {}) => {
    const { onChangeType = null } = props;
    if (type === "fbcs")
      subColumnAlias(getReflectColumnValue(key), key, type, val);
    else if (type === "fblx")
      subColumnAlias(val, key, "fbcs", getReflectColumnValue(key));
    subChangeKeyAndValue(key, val);
    if (onChangeType) onChangeType(val, key);
  };


  const getFormType = ({ formType, unit, key, selectType, currentType, refColumns = {} }) => {
    const { conf = {} } = props;
    if (formType === 'select') {
      if (selectType && conf.hasOwnProperty(selectType)) {
        const beforeValue = getReflectColumnValue(key);
        const { data = [] } = reflectColumns.hasOwnProperty(key) && reflectColumns[key].useValue === true ? beforeValue ? conf[selectType][beforeValue] : [] : conf[selectType];
        return (
          <Select onChange={(val) => linkage(val, key, selectType, refColumns)}
                  defaultValue={currentType}
                  disabled={currentType && currentType !== ''}>
            {
              Array.isArray(data) && data.map(item =>
                <Select.Option value={item.id}>{item.text}</Select.Option>
              )
            }
          </Select>
        );
      }
    }
    if (formType === 'number') return <InputNumber min={0} />;
    if (formType === 'datePicker') return <DatePicker format={dateFormat} />;
    return <Input />;
  };


  const renderCommon = (arr, tip) => {
    return (
      <Row key={tip} gutter={24}>
        <Divider orientation="left" plain>
          <Tag color="blue">{tip}</Tag>
        </Divider>
        {
          arr && arr.map(item => {
            const { key, canEdit = true, formType = 'text', title, hide = false } = item;

            if (!hide) {
              if (formType !== "number") {
                return (
                  <Col key={key} xs={24} sm={24} md={12} lg={12}>
                    <Form.Item
                      name={key}
                      label={title}
                      disabled={!canEdit}
                      rules={[{ required: true }]}
                    >
                      {getFormType(item)}
                    </Form.Item>
                  </Col>
                );
              } else {
                return (
                  <Col key={key} xs={24} sm={24} md={12} lg={8}>
                    <Form.Item
                      {...numberLayout}
                      key={key}
                      name={key}
                      label={title}
                      disabled={!canEdit}
                      rules={[{ required: true }]}
                    >
                      {getFormType(item)}
                    </Form.Item>
                  </Col>
                );
              }
            }
          })
        }
      </Row>
    );
  };

  const renderClone = (data, onClone) => {
    return (
      <Select placeholder="复制参数" onChange={onClone}>
        {
          data.map(item => <Option value={item.value}>{item.label}</Option>)
        }
      </Select>
    );
  };

  const renderFormItem = (data) => {
    const result = [];
    if (data.infoColumns) {
      result.push(renderCommon(data.infoColumns, '基础参数'));
    }
    if (data.structureColumns) {
      result.push(<div key="structure">
        <Divider orientation="left" plain>
          <Tag color="blue">资源评价参数</Tag>
        </Divider>
        {
          data.structureColumns && data.structureColumns.map(item => {
            const { children, title: tip } = item;
            if (children) {
              return (
                <Row key={item.key} gutter={24}>
                  <Divider orientation="left" plain>
                    {tip}
                  </Divider>
                  {
                    children.map(child => {
                      let { key, canEdit = true, title, hide = false, formType = '' } = child;
                      title = columnAlias.hasOwnProperty(key) ? columnAlias[key] : title;
                      hide = hide || title === "";
                      if (!hide) {
                        if (formType !== 'number') {
                          return (
                            <Col key={key} xs={24} sm={24} md={12} lg={12}>
                              <Form.Item
                                {...selectLayout}
                                name={key}
                                label={title}
                                disabled={!canEdit}
                                rules={[
                                  { required: true }
                                  // ({ getFieldValue }) => ({
                                  //   validator(_, value) {
                                  //     const str = _['field'].replace(/[\d]+/, "");
                                  //     if (_['field'] === `${str}10`) {
                                  //       if (!value || !getFieldValue(`${str}50`) || getFieldValue(`${str}50`) < value) {
                                  //         return Promise.resolve();
                                  //       }
                                  //       return Promise.reject(new Error('必须大于P50'));
                                  //     }
                                  //     if (_['field'] === `${str}50`) {
                                  //       if (!value || !getFieldValue(`${str}90`) || !getFieldValue(`${str}10`) || (getFieldValue(`${str}90`) < value && getFieldValue(`${str}10`) > value)) {
                                  //         return Promise.resolve();
                                  //       }
                                  //       return Promise.reject(new Error('必须大于P90或小于P0'));
                                  //     }
                                  //     if (_['field'] === `${str}90`) {
                                  //       if (!value || !getFieldValue(`${str}50`) || getFieldValue(`${str}50`) > value) {
                                  //         return Promise.resolve();
                                  //       }
                                  //       return Promise.reject(new Error('必须小于P50'));
                                  //     }
                                  //   }
                                  // })

                                ]}
                              >
                                {getFormType(child)}
                              </Form.Item>
                            </Col>
                          );
                        }
                        return (
                          <Col key={key} xs={24} sm={24} md={12} lg={6}>
                            <Form.Item
                              {...numberLayout}
                              name={key}
                              label={title}
                              disabled={!canEdit}
                              rules={[
                                { required: true }
                                // ({ getFieldValue }) => ({
                                //   validator(_, value) {
                                //     const str = _['field'].replace(/[\d]+/, "");
                                //     if (_['field'] === `${str}10`) {
                                //       if (!value || !getFieldValue(`${str}50`) || getFieldValue(`${str}50`) < value) {
                                //         return Promise.resolve();
                                //       }
                                //       return Promise.reject(new Error('必须大于P50'));
                                //     }
                                //     if (_['field'] === `${str}50`) {
                                //       if (!value || !getFieldValue(`${str}90`) || !getFieldValue(`${str}10`) || (getFieldValue(`${str}90`) < value && getFieldValue(`${str}10`) > value)) {
                                //         return Promise.resolve();
                                //       }
                                //       return Promise.reject(new Error('必须大于P90或小于P0'));
                                //     }
                                //     if (_['field'] === `${str}90`) {
                                //       if (!value || !getFieldValue(`${str}50`) || getFieldValue(`${str}50`) > value) {
                                //         return Promise.resolve();
                                //       }
                                //       return Promise.reject(new Error('必须小于P50'));
                                //     }
                                //   }
                                // })

                              ]}
                            >
                              {getFormType(child)}
                            </Form.Item>
                          </Col>
                        );
                      }
                    })
                  }
                </Row>
              );

            }
          })
        }
      </div>);
    }
    if (data.riskColumns) {
      result.push(renderCommon(data.riskColumns, '地质风险参数'));
    }
    return result;
  };
  return (
    <span>
        <span onClick={showModelHandler}>{children}</span>
      {type === 'drawer'
       ?
       <Drawer
         title={JSON.stringify(record) !== '{}' ? "修改" : "新建"}
         width="60%"
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
             <Button onClick={() => okHandler(record)} type="primary">
               确定
             </Button>
           </div>
         }
       >
         <>
           {JSON.stringify(record) !== '{}' ? null : renderClone(cloneVal, onClone)}
           <Form form={form} {...formItemLayout} initialValues={record}>
             {renderFormItem(columns)}
           </Form>
         </>
       </Drawer>
       :
       <Modal
         width='70vw'
         title={JSON.stringify(record) !== '{}' ? "修改" : "新建"}
         visible={visible}
         onOk={() => okHandler(record)}
         onCancel={hideModelHandler}
       >
         <>
           {JSON.stringify(record) !== '{}' ? null : renderClone(cloneVal, onClone)}
           <Form form={form} {...formItemLayout} initialValues={record}>
             {renderFormItem(columns)}
           </Form>
         </>
       </Modal>
      }
      </span>
  );
};


export default connect(({ createProject }) => ({
  createProject
}))(FormModal);
