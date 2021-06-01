function trapDate(count = 5) {
  const data = [];
  for (let i = 0; i < count; i += 1) {
    data.push({
      id: `fake-list-${i + 1}`,
      storey: `K${i + 1}`,
      number: i,
      storeyName: 'III类油圈闭',
      storeyType: ['远景圈闭', '潜在圈闭', '证实圈闭'][i % 3],
      resourceType: ['远景资源量', '潜在资源量'][i % 2],
      hydrocarbonType: ['油', '气'][i % 2],
      geologicalHorizon: ['J', 'P', 'T', 'J3'][i % 3],
      trapType: ['背斜', '超不整合', '沉积尖灭', 'J3'][i % 4],
      trapArea: Math.ceil(Math.random() * 1000),
      closure: Math.ceil(Math.random() * 1000),
      depth: Math.ceil(Math.random() * 1000),
      formationPeriod: "白垩纪",
      longitude: Math.ceil(Math.random() * 100),
      latitude: Math.ceil(Math.random() * 100),
      reliability: ['可靠', '较可靠', '较可靠'][i % 3],
      discoveryTime: new Date().getTime(),
      createDate: new Date().getTime(),
      lastModified: new Date().getTime(),
      dataSource: '测试数据',
      turn: `00${i + 1}`
    });
  }

  return data;
}

function getProbabilityList(req, res) {
  const obj = {
    trapDate: trapDate(),
    storeyDate: [],
    storeyResult: [],
    result: []
  };
  const { id = 'trapDate' } = req.query;
  return res.json(obj[id]);
}

export default {
  'GET /api/queryProbabilityList': getProbabilityList
};
