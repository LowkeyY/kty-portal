/**
 * @author Lowkey
 * @date 2021/04/09 12:00:55
 * @Description:
 */
import React, { useContext, useState, useEffect, useRef } from 'react';
import { Table, Input, Button, Select, Popconfirm, Form, InputNumber } from 'antd';
import './editTable.less';

const EditableContext = React.createContext(null);

const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

const EditableCell = ({
                        formType,
                        unit,
                        key,
                        selectType,
                        title,
                        editable,
                        children,
                        dataIndex,
                        record,
                        conf,
                        handleSave,
                        ...restProps
                      }) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef(null);
  const form = useContext(EditableContext);
  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({
      [dataIndex]: record[dataIndex]
    });
  };

  const save = async () => {
    try {
      const values = await form.validateFields();
      toggleEdit();

      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };

  const getFormType = (formType, unit, key, selectType, conf = {}) => {
    if (formType === 'select') {
      if (selectType && conf[selectType]) {
        const { data } = conf[selectType];
        return (
          <Select ref={inputRef} onChange={save} >
            {
              data.map(item =>
                <Select.Option value={item.id}>{item.text}</Select.Option>
              )
            }
          </Select>
        );
      }
    }
    if (formType === 'number') return < InputNumber ref={inputRef} onPressEnter={save} onBlur={save} min={0} />;
    return <Input ref={inputRef} onPressEnter={save} onBlur={save} />;
  };
  let childNode = children;
  if (editable) {
    childNode = editing ? (
                          <Form.Item
                            style={{
                              margin: 0
                            }}
                            name={dataIndex}
                            rules={[
                              {
                                required: true,
                                message: `${title}不能为空。`
                              }
                            ]}
                          >
                            {getFormType(formType, unit, key, selectType, conf)}
                          </Form.Item>
                        ) :
                (<div
                  className="editable-cell-value-wrap"
                  style={{
                    paddingRight: 24
                  }}
                  onClick={toggleEdit}
                >
                  {children}
                </div>);
  }

  return <td {...restProps}>{childNode}</td>;
};

class EditTable extends React.Component {
  constructor(props) {
    super(props);
    this.action = {
      title: '操作',
      key: 'action',
      fixed: 'right',
      editable: false,
      render: (text, record) => (
        <Popconfirm title='确定修改？' onConfirm={null}><a>修改</a></Popconfirm>
      )
    };
  }


  handleSave = (row) => {
    const { tableSave } = this.props;
    tableSave(row);
  };

  getNewColumns = (columns) => {
    return columns.map((col) => {
      const { editable = true, children } = col;
      if (editable) {
        if (children) {
          children.map(child => {
            child.onCell = (record) => ({
              record,
              formType: child.formType,
              unit: child.unit,
              key: child.key,
              selectType: child.selectType,
              editable: true,
              dataIndex: child.dataIndex,
              title: child.title,
              handleSave: this.handleSave,
              conf: this.props.conf
            });
          });
          return {
            ...col,
            children
          };
        } else {
          return {
            ...col,
            onCell: (record) => ({
              record,
              formType: col.formType,
              unit: col.unit,
              key: col.key,
              selectType: col.selectType,
              editable: true,
              dataIndex: col.dataIndex,
              title: col.title,
              handleSave: this.handleSave,
              conf: this.props.conf
            })
          };
        }
      }
      return col;
    });
  };

  render() {

    const { columns, dataSource, loading } = this.props;
    const components = {
      body: {
        row: EditableRow,
        cell: EditableCell
      }
    };


    return (
      <Table
        loading={loading}
        rowClassName={() => 'editable-row'}
        components={components}
        bordered
        dataSource={dataSource}
        columns={this.getNewColumns([...columns])}
        scroll={{ x: 'max-content' }}
      />
    );
  }
}

export default EditTable;
