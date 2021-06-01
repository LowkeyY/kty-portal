/**
 * @author Lowkey
 * @date 2021/04/02 14:05:04
 * @Description: 重新修改
 */

import React, {useEffect, useState} from 'react';
import {Button, Card, Tag, Progress, message, Table} from 'antd';
import {PageContainer, GridContent} from '@ant-design/pro-layout';
import {connect} from 'umi';
import moment from 'moment';
import {formatStrObj, formatCreateValues} from '@/utils/utils';
import CrudTable from '@/components/CrudTable';
import CommonTable from '@/components/CommonTable';


const getAliasColumnsList = (flag) => ["p10", "p50", "p90"].map(key => flag + key);

const reflectColumns = {};

const addReflectColumns = (key) => {
  const formKey = key.toLowerCase().endsWith("cs") ? key.toLowerCase().replace(/cs$/, "") : key.toLowerCase(),
    targetKey = formKey + "cs";
  reflectColumns[targetKey] = {
    "target": formKey,
    "useValue": true,
    "list": getAliasColumnsList(formKey.replace(/fb$/, ""))
  };
  reflectColumns[formKey] = {
    "target": targetKey,
    "list": getAliasColumnsList(key.replace(/fb$/, ""))
  };
}

const useReflectColumns = ["mjfb", "hdfb", 'kxdfb', 'hqbhdfb', 'trqcslfb', 'sycslfb'];
useReflectColumns.map(key => addReflectColumns(key));

const Probability = (props) => {
  const {probability: {data, result, total, conf}, dispatch, location: {query}, loadingList, loadingProject} = props;
  const {project: {list}} = props;
  const {currentType = ''} = conf;
  const {xmbm = ''} = query;
  const [category, setCategory] = useState('1');
  const [xmbmId, setXmbmId] = useState('');
  const [showProject, setShowProject] = useState(xmbm === '');

  const columnHandler = (value, record, key) => {
    if (!reflectColumns.hasOwnProperty(key)) return value;
    const reflectColumnValue = record[reflectColumns[key].target];
    if (reflectColumnValue) {
      const {data: arr = []} = conf.fbcs[reflectColumnValue];
      if (arr && Array.isArray(arr)) {
        return arr.find(item => item.id === value).text;
      }
    }
  }

  const getColumns = (type) => {
    const gasColumns = {
      infoColumns: [
        {
          title: '圈闭',
          dataIndex: 'qbmc',
          key: 'qbmc'
        },
        {
          title: '层圈闭名称',
          dataIndex: 'cqbmc',
          key: 'cqbmc'
        },
        {
          title: '圈闭级别',
          dataIndex: 'qbjb',
          key: 'qbjb',
          formType: 'select',
          selectType: 'qyjb',
          render: (text) => {
            const obj = conf.qyjb || {};
            const arr = obj.data;
            if (arr && Array.isArray(arr)) {
              return arr.find(item => item.id === text).text;
            }
          }
        },
        {
          title: '油气类型',
          dataIndex: 'yqlx',
          key: 'yqlx',
          formType: 'select',
          selectType: 'qylx',
          currentType,
          render: (text) => {
            const obj = conf.qylx;
            const arr = obj.data;
            if (arr && Array.isArray(arr)) {
              return arr.find(item => item.id === text).text;
            }
          }
        },
        {
          title: '构造',
          dataIndex: 'gzmc',
          key: 'gzmc'
        },
        {
          title: '地面标准温度Tsc(K)',
          dataIndex: 'dmbzwd',
          key: 'dmbzwd',
          formType: 'number',
          unit: 'K'
        },
        {
          title: '原始地层压力Pi(Mpa)',
          dataIndex: 'ysdcyl',
          key: 'ysdcyl',
          formType: 'number',
          unit: 'Mpa'
        },
        {
          title: '地面/地下温度比(K)',
          dataIndex: 'dmDxwdb',
          key: 'dmDxwdb',
          formType: 'number',
          unit: 'K'
        },
        {
          title: '原始气体偏差系数(1/Zi)',
          dataIndex: 'ysqtpcxs',
          key: 'ysqtpcxs',
          formType: 'number',
          unit: '1/Zi'
        },
        {
          title: '凝析油含量(t/m3)',
          dataIndex: 'nxyhl',
          key: 'nxyhl',
          formType: 'number',
          unit: 't/m3'
        }
      ],
      structureColumns: [
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
              render: (text, record = {}) => columnHandler(text, record, 'mjfbcs')
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
              render: (text, record = {}) => columnHandler(text, record, 'hdfbcs')
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
        },
        {
          title: '孔隙度(f)',
          dataIndex: 'kxd',
          key: 'kxd',
          children: [
            {
              title: '分布类型',
              dataIndex: 'kxdfb',
              key: 'kxdfb',
              formType: 'select',
              selectType: 'fblx',
              refColumns: {
                "valueAt": "kxdfbcs",
                "after": ["kxdp10", "kxdp50", "kxdp90"]
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
              dataIndex: 'kxdfbcs',
              key: 'kxdfbcs',
              formType: 'select',
              selectType: 'fbcs',
              refColumns: {
                "before": "kxdfb",
                "after": ["kxdp10", "kxdp50", "kxdp90"]
              },
              render: (text, record = {}) => columnHandler(text, record, 'kxdfbcs')
            },
            {
              title: '参数1',
              dataIndex: 'kxdp10',
              key: 'kxdp10',
              formType: 'number'
            },
            {
              title: '参数2',
              dataIndex: 'kxdp50',
              key: 'kxdp50',
              formType: 'number'
            },
            {
              title: '参数3',
              dataIndex: 'kxdp90',
              key: 'kxdp90',
              formType: 'number'
            }
          ]
        },
        {
          title: '含气饱和度(f)',
          dataIndex: 'hqbhd',
          key: 'hqbhd',
          children: [
            {
              title: '分布类型',
              dataIndex: 'hqbhdfb',
              key: 'hqbhdfb',
              formType: 'select',
              selectType: 'fblx',
              refColumns: {
                "valueAt": "hqbhdfbcs",
                "after": ["hqbhdp10", "hqbhdp50", "hqbhdp90"]
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
              dataIndex: 'hqbhdfbcs',
              key: 'hqbhdfbcs',
              formType: 'select',
              selectType: 'fbcs',
              refColumns: {
                "before": "hqbhdfb",
                "after": ["hqbhdp10", "hqbhdp50", "hqbhdp90"]
              },
              render: (text, record = {}) => columnHandler(text, record, 'hqbhdfbcs')
            },
            {
              title: '参数1',
              dataIndex: 'hqbhdp10',
              key: 'hqbhdp10',
              formType: 'number'
            },
            {
              title: '参数2',
              dataIndex: 'hqbhdp50',
              key: 'hqbhdp50',
              formType: 'number'
            },
            {
              title: '参数3',
              dataIndex: 'hqbhdp90',
              key: 'hqbhdp90',
              formType: 'number'
            }
          ]
        },
        {
          title: '天然气采收率',
          dataIndex: 'trqcsl',
          key: 'trqcsl',
          children: [
            {
              title: '分布类型',
              dataIndex: 'trqcslfb',
              key: 'trqcslfb',
              formType: 'select',
              selectType: 'fblx',
              refColumns: {
                "valueAt": "trqcslfbcs",
                "after": ["trqcslp10", "trqcslp50", "trqcslp90"]
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
              dataIndex: 'trqcslfbcs',
              key: 'trqcslfbcs',
              formType: 'select',
              selectType: 'fbcs',
              refColumns: {
                "before": "trqcslfb",
                "after": ["trqcslp10", "trqcslp50", "trqcslp90"]
              },
              render: (text, record = {}) => columnHandler(text, record, 'trqcslfbcs')
            },
            {
              title: '参数1',
              dataIndex: 'trqcslp10',
              key: 'trqcslp10',
              formType: 'number'
            },
            {
              title: '参数2',
              dataIndex: 'trqcslp50',
              key: 'trqcslp50',
              formType: 'number'
            },
            {
              title: '参数3',
              dataIndex: 'trqcslp90',
              key: 'trqcslp90',
              formType: 'number'
            }
          ]
        },
        {
          title: '石油采收率',
          dataIndex: 'sycsl',
          key: 'sycsl',
          children: [
            {
              title: '分布类型',
              dataIndex: 'sycslfb',
              key: 'sycslfb',
              formType: 'select',
              selectType: 'fblx',
              refColumns: {
                "valueAt": "sycslfbcs",
                "after": ["sycslp10", "sycslp50", "sycslp90"]
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
              dataIndex: 'sycslfbcs',
              key: 'sycslfbcs',
              formType: 'select',
              selectType: 'fbcs',
              refColumns: {
                "before": "sycslfb",
                "after": ["sycslp10", "sycslp50", "sycslp90"]
              },
              render: (text, record = {}) => columnHandler(text, record, 'sycslfbcs')
            },
            {
              title: '参数1',
              dataIndex: 'sycslp10',
              key: 'sycslp10',
              formType: 'number'
            },
            {
              title: '参数2',
              dataIndex: 'sycslp50',
              key: 'sycslp50',
              formType: 'number'
            },
            {
              title: '参数3',
              dataIndex: 'sycslp90',
              key: 'sycslp90',
              formType: 'number'
            }
          ]
        }
      ],

      riskColumns: [
        {
          title: '层位',
          dataIndex: 'cqbmc',
          key: 'cqbmc',
          formType: 'number',
          hide: true,
          editable: false
        },
        {
          title: '原岩',
          dataIndex: 'yy',
          key: 'yy',
          formType: 'number'
        },
        {
          title: '储层',
          dataIndex: 'cc',
          key: 'cc',
          formType: 'number'
        },
        {
          title: '圈闭',
          dataIndex: 'qb',
          key: 'qb',
          formType: 'number'
        },
        {
          title: '运聚',
          dataIndex: 'yj',
          key: 'yj',
          formType: 'number'
        },
        {
          title: '盖层',
          dataIndex: 'gc',
          key: 'gc',
          formType: 'number'
        },
        {
          title: '地质风险',
          dataIndex: 'dzfx',
          key: 'dzfx',
          formType: 'number',
          editable: false,
          hide: true
        }
      ],

      resultColumns: [
        {
          title: '更新时间',
          dataIndex: 'updateDate',
          key: 'updateDate'
        },
        {
          title: '圈闭',
          dataIndex: 'qbmc',
          key: 'qbmc'
        },
        {
          title: '层圈闭名称',
          dataIndex: 'cqbmc',
          key: 'cqbmc'
        },
        {
          title: '圈闭级别',
          dataIndex: 'qbjb',
          key: 'qbjb',
          formType: 'select',
          selectType: 'qyjb',
          render: (text) => {
            const obj = conf.qyjb || {};
            const arr = obj.data;
            if (arr && Array.isArray(arr)) {
              return arr.find(item => item.id === text).text;
            }
          }
        },
        {
          title: '构造',
          dataIndex: 'gzmc',
          key: 'gzmc'
        },
        {
          title: '类型',
          dataIndex: 'yqlx',
          key: 'yqlx',
          selectType: 'qylx',
          render: (text) => {
            const obj = conf.qylx || {};
            const arr = obj.data;
            if (arr && Array.isArray(arr)) {
              return arr.find(item => item.id === text).text;
            }
          }
        },
        {
          title: '面积(km²)',
          dataIndex: 'mj',
          key: 'mj',
          children: [
            {
              title: 'p10',
              dataIndex: 'mjp10',
              key: 'mjp10',
              formType: 'number'
            },
            {
              title: 'p50',
              dataIndex: 'mjp50',
              key: 'mjp50',
              formType: 'number'
            },
            {
              title: 'p90',
              dataIndex: 'mjp90',
              key: 'mjp90',
              formType: 'number'
            },
            {
              title: '计算方法',
              dataIndex: 'mjfb',
              key: 'mjfb',
              formType: 'select',
              render: (text) => {
                const obj = conf.fblx || {};
                const arr = obj.data;
                if (arr && Array.isArray(arr)) {
                  return arr.find(item => item.id === text).text;
                }
              }
            }
          ]
        },
        {
          title: '厚度(m)',
          dataIndex: 'hd',
          key: 'hd',
          children: [
            {
              title: 'p10',
              dataIndex: 'hdp10',
              key: 'hdp10',
              formType: 'number'
            },
            {
              title: 'p50',
              dataIndex: 'hdp50',
              key: 'hdp50',
              formType: 'number'
            },
            {
              title: 'p90',
              dataIndex: 'hdp90',
              key: 'hdp90',
              formType: 'number'
            },
            {
              title: '计算方法',
              dataIndex: 'hdfb',
              key: 'hdfb',
              formType: 'select',
              render: (text) => {
                const obj = conf.fblx || {};
                const arr = obj.data;
                if (arr && Array.isArray(arr)) {
                  return arr.find(item => item.id === text).text;
                }
              }
            }
          ]
        },
        {
          title: '孔隙度(f)',
          dataIndex: 'kxd',
          key: 'kxd',
          children: [
            {
              title: 'p10',
              dataIndex: 'kxdp10',
              key: 'kxdp10',
              formType: 'number'
            },
            {
              title: 'p50',
              dataIndex: 'kxdp50',
              key: 'kxdp50',
              formType: 'number'
            },
            {
              title: 'p90',
              dataIndex: 'kxdp90',
              key: 'kxdp90',
              formType: 'number'
            },
            {
              title: '计算方法',
              dataIndex: 'kxdfb',
              key: 'kxdfb',
              formType: 'select',
              render: (text) => {
                const obj = conf.fblx || {};
                const arr = obj.data;
                if (arr && Array.isArray(arr)) {
                  return arr.find(item => item.id === text).text;
                }
              }
            }
          ]
        },
        {
          title: '含气饱和度(f)',
          dataIndex: 'hqbhd',
          key: 'hqbhd',
          children: [
            {
              title: 'p10',
              dataIndex: 'hqbhdp10',
              key: 'hqbhdp10',
              formType: 'number'
            },
            {
              title: 'p50',
              dataIndex: 'hqbhdp50',
              key: 'hqbhdp50',
              formType: 'number'
            },
            {
              title: 'p90',
              dataIndex: 'hqbhdp90',
              key: 'hqbhdp90',
              formType: 'number'
            },
            {
              title: '计算方法',
              dataIndex: 'hqbhdfb',
              key: 'hqbhdfb',
              formType: 'select',
              render: (text) => {
                const obj = conf.fblx || {};
                const arr = obj.data;
                if (arr && Array.isArray(arr)) {
                  return arr.find(item => item.id === text).text;
                }
              }
            }
          ]
        },
        {
          title: '地面标准温度Tsc(K)',
          dataIndex: 'dmbzwd',
          key: 'dmbzwd'
        },
        {
          title: '原始地层压力Pi(Mpa)',
          dataIndex: 'ysdcyl',
          key: 'ysdcyl'
        },
        {
          title: '地面/地下温度比(K)',
          dataIndex: 'dmDxwdb',
          key: 'dmDxwdb'
        },
        {
          title: '原始气体偏差系数',
          dataIndex: 'ysqtpcxs',
          key: 'ysqtpcxs'
        },
        {
          title: '凝析油含量',
          dataIndex: 'nxyhl',
          key: 'nxyhl'
        },
        {
          title: '天然气地质资源量(亿方)',
          dataIndex: 'trqdzzyl',
          key: 'trqdzzyl',
          children: [
            {
              title: 'p10',
              dataIndex: 'trqdzzylp10',
              key: 'trqdzzylp10',
              formType: 'number'
            },
            {
              title: 'p50',
              dataIndex: 'trqdzzylp50',
              key: 'trqdzzylp50',
              formType: 'number'
            },
            {
              title: 'p90',
              dataIndex: 'trqdzzylp90',
              key: 'trqdzzylp90',
              formType: 'number'
            }
          ]
        },
        {
          title: '凝析油地质资源量(万吨)',
          dataIndex: 'nxydzzyl',
          key: 'nxydzzyl',
          children: [
            {
              title: 'p10',
              dataIndex: 'nxydzzylp10',
              key: 'nxydzzylp10',
              formType: 'number'
            },
            {
              title: 'p50',
              dataIndex: 'nxydzzylp50',
              key: 'nxydzzylp50',
              formType: 'number'
            },
            {
              title: 'p90',
              dataIndex: 'nxydzzylp90',
              key: 'nxydzzylp90',
              formType: 'number'
            }
          ]
        },
        {
          title: '天然气采收率',
          dataIndex: 'trqcsl',
          key: 'trqcsl',
          children: [
            {
              title: 'p10',
              dataIndex: 'trqcslp10',
              key: 'trqcslp10',
              formType: 'number'
            },
            {
              title: 'p50',
              dataIndex: 'trqcslp50',
              key: 'trqcslp50',
              formType: 'number'
            },
            {
              title: 'p90',
              dataIndex: 'trqcslp90',
              key: 'trqcslp90',
              formType: 'number'
            },
            {
              title: '计算方法',
              dataIndex: 'trqcslfb',
              key: 'trqcslfb',
              formType: 'select',
              render: (text) => {
                const obj = conf.fblx || {};
                const arr = obj.data;
                if (arr && Array.isArray(arr)) {
                  return arr.find(item => item.id === text).text;
                }
              }
            }
          ]
        },
        {
          title: '石油采收率',
          dataIndex: 'sycsl',
          key: 'sycsl',
          children: [
            {
              title: 'p10',
              dataIndex: 'sycslp10',
              key: 'sycslp10',
              formType: 'number'
            },
            {
              title: 'p50',
              dataIndex: 'sycslp50',
              key: 'sycslp50',
              formType: 'number'
            },
            {
              title: 'p90',
              dataIndex: 'sycslp90',
              key: 'sycslp90',
              formType: 'number'
            },
            {
              title: '计算方法',
              dataIndex: 'sycslfb',
              key: 'sycslfb',
              formType: 'select',
              selectType: 'fblx',
              render: (text) => {
                const obj = conf.fblx || {};
                const arr = obj.data;
                if (arr && Array.isArray(arr)) {
                  return arr.find(item => item.id === text).text;
                }
              }
            }
          ]
        },
        {
          title: '风险前天然气可采资源量(亿方)',
          dataIndex: 'fxqtrqkczyl',
          key: 'fxqtrqkczyl',
          children: [
            {
              title: 'p10',
              dataIndex: 'fxqtrqkczylp10',
              key: 'fxqtrqkczylp10',
              formType: 'number'
            },
            {
              title: 'p50',
              dataIndex: 'fxqtrqkczylp50',
              key: 'fxqtrqkczylp50',
              formType: 'number'
            },
            {
              title: 'p90',
              dataIndex: 'fxqtrqkczylp90',
              key: 'fxqtrqkczylp90',
              formType: 'number'
            }
          ]
        },
        {
          title: '风险前凝析油可采资源量(亿吨)',
          dataIndex: 'fxqnxykczyl',
          key: 'fxqnxykczyl',
          children: [
            {
              title: 'p10',
              dataIndex: 'fxqtrqkczylp10',
              key: 'fxqtrqkczylp10',
              formType: 'number'
            },
            {
              title: 'p50',
              dataIndex: 'fxqnxykczylp50',
              key: 'fxqnxykczylp50',
              formType: 'number'
            },
            {
              title: 'p90',
              dataIndex: 'fxqnxykczylp90',
              key: 'fxqnxykczylp90',
              formType: 'number'
            }
          ]
        },
        {
          title: '地质风险',
          dataIndex: 'dzfx',
          key: 'dzfx',
          hide: true
        },
        {
          title: '风险后天然气可采资源量(亿方)',
          dataIndex: 'fxhtrqkczyl',
          key: 'fxhtrqkczyl',
          children: [
            {
              title: 'p10',
              dataIndex: 'fxhtrqkczylp10',
              key: 'fxhtrqkczylp10',
              formType: 'number'
            },
            {
              title: 'p50',
              dataIndex: 'fxhtrqkczylp50',
              key: 'fxhtrqkczylp50',
              formType: 'number'
            },
            {
              title: 'p90',
              dataIndex: 'fxhtrqkczylp90',
              key: 'fxhtrqkczylp90',
              formType: 'number'
            }
          ]
        },
        {
          title: '风险后凝析油可采资源量(亿吨)',
          dataIndex: 'fxhnxykczyl',
          key: 'fxhnxykczyl',
          children: [
            {
              title: 'p10',
              dataIndex: 'fxhtrqkczylp10',
              key: 'fxhtrqkczylp10',
              formType: 'number'
            },
            {
              title: 'p50',
              dataIndex: 'fxhnxykczylp50',
              key: 'fxhnxykczylp50',
              formType: 'number'
            },
            {
              title: 'p90',
              dataIndex: 'fxhnxykczylp90',
              key: 'fxhnxykczylp90',
              formType: 'number'
            }
          ]
        }
      ],

      totalColumns: [
        {
          title: '圈闭',
          dataIndex: 'qbmc',
          key: 'qbmc'
        },
        {
          title: '面积(km²)',
          dataIndex: 'mj',
          key: 'mj',
          children: [
            {
              title: 'p10',
              dataIndex: 'mjp10',
              key: 'mjp10',
              formType: 'number'
            },
            {
              title: 'p50',
              dataIndex: 'mjp50',
              key: 'mjp50',
              formType: 'number'
            },
            {
              title: 'p90',
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
              title: 'p10',
              dataIndex: 'hdp10',
              key: 'hdp10',
              formType: 'number'
            },
            {
              title: 'p50',
              dataIndex: 'hdp50',
              key: 'hdp50',
              formType: 'number'
            },
            {
              title: 'p90',
              dataIndex: 'hdp90',
              key: 'hdp90',
              formType: 'number'
            }
          ]
        },
        {
          title: '孔隙度(f)',
          dataIndex: 'kxd',
          key: 'kxd',
          children: [
            {
              title: 'p10',
              dataIndex: 'kxdp10',
              key: 'kxdp10',
              formType: 'number'
            },
            {
              title: 'p50',
              dataIndex: 'kxdp50',
              key: 'kxdp50',
              formType: 'number'
            },
            {
              title: 'p90',
              dataIndex: 'kxdp90',
              key: 'kxdp90',
              formType: 'number'
            }
          ]
        },
        {
          title: '含气饱和度(f)',
          dataIndex: 'hybhd',
          key: 'hybhd',
          children: [
            {
              title: 'p10',
              dataIndex: 'hqbhdp10',
              key: 'hqbhdp10',
              formType: 'number'
            },
            {
              title: 'p50',
              dataIndex: 'hqbhdp50',
              key: 'hqbhdp50',
              formType: 'number'
            },
            {
              title: 'p90',
              dataIndex: 'hqbhdp90',
              key: 'hqbhdp90',
              formType: 'number'
            }
          ]
        },
        {
          title: '原始气体偏差系数(1/Zi)',
          dataIndex: 'ysqtpcxs',
          key: 'ysqtpcxs',
          formType: 'number',
          unit: '1/Zi'
        },
        {
          title: '凝析油含量(t/m3)',
          dataIndex: 'nxyhl',
          key: 'nxyhl',
          formType: 'number',
          unit: 't/m3'
        },
        {
          title: '天然气地质资源量(亿方)',
          dataIndex: 'trqdzzyl',
          key: 'trqdzzyl',
          children: [
            {
              title: 'p10',
              dataIndex: 'trqdzzylp10',
              key: 'trqdzzylp10',
              formType: 'number'
            },
            {
              title: 'p50',
              dataIndex: 'trqdzzylp50',
              key: 'trqdzzylp50',
              formType: 'number'
            },
            {
              title: 'p90',
              dataIndex: 'trqdzzylp90',
              key: 'trqdzzylp90',
              formType: 'number'
            }
          ]
        },
        {
          title: '凝析油地质资源量(万吨)',
          dataIndex: 'nxydzzyl',
          key: 'nxydzzyl',
          children: [
            {
              title: 'p10',
              dataIndex: 'nxydzzylp10',
              key: 'nxydzzylp10',
              formType: 'number'
            },
            {
              title: 'p50',
              dataIndex: 'nxydzzylp50',
              key: 'nxydzzylp50',
              formType: 'number'
            },
            {
              title: 'p90',
              dataIndex: 'nxydzzylp90',
              key: 'nxydzzylp90',
              formType: 'number'
            }
          ]
        },
        {
          title: '风险前天然气可采资源量(亿方)',
          dataIndex: 'fxqtrqkczyl',
          key: 'fxqtrqkczyl',
          children: [
            {
              title: 'p10',
              dataIndex: 'fxqtrqkczylp10',
              key: 'fxqtrqkczylp10',
              formType: 'number'
            },
            {
              title: 'p50',
              dataIndex: 'fxqtrqkczylp50',
              key: 'fxqtrqkczylp50',
              formType: 'number'
            },
            {
              title: 'p90',
              dataIndex: 'fxqtrqkczylp90',
              key: 'fxqtrqkczylp90',
              formType: 'number'
            }
          ]
        },
        {
          title: '风险前凝析油可采资源量(亿吨)',
          dataIndex: 'fxqnxykczyl',
          key: 'fxqnxykczyl',
          children: [
            {
              title: 'p10',
              dataIndex: 'fxqtrqkczylp10',
              key: 'fxqtrqkczylp10',
              formType: 'number'
            },
            {
              title: 'p50',
              dataIndex: 'fxqnxykczylp50',
              key: 'fxqnxykczylp50',
              formType: 'number'
            },
            {
              title: 'p90',
              dataIndex: 'fxqnxykczylp90',
              key: 'fxqnxykczylp90',
              formType: 'number'
            }
          ]
        },
        {
          title: '风险后天然气可采资源量(亿方)',
          dataIndex: 'fxhtrqkczyl',
          key: 'fxhtrqkczyl',
          children: [
            {
              title: 'p10',
              dataIndex: 'fxhtrqkczylp10',
              key: 'fxhtrqkczylp10',
              formType: 'number'
            },
            {
              title: 'p50',
              dataIndex: 'fxhtrqkczylp50',
              key: 'fxhtrqkczylp50',
              formType: 'number'
            },
            {
              title: 'p90',
              dataIndex: 'fxhtrqkczylp90',
              key: 'fxhtrqkczylp90',
              formType: 'number'
            }
          ]
        },
        {
          title: '风险后凝析油可采资源量(亿吨)',
          dataIndex: 'fxhnxykczyl',
          key: 'fxhnxykczyl',
          children: [
            {
              title: 'p10',
              dataIndex: 'fxhtrqkczylp10',
              key: 'fxhtrqkczylp10',
              formType: 'number'
            },
            {
              title: 'p50',
              dataIndex: 'fxhnxykczylp50',
              key: 'fxhnxykczylp50',
              formType: 'number'
            },
            {
              title: 'p90',
              dataIndex: 'fxhnxykczylp90',
              key: 'fxhnxykczylp90',
              formType: 'number'
            }
          ]
        }
      ]
    };
    const oilColumns = {
      infoColumns: [
        {
          title: '圈闭',
          dataIndex: 'qbmc',
          key: 'qbmc'
        },
        {
          title: '层圈闭名称',
          dataIndex: 'cqbmc',
          key: 'cqbmc'
        },
        {
          title: '圈闭级别',
          dataIndex: 'qbjb',
          key: 'qbjb',
          formType: 'select',
          selectType: 'qyjb',
          render: (text) => {
            const obj = conf.qyjb || {};
            const arr = obj.data;
            if (arr && Array.isArray(arr)) {
              return arr.find(item => item.id === text).text;
            }
          }
        },
        {
          title: '油气类型',
          dataIndex: 'yqlx',
          key: 'yqlx',
          formType: 'select',
          selectType: 'qylx',
          currentType,
          render: (text) => {
            const obj = conf.qylx || {};
            const arr = obj.data;
            if (arr && Array.isArray(arr)) {
              return arr.find(item => item.id === text).text;
            }
          }
        },
        {
          title: '构造',
          dataIndex: 'gzmc',
          key: 'gzmc'
        },
        {
          title: '原油体积系数(1/Bo)',
          dataIndex: 'yytjxs',
          key: 'yytjxs',
          formType: 'number',
          unit: '1/Bo'
        },
        {
          title: '原油密度(g/cm3)',
          dataIndex: 'yymd',
          key: 'yymd',
          formType: 'number',
          unit: 'g/cm3'
        },
        {
          title: '溶解气油比(m3/t)',
          dataIndex: 'rjqyb',
          key: 'rjqyb',
          formType: 'number',
          unit: 'm3/t'
        }
      ],

      structureColumns: [
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
              render: (text, record = {}) => columnHandler(text, record, 'mjfbcs')
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
              render: (text, record = {}) => columnHandler(text, record, 'hdfbcs')
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
        },
        {
          title: '孔隙度(f)',
          dataIndex: 'kxd',
          key: 'kxd',
          children: [
            {
              title: '分布类型',
              dataIndex: 'kxdfb',
              key: 'kxdfb',
              formType: 'select',
              selectType: 'fblx',
              refColumns: {
                "valueAt": "kxdfbcs",
                "after": ["kxdp10", "kxdp50", "kxdp90"]
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
              dataIndex: 'kxdfbcs',
              key: 'kxdfbcs',
              formType: 'select',
              selectType: 'fbcs',
              refColumns: {
                "before": "kxdfb",
                "after": ["kxdp10", "kxdp50", "kxdp90"]
              },
              render: (text, record = {}) => columnHandler(text, record, 'kxdfbcs')
            },
            {
              title: '参数1',
              dataIndex: 'kxdp10',
              key: 'kxdp10',
              formType: 'number'
            },
            {
              title: '参数2',
              dataIndex: 'kxdp50',
              key: 'kxdp50',
              formType: 'number'
            },
            {
              title: '参数3',
              dataIndex: 'kxdp90',
              key: 'kxdp90',
              formType: 'number'
            }
          ]
        },
        {
          title: '含油饱和度(f)',
          dataIndex: 'hqbhd',
          key: 'hqbhd',
          children: [
            {
              title: '分布类型',
              dataIndex: 'hqbhdfb',
              key: 'hqbhdfb',
              formType: 'select',
              selectType: 'fblx',
              refColumns: {
                "valueAt": "hqbhdfbcs",
                "after": ["hqbhdp10", "hqbhdp50", "hqbhdp90"]
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
              dataIndex: 'hqbhdfbcs',
              key: 'hqbhdfbcs',
              formType: 'select',
              selectType: 'fbcs',
              refColumns: {
                "before": "hqbhdfb",
                "after": ["hqbhdp10", "hqbhdp50", "hqbhdp90"]
              },
              render: (text, record = {}) => columnHandler(text, record, 'hqbhdfbcs')
            },
            {
              title: '参数1',
              dataIndex: 'hqbhdp10',
              key: 'hqbhdp10',
              formType: 'number'
            },
            {
              title: '参数2',
              dataIndex: 'hqbhdp50',
              key: 'hqbhdp50',
              formType: 'number'
            },
            {
              title: '参数3',
              dataIndex: 'hqbhdp90',
              key: 'hqbhdp90',
              formType: 'number'
            }
          ]
        },
        {
          title: '天然气采收率',
          dataIndex: 'trqcsl',
          key: 'trqcsl',
          children: [
            {
              title: '分布类型',
              dataIndex: 'trqcslfb',
              key: 'trqcslfb',
              formType: 'select',
              selectType: 'fblx',
              refColumns: {
                "valueAt": "trqcslfbcs",
                "after": ["trqcslp10", "trqcslp50", "trqcslp90"]
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
              dataIndex: 'trqcslfbcs',
              key: 'trqcslfbcs',
              formType: 'select',
              selectType: 'fbcs',
              refColumns: {
                "before": "trqcslfb",
                "after": ["trqcslp10", "trqcslp50", "trqcslp90"]
              },
              render: (text, record = {}) => columnHandler(text, record, 'trqcslfbcs')
            },
            {
              title: '参数1',
              dataIndex: 'trqcslp10',
              key: 'trqcslp10',
              formType: 'number'
            },
            {
              title: '参数2',
              dataIndex: 'trqcslp50',
              key: 'trqcslp50',
              formType: 'number'
            },
            {
              title: '参数3',
              dataIndex: 'trqcslp90',
              key: 'trqcslp90',
              formType: 'number'
            }
          ]
        },
        {
          title: '石油采收率',
          dataIndex: 'sycsl',
          key: 'sycsl',
          children: [
            {
              title: '分布类型',
              dataIndex: 'sycslfb',
              key: 'sycslfb',
              formType: 'select',
              selectType: 'fblx',
              refColumns: {
                "valueAt": "sycslfbcs",
                "after": ["sycslp10", "sycslp50", "sycslp90"]
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
              dataIndex: 'sycslfbcs',
              key: 'sycslfbcs',
              formType: 'select',
              selectType: 'fbcs',
              refColumns: {
                "before": "sycslfb",
                "after": ["sycslp10", "sycslp50", "sycslp90"]
              },
              render: (text, record = {}) => columnHandler(text, record, 'sycslfbcs')
            },
            {
              title: '参数1',
              dataIndex: 'sycslp10',
              key: 'sycslp10',
              formType: 'number'
            },
            {
              title: '参数2',
              dataIndex: 'sycslp50',
              key: 'sycslp50',
              formType: 'number'
            },
            {
              title: '参数3',
              dataIndex: 'sycslp90',
              key: 'sycslp90',
              formType: 'number'
            }
          ]
        }
      ],

      riskColumns: [
        {
          title: '层位',
          dataIndex: 'cqbmc',
          key: 'cqbmc',
          formType: 'number',
          hide: true,
          editable: false
        },
        {
          title: '原岩',
          dataIndex: 'yy',
          key: 'yy',
          formType: 'number'
        },
        {
          title: '储层',
          dataIndex: 'cc',
          key: 'cc',
          formType: 'number'
        },
        {
          title: '圈闭',
          dataIndex: 'qb',
          key: 'qb',
          formType: 'number'
        },
        {
          title: '运聚',
          dataIndex: 'yj',
          key: 'yj',
          formType: 'number'
        },
        {
          title: '盖层',
          dataIndex: 'gc',
          key: 'gc',
          formType: 'number'
        },
        {
          title: '地质风险',
          dataIndex: 'dzfx',
          key: 'dzfx',
          formType: 'number',
          editable: false,
          hide: true
        }
      ],

      resultColumns: [
        {
          title: '更新时间',
          dataIndex: 'updateDate',
          key: 'updateDate'
        },
        {
          title: '圈闭',
          dataIndex: 'qbmc',
          key: 'qbmc'
        },
        {
          title: '层圈闭名称',
          dataIndex: 'cqbmc',
          key: 'cqbmc'
        },
        {
          title: '圈闭级别',
          dataIndex: 'qbjb',
          key: 'qbjb',
          formType: 'select',
          selectType: 'qyjb',
          render: (text) => {
            const obj = conf.qyjb || {};
            const arr = obj.data;
            if (arr && Array.isArray(arr)) {
              return arr.find(item => item.id === text).text;
            }
          }
        },
        {
          title: '构造',
          dataIndex: 'gzmc',
          key: 'gzmc'
        },
        {
          title: '类型',
          dataIndex: 'yqlx',
          key: 'yqlx',
          selectType: 'qylx',
          render: (text) => {
            const obj = conf.qylx || {};
            const arr = obj.data;
            if (arr && Array.isArray(arr)) {
              return arr.find(item => item.id === text).text;
            }
          }
        },
        {
          title: '面积(km²)',
          dataIndex: 'mj',
          key: 'mj',
          children: [
            {
              title: 'p10',
              dataIndex: 'mjp10',
              key: 'mjp10',
              formType: 'number'
            },
            {
              title: 'p50',
              dataIndex: 'mjp50',
              key: 'mjp50',
              formType: 'number'
            },
            {
              title: 'p90',
              dataIndex: 'mjp90',
              key: 'mjp90',
              formType: 'number'
            },
            {
              title: '计算方法',
              dataIndex: 'mjfb',
              key: 'mjfb',
              formType: 'select',
              selectType: 'fblx',
              render: (text) => {
                const obj = conf.fblx || {};
                const arr = obj.data;
                if (arr && Array.isArray(arr)) {
                  return arr.find(item => item.id === text).text;
                }
              }
            }
          ]
        },
        {
          title: '厚度(m)',
          dataIndex: 'hd',
          key: 'hd',
          children: [
            {
              title: 'p10',
              dataIndex: 'hdp10',
              key: 'hdp10',
              formType: 'number'
            },
            {
              title: 'p50',
              dataIndex: 'hdp50',
              key: 'hdp50',
              formType: 'number'
            },
            {
              title: 'p90',
              dataIndex: 'hdp90',
              key: 'hdp90',
              formType: 'number'
            },
            {
              title: '计算方法',
              dataIndex: 'hdfb',
              key: 'hdfb',
              formType: 'select',
              selectType: 'fblx',
              render: (text) => {
                const obj = conf.fblx || {};
                const arr = obj.data;
                if (arr && Array.isArray(arr)) {
                  return arr.find(item => item.id === text).text;
                }
              }
            }
          ]
        },
        {
          title: '孔隙度(f)',
          dataIndex: 'kxd',
          key: 'kxd',
          children: [
            {
              title: 'p10',
              dataIndex: 'kxdp10',
              key: 'kxdp10',
              formType: 'number'
            },
            {
              title: 'p50',
              dataIndex: 'kxdp50',
              key: 'kxdp50',
              formType: 'number'
            },
            {
              title: 'p90',
              dataIndex: 'kxdp90',
              key: 'kxdp90',
              formType: 'number'
            },
            {
              title: '计算方法',
              dataIndex: 'kxdfb',
              key: 'kxdfb',
              formType: 'select',
              selectType: 'fblx',
              render: (text) => {
                const obj = conf.fblx || {};
                const arr = obj.data;
                if (arr && Array.isArray(arr)) {
                  return arr.find(item => item.id === text).text;
                }
              }
            }
          ]
        },
        {
          title: '含油饱和度f',
          dataIndex: 'hqbhd',
          key: 'hqbhd',
          children: [
            {
              title: 'p10',
              dataIndex: 'hqbhdp10',
              key: 'hqbhdp10',
              formType: 'number'
            },
            {
              title: 'p50',
              dataIndex: 'hqbhdp50',
              key: 'hqbhdp50',
              formType: 'number'
            },
            {
              title: 'p90',
              dataIndex: 'hqbhdp90',
              key: 'hqbhdp90',
              formType: 'number'
            },
            {
              title: '计算方法',
              dataIndex: 'hqbhdfb',
              key: 'hqbhdfb',
              formType: 'select',
              selectType: 'fblx',
              render: (text) => {
                const obj = conf.fblx || {};
                const arr = obj.data;
                if (arr && Array.isArray(arr)) {
                  return arr.find(item => item.id === text).text;
                }
              }
            }
          ]
        },
        {
          title: '原油体积系数(1/Bo)',
          dataIndex: 'yytjxs',
          key: 'yytjxs',
          formType: 'number',
          unit: '1/Bo'
        },
        {
          title: '原油密度(g/cm3)',
          dataIndex: 'yymd',
          key: 'yymd',
          formType: 'number',
          unit: 'g/cm3'
        },
        {
          title: '溶解气油比(m3/t)',
          dataIndex: 'rjqyb',
          key: 'rjqyb',
          formType: 'number',
          unit: 'm3/t'
        },
        {
          title: '天然气地质资源量(亿方)',
          dataIndex: 'trqdzzyl',
          key: 'trqdzzyl',
          children: [
            {
              title: 'p10',
              dataIndex: 'trqdzzylp10',
              key: 'trqdzzylp10',
              formType: 'number'
            },
            {
              title: 'p50',
              dataIndex: 'trqdzzylp50',
              key: 'trqdzzylp50',
              formType: 'number'
            },
            {
              title: 'p90',
              dataIndex: 'trqdzzylp90',
              key: 'trqdzzylp90',
              formType: 'number'
            }
          ]
        },
        {
          title: '凝析油地质资源量(万吨)',
          dataIndex: 'nxydzzyl',
          key: 'nxydzzyl',
          children: [
            {
              title: 'p10',
              dataIndex: 'nxydzzylp10',
              key: 'nxydzzylp10',
              formType: 'number'
            },
            {
              title: 'p50',
              dataIndex: 'nxydzzylp50',
              key: 'nxydzzylp50',
              formType: 'number'
            },
            {
              title: 'p90',
              dataIndex: 'nxydzzylp90',
              key: 'nxydzzylp90',
              formType: 'number'
            }
          ]
        },
        {
          title: '天然气采收率',
          dataIndex: 'trqcsl',
          key: 'trqcsl',
          children: [
            {
              title: 'p10',
              dataIndex: 'trqcslp10',
              key: 'trqcslp10',
              formType: 'number'
            },
            {
              title: 'p50',
              dataIndex: 'trqcslp50',
              key: 'trqcslp50',
              formType: 'number'
            },
            {
              title: 'p90',
              dataIndex: 'trqcslp90',
              key: 'trqcslp90',
              formType: 'number'
            },
            {
              title: '计算方法',
              dataIndex: 'trqcslfb',
              key: 'trqcslfb',
              formType: 'select',
              selectType: 'fblx',
              render: (text) => {
                const obj = conf.fblx || {};
                const arr = obj.data;
                if (arr && Array.isArray(arr)) {
                  return arr.find(item => item.id === text).text;
                }
              }
            }
          ]
        },
        {
          title: '石油采收率',
          dataIndex: 'sycsl',
          key: 'sycsl',
          children: [
            {
              title: 'p10',
              dataIndex: 'sycslp10',
              key: 'sycslp10',
              formType: 'number'
            },
            {
              title: 'p50',
              dataIndex: 'sycslp50',
              key: 'sycslp50',
              formType: 'number'
            },
            {
              title: 'p90',
              dataIndex: 'sycslp90',
              key: 'sycslp90',
              formType: 'number'
            },
            {
              title: '计算方法',
              dataIndex: 'sycslfb',
              key: 'sycslfb',
              formType: 'select',
              selectType: 'fblx',
              render: (text) => {
                const obj = conf.fblx || {};
                const arr = obj.data;
                if (arr && Array.isArray(arr)) {
                  return arr.find(item => item.id === text).text;
                }
              }
            }
          ]
        },
        {
          title: '风险前天然气可采资源量(亿方)',
          dataIndex: 'fxqtrqkczyl',
          key: 'fxqtrqkczyl',
          children: [
            {
              title: 'p10',
              dataIndex: 'fxqtrqkczylp10',
              key: 'fxqtrqkczylp10',
              formType: 'number'
            },
            {
              title: 'p50',
              dataIndex: 'fxqtrqkczylp50',
              key: 'fxqtrqkczylp50',
              formType: 'number'
            },
            {
              title: 'p90',
              dataIndex: 'fxqtrqkczylp90',
              key: 'fxqtrqkczylp90',
              formType: 'number'
            }
          ]
        },
        {
          title: '风险前凝析油可采资源量(亿吨)',
          dataIndex: 'fxqnxykczyl',
          key: 'fxqnxykczyl',
          children: [
            {
              title: 'p10',
              dataIndex: 'fxqtrqkczylp10',
              key: 'fxqtrqkczylp10',
              formType: 'number'
            },
            {
              title: 'p50',
              dataIndex: 'fxqnxykczylp50',
              key: 'fxqnxykczylp50',
              formType: 'number'
            },
            {
              title: 'p90',
              dataIndex: 'fxqnxykczylp90',
              key: 'fxqnxykczylp90',
              formType: 'number'
            }
          ]
        },
        {
          title: '地质风险',
          dataIndex: 'dzfx',
          key: 'dzfx',
          hide: true
        },
        {
          title: '风险后天然气可采资源量(亿方)',
          dataIndex: 'fxhtrqkczyl',
          key: 'fxhtrqkczyl',
          children: [
            {
              title: 'p10',
              dataIndex: 'fxhtrqkczylp10',
              key: 'fxhtrqkczylp10',
              formType: 'number'
            },
            {
              title: 'p50',
              dataIndex: 'fxhtrqkczylp50',
              key: 'fxhtrqkczylp50',
              formType: 'number'
            },
            {
              title: 'p90',
              dataIndex: 'fxhtrqkczylp90',
              key: 'fxhtrqkczylp90',
              formType: 'number'
            }
          ]
        },
        {
          title: '风险后凝析油可采资源量(亿吨)',
          dataIndex: 'fxhnxykczyl',
          key: 'fxhnxykczyl',
          children: [
            {
              title: 'p10',
              dataIndex: 'fxhtrqkczylp10',
              key: 'fxhtrqkczylp10',
              formType: 'number'
            },
            {
              title: 'p50',
              dataIndex: 'fxhnxykczylp50',
              key: 'fxhnxykczylp50',
              formType: 'number'
            },
            {
              title: 'p90',
              dataIndex: 'fxhnxykczylp90',
              key: 'fxhnxykczylp90',
              formType: 'number'
            }
          ]
        }
      ],
      totalColumns: [
        {
          title: '圈闭',
          dataIndex: 'qbmc',
          key: 'qbmc'
        },
        {
          title: '面积(km²)',
          dataIndex: 'mj',
          key: 'mj',
          children: [
            {
              title: 'p10',
              dataIndex: 'mjp10',
              key: 'mjp10',
              formType: 'number'
            },
            {
              title: 'p50',
              dataIndex: 'mjp50',
              key: 'mjp50',
              formType: 'number'
            },
            {
              title: 'p90',
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
              title: 'p10',
              dataIndex: 'hdp10',
              key: 'hdp10',
              formType: 'number'
            },
            {
              title: 'p50',
              dataIndex: 'hdp50',
              key: 'hdp50',
              formType: 'number'
            },
            {
              title: 'p90',
              dataIndex: 'hdp90',
              key: 'hdp90',
              formType: 'number'
            }
          ]
        },
        {
          title: '孔隙度(f)',
          dataIndex: 'kxd',
          key: 'kxd',
          children: [
            {
              title: 'p10',
              dataIndex: 'kxdp10',
              key: 'kxdp10',
              formType: 'number'
            },
            {
              title: 'p50',
              dataIndex: 'kxdp50',
              key: 'kxdp50',
              formType: 'number'
            },
            {
              title: 'p90',
              dataIndex: 'kxdp90',
              key: 'kxdp90',
              formType: 'number'
            }
          ]
        },
        {
          title: '含气饱和度(f)',
          dataIndex: 'hybhd',
          key: 'hybhd',
          children: [
            {
              title: 'p10',
              dataIndex: 'hqbhdp10',
              key: 'hqbhdp10',
              formType: 'number'
            },
            {
              title: 'p50',
              dataIndex: 'hqbhdp50',
              key: 'hqbhdp50',
              formType: 'number'
            },
            {
              title: 'p90',
              dataIndex: 'hqbhdp90',
              key: 'hqbhdp90',
              formType: 'number'
            }
          ]
        },
        {
          title: '原始气体偏差系数(1/Zi)',
          dataIndex: 'ysqtpcxs',
          key: 'ysqtpcxs',
          formType: 'number',
          unit: '1/Zi'
        },
        {
          title: '凝析油含量(t/m3)',
          dataIndex: 'nxyhl',
          key: 'nxyhl',
          formType: 'number',
          unit: 't/m3'
        },
        {
          title: '天然气地质资源量(亿方)',
          dataIndex: 'trqdzzyl',
          key: 'trqdzzyl',
          children: [
            {
              title: 'p10',
              dataIndex: 'trqdzzylp10',
              key: 'trqdzzylp10',
              formType: 'number'
            },
            {
              title: 'p50',
              dataIndex: 'trqdzzylp50',
              key: 'trqdzzylp50',
              formType: 'number'
            },
            {
              title: 'p90',
              dataIndex: 'trqdzzylp90',
              key: 'trqdzzylp90',
              formType: 'number'
            }
          ]
        },
        {
          title: '凝析油地质资源量(万吨)',
          dataIndex: 'nxydzzyl',
          key: 'nxydzzyl',
          children: [
            {
              title: 'p10',
              dataIndex: 'nxydzzylp10',
              key: 'nxydzzylp10',
              formType: 'number'
            },
            {
              title: 'p50',
              dataIndex: 'nxydzzylp50',
              key: 'nxydzzylp50',
              formType: 'number'
            },
            {
              title: 'p90',
              dataIndex: 'nxydzzylp90',
              key: 'nxydzzylp90',
              formType: 'number'
            }
          ]
        },
        {
          title: '风险前天然气可采资源量(亿方)',
          dataIndex: 'fxqtrqkczyl',
          key: 'fxqtrqkczyl',
          children: [
            {
              title: 'p10',
              dataIndex: 'fxqtrqkczylp10',
              key: 'fxqtrqkczylp10',
              formType: 'number'
            },
            {
              title: 'p50',
              dataIndex: 'fxqtrqkczylp50',
              key: 'fxqtrqkczylp50',
              formType: 'number'
            },
            {
              title: 'p90',
              dataIndex: 'fxqtrqkczylp90',
              key: 'fxqtrqkczylp90',
              formType: 'number'
            }
          ]
        },
        {
          title: '风险前凝析油可采资源量(亿吨)',
          dataIndex: 'fxqnxykczyl',
          key: 'fxqnxykczyl',
          children: [
            {
              title: 'p10',
              dataIndex: 'fxqtrqkczylp10',
              key: 'fxqtrqkczylp10',
              formType: 'number'
            },
            {
              title: 'p50',
              dataIndex: 'fxqnxykczylp50',
              key: 'fxqnxykczylp50',
              formType: 'number'
            },
            {
              title: 'p90',
              dataIndex: 'fxqnxykczylp90',
              key: 'fxqnxykczylp90',
              formType: 'number'
            }
          ]
        },
        {
          title: '风险后天然气可采资源量(亿方)',
          dataIndex: 'fxhtrqkczyl',
          key: 'fxhtrqkczyl',
          children: [
            {
              title: 'p10',
              dataIndex: 'fxhtrqkczylp10',
              key: 'fxhtrqkczylp10',
              formType: 'number'
            },
            {
              title: 'p50',
              dataIndex: 'fxhtrqkczylp50',
              key: 'fxhtrqkczylp50',
              formType: 'number'
            },
            {
              title: 'p90',
              dataIndex: 'fxhtrqkczylp90',
              key: 'fxhtrqkczylp90',
              formType: 'number'
            }
          ]
        },
        {
          title: '风险后凝析油可采资源量(亿吨)',
          dataIndex: 'fxhnxykczyl',
          key: 'fxhnxykczyl',
          children: [
            {
              title: 'p10',
              dataIndex: 'fxhtrqkczylp10',
              key: 'fxhtrqkczylp10',
              formType: 'number'
            },
            {
              title: 'p50',
              dataIndex: 'fxhnxykczylp50',
              key: 'fxhnxykczylp50',
              formType: 'number'
            },
            {
              title: 'p90',
              dataIndex: 'fxhnxykczylp90',
              key: 'fxhnxykczylp90',
              formType: 'number'
            }
          ]
        }
      ]
    };
    if (type === '1') {
      return gasColumns;
    }
    return oilColumns;
  };
  const projectColumns = [
    {
      title: '项目',
      dataIndex: 'xmmc',
      key: 'xmmc'
    },
    {
      title: '负责人',
      dataIndex: 'createUser',
      key: 'createUser',
      hide: true
    },
    {
      title: '开始时间',
      dataIndex: 'kspjsj',
      key: 'kspjsj',
      formType: 'datePicker',
      render: date => (
        moment(date).format('YYYY-MM-DD')
      )
    },
    {
      title: '结束时间',
      dataIndex: 'jzpjsj',
      key: 'jzpjsj',
      formType: 'datePicker',
      render: date => (
        moment(date).format('YYYY-MM-DD')
      )
    },
    {
      title: '进度',
      key: 'percent',
      dataIndex: 'percent',
      hide: true,
      render: (text, record) => {
        const {xmzt = {}} = record, {wcd} = xmzt;
        return (
          <Progress percent={wcd} size="small"/>
        );
      }
    }
  ];
  useEffect(() => {
    if (xmbm === '') {
      dispatch({
        type: 'project/fetchList'
      });
    } else {
      dispatch({
        type: 'probability/fetchConf',
        payload: {
          xmbm
        },
        callback: () => (dispatch({
          type: 'probability/fetchList',
          payload: {
            xmbm
          }
        }))
      });

      dispatch({
        type: 'probability/fetchResult',
        payload: {
          xmbm
        }
      });
      dispatch({
        type: 'probability/fetchTotal',
        payload: {
          xmbm
        }
      });
    }
  }, []);
  useEffect(() => {
    setCategory(currentType);
  }, [currentType]);
  const getCloneVal = (data) => {
    const res = [];
    data && data.map(item => {
      res.push({
        label: item.cqbmc,
        value: item.cqbbm
      });
    });
    return res;
  };

  const onSubmit = (value, callback, type) => {
    const newVal = currentType !== '' ? {...value, yqlx: currentType} : value;
    if (type === 'create') {
      dispatch({
        type: 'probability/create',
        payload: {
          ...newVal,
          xmbm: xmbm !== '' ? xmbm : xmbmId
        },
        callback
      });
    } else {
      dispatch({
        type: 'probability/update',
        payload: {
          ...value,
          xmbm: xmbm !== '' ? xmbm : xmbmId
        },
        callback
      });
    }
  };

  const createProject = (values, {}, callback) => {
    dispatch({
      type: 'createProject/submitStepForm',
      payload: {
        ...formatCreateValues(values),
        cyzy: '123'
      },
      callback: () => {
        dispatch({
          type: 'project/fetchList'
        });
        callback();
      }
    });
  };


  const onCalculateItem = ({cqbbm}) => {
    dispatch({
      type: 'probability/calculateItem',
      payload: {
        cqbbm,
        xmbm: xmbm !== '' ? xmbm : xmbmId
      }
    });
  };

  const onCalculateAll = () => {
    dispatch({
      type: 'probability/calculateAll',
      payload: {
        xmbm: xmbm !== '' ? xmbm : xmbmId
      }
    });
  };

  const onDelete = ({cqbbm}) => {
    dispatch({
      type: 'probability/deleteItem',
      payload: {
        cqbbm,
        xmbm: xmbm !== '' ? xmbm : xmbmId
      }
    });
  };

  const onCalculateTotal = () => {
    dispatch({
      type: 'probability/calculateTotal',
      payload: {
        xmbm: xmbm !== '' ? xmbm : xmbmId
      }
    });
  };

  const handlerEvaluate = ({xmbm}) => {
    message.loading({content: '加载中...', key: 'conf'});
    dispatch({
      type: 'probability/fetchList',
      payload: {
        xmbm
      }
    });
    dispatch({
      type: 'probability/fetchConf',
      payload: {
        xmbm
      },
      callback: setShowProject
    });
    dispatch({
      type: 'probability/fetchResult',
      payload: {
        xmbm
      }
    });
    dispatch({
      type: 'probability/fetchTotal',
      payload: {
        xmbm
      }
    });
    setXmbmId(xmbm);
  };

  const onChangeType = (val, key) => {
    if (key === 'yqlx') setCategory(val);
  };

  const tableSave = (row) => {
    const {dispatch} = props;
    const newData = [...data];
    const index = newData.findIndex((item) => row.xmbm === item.xmbm);
    const item = newData[index];
    newData.splice(index, 1, {...item, ...row});
    dispatch({
      type: 'probability/save',
      payload: {
        data: newData
      }
    });
    dispatch({
      type: 'probability/update',
      payload: {
        ...row,
        xmbm: xmbm !== '' ? xmbm : xmbmId
      }
    });
  };

  const renderProject = () => {
    return (
      <CommonTable canUpdate={false} title='选择项目' loading={loadingProject} onSubmit={createProject}
                   handlerEvaluate={handlerEvaluate}
                   columns={projectColumns}
                   dataSource={list}/>);
  };

  return (
    <PageContainer>
      <GridContent>
        {
          showProject ?
            <Card>
              {renderProject()}
            </Card>
            :
            <Card
              title={category === "1" ? '天然气资源评价' : '石油资源评价'}
              extra={<a onClick={() => setShowProject(true)}>重新评价</a>}
            >
              <CrudTable loading={loadingList} title="基础参数" cloneVal={getCloneVal(data)} conf={conf}
                         columns={getColumns(category)}
                         onSubmit={onSubmit}
                         onChangeType={onChangeType}
                         useReflectColumns={useReflectColumns}
                         reflectColumns={reflectColumns}
                         onCalculateItem={onCalculateItem} onDelete={onDelete} data={data}/>
              <CrudTable title="资源评价参数" conf={conf} columns={getColumns(category).structureColumns} tableSave={tableSave}
                         data={data}
                         isCurd={false}
                         useReflectColumns={useReflectColumns}
                         reflectColumns={reflectColumns}
              />
              <CrudTable title="地质风险参数" conf={conf} columns={getColumns(category).riskColumns} tableSave={tableSave}
                         data={data}
                         isCurd={false}
                         edit/>
              <CrudTable title="评价结果" columns={getColumns(category).resultColumns} data={result}
                         onCalculateAll={onCalculateAll}
                         isCurd={false} result/>
              <CrudTable title="汇总" columns={getColumns(category).totalColumns} data={total}
                         onCalculateAll={onCalculateTotal}
                         isCurd={false} result/>
            </Card>
        }
      </GridContent>
    </PageContainer>
  );
};

export default connect(({probability, project, loading}) => ({
  probability,
  project,
  loadingList: loading.effects['probability/fetchList'],
  loadingProject: loading.effects['project/fetchList']
}))(Probability);
