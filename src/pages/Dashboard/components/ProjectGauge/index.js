import React from 'react';
import { Pie } from '@ant-design/charts';

const DemoPie = () => {
  var data = [
    {
      type: '进行中',
      value: 4
    },
    {
      type: '已完成',
      value: 1
    }
  ];
  var config = {
    appendPadding: 10,
    data: data,
    angleField: 'value',
    colorField: 'type',
    radius: 1,
    innerRadius: 0.64,
    style: {
      width: '100%',
      height: 198
    },
    meta: {
      value: {
        formatter: function formatter(v) {
          return ''.concat(v, '');
        }
      }
    },
    label: {
      type: 'inner',
      offset: '-50%',
      style: { textAlign: 'center' },
      autoRotate: false,
      content: '{value}'
    },
    interactions: [
      { type: 'element-selected' },
      { type: 'element-active' },
      { type: 'pie-statistic-active' }
    ]
  };
  return <Pie {...config} />;
};
export default DemoPie;
