/**
 * @author Lowkey
 * @date 2020/12/29 16:19:46
 * @Description:可调整列宽
 */

import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Divider, Form, Row, Select, InputNumber, Input } from 'antd';
import { PageContainer, GridContent } from '@ant-design/pro-layout';
import { Menu, Table, Tag } from 'antd';
import { history, connect } from 'umi';
import styles from "./index.less";
import CrudTable from "@/components/CrudTable";

const { Item } = Menu;

const structureColumns = [
  {
    title: '层位',
    dataIndex: 'cqbmc',
    key: 'cqbmc',
    hide: true,
    editable: false
  },
  {
    title: '面积(km²)',
    dataIndex: 'mj',
    key: 'mj',
    children: [
      {
        title: '分布类型',
        dataIndex: 'mjfb',
        key: 'mjfb',
        formType: 'select',
        selectType: 'fblx',
        refColumns: {
          "valueAt": "mjfbcs",
          "after": ["mjp10", "mjp50", "mjp90"]
        },
        render: (text) => {
          const obj = conf.fblx || {};
          const arr = obj.data;
          if (arr && Array.isArray(arr)) {
            return arr.find(item => item.id === text).text;
          }
        }
      },
      {
        title: '分布参数',
        dataIndex: 'mjfbcs',
        key: 'mjfbcs',
        formType: 'select',
        selectType: 'fbcs',
        refColumns: {
          "before": "mjfb",
          "after": ["mjp10", "mjp50", "mjp90"]
        },
        render: (text) => {
          const obj = conf.fblx || {};
          const arr = obj.data;
          if (arr && Array.isArray(arr)) {
            return arr.find(item => item.id === text).text;
          }
        }
      },
      {
        title: '参数1',
        dataIndex: 'mjp10',
        key: 'mjp10',
        formType: 'number'
      },
      {
        title: '参数2',
        dataIndex: 'mjp50',
        key: 'mjp50',
        formType: 'number'
      },
      {
        title: '参数3',
        dataIndex: 'mjp90',
        key: 'mjp90',
        formType: 'number'
      }

    ]
  },
  {
    title: '厚度(m)',
    dataIndex: 'hd',
    key: 'hd',
    children: [
      {
        title: '分布类型',
        dataIndex: 'hdfb',
        key: 'hdfb',
        formType: 'select',
        selectType: 'fblx',
        refColumns: {
          "valueAt": "hdfbcs",
          "after": ["hdp10", "hdp50", "hdp90"]
        },
        render: (text) => {
          const obj = conf.fblx || {};
          const arr = obj.data;
          if (arr && Array.isArray(arr)) {
            return arr.find(item => item.id === text).text;
          }
        }
      },
      {
        title: '分布参数',
        dataIndex: 'hdfbcs',
        key: 'hdfbcs',
        formType: 'select',
        selectType: 'fbcs',
        refColumns: {
          "before": "hdfb",
          "after": ["hdp10", "hdp50", "hdp90"]
        },
        render: (text) => {
          const obj = conf.fbcs || {};
          const arr = obj.data;
          if (arr && Array.isArray(arr)) {
            return arr.find(item => item.id === text).text;
          }
        }
      },
      {
        title: '参数1',
        dataIndex: 'hdp10',
        key: 'hdp10',
        formType: 'number'
      },
      {
        title: '参数2',
        dataIndex: 'hdp50',
        key: 'hdp50',
        formType: 'number'
      },
      {
        title: '参数3',
        dataIndex: 'hdp90',
        key: 'hdp90',
        formType: 'number'
      }
    ]
  }
];

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


const confDict = {
  "fblx": {
    "data": [{ "id": "1", "text": "正太分布" }, { "id": "2", "text": "三角分布" }, { "id": "3", "text": "对数分布" }, {
      "id": "4",
      "text": "常量"
    }]
  },
  "fbcs": {
    "1": {
      "data": [{ "id": "1", "text": "P90,P10" }, { "id": "2", "text": "平均值,P10" }, { "id": "3", "text": "平均值,标准偏差" }]
    },
    "2": {
      "data": [{ "id": "1", "text": "P90,P50,P10" }, { "id": "2", "text": "P90,最可能值,P10" }, {
        "id": "3",
        "text": "最小值,最可能值,最大值"
      }]
    },
    "3": {
      "data": [{ "id": "1", "text": "位置,P90,P10" }, { "id": "2", "text": "位置,平均值,P10" }, {
        "id": "3",
        "text": "位置,平均值,标准偏差"
      }]
    },
    "4": {
      "data": [{ "id": "1", "text": "P90,P50,P10" }]
    }
  }
};

let mockData = {
  "cqbbm": "ccf97607-9850-4113-a5ec-73ee345de4ad",
  "cqbfxcs": {
    "cc": 0.95,
    "cqbbm": "ccf97607-9850-4113-a5ec-73ee345de4ad",
    "createDate": "2021-04-11T18:09:02",
    "createUser": "133",
    "dzfx": 0.32832,
    "gc": 0.6,
    "qb": 0.8,
    "updateDate": "2021-04-20T16:31:32",
    "yj": 0.8,
    "yy": 0.9
  },
  "cqbgzcs": {
    "cqbbm": "ccf97607-9850-4113-a5ec-73ee345de4ad",
    "createDate": "2021-04-11T18:09:02",
    "createUser": "133",
    "hdfb": "1",
    "hdfbcs": "1",
    "hdp10": 18.4,
    "hdp50": 11.7,
    "hdp90": 5,
    "hqbhdfb": "1",
    "hqbhdp10": 0.55,
    "hqbhdp50": 0.5,
    "hqbhdp90": 0.45,
    "kxdfb": "1",
    "kxdp10": 0.24,
    "kxdp50": 0.18,
    "kxdp90": 0.115,
    "mjfb": "1",
    "mjfbcs": "1",
    "mjp10": 73,
    "mjp50": 63,
    "mjp90": 54,
    "sycslfb": "2",
    "sycslp10": 0.8,
    "sycslp50": 0.7,
    "sycslp90": 0.6,
    "trqcslfb": "2",
    "trqcslp10": 0.8,
    "trqcslp50": 0.7,
    "trqcslp90": 0.6,
    "updateDate": "2021-04-20T16:31:32"
  },
  "cqbmc": "Bk-XII",
  "createDate": "2021-04-11T18:09:02",
  "createUser": "133",
  "dmDxwdb": 0.92,
  "dmbzwd": 319,
  "gzmc": "Severo-Baikalovskaya SLL",
  "nxyhl": 5220,
  "qbjb": "1",
  "qbmc": "Bk",
  "updateDate": "2021-04-20T16:31:32",
  "xmbm": "ea79b301-53bf-428e-9d51-cfa06b1ad39e",
  "yqlx": "1",
  "ysdcyl": 22.4,
  "ysqtpcxs": 1.18,
  "cc": 0.95,
  "dzfx": 0.32832,
  "gc": 0.6,
  "qb": 0.8,
  "yj": 0.8,
  "yy": 0.9,
  "hdfb": "1",
  "hdp10": 18.4,
  "hdp50": 11.7,
  "hdp90": 5,
  "hqbhdfb": "1",
  "hqbhdp10": 0.55,
  "hqbhdp50": 0.5,
  "hqbhdp90": 0.45,
  "kxdfb": "1",
  "kxdp10": 0.24,
  "kxdp50": 0.18,
  "kxdp90": 0.115,
  "mjfb": "1",
  "mjp10": 73,
  "mjp50": 63,
  "mjp90": 54,
  "sycslfb": "2",
  "sycslp10": 0.8,
  "sycslp50": 0.7,
  "sycslp90": 0.6,
  "trqcslfb": "2",
  "trqcslp10": 0.8,
  "trqcslp50": 0.7,
  "trqcslp90": 0.6
};

const Test = (props) => {
  const { dispatch, resultTable: { columns, menuMap }, loading } = props;
  const [foo, setFoo] = useState(1);

  const [changeKeyAndValue, setChangeKeyAndValue] = useState("{}");
  const [columnAlias, setColumnAlias] = useState({});

  const [form] = Form.useForm();

  useEffect(() => {
    console.log(changeKeyAndValue, columnAlias);
  }, [changeKeyAndValue]);

  const findItemByStructureColumns = (datas = [], key) => {
    let result = "";
    datas.map(data => {
      if (!result) {
        if (data.key === key)
          result = data;
        if (data.children)
          result = data.children.find(d => d.key === key);
      }
    });
    return result;
  };

  const getCurrentChangeValue = (key = "") => {
    const changeKV = JSON.parse(changeKeyAndValue);
    return changeKV.hasOwnProperty(key) ? changeKV[key] : "";
  };

  const subChangeKeyAndValue = (key, value) => {
    const changeKV = JSON.parse(changeKeyAndValue);
    changeKV[key] = value;
    setChangeKeyAndValue(JSON.stringify(changeKV));
  };

  const subColumnAlias = (dictValue, aliasColumns = [], curType, value) => {
    if (value && curType && dictValue && aliasColumns.length) {
      const { data: currentDict = [] } = confDict[curType][dictValue] || {};
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

  const onChangeType = (val, key, type, refColumns = {}) => {
    if (type === "fbcs")
      subColumnAlias(getCurrentChangeValue(refColumns.before), refColumns.after, type, val);
    else if (type === "fblx")
      subColumnAlias(val, refColumns.after, "fbcs", getCurrentChangeValue(refColumns.valueAt));
    subChangeKeyAndValue(key, val);
  };

  const getFormType = ({ formType, unit, key, selectType, currentType, refColumns = {} }) => {
    if (formType === 'select') {
      if (selectType && confDict.hasOwnProperty(selectType)) {
        const beforeValue = getCurrentChangeValue(refColumns.before), { data = [] } = !beforeValue ? confDict[selectType] : confDict[selectType][beforeValue];
        return (
          <Select onChange={onChangeType ? (val) => onChangeType(val, key, selectType, refColumns) : null}
                  defaultValue={currentType}
                  disabled={currentType && currentType !== ''}>
            {
              data.map(item =>
                <Select.Option value={item.id}>{item.text}</Select.Option>
              )
            }
          </Select>
        );
      }
    }
    if (formType === 'number') return <InputNumber min={0} />;
    return <Input />;
  };

  const initValues = (value = {}) => {
    const initValue = {};
    [["mjfb", "mjfbcs"], ["hdfb", "hdfbcs"]].map(arr => {
      const k1 = arr[0], k2 = arr[1];
      if (value.hasOwnProperty(k1) && value.hasOwnProperty(k2)) {
        initValue[k1] = value[k1];
        initValue[k2] = value[k2];
        const column = findItemByStructureColumns(structureColumns, k2);
        subColumnAlias(value[column.refColumns.before], column.refColumns.after, "fbcs", value[k2]);
      }
    });
    if (Object.keys(initValue).length > 0) {
      form.setFieldsValue(initValue);
      setChangeKeyAndValue(JSON.stringify(initValue));
    }
  };

  useEffect(() => {
    //模拟获取到数据
    setTimeout(() => {
      initValues(mockData.cqbgzcs);
    }, 3000);
  }, []);


  const renderCommon = (arr, tip) => {
    return (
      <Row key={tip} gutter={24}>
        <Divider orientation="left" plain>
          {tip}
        </Divider>
        {
          arr && arr.map(item => {
            let { key, canEdit = true, formType = 'text', title, hide = false } = item;
            title = columnAlias.hasOwnProperty(key) ? columnAlias[key] : title;
            hide = hide || title === "";
            if (!hide) {
              if (formType !== "number") {
                return (
                  <Col key={key} xs={24} sm={24} md={12} lg={4}>
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
                  <Col key={key} xs={24} sm={24} md={12} lg={4}>
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

  const checkColumnArray = (datas = []) => {
    const result = [];
    datas.map(data => {
      if (data.children) {
        const oneColumn = { "tip": data.title };
        oneColumn.data = data.children;
        result.push(oneColumn);
      }
    });
    return result;
  };


  return (
    <div>
      <p>You clicked {foo} times</p>
      <button onClick={() => setFoo(foo + 1)}>
        Click me
      </button>
      <CrudTable title="构造参数" columns={structureColumns}
                 data={[]}
                 isCurd={false}
                 edit />
      <Form form={form} initialValues={mockData}>
        {checkColumnArray(structureColumns).map(datas => renderCommon(datas.data, datas.tip))}
      </Form>
    </div>
  );
};

export default connect(({ resultTable, loading }) => ({
  resultTable,
  loading: loading.effects['resultTable/fetchList']
}))(Test);
