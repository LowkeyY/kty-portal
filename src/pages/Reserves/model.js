import {
  queryResult,
  create,
  update,
  queryConf,
  deleteItem,
  queryList
} from './service';
import { tips } from '@/utils/prompt';
import { message } from 'antd';

const Model = {
  namespace: 'reserves',
  state: {
    data:[],
    result: [],
    conf: {}
  },
  effects: {
    * fetchList({ payload, callback }, { call, put }) {
      const { success, data, message: msg } = yield call(queryList, payload);
      if (success) {
        yield put({
          type: 'save',
          payload: {
            data:data.data
          }
        });
        if (callback) callback();
      } else {
        message.error(msg);
      }
    },
    * fetchResult({ payload, callback }, { call, put }) {
      const { success, data, message: msg } = yield call(queryResult, payload);
      if (success) {
        yield put({
          type: 'save',
          payload: {
            result: data,
          }
        });
        if (callback) callback();
      } else {
        message.error(msg);
      }
    },
    * update({ payload, callback }, { call, put }) {
      const { xmbm } = payload;
      const { success, message: msg } = yield call(update, payload);
      if (success) {
        yield put({
          type: 'fetchList',
          payload: { xmbm }
        });
        message.success(tips.updateSuccess);
        if (callback) callback();
      } else {
        message.error(msg);
      }
    },

    * deleteItem({ payload, callback }, { call, put }) {
      const { xmbm } = payload;
      const { success, message: msg } = yield call(deleteItem, payload);
      if (success) {
        yield put({
          type: 'fetchList',
          payload: { xmbm }
        });
        message.success(tips.deleteSuccess);
        if (callback) callback();
      } else {
        message.error(msg);
      }
    },

    * create({ payload, callback }, { call, put }) {
      const { xmbm } = payload;
      const { success, message: msg } = yield call(create, payload);
      if (success) {
        yield put({
          type: 'fetchList',
          payload: { xmbm }
        });
        message.success(tips.createSuccess);
        if (callback) callback();
      } else {
        message.error(msg);
      }
    },

    * fetchConf({ payload, callback }, { call, put }) {
      const { success, data, message: msg } = yield call(queryConf, payload);
      if (success) {
        yield put({
          type: 'save',
          payload: {
            conf: data
          }
        });
        if (callback) callback(false);
      } else {
        message.error(msg);
      }
    }
  },
  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        ...payload
      };
    }
  }
};
export default Model;
