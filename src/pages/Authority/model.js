import { message } from 'antd';
import { queryRole, createRole, updateRole, deleteRole, queryMenu, saveAuthority } from './service';
import { tips } from '@/utils/prompt';


const namespace = 'authority';
export default {
  namespace,
  state: {
    menuData: [],
    roleData: []
  },

  effects: {
    * fetchMenu(_, { call, put }) {
      const { data, success, msg } = yield call(queryMenu);
      if (success) {
        yield put({
          type: 'save',
          payload: {
            menuData: data
          }
        });
      } else {
        message.error(msg);
      }
    },
    * fetchRole(_, { call, put }) {
      const { data, success, msg } = yield call(queryRole);
      if (success) {
        yield put({
          type: 'save',
          payload: {
            roleData: data.data
          }
        });
      } else {
        message.error(msg);
      }
    },
    * addRole({ payload, callback }, { call, put }) {
      const { success, msg } = yield call(createRole, payload);
      if (success) {
        yield put({ type: 'fetchRole' });
        message.success(tips.createSuccess);
        if (callback) callback();
      } else {
        message.error(msg || '创建失败');
      }
    },
    * updateRole({ payload, callback }, { call, put }) {
      const { success, msg } = yield call(updateRole, payload);
      if (success) {
        yield put({ type: 'fetchRole' });
        message.success(tips.updateSuccess);
        if (callback) callback();
      } else {
        message.error(msg || '修改失败');
      }
    },
    * deleteRole({ payload, callback }, { call, put }) {
      const { success, msg = '删除失败' } = yield call(deleteRole, payload);
      if (success) {
        yield put({ type: 'fetchRole' });
        message.success(tips.deleteSuccess);
        if (callback) callback();
      } else {
        message.error(msg);
      }
    },
    * saveAuthority({ payload }, { call, put }) {
      const { success, msg } = yield call(saveAuthority, payload);
      if (success) {
        message.success('保存成功');
      } else {
        message.error(msg || '请稍后再试');
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
        roleData: []
      };
    }
  }
};
