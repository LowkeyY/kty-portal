// eslint-disable-next-line import/no-extraneous-dependencies

const leaders = [
  '付小小',
  '曲丽丽',
  '林东东',
  '周星星',
  '吴加好',
  '朱偏右',
  '鱼酱',
  '乐哥',
  '谭小仪',
  '仲尼'
];

function fakeList(count) {
  const list = [];

  for (let i = 0; i < count; i += 1) {
    list.push({
      key: `fake-list-${i}`,
      id: `fake-list-${i}`,
      title: `${i < 3 ? '伊朗KISH气田项目的初步评价' : `国际所项目${i}`}`,
      version: `${i < 3 ? `v1.${i}` : `v${[1.1, 1.2][i % 2]}`}`,
      status: [1, 2][i % 2],
      percent: Math.ceil(Math.random() * 50) + 50,
      endDate: new Date(new Date().getTime() - 1000 * 60 * 60 * 2 * i).getTime(),
      createDate: new Date(new Date().getTime() - 1000 * 60 * 60 * 2 * i).getTime(),
      leaders: leaders[i % 10],
      members: [2, 5, 6, 9, 4][i % 5]
    });
  }

  return list;
}

let sourceData = [];

function getFakeProject(req, res) {
  const params = req.query;
  const count = params.count * 1 || 20;
  const result = fakeList(count);
  sourceData = result;
  return res.json(result);
}

export default {
  'GET  /api/fake_Project': getFakeProject
};
