function getTableList(req, res) {
  const obj = {
    1: {
      '1': [
        {
          title: '储量计算单元',
          dataIndex: '1',
          key: '1'
        },
        {
          title: '含油面积（km2)',
          dataIndex: '2',
          key: '2'
        },
        {
          title: '有效厚度（m）',
          dataIndex: '3',
          key: '3'
        },
        {
          title: '孔隙度（%）',
          dataIndex: '4',
          key: '4'
        },
        {
          title: '含油饱和度（%）',
          dataIndex: '5',
          key: '5'
        },
        {
          title: '原油收缩系数',
          dataIndex: '6',
          key: '6'
        },
        {
          title: '原始地质储量（百万桶）',
          dataIndex: '7',
          key: '7'
        }

      ],
      '2': [
        {
          title: '圈闭编号',
          dataIndex: '1',
          key: '1'
        },
        {
          title: '圈闭类型',
          dataIndex: '2',
          key: '2'
        },
        {
          title: '风险前资源量(百万桶)',
          dataIndex: '3',
          key: '3'
        },
        {
          title: '风险系数',
          dataIndex: '4',
          key: '4'
        },
        {
          title: '风险后资源量（百万桶）',
          dataIndex: '5',
          key: '5'
        },
        {
          title: '原油收缩系数',
          dataIndex: '6',
          key: '6'
        },
        {
          title: '勘探成功率（%）',
          dataIndex: '7',
          key: '7'
        }

      ],
      '3': [
        {
          title: 'X区块',
          dataIndex: '1',
          key: '1'
        },
        {
          title: '层位',
          dataIndex: '2',
          key: '2'
        },
        {
          title: '风险前资源量(高、中、低)',
          dataIndex: '3',
          key: '3',
          children: [
            {
              title: 'p10',
              dataIndex: '3.1',
              key: '3.1'
            },
            {
              title: 'p10',
              dataIndex: '3.2',
              key: '3.2'
            },
            {
              title: 'p90',
              dataIndex: '3.3',
              key: '3.3'
            }
          ]
        },
        {
          title: '地质成功率',
          dataIndex: '4',
          key: '4'
        },
        {
          title: '风险前资源量(高、中、低)',
          dataIndex: '5',
          key: '5',
          children: [
            {
              title: 'p10',
              dataIndex: '5.1',
              key: '5.1'
            },
            {
              title: 'p10',
              dataIndex: '5.2',
              key: '5.2'
            },
            {
              title: 'p90',
              dataIndex: '5.3',
              key: '5.3'
            }
          ]
        },
        {
          title: '主要风险',
          dataIndex: '6',
          key: '6'
        },
        {
          title: '圈闭优选排序',
          dataIndex: '7',
          key: '7'
        }

      ],
      '4': [
        {
          title: '方案',
          dataIndex: '1',
          key: '1'
        },
        {
          title: '地质储量',
          dataIndex: '2',
          key: '2',
          children: [
            {
              title: '原始地质储量（百万桶）',
              dataIndex: '2.1',
              key: '2.1'
            },
            {
              title: '动用程度',
              dataIndex: '2.2',
              key: '2.2'
            }
          ]
        },
        {
          title: '滚动勘探',
          dataIndex: '3',
          key: '3',
          children: [
            {
              title: '风险后资源量（百万桶）',
              dataIndex: '3.1',
              key: '3.1'
            },
            {
              title: '动用程度',
              dataIndex: '3.2',
              key: '3.2'
            }
          ]
        },
        {
          title: '圈闭优选',
          dataIndex: '4',
          key: '4',
          children: [
            {
              title: '风险后资源量（百万桶）',
              dataIndex: '4.1',
              key: '4.1'
            },
            {
              title: '动用程度',
              dataIndex: '4.2',
              key: '4.2'
            }
          ]
        },
        {
          title: '合计',
          dataIndex: '5',
          key: '5'
        }

      ]
    },
    2: {
      '1': [
        {
          title: '油田名称',
          dataIndex: '1',
          key: '1',
        },
        {
          title: '总井数（口）',
          dataIndex: '2',
          key: '2'
        },
        {
          title: '采油井数（口）',
          dataIndex: '3',
          key: '3'
        },
        {
          title: '采气井数（口）',
          dataIndex: '4',
          key: '4'
        },
        {
          title: '注水井数（口）',
          dataIndex: '5',
          key: '5'
        },
        {
          title: '注气井数（口）',
          dataIndex: '6',
          key: '6'
        },
        {
          title: '报废井数（口）',
          dataIndex: '7',
          key: '7'
        },
        {
          title: '油井开井数（口）',
          dataIndex: '8',
          key: '8'
        },
        {
          title: '气井开井数（口）',
          dataIndex: '9',
          key: '9'
        },
        {
          title: '注入井开井数（口）',
          dataIndex: '10',
          key: '10'
        },
        {
          title: '日产油（吨/天）',
          dataIndex: '11',
          key: '11'
        },
        {
          title: '日产水（方/天）',
          dataIndex: '12',
          key: '12'
        },
        {
          title: '日产气（万方/天）',
          dataIndex: '13',
          key: '13'
        },
        {
          title: '累计产油（万吨）',
          dataIndex: '14',
          key: '14'
        },
        {
          title: '累计产气（亿方）',
          dataIndex: '15',
          key: '15'
        },
        {
          title: '累计产水（万方）',
          dataIndex: '16',
          key: '16'
        },
        {
          title: '注入井数（口）',
          dataIndex: '17',
          key: '17'
        },
        {
          title: '日注入量（方/天）',
          dataIndex: '18',
          key: '18'
        },
        {
          title: '累计注入量（万方）',
          dataIndex: '19',
          key: '19'
        },
        {
          title: '累计注采比',
          dataIndex: '20',
          key: '20'
        },
        {
          title: '综合含水率（%）',
          dataIndex: '21',
          key: '21'
        },
        {
          title: '生产气油比（方/吨）',
          dataIndex: '22',
          key: '22'
        },
        {
          title: '采油速度（%）',
          dataIndex: '23',
          key: '23'
        },
        {
          title: '采气速度（%）',
          dataIndex: '24',
          key: '24'
        },
        {
          title: '采出程度（%）',
          dataIndex: '25',
          key: '25'
        },
        {
          title: '生产方式',
          dataIndex: '26',
          key: '26'
        }

      ],
      '2': [
        {
          title: '方案名称',
          dataIndex: '1',
          key: '1'
        },
        {
          title: '动用地质储量（万吨、亿方）',
          dataIndex: '2',
          key: '2'
        },
        {
          title: '动用地质资源量（万吨、亿方）',
          dataIndex: '3',
          key: '3'
        },
        {
          title: '动用地质储量、资源量（万吨、亿方）',
          dataIndex: '4',
          key: '4'
        },
        {
          title: '可采储量（万吨、亿方）',
          dataIndex: '5',
          key: '5'
        },
        {
          title: '可采资源量（万吨、亿方）',
          dataIndex: '6',
          key: '6'
        },
        {
          title: '可采储量、资源量（万吨、亿方）',
          dataIndex: '7',
          key: '7'
        },
        {
          title: '高峰产量（万吨/年、亿方/年）',
          dataIndex: '8',
          key: '8'
        },
        {
          title: '采油气速度（%）',
          dataIndex: '9',
          key: '9'
        },
        {
          title: '稳产时间（年）',
          dataIndex: '10',
          key: '10'
        },
        {
          title: '合同期末累计产油（万吨）',
          dataIndex: '11',
          key: '11'
        },
        {
          title: '合同期末累计产气（亿方）',
          dataIndex: '12',
          key: '12'
        },
        {
          title: '合同期末累计产凝析油（万吨）',
          dataIndex: '13',
          key: '13'
        },
        {
          title: '合同期末地质储量采出程度',
          dataIndex: '14',
          key: '14'
        },
        {
          title: '评价井数（口）',
          dataIndex: '15',
          key: '15'
        },
        {
          title: '采油井数（口）',
          dataIndex: '16',
          key: '16'
        },
        {
          title: '采气井数（口）',
          dataIndex: '17',
          key: '17'
        },
        {
          title: '注入井数（口）',
          dataIndex: '18',
          key: '18'
        },
        {
          title: '措施井井数（口）',
          dataIndex: '19',
          key: '19'
        }
      ],
      '3': [
        {
          title: '方案名称',
          dataIndex: '1',
          key: '1'
        },
        {
          title: '地层岩性',
          dataIndex: '2',
          key: '2'
        },
        {
          title: '地层压力（MPA）',
          dataIndex: '3',
          key: '3'
        },
        {
          title: '地层温度',
          dataIndex: '4',
          key: '4'
        },
        {
          title: '单井配产（高峰）',
          dataIndex: '5',
          key: '5'
        },
        {
          title: '油-粘度（MPA.S）',
          dataIndex: '6',
          key: '6'
        },
        {
          title: '油-API（°）',
          dataIndex: '7',
          key: '7'
        },
        {
          title: '气-H2S（%）',
          dataIndex: '8',
          key: '8'
        },
        {
          title: '气-CO2（%）',
          dataIndex: '9',
          key: '9'
        },
        {
          title: '平均井深（米）',
          dataIndex: '10',
          key: '10'
        }
      ]
    },
    3: {
      '1': [
        {
          title: '钻井',
          dataIndex: '1',
          key: '1',
          children: [
            {
              title: '投资（MM$）',
              dataIndex: '1.1',
              key: '1.1'
            },
            {
              title: '米成本 （$/M）',
              dataIndex: '1.2',
              key: '1.2'
            }
          ]
        },
        {
          title: '采油',
          dataIndex: '2',
          key: '2',
          children: [
            {
              title: '投资（MM$）',
              dataIndex: '2.1',
              key: '2.1'
            },
            {
              title: '单井（MM$/口）油井、注水井、气井',
              dataIndex: '2.2',
              key: '2.2'
            }
          ]
        },
        {
          title: '地面',
          dataIndex: '3',
          key: '3',
          children: [
            {
              title: '投资（MM$）',
              dataIndex: '3.1',
              key: '3.1'
            },
            {
              title: 'CPF油/气',
              dataIndex: '3.2',
              key: '3.2'
            },
            {
              title: '集输单井（MM$/口）油、注水、气',
              dataIndex: '3.3',
              key: '3.3'
            }
          ]
        },
        {
          title: '总投资',
          dataIndex: '4',
          key: '4',
          children: [
            {
              title: '总投资（MM$）',
              dataIndex: '4.1',
              key: '4.1'
            },
            {
              title: '百万吨产能投资/十亿方产能投资',
              dataIndex: '4.2',
              key: '4.2'
            },
            {
              title: '钻采比例',
              dataIndex: '4.3',
              key: '4.3'
            },
            {
              title: 'dim比例',
              dataIndex: '4.4',
              key: '4.4'
            }
          ]
        }
      ]

    },
    4: {
      '1': [
        {
          title: '序号',
          dataIndex: '1',
          key: '1'
        },
        {
          title: '项目',
          dataIndex: '2',
          key: '2'
        },
        {
          title: '合计',
          dataIndex: '3',
          key: '3'
        },
        {
          title: '计算期',
          dataIndex: '4',
          key: '4',
          children: [
            {
              title: '1',
              dataIndex: '1',
              key: '1'
            },
            {
              title: '2',
              dataIndex: '1.2',
              key: '1.2'
            },
            {
              title: '3',
              dataIndex: '1.3',
              key: '1.3'
            }
          ]
        }
      ],
      '2': [
        {
          title: '序号',
          dataIndex: '1',
          key: '1'
        },
        {
          title: '项目',
          dataIndex: '2',
          key: '2'
        },
        {
          title: '合计',
          dataIndex: '3',
          key: '3'
        },
        {
          title: '计算期',
          dataIndex: '4',
          key: '4',
          children: [
            {
              title: '1',
              dataIndex: '1',
              key: '1'
            },
            {
              title: '2',
              dataIndex: '1.2',
              key: '1.2'
            },
            {
              title: '3',
              dataIndex: '1.3',
              key: '1.3'
            }
          ]
        }
      ],
      '3': [
        {
          title: '序号',
          dataIndex: '1',
          key: '1'
        },
        {
          title: '项目',
          dataIndex: '2',
          key: '2'
        },
        {
          title: '合计',
          dataIndex: '3',
          key: '3'
        },
        {
          title: '计算期',
          dataIndex: '4',
          key: '4',
          children: [
            {
              title: '1',
              dataIndex: '1',
              key: '1'
            },
            {
              title: '2',
              dataIndex: '1.2',
              key: '1.2'
            },
            {
              title: '3',
              dataIndex: '1.3',
              key: '1.3'
            }
          ]
        }
      ],
      '4': [
        {
          title: '序号',
          dataIndex: '1',
          key: '1'
        },
        {
          title: '项目',
          dataIndex: '2',
          key: '2'
        },
        {
          title: '合计',
          dataIndex: '3',
          key: '3'
        },
        {
          title: '计算期',
          dataIndex: '4',
          key: '4',
          children: [
            {
              title: '1',
              dataIndex: '1',
              key: '1'
            },
            {
              title: '2',
              dataIndex: '1.2',
              key: '1.2'
            },
            {
              title: '3',
              dataIndex: '1.3',
              key: '1.3'
            }
          ]
        }
      ],
    }
  };
  const { id = 1, tabId = '1' } = req.query;
  return res.json(obj[id][tabId]);
}

function getTabList(req, res) {
  const obj = {
    1: {
      1: '1.1油（气）田地质储量复算表 ',
      2: '1.2油（气）田滚动勘探潜力圈闭资源量估算表 ',
      3: '1.3项目资源量及圈闭优选排队表',
      4: '1.4资源评价汇总表'
    },

    2: {
      1: '1.1项目油（气）田开发数据表',
      2: '1.2项目油（气）田产量剖面主要开发指标及对应工作量数据表',
      3: '1.3项目开发专业其它参数汇总表'
    },
    3: {
      1: '1.1工程投资汇总表'
    },
    4: {
      1: '1.1矿费税收合同-中国石油利润表（百万美元）',
      2: '1.2产品分成合同-中国石油利润表（百万美元）',
      3: '1.3技术服务合同-中国石油利润表（百万美元）',
      4: '1.4回购合同-中国石油利润表（百万美元',
      5:'矿费税收合同-中国石油现金流量表（百万美元）',
      6:'产品分成合同-中国石油现金流量表（百万美元）',
      7:'技术服务合同-中国石油现金流量表（百万美元）',
      8:'回购合同-中国石油现金流量表（百万美元）',
      9:'矿费税收合同-中国石油现金流量表（百万美元）',
      10:'产品分成合同-中国石油利润表（百万美元）– 勘探类',
      11:'技术服务合同-中国石油利润表（百万美元）– 勘探类',
      12:'回购合同-中国石油利润表（百万美元）– 勘探类',
      13:'矿费税收合同-中国石油现金流量表（百万美元）– 勘探类',
      14:'产品分成合同-中国石油现金流量表（百万美元）– 勘探类',
      15:'技术服务合同-中国石油现金流量表（百万美元）– 勘探类',
      16:'回购合同-中国石油现金流量表（百万美元）– 勘探类',
      17:'敏感性分析 – 勘探类',
      18:'主要技术经济指标汇总表 – 勘探类',
    }

  };
  const { id = 1 } = req.query;
  return res.json(obj[id]);
}

export default {
  'GET /api/queryTableList': getTableList,
  'GET /api/queryTabList': getTabList

};
