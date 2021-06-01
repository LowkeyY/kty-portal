/* eslint no-useless-escape:0 import/prefer-default-export:0 */
const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;

export const isUrl = (path: string): boolean => reg.test(path);

export const isAntDesignPro = (): boolean => {
  if (ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION === 'site') {
    return true;
  }
  return window.location.hostname === 'preview.pro.ant.design';
};

// 给官方演示站点用，用于关闭真实开发环境不需要使用的特性
export const isAntDesignProOrDev = (): boolean => {
  const {NODE_ENV} = process.env;
  if (NODE_ENV === 'development') {
    return true;
  }
  return isAntDesignPro();
};

export const statusStyle = {
  inProgress: '#2db7f5',
  completed: '#87d068',
  toStart: '#9e9d9d'
}

/***
 *
 * @param state
 */
export const renderState = (state: number) => {
  switch (Number(state)) {
    case 1 :
      return {
        color: '#fa8c16',
        text: '进行中'
      };
    case 2 :
      return {
        color: '#87d068',
        text: '已完成'
      };
    default :
      return {
        color: '#ff7572',
        text: '未开始'
      };
  }
};

/***
 * 均分数组
 * @param arr
 */
export const averArr = (arr: []) => {
  const length = arr.length;
  const length1 = Math.ceil(length / 2);
  const arr1: any[] = [];
  const arr2: any[] = [];
  for (let i = 0; i <= length1; i++) {
    arr1.push(arr[i]);
  }
  for (let i = length1; i < length - 1; i++) {
    arr2.push(arr[i + 1]);
  }
  return {
    front: arr1,
    last: arr2
  }
}

/***
 *获取元素在浏览器中的偏移坐标
 * @param ele
 */
export const offsetByBody = (ele: { offsetLeft: any; offsetTop: any; offsetParent: any; }) => {
  const obj: any = Object.create(null);
  obj.left = ele.offsetLeft;
  obj.top = ele.offsetTop;

  while (ele.offsetParent) {
    ele = ele.offsetParent;
    obj.left += ele.offsetLeft
    obj.top += ele.offsetTop
  }

  return obj
}

export const renderSize = (fileSize: number) => {
  let temp;
  if (fileSize < 1024) {
    return `${fileSize}B`;
  } else if (fileSize < (1024 * 1024)) {
    temp = (fileSize / 1024).toFixed(2);
    return `${temp}KB`;
  } else if (fileSize < (1024 * 1024 * 1024)) {
    temp = (fileSize / (1024 * 1024)).toFixed(2);
    return `${temp}MB`;
  }
  temp = (fileSize / (1024 * 1024 * 1024)).toFixed(2);
  return `${temp}GB`;
};

/**
 * 格式化创建项目参数
 * @param values
 */
export const formatCreateValues = (values: object) => {
  Object.keys(values).map(item => {
    if (item === 'kspjsj' || item === 'jzpjsj' || item === 'tcsj' || item === 'fxsj') {
      if (values[item]) {
        values[item] = values[item].format('YYYY-MM-DD');
      }
    }
    if (item === 'cyzy') {
      values[item] = values[item].join(',');
    }
  });
  return values;
};

export const formatStrObj = (values: str) => {
  try {
    return eval("(" + values + ")")
  } catch (e) {
    return '转换错误'
  }
};

/**
 *
 * @param obj
 */
export const setLocalStorage = (obj: object) => {
  Object.keys(obj).map(item => {
    localStorage.setItem(item, obj[item])
  })
};

export const getCurrentUser = (arr: string[]) => {
  const obj = {}
  arr.map((item: string) => {
    Object.assign(obj, {[item]: localStorage.getItem(item)})
  })
  return obj
};
