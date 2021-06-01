/**
 * @author Lowkey
 * @date 2021/01/15 12:54:06
 * @Description: 创建项目通用表单
 */
import { Input, Select, DatePicker, InputNumber, Checkbox, Form, Divider, Col } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import moment from 'moment';

const { TextArea } = Input;
const dateFormat = 'YYYY-MM-DD';
const options = [
  { label: '勘探评价', value: '1' },
  { label: '油藏开发', value: '2' },
  { label: '投资评估', value: '3' },
  { label: '经济评价', value: '4' }
];
const CreateForm = (props) => {


  const getFormType = ({ formType ,suffix, width, name }) => {
    const { editable, initialValues, isEdit } = props;
    if (formType === 'select') return editable || !isEdit ? <Select /> : initialValues[name] || '未知';
    if (formType === 'addSelect') return (
      editable || !isEdit ?
      <Select
        style={{ width: 240 }}
        dropdownRender={menu => (
          <div>
            {menu}
            <Divider style={{ margin: '4px 0' }} />
            <div style={{ display: 'flex', flexWrap: 'nowrap'}}>
              <Input style={{ flex: 'auto' }} />
              <a
                style={{ flex: 'none',  display: 'block', cursor: 'pointer' }}
              >
                <PlusOutlined /> 新建
              </a>
            </div>
          </div>
        )}
      >
      </Select>
                          :
      initialValues[name] || '未知'
    );
    if (formType === 'number') return editable || !isEdit ? <InputNumber /> : initialValues[name] || '未知';
    if (formType === 'datePicker') return editable || !isEdit ? <DatePicker
      format={dateFormat} /> : moment(initialValues[name]).format(dateFormat) || '未知';
    if (formType === 'checkbox') return <Checkbox.Group options={options} />;
    if (formType === 'textArea') return editable || !isEdit ? <TextArea /> : initialValues[name] || '未知';
    return editable || !isEdit ? <Input style={{ width: `${width}px` }}
                                        suffix={suffix} /> : `${initialValues[name]|| '未知'}${suffix || ''}` || '未知';
  };

  const { data, isEdit = false, editable } = props;
  return (
    data && data.map(item => {
      const { label = '', name = '', rules = {} } = item;
      return (
        isEdit ? <Col key={name} xs={24} sm={24} md={12} lg={8}>
                 <Form.Item
                   name={editable ? name : undefined}
                   label={label}
                   rules={[rules]}
                 >
                   {getFormType(item)}
                 </Form.Item>
               </Col>
               :
        <Form.Item
          key={name}
          name={name}
          label={label}
          rules={rules !== '' ? [rules] : null}
        >
          {getFormType(item)}
        </Form.Item>
      );
    })
  );
};


export default CreateForm;
