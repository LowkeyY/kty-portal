

const getDept = () => {
  return  [
    {
      deptName: '国际项目部',
      deptId: '1',
      children: [
        {
          deptName: '美洲项目部',
          deptId: '1.1',
        },
        {
          deptName: '亚洲项目部',
          deptId: '1.2',
        },
      ],
    },
    {
      deptName: '财务部',
      deptId: '2',
      children: [
        {
          deptName: '财务部1',
          deptId: '2.1',
        },
        {
          deptName: '财务部2',
          deptId: '2.2',
        },
      ],
    },
  ];
};
const getUser = () => {
  return  {"data":{"data":[{"deptId":"1","menuId":"7e25c175-707d-4ffa-8226-58e95229c09c,b3b45878-b994-48fa-a735-17efd9a5f40d,36ca9d46-2834-475f-b37e-6f6da1731905,2","photoPath":"cnvfile/feedback/0ca37a80-4d54-484c-9107-ef3148ecb811.jpg","userEmail":"222","userId":1,"userMenuList":[{"menuId":"7e25c175-707d-4ffa-8226-58e95229c09c","userId":"1"},{"menuId":"b3b45878-b994-48fa-a735-17efd9a5f40d","userId":"1"},{"menuId":"36ca9d46-2834-475f-b37e-6f6da1731905","userId":"1"},{"menuId":"2","userId":"1"}],"userName":"wsy","userPhone":"131234","userPwd":"47bce5c74f589f4867dbd57e9ca9f808","userRealName":"王硕扬","userSex":"0"},{"deptId":"1","menuId":"","photoPath":"cnvfile/feedback/2500693d-8cbf-40f2-85fa-9cf5f4a3129a.png","userAge":22,"userEmail":"123123","userId":2,"userMenuList":[],"userName":"zff","userPhone":"1234123","userPwd":"d41d8cd98f00b204e9800998ecf8427e","userRealName":"张菲菲","userSex":"1"},{"deptId":"1","menuId":"","photoPath":"","userEmail":"","userId":8,"userMenuList":[],"userName":"1111","userPhone":"1231313231","userPwd":"d41d8cd98f00b204e9800998ecf8427e","userRealName":"1111","userSex":"0"}],"nowPage":1,"pageSize":10,"totalCount":3},"msg":"OK","oK":true,"status":200,"success":true}
};

const getMenu = () => {
  return  [
    {
      name: '评价项目',
      path: '/project',
      icon: 'project',
      routes: [
        {
          name: '项目详情',
          path: '/project/projectDetails',
          component: './ProjectDetails',
          hideInMenu: true,
        },
        {
          name: '生成报告',
          path: '/project/resultTable',
          component: './ResultTable',
          hideInMenu: true,
        },
      ],
    },
    {
      name: '勘探评价',
      icon: 'project',
      path: '/explorationEvaluation',
      routes: [
        {
          name: '资源量评价',
          path: '/explorationEvaluation/probability',
          component: './Probability',
        },
        {
          name: '储量评价',
          path: '/explorationEvaluation/reserves',
          component: './Reserves',
        },
      ],
    },
    {
      name: '油藏开发',
      icon: 'project',
      path: '/optimization',
      routes: [
        {
          name: '油藏方案设计及优化模块',
          path: '/optimization/reservoir',
          component: './ProjectDetails',
        },
        {
          name: '产能评估方法和计算工具',
          path: '/optimization/capacity ',
          component: './ProjectDetails',
        },
        {
          name: '开发类新项目指标优选',
          path: '/optimization/development',
          component: './ProjectDetails',
        },
      ],
    },
    {
      name: '投资评估',
      icon: 'project',
      path: 'investment',
      routes: [
        {
          name: '投资和成本数据管理模块',
          path: '/investment/module',
          component: './ProjectDetails',
        },
      ],
    },
    {
      name: '经济评价',
      icon: 'project',
      path: 'economics',
      routes: [
        {
          name: '经济评价模块',
          path: '/economics/module',
          component: './ProjectDetails',
        },
        {
          name: '经济评价模型模块',
          path: '/utils/economics ',
          component: './ProjectDetails',
        },
      ],
    },
    {
      name: '其他模块',
      icon: 'appstore',
      path: '/utils',
      routes: [
        {
          name: '历史新项目信息管理模块',
          path: '/utils/history',
          component: './ProjectDetails',
        },
        {
          name: '中小油公司数据库模块',
          path: '/utils/companys',
          component: './ProjectDetails',
        },
      ],
    },
    {
      name: '系统管理',
      icon: 'tags',
      path: 'system',
      routes: [
        {
          name: '菜单管理',
          path: '/system/menu',
          component: './Menu',
        },
        {
          name: '用户管理',
          path: '/system/organizational',
          component: './Organizational',
        },
        {
          name: '权限管理',
          path: '/system/authority',
          component: './Authority',
        },
      ]
    },
  ];
};
export default {
  // 支持值为 Object 和 Array
  'GET  /api/queryDept': getDept(),
  'GET  /api/queryMenu': getMenu(),
  'GET  /api/queryUser': getUser()
};
