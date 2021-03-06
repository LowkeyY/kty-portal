﻿﻿export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        path: '/user',
        routes: [
          {
            name: '登录',
            path: '/user/login',
            component: './user/login',
          },
        ],
      },
    ],
  },
  {
    path: '/',
    redirect: '/dashboard',
  },
  {
    name: '首页',
    path: '/dashboard',
    component: './Dashboard',
    icon: 'home'
  },
  {
    path: '/createProject',
    component: './CreateProject',
    hideInMenu: true
  },
  {
    name: '评价项目',
    path: '/project',
    icon: 'project',
    routes: [
      {
        path: '/project',
        component: './Project',
      },
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
    name: '综合地质评价',
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
    name: '油气藏工程评价',
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
        path: '/optimization/capacity',
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
    name: '钻采地面工程评价',
    icon: 'project',
    path: '/404',
  },
  {
    name: '投资评估',
    icon: 'project',
    path: '/investment',
    routes: [
      {
        name: '投资和成本数据管理模块',
        path: '/investment/module',
        component: './ProjectDetails',
      },
      {
        path: '/investment/system',
        component: './VueApp',
      },
    ],
  },
  {
    name: '经济评价',
    icon: 'project',
    path: '/economics',
    routes: [
      {
        name: '经济评价模块',
        path: '/economics/module',
        component: './ProjectDetails',
      },
      {
        name: '经济评价模型模块',
        path: '/utils/economics',
        component: './ProjectDetails',
      },
    ],
  },
  {
    name: '其他模块',
    icon: '/appstore',
    path: '/utils',
    routes: [
      {
        name: '历史新项目信息管理模块',
        path: '/utils/history',
        component: './Test',
      },
      {
        name: '中小油公司数据库模块',
        path: '/utils/companys',
        component: './RemoteDesktop',
      },
    ],
  },
  {
    path: '/remoteDesktop',
    component: './RemoteDesktop',
    hideInMenu: true,
  },
  {
    name: '系统管理',
    icon: 'tags',
    path: '/system',
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
      {
        name: '专业管理',
        path: '/system/major',
        component: './Major',
      },
    ]
  },
  {
    component: './404',
  },
];
