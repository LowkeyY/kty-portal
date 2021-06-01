import {
  queryMajor,
  queryModel,
  createMajor,
  deleteModel,
  queryModelType,
  createModel,
  updateModel,
  deleteMajor,
  updateMajor,
  createModelType,
  deleteModelType
} from './service';
import { tips } from '@/utils/prompt';
import { message } from 'antd';

const getModelType = (data) => {
  return data && data.map(item => ({
    value: item.lxbm,
    label: item.lxmc
  }));
};

const Model = {
  namespace: 'major',
  state: {
    list: [],
    majorInfo: {},
    modelType: []
  },
  effects: {
    * fetchList(_, { call, put }) {
      const { success, data, message: msg } = yield call(queryMajor);
      if (success) {
        yield put({
          type: 'save',
          payload: {
            list: data.data
          }
        });
      } else {
        message.error(msg);
      }
    },
    * fetchModelType(_, { call, put }) {
      const { success, data, message: msg } = yield call(queryModelType);
      if (success) {
        yield put({
          type: 'save',
          payload: {
            modelType: getModelType(data.data)
          }
        });
      } else {
        message.error(msg);
      }
    },

    * fetchModel({ payload }, { call, put }) {
      const { success, data, message: msg } = yield call(queryModel, payload);
      if (success) {
        yield put({
          type: 'save',
          payload: {
            majorInfo: data
          }
        });
      } else {
        message.error(msg);
      }
    },

    * createMajor({ payload, callback }, { call, put }) {
      const { success, message: msg } = yield call(createMajor, payload);
      if (success) {
        yield put({
          type: 'fetchList'
        });
        message.success(tips.createSuccess);
        if (callback) callback();
      } else {
        message.error(msg);
      }
    },
    * updateMajor({ payload, callback }, { call, put }) {
      const { success, message: msg } = yield call(updateMajor, payload);
      if (success) {
        yield put({
          type: 'fetchList'
        });
        message.success(tips.updateSuccess);
        if (callback) callback();
      } else {
        message.error(msg);
      }
    },
    * deleteMajor({ payload, callback }, { call, put }) {
      const { success, message: msg } = yield call(deleteMajor, payload);
      if (success) {
        yield put({
          type: 'fetchList'
        });
        yield put({
          type: 'save',
          payload: {
            majorInfo: {}
          }
        });
        message.success(tips.deleteSuccess);
        if (callback) callback();
      } else {
        message.error(msg);
      }
    },
    * createModel({ payload, callback }, { call, put }) {
      const { sszy } = payload;
      const { success, message: msg } = yield call(createModel, payload);
      if (success) {
        message.success(tips.createSuccess);
        yield put({
          type: 'fetchModel',
          payload: {
            zybm: sszy
          }
        });
        if (callback) callback();
      } else {
        message.error(msg);
      }
    },
    * updateModel({ payload, callback }, { call, put }) {
      const { sszy } = payload;
      const { success, message: msg } = yield call(updateModel, payload);
      if (success) {
        yield put({
          type: 'fetchModel',
          payload: {
            zybm: sszy
          }
        });
        message.success(tips.updateSuccess);
        if (callback) callback();
      } else {
        message.error(msg);
      }
    },

    * deleteModel({ payload, callback }, { call, put }) {
      const { zybm } = payload;
      const { success, message: msg } = yield call(deleteModel, payload);
      if (success) {
        yield put({
          type: 'fetchModel',
          payload: {
            zybm
          }
        });
        message.success(tips.deleteSuccess);
        if (callback) callback();
      } else {
        message.error(msg);
      }
    },

    * createModelType({ payload, callback }, { call, put }) {
      const { success, message: msg } = yield call(createModelType, payload);
      if (success) {
        yield put({
          type: 'fetchModelType'
        });
        message.success(tips.createSuccess);
        if (callback) callback();
      } else {
        message.error(msg);
      }
    },
    * deleteModelType({ payload, callback }, { call, put }) {
      const { success, message: msg } = yield call(deleteModelType, payload);
      if (success) {
        yield put({
          type: 'fetchModelType'
        });
        message.success(tips.deleteSuccess);
        if (callback) callback();
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
    },
    clear(state) {
      return {
        ...state,
        list: [],
        majorInfo: {},
        modelType: []
      };
    }
  }
};
export default Model;
