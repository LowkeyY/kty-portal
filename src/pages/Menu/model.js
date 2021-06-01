import { message } from 'antd';
import { tips } from '@/utils/prompt';
import { queryMenu, addMenu, updateMenu, deleteMenu, queryItemMenu } from './service';

const namespace = 'menuManage',
  getTreeData = (data) => {
    const arr = [];
    data.map(item => {
      arr.push({
        title: item.menuName,
        key: item.menuId.toString()
      });
    });
    return arr;
  };
export default {
  namespace,
  state: {
    menuData: [],
    itemDate: {},
    selectedKey: ''
  },

  effects: {
    * fetchMenu({ payload }, { call, put }) {
      const { data, success, msg } = yield call(queryMenu, payload);
      if (success) {
        yield put({
          type: 'save',
          payload: {
            menuData: getTreeData(data)
          }
        });
      } else {
        message.error(msg || '查询失败');
      }
    },
    * fetchChildren({ payload, callback }, { call, put }) {
      const { success, data, msg } = yield call(queryMenu, payload);
      if (success) {
        if (callback) callback(getTreeData(data));
      } else {
        message.error(msg || '查询失败');
      }
    },
    * addMenu({ payload, callback }, { call, put }) {
      const { success, msg } = yield call(addMenu, payload);
      if (success) {
        yield put({ type: 'fetchMenu' });
        message.success(tips.createSuccess);
        if (callback) callback();
      } else {
        message.error(msg || '创建失败');
      }
    },
    * updateMenu({ payload, callback }, { call, put }) {
      const { success, msg } = yield call(updateMenu, payload);
      if (success) {
        yield put({ type: 'fetchMenu' });
        message.success(tips.updateSuccess);
        if (callback) callback();
      } else {
        message.error(msg || '修改失败');
      }
    },
    * deleteMenu({ payload, callback }, { call, put }) {
      const { success, msg = '删除失败' } = yield call(deleteMenu, payload);
      if (success) {
        yield put({ type: 'fetchMenu' });
        yield put({ type: 'save', payload: { selectedKey: '' } });
        message.success(tips.deleteSuccess);
        if (callback) callback();
      } else {
        message.error(msg);
      }
    },
    * queryItemMenu({ payload, callback }, { call, put }) {
      const { success, msg, data } = yield call(queryItemMenu, payload);
      if (success) {
        yield put({
          type: 'save',
          payload: {
            itemDate: data
          }
        });
        if (callback) callback(data);
      } else {
        message.error(msg || '修改失败');
      }
    }
  },

  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
    clear(state) {
      return {
        ...state,
        menuData: [],
        itemDate: {},
        selectedKey: ''
      };
    }
  }
};
