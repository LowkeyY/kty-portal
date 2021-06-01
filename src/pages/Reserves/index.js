import React, { useEffect, useState } from 'react';
import { Button, Card, Tag, Progress, Spin, Table } from 'antd';
import { PageContainer, GridContent } from '@ant-design/pro-layout';
import { connect } from 'umi';
import moment from 'moment';
import { formatStrObj } from '@/utils/utils';
import { LoadingOutlined } from '@ant-design/icons';
import CrudTable from '@/components/CrudTable';
import CommonTable from '@/components/CommonTable';

const Reserves = (props) => {
  const { reserves: { result, data, conf = {} }, dispatch, location: { query }, loadingList, loadingProject } = props;
  const { project: { list } } = props;
  const { currentType = '' } = conf;
  const { xmbm = '' } = query;
  const [category, setCategory] = useState(currentType);
  const [xmbmId, setXmbmId] = useState('');
  const [showProject, setShowProject] = useState(xmbm === '');
  const getColumns = (type) => {
    const gasColumns = {
      infoColumns: [
        {
          title: '油气田名称',
          dataIndex: 'yqtmc',
          key: 'yqtmc'
        },
        {
          title: '油气藏名称',
          dataIndex: 'yqcmc',
          key: 'yqcmc'
        },
        {
          title: '储量级别',
          dataIndex: 'cljb',
          key: 'cljb',
          formType: 'select',
          selectType: 'cljb',
          render: (text) => {
            const obj = conf.cljb || {};
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
          title: '面积(km2)',
          dataIndex: 'mj',
          key: 'mj',
          formType: 'number',
          unit: 'km2'
        },
        {
          title: '厚度(m)',
          dataIndex: 'hd',
          key: 'hd',
          formType: 'number',
          unit: 'm'
        },
        {
          title: '孔隙度(f)',
          dataIndex: 'kxd',
          key: 'kxd',
          formType: 'number',
          unit: 'f'
        },
        {
          title: '含气饱和度(f)',
          dataIndex: 'hqbhd',
          key: 'hqbhd',
          formType: 'number',
          unit: 'f'
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
        },
        {
          title: '石油采收率',
          dataIndex: 'sycsl',
          key: 'sycsl',
          formType: 'number'
        },
        {
          title: '天然气采收率',
          dataIndex: 'trqcsl',
          key: 'trqcsl',
          formType: 'number'
        }
      ],
      resultColumns: [
        {
          title: '油气田名称',
          dataIndex: 'yqtmc',
          key: 'yqtmc'
        },
        {
          title: '油气藏名称',
          dataIndex: 'yqcmc',
          key: 'yqcmc'
        },
        {
          title: '储量级别',
          dataIndex: 'cljb',
          key: 'cljb',
          selectType: 'cljb',
          formType: 'select',
          render: (text) => {
            const obj = conf.cljb || {};
            const arr = obj.data;
            if (arr && Array.isArray(arr)) {
              return arr.find(item => item.id === text).text;
            }
          }
        },
        {
          title: '面积(km2)',
          dataIndex: 'mj',
          key: 'mj',
          formType: 'number',
          unit: 'km2'
        },
        {
          title: '厚度(m)',
          dataIndex: 'hd',
          key: 'hd',
          formType: 'number',
          unit: 'm'
        },
        {
          title: '孔隙度(f)',
          dataIndex: 'kxd',
          key: 'kxd',
          formType: 'number',
          unit: 'f'
        },
        {
          title: '含气饱和度(f)',
          dataIndex: 'hqbhd',
          key: 'hqbhd',
          formType: 'number',
          unit: 'f'
        },
        {
          title: '含气饱和度(f)',
          dataIndex: 'hqbhd',
          key: 'hqbhd',
          formType: 'number',
          unit: 'f'
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
        },
        {
          title: '石油地质储量(万吨)',
          dataIndex: 'sydzcl',
          key: 'sydzcl',
          formType: 'number',
          unit: '万吨'
        },
        {
          title: '天然气地质储量(亿方)',
          dataIndex: 'trqdzcl',
          key: 'trqdzcl',
          formType: 'number',
          unit: '亿方'
        },
        {
          title: '石油采收率',
          dataIndex: 'sycsl',
          key: 'sycsl',
          formType: 'number'
        },
        {
          title: '天然气采收率',
          dataIndex: 'trqcsl',
          key: 'trqcsl',
          formType: 'number'
        },
        {
          title: '石油可采储量(万吨)',
          dataIndex: 'sykccl',
          key: 'sykccl',
          formType: 'number',
          unit: '万吨'
        },
        {
          title: '天然气可采储量(亿方)',
          dataIndex: 'trqkccl',
          key: 'trqkccl',
          formType: 'number',
          unit: '亿方'
        }
      ]
    };
    const oilColumns = {
      infoColumns: [
        {
          title: '油气田名称',
          dataIndex: 'yqtmc',
          key: 'yqtmc'
        },
        {
          title: '油气藏名称',
          dataIndex: 'yqcmc',
          key: 'yqcmc'
        },
        {
          title: '储量级别',
          dataIndex: 'cljb',
          key: 'cljb',
          formType: 'select',
          selectType: 'cljb',
          render: (text) => {
            const obj = conf.cljb || {};
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
          title: '面积(km2)',
          dataIndex: 'mj',
          key: 'mj',
          formType: 'number',
          unit: 'km2'
        },
        {
          title: '厚度(m)',
          dataIndex: 'hd',
          key: 'hd',
          formType: 'number',
          unit: 'm'
        },
        {
          title: '孔隙度(f)',
          dataIndex: 'kxd',
          key: 'kxd',
          formType: 'number',
          unit: 'f'
        },
        {
          title: '含油饱和度(f)',
          dataIndex: 'hqbhd',
          key: 'hqbhd',
          formType: 'number',
          unit: 'f'
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
          title: '石油采收率',
          dataIndex: 'sycsl',
          key: 'sycsl',
          formType: 'number'
        },
        {
          title: '天然气采收率',
          dataIndex: 'trqcsl',
          key: 'trqcsl',
          formType: 'number'
        }
      ],
      resultColumns: [
        {
          title: '油气田名称',
          dataIndex: 'yqtmc',
          key: 'yqtmc'
        },
        {
          title: '油气藏名称',
          dataIndex: 'yqcmc',
          key: 'yqcmc'
        },
        {
          title: '储量级别',
          dataIndex: 'cljb',
          key: 'cljb',
          selectType: 'cljb',
          formType: 'select',
          render: (text) => {
            const obj = conf.cljb || {};
            const arr = obj.data;
            if (arr && Array.isArray(arr)) {
              return arr.find(item => item.id === text).text;
            }
          }
        },
        {
          title: '面积(km2)',
          dataIndex: 'mj',
          key: 'mj',
          formType: 'number',
          unit: 'km2'
        },
        {
          title: '厚度(m)',
          dataIndex: 'hd',
          key: 'hd',
          formType: 'number',
          unit: 'm'
        },
        {
          title: '孔隙度(f)',
          dataIndex: 'kxd',
          key: 'kxd',
          formType: 'number',
          unit: 'f'
        },
        {
          title: '含油饱和度(f)',
          dataIndex: 'hqbhd',
          key: 'hqbhd',
          formType: 'number',
          unit: 'f'
        },
        {
          title: '原油体积系数(1/Bo)',
          dataIndex: 'yytjxs',
          key: 'yytjxs',
          formType: 'number',
          unit: '1/Bo'
        },
        {
          title: '含油饱和度(f)',
          dataIndex: 'hqbhd',
          key: 'hqbhd',
          formType: 'number',
          unit: 'f'
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
          title: '石油地质储量(万吨)',
          dataIndex: 'sydzcl',
          key: 'sydzcl',
          formType: 'number',
          unit: '万吨'
        },
        {
          title: '天然气地质储量(亿方)',
          dataIndex: 'trqdzcl',
          key: 'trqdzcl',
          formType: 'number',
          unit: '亿方'
        },
        {
          title: '石油采收率',
          dataIndex: 'sycsl',
          key: 'sycsl',
          formType: 'number'
        },
        {
          title: '天然气采收率',
          dataIndex: 'trqcsl',
          key: 'trqcsl',
          formType: 'number'
        },
        {
          title: '石油可采储量(万吨)',
          dataIndex: 'sykccl',
          key: 'sykccl',
          formType: 'number',
          unit: '万吨'
        },
        {
          title: '天然气可采储量(亿方)',
          dataIndex: 'trqkccl',
          key: 'trqkccl',
          formType: 'number',
          unit: '亿方'
        }
      ]
    };
    if (type === '1') {
      return gasColumns;
    }
    return oilColumns;
  };
  const totalColumns = [
    {
      title: '储量级别',
      dataIndex: 'cljb',
      key: 'cljb',
      selectType: 'cljb',
      formType: 'select'
    },
    {
      title: '面积(km2)',
      dataIndex: 'mj',
      key: 'mj',
      formType: 'number',
      unit: 'km2'
    },
    {
      title: '石油地质储量(万吨)',
      dataIndex: 'sydzcl',
      key: 'sydzcl',
      formType: 'number',
      unit: '万吨'
    },
    {
      title: '天然气地质储量(亿方)',
      dataIndex: 'trqdzcl',
      key: 'trqdzcl',
      formType: 'number',
      unit: '亿方'
    },
    {
      title: '石油可采储量(万吨)',
      dataIndex: 'sykccl',
      key: 'sykccl',
      formType: 'number',
      unit: '万吨'
    },
    {
      title: '天然气可采储量(亿方)',
      dataIndex: 'trqkccl',
      key: 'trqkccl',
      formType: 'number',
      unit: '亿方'
    }
  ];
  const projectColumns = [
    {
      title: '项目',
      dataIndex: 'xmmc',
      key: 'xmmc'
    },
    {
      title: '负责人',
      dataIndex: 'createUser',
      key: 'createUser'
    },
    {
      title: '创建时间',
      dataIndex: 'createDate',
      key: 'createDate',
      render: date => (
        moment(date).format('YYYY-MM-DD')
      )
    },
    {
      title: '结束时间',
      dataIndex: 'endDate',
      key: 'endDate',
      render: date => (
        moment(date).format('YYYY-MM-DD')
      )
    },
    {
      title: '进度',
      key: 'percent',
      dataIndex: 'percent',
      render: (text, record) => {
        const { xmzt = {} } = record, { wcd } = xmzt;
        return (
          <Progress percent={wcd} size="small" />
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
        type: 'reserves/fetchConf',
        payload: {
          xmbm
        },
        callback: () => (dispatch({
          type: 'reserves/fetchList',
          payload: {
            xmbm
          }
        }))
      });
      dispatch({
        type: 'reserves/fetchResult',
        payload: {
          xmbm
        }
      });
      dispatch({
        type: 'reserves/fetchTotal',
        payload: {
          xmbm
        }
      });
    }
  }, []);

  const getCloneVal = (data) => {
    const res = [];
    data && data.map(item => {
      const { yqtmc = '', yqcmc = '', cljb = '' } = item;
      res.push({
        label: `${yqtmc}/${yqcmc}/${cljb}`,
        value: item.yqcbm
      });
    });
    return res;
  };
  const onChangeType = (val) => {
    setCategory(val);
  };
  const onSubmit = (value, callback, type) => {
    const newVal = currentType !== '' ? { ...value, yqlx: currentType } : value;
    if (type === 'create') {
      dispatch({
        type: 'reserves/create',
        payload: {
          ...newVal,
          xmbm: xmbm !== '' ? xmbm : xmbmId
        },
        callback
      });
    } else {
      dispatch({
        type: 'reserves/update',
        payload: {
          ...newVal,
          xmbm: xmbm !== '' ? xmbm : xmbmId
        },
        callback
      });
    }
  };

  const onDelete = ({ yqcbm }) => {
    dispatch({
      type: 'reserves/deleteItem',
      payload: {
        yqcbm,
        xmbm: xmbm !== '' ? xmbm : xmbmId
      }
    });
  };

  const createProject = (values, callback) => {
    dispatch({
      type: 'createProject/submitStepForm',
      payload: {
        ... formatCreateValues(values),
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


  const handlerEvaluate = ({ xmbm }) => {
    dispatch({
      type: 'reserves/fetchList',
      payload: {
        xmbm
      }
    });
    dispatch({
      type: 'reserves/fetchConf',
      payload: {
        xmbm
      },
      callback: setShowProject
    });
    dispatch({
      type: 'reserves/fetchResult',
      payload: {
        xmbm
      }
    });
    dispatch({
      type: 'reserves/fetchTotal',
      payload: {
        xmbm
      }
    });
    setXmbmId(xmbm);
  };
  const onCalculateTotal = () => {
    dispatch({
      type: 'reserves/fetchResult',
      payload: {
        xmbm: xmbm !== '' ? xmbm : xmbmId
      }
    });
  };

  const renderProject = () => {
    return (<CommonTable canUpdate={false} title='选择项目' loading={loadingProject} onOk={createProject}
                         handlerEvaluate={handlerEvaluate}
                         columns={projectColumns}
                         dataSource={list} />);
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
            <CrudTable title="基础参数" cloneVal={getCloneVal(data)} conf={conf} columns={getColumns(category)}
                       onSubmit={onSubmit}
                       onChangeType={onChangeType}
                       onDelete={onDelete} data={data} />
            <CrudTable title="评价结果" columns={getColumns(category).resultColumns} data={data}
                       isCurd={false} result />
            <CrudTable title="合计" columns={totalColumns} data={result}
                       onCalculateAll={onCalculateTotal}
                       isCurd={false} result />
          </Card>
        }
      </GridContent>
    </PageContainer>
  );
};

export default connect(({ reserves, project, loading }) => ({
  reserves,
  project,
  loadingList: loading.effects['reserves/fetchList'],
  loadingProject: loading.effects['project/fetchList']
}))(Reserves);
