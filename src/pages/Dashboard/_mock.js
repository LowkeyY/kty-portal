
const projectsList = (count = 4) => {
  const data = [];
  for (let i = 0; i < count; i += 1) {
    data.push({
      id: `CNOBC-${Math.ceil(Math.random() * 1000)}`,
      title: ['美国Maverick盆地页岩油气资产项目', '卡塔尔4项目可研编制', '巴新珊瑚项目系统评价', '阿富汗AD油田中标项目'][i],
      current: {
        text: ['投资评估', '勘探评价', '资源评价'][i % 2],
        count: Math.ceil(Math.random() * 100)
      },
      progress: Math.ceil(Math.random() * 100),
      members: Math.ceil(Math.random() * 10),
      state: [1, 0, 3][i % 3],
      lock: [0, 1][i % 2],
      version: 'v1.0',
      leader: 'Justin',
      LeaderAvatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
    });
  }

  return data;
};

export default {
  // 支持值为 Object 和 Array
  'GET  /api/projects': projectsList(),
  'GET /api/notice': [
    {
      title: '国家统计局数据管理中心2020年公开招聘第二批拟聘用人员公示',
      date: '2020年11月3日'
    },
    {
      title: '国家统计局中国经济景气监测中心2020年公开招聘拟聘用人员公示',
      date: '2020年11月3日'
    },
    {
      title: '关于中国统计出版社有限公司企业负责人2019年度薪酬情况的通告',
      date: '2020年12月3日'
    },
    {
      title: '《农业及相关产业统计分类（2020）》（国家统计局令第32号）',
      date: '2020年12月3日'
    },
    {
      title: '2020年度国家统计局重大统计专项立项公示',
      date: '2020年12月3日'
    },
    {
      title: '关于中国统计出版社有限公司企业负责人2019年度薪酬情况的通告',
      date: '2020年12月3日'
    }
  ]
};
