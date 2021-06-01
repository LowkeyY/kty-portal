/**
 * @author Lowkey
 * @date 2021/01/15 13:27:43
 * @Description: 项目默认初始化数据
 */
import { rules } from '@/utils/prompt'; //自定义校验规则

export const createFormData = [
  {
    name: 'xmmc',
    label: '项目名称',
    rules:   {
      required: true,
    }
  },
  {
    name: 'kspjsj',
    label: '开始评价时间',
    formType: 'datePicker',
    rules:   {
      required: true,
    }
  },
  {
    name: 'jzpjsj',
    label: '截止评价时间',
    formType: 'datePicker',
    rules:   {
      required: true,
    }
  },
  {
    name: 'pjsjbz',
    label: '评价时间备注',
    formType: 'textArea',
    rules: ''
  },
  {
    name: 'ssqk',
    label: '所属区块',
    formType: 'addSelect',
  },
  {
    name: 'ssyt',
    label: '所属油田',
    formType: 'addSelect',
  },
  {
    name: 'szwz',
    label: '所在位置',
    rules: ''
  },
  {
    name: 'cyzy',
    label: '项目流程',
    formType: 'checkbox',
    rules:   {
      required: true,
    },
    editHide: true
  },
  {
    name: 'pdmx',
    label: '盆地名称',
    rules: ''
  },
  {
    name: 'pdlx',
    label: '盆地类型',
    rules: ''
  },
  {
    name: 'mianji',
    label: '面积',
    suffix: 'km²',
    rules: '',
    width: 100
  },
  {
    name: 'tlx',
    label: '烃类型',
    rules: ''
  },
  {
    name: 'zyz',
    label: '作业者',
    rules: ''
  },
  {
    name: 'chuceng',
    label: '储层',
    rules: ''
  },
  {
    name: 'fxsj',
    label: '发现时间',
    formType: 'datePicker',
    rules: ''
  },
  {
    name: 'fxsjbz',
    label: '发现时间备注',
    formType: 'textArea',
    rules: ''
  },
  {
    name: 'fxjcl',
    label: '发现井产量',
    suffix: '桶/日',
    rules: '',
    width: 100
  },
  {
    name: 'fxjclbz',
    label: '发现井产量备注',
    formType: 'textArea',
    rules: ''
  },
  {
    name: 'tcsj',
    label: '投产时间',
    formType: 'datePicker',
    rules: ''
  },
  {
    name: 'tcsjbz',
    label: '投产时间备注',
    formType: 'textArea',
    rules: ''
  },
  {
    name: 'yzjs',
    label: '已钻井数',
    suffix: '口',
    width: 100,
    rules: ''
  },
  {
    name: 'yzjsbz',
    label: '已钻井备注',
    formType: 'textArea',
    rules: ''
  },
  {
    name: 'tjhpjj',
    label: '探井和评价井',
    suffix: '口',
    width: 100,
    rules: ''
  },
  {
    name: 'tjhpjjbz',
    label: '探井和评价井备注',
    formType: 'textArea',
    rules: ''
  },
  {
    name: 'scjs',
    label: '生产井数',
    suffix: '口',
    width: 100,
    rules: ''
  },
  {
    name: 'scjsbz',
    label: '生产井数备注',
    formType: 'textArea',
    rules: ''
  },
  {
    name: 'zrjs',
    label: '注入井数',
    suffix: '口',
    rules: '',
    width: 100
  },
  {
    name: 'zrjbz',
    label: '注入井数备注',
    formType: 'textArea',
    rules: ''
  },
  {
    name: 'kfjd',
    label: '开发阶段',
    suffix: '口',
    rules: '',
    width: 100
  },
  {
    name: 'zdsh',
    label: '最大水深',
    suffix: 'm',
    rules: '',
    width: 100
  },
  {
    name: 'zxsj',
    label: '最小水深',
    suffix: 'm',
    width: 100,
    rules: ''
  },
  {
    name: 'sjzb',
    label: '水深备注',
    formType: 'textArea',
    rules: ''
  }
];
