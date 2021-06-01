import { message } from 'antd';
import { tips } from '@/utils/prompt';
import {
  queryDept,
  addDept,
  updateDept,
  dvalidate,
  deleteDept,
  queryItemDept,
  queryUser,
  addUser,
  updateUser,
  deleteUser,
  resetPassword
} from './service';
import { upLoadFiles } from '@/services/user';

const defaultPagination = {
    totalCount: 0,
    nowPage: 1,
    pageSize: 10
  },

  getTreeData = (data) => {
    const arr = [];
    data.map(item => {
      arr.push({
        title: item.deptName,
        key: item.deptId.toString(),
      });
    });
    return arr;
  };

const getList = arr => {
  const result = [];
  if (!arr) {
    return undefined;
  }
  arr.map((item, i) => {
    result.push({
      ...item,
      key: i + 1
    });
  });
  return result;
};
const namespace = 'organizational';
export default {
  namespace,
  state: {
    treeData: [],
    userData: [],
    itemDate: {},
    pagination: defaultPagination,
    selectedKey: '',
    photoPath: null
  },

  effects: {
    * fetchDept({ payload }, { call, put }) {
      const { data, success, message: msg } = yield call(queryDept, payload);
      if (success) {
        yield put({
          type: 'save',
          payload: {
            treeData: getTreeData(data.data)
          }
        });
      } else {
        message.error(msg);
      }
    },
    * fetchChildren({ payload, callback }, { call, put }) {
      const { success, data, msg } = yield call(queryDept, payload);
      if (success) {
        if (callback) callback(getTreeData(data.data));
      } else {
        message.error(msg || '查询失败');
      }
    },
    * addDept({ payload, callback }, { call, put }) {
      const { success, msg } = yield call(addDept, payload);
      if (success) {
        yield put({ type: 'fetchDept' });
        message.success(tips.createSuccess);
        if (callback) callback();
      } else {
        message.error(msg || '创建失败');
      }
    },
    * updateDept({ payload, callback }, { call, put }) {
      const { success, msg } = yield call(updateDept, payload);
      if (success) {
        yield put({ type: 'fetchDept' });
        message.success(tips.updateSuccess);
        if (callback) callback();
      } else {
        message.error(msg || '修改失败');
      }
    },
    * dvalidate({ payload, callback }, { call, put }) {
      const { success, msg, data } = yield call(dvalidate, payload);
      if (success) {
        if (data.canDelete) {
          yield put({ type: 'deleteDept', payload });
        } else {
          message.error(msg, 3);
        }

      } else {
        message.error(msg || '删除失败');
      }
    },
    * deleteDept({ payload, callback }, { call, put }) {
      const { success, msg } = yield call(deleteDept, payload);
      if (success) {
        yield put({ type: 'fetchDept' });
        message.success('删除成功');
        if (callback) callback();
      } else {
        message.error(msg || '删除失败');
      }
    },
    * queryItemDept({ payload, callback }, { call, put }) {
      const { success, msg, data } = yield call(queryItemDept, payload);
      if (success) {
        yield put({
          type: 'save',
          payload: {
            itemDate: data
          }
        });
        if (callback) callback();
      } else {
        message.error(msg || '查询失败');
      }
    },
    * queryUser({ payload }, { call, put }) {
      const { success, data, msg } = yield call(queryUser, payload);
      if (success) {
        yield put({
          type: 'save',
          payload: {
            userData: getList(data.data),
            pagination: {
              totalCount: data.totalCount,
              nowPage: data.nowPage,
              pageSize: data.pageSize
            }
          }
        });
      } else {
        message.error(msg || '请稍后再试');
      }
    },
    * addUser({ payload, callback }, { call, put, select }) {
      const { selectedKey, pagination: { nowPage, pageSize } } = yield select(_ => _[namespace]);
      const { success, msg } = yield call(addUser, payload);
      if (success) {
        yield put({ type: 'queryUser', payload: { nowPage, pageSize, deptId: selectedKey } });
        message.success(tips.createSuccess);
        if (callback) callback();
      } else {
        message.error(msg || '创建失败');
      }
    },
    * updateUser({ payload, callback }, { call, put, select }) {
      const { selectedKey, pagination: { nowPage, pageSize } } = yield select(_ => _[namespace]);
      const { success, msg } = yield call(updateUser, payload);
      if (success) {
        yield put({ type: 'queryUser', payload: { nowPage, pageSize, deptId: selectedKey } });
        message.success(tips.updateSuccess);
        if (callback) callback();
      } else {
        message.error(msg);
      }
    },
    * deleteUser({ payload, callback }, { call, put, select }) {
      const { selectedKey, pagination: { nowPage, pageSize } } = yield select(_ => _[namespace]);
      const { success, msg } = yield call(deleteUser, payload);
      if (success) {
        yield put({ type: 'queryUser', payload: { nowPage, pageSize, deptId: selectedKey } });
        message.success(tips.deleteSuccess);
        if (callback) callback();
      } else {
        message.error(msg);
      }
    },
    * uploadAvatar({ payload, callback }, { call, put }) {
      const { success, msg, data } = yield call(upLoadFiles, payload);
      if (success) {
        yield put({
          type: 'save',
          payload: {
            photoPath: data.path
          }
        });
      } else {
        message.error(msg || '修改失败');
      }
    },
    * resetPassword({ payload, callback }, { call, put }) {
      const { success, msg } = yield call(resetPassword, payload);
      if (success) {
        message.success(tips.updateSuccess);
        if (callback) callback();
      } else {
        message.error(msg || '修改失败');
      }
    },
  },

  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
    updatePagination(state, { payload }) {
      return { ...state, pagination: payload };
    },
    clear(state) {
      return {
        ...state,
        userData: [],
        selectedKey: ''
      };
    }
  }
};
