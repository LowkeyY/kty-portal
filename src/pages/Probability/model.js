import {
  queryList,
  queryResult,
  create,
  update,
  queryConf,
  calculateAll,
  calculateItem,
  queryTotal,
  calculateTotal,
  deleteItem
} from './service';
import {tips} from '@/utils/prompt';
import {message} from 'antd';

const getData = (data = []) => {
  return data.map(item => {
    let obj = {};
    Object.keys(item).map(key => {
      if (typeof (item[key]) === 'object') {
        obj = {...obj, ...item[key]};
      }
    });
    return Object.assign(item, obj);
  });
};

const Model = {
  namespace: 'probability',
  state: {
    data: [],
    result: [],
    total: [],
    conf: {}
  },
  effects: {
    * fetchList({payload, callback}, {call, put}) {
      const {success, data, message: msg} = yield call(queryList, payload);
      if (success) {
        yield put({
          type: 'save',
          payload: {
            data: getData(data.data)
          }
        });
        if (callback) callback();
      } else {
        message.error(msg);
      }
    },
    * fetchResult({payload, callback}, {call, put}) {
      const {success, data, message: msg} = yield call(queryResult, payload);
      if (success) {
        yield put({
          type: 'save',
          payload: {
            result: getData(data.data)
          }
        });
        if (callback) callback();
      } else {
        message.error(msg);
      }
    },
    * fetchTotal({payload, callback}, {call, put}) {
      const {success, data, message: msg} = yield call(queryTotal, payload);
      if (success) {
        yield put({
          type: 'save',
          payload: {
            total: data.data
          }
        });
        if (callback) callback();
      } else {
        message.error(msg);
      }
    },
    * create({payload, callback}, {call, put}) {
      const {xmbm} = payload;
      const {success, message: msg} = yield call(create, payload);
      if (success) {
        yield put({
          type: 'fetchList',
          payload: {xmbm}
        });
        message.success(tips.createSuccess);
        if (callback) callback();
      } else {
        message.error(msg);
      }
    },
    * update({payload, callback}, {call, put}) {
      const {xmbm} = payload;
      const {success, message: msg} = yield call(update, payload);
      if (success) {
        yield put({
          type: 'fetchList',
          payload: {xmbm}
        });
        message.success(tips.updateSuccess);
        if (callback) callback();
      } else {
        message.error(msg);
      }
    },
    * deleteItem({payload, callback}, {call, put}) {
      const {xmbm} = payload;
      const {success, message: msg} = yield call(deleteItem, payload);
      if (success) {
        yield put({
          type: 'fetchList',
          payload: {xmbm}
        });
        message.success(tips.deleteSuccess);
        if (callback) callback();
      } else {
        message.error(msg);
      }
    },
    * calculateAll({payload, callback}, {call, put}) {
      const {xmbm} = payload;
      const {success, message: msg} = yield call(calculateAll, payload);
      if (success) {
        yield put({
          type: 'fetchResult',
          payload: {xmbm}
        });
        message.success(tips.calculateSuccess);
        if (callback) callback();
      } else {
        message.error(msg);
      }
    },
    * calculateItem({payload, callback}, {call, put}) {
      const {xmbm} = payload;
      const {success, message: msg} = yield call(calculateItem, payload);
      if (success) {
        yield put({
          type: 'fetchResult',
          payload: {xmbm}
        });
        yield put({
          type: 'fetchTotal',
          payload: {xmbm}
        });
        message.success(tips.calculateSuccess);
        if (callback) callback();
      } else {
        message.error(msg);
      }
    },
    * calculateTotal({payload, callback}, {call, put}) {
      const {xmbm} = payload;
      const {success, message: msg} = yield call(calculateTotal, payload);
      if (success) {
        yield put({
          type: 'fetchTotal',
          payload: {xmbm}
        });
        message.success(tips.calculateSuccess);
        if (callback) callback();
      } else {
        message.error(msg);
      }
    },
    * fetchConf({payload, callback}, {call, put}) {
      const {success, data, message: msg} = yield call(queryConf, payload);
      if (success) {
        yield put({
          type: 'save',
          payload: {
            conf: data
          }
        });
        if (callback) callback(false);
        message.destroy('conf');
      } else {
        message.error(msg);
        message.destroy('conf');
      }
    }
  },
  reducers: {
    save(state, {payload}) {
      return {
        ...state,
        ...payload
      };
    }
  }
};
export default Model;
