import React from 'react';
import { DefaultFooter } from '@ant-design/pro-layout'

export default () => (
  <DefaultFooter
    copyright="2021 北京集聚创新科技有限公司的"
    links={[
      {
        key: 'Ant Design Pro',
        title: '中国石油勘探研究院',
        href: 'https://pro.ant.design',
        blankTarget: true,
      },
      {
        key: 'Ant Design',
        title: '国际项目研究所',
        href: 'https://ant.design',
        blankTarget: true,
      },
    ]}
  />
);
