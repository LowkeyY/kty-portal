// eslint-disable-next-line import/no-extraneous-dependencies
import country from './data.json';

function getCountry(_, res) {
  return res.json(country);
}

const members = [
  {
    id: 1,
    name: '付小小',
    duty: '勘探评价',
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
  },
  {
    id: 2,
    name: '曲丽丽',
    duty: '油藏开发',
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
  },
  {
    id: 3,
    name: '曲丽丽',
    duty: '油藏开发',
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
  },
  {
    id: 4,
    name: '乐哥',
    duty: '投资评估',
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
  },
  {
    id: 5,
    name: '林东东',
    duty: '经济评价',
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
  },
  {
    id: 6,
    name: '朱偏右',
    duty: '经济评价',
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
  }
];

const tasks = [
  {
    id: 1,
    text: '勘探评价',
    status: 2,
    progress: 100,
    utils: [
      {
        name: '资源量评价',
        path:'/explorationEvaluation/probability'
      },
      {
        name: '储量评价',
        path:'/explorationEvaluation/reserves'
      }
    ],
    members: [
      {
        id: 1,
        name: '付小小'
      }
    ]
  },
  {
    id: 2,
    text: '油藏开发',
    status: 1,
    progress: 60,
    current: true,
    utils: [
      {
        name: '油藏方案设计及优化模块',
        clientId: '76c2ca53-2aea-4ccf-9109-303f316f2a70'
      },
      {
        name: '产能评估方法和计算工具',
        clientId: '76c2ca53-2aea-4ccf-9109-303f316f2a73'
      },
      {
        name: '开发类新项目指标优选',
        clientId: ''
      }
    ],
    members: [
      {
        id: 1,
        name: '曲丽丽'
      }
    ]
  },
  {
    id: 3,
    text: '投资评估',
    status: 0,
    progress: 0,
    utils: [
      {
        name: '投资和成本数据管理模块',
        clientId: '76c2ca53-2aea-4ccf-9109-303f316f2a74'
      }
    ],
    members: [
      {
        id: 1,
        name: '乐哥'
      }
    ]
  },
  {
    id: 4,
    text: '经济评价',
    status: 0,
    progress: 0,
    utils: [
      {
        name: '经济评价模块',
        clientId: ''
      }
    ],
    members: [
      {
        id: 1,
        name: '林东东'
      },
      {
        id: 2,
        name: '朱偏右'
      }
    ]
  }
];

const initialData = {
  XMMC: '伊朗KISH气田项目的初步评价',
  PJSJBZ: '',
  SSQK: ['KISH气田'],
  SSYT: ['波斯湾盆地'],
  SZWZ: '伊朗波斯湾水域的Kish岛',
  PDMX: '波斯湾盆地',
  PDLX: '前陆盆地',
  MIANJI: '150',
  TLX: '油气',
  ZYZ: '中方',
  CHUCENG: '碳酸盐岩储层,主力：Kangan、 U-Dalan;次要：Dalan-Nar Mb.、L-Dalan',
  FXSJ: '',
  FXJCL: '8',
  TCSJ: '',
  YZJS: '15',
  TJHPJJ: '10',
  SCJS: '6',
  ZRJS: '2',
  KFJD: '开发初期',
  ZDSH: '100',
  ZXSJ: '10',
  progress: 30
};

function documentsList(count) {
  const list = [];

  for (let i = 0; i < count; i += 1) {
    list.push({
      id: `fake-list-${i}`,
      title: ['CNPC Images', 'AQB4-2 Final Well Report', 'Farmdown_Presentation', 'B4_Arab_Compilation', 'QHD32-Fluids', '04_Surface_Facilites'][i % 5],
      type: ['pdf', 'word', 'xlsb', 'PNG', 'ppt'][i % 5],
      size: Math.random() * 100000,
      createDate: new Date(new Date().getTime() - 1000 * 60 * 60 * 2 * i).getTime()
    });
  }

  return list;
}

let sourceData = [];

function getFakeList(req, res) {
  const params = req.query;
  const count = params.count * 1 || 20;
  const result = documentsList(5);
  sourceData = result;
  return res.json(result);
}

export default {
  'GET  /api/fake_list': getFakeList,
  'GET  /api/fake_members': members,
  'GET  /api/fake_country': getCountry,
  'GET  /api/fake_task': tasks,
  'GET  /api/fake_values': initialData
};

