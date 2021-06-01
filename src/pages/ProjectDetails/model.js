import {
  queryList,
  queryMembers,
  queryCountry,
  queryTask,
  queryInfo,
  updateInfo,
  updateProgress,
  addVersion
} from './service';
import { tips } from '@/utils/prompt';
import economics from '../../../public/task/economics.png';
import investment from '../../../public/task/investment.png';
import prospecting from '../../../public/task/prospecting.png';
import reservoir from '../../../public/task/reservoir.png';
import moment from 'moment';
import { message } from 'antd';

const image = [prospecting, reservoir, investment, economics];
const appendImg = (data) => {
  data.map((item, i) => item.img = image[i]);
  return data;
};

const getInfo = (obj) => {
  Object.keys(obj).map(item => {
    if (item === 'kspjsj' || item === 'jzpjsj' || item === 'tcsj' || item === 'fxsj') {
      if (obj[item]) {
        obj[item] = moment(obj[item], 'YYYY-MM-DD');
      }
    }
  });
  return obj;
};
const Model = {
  namespace: 'projectDetails',
  state: {
    list: [],
    members: [],
    country: [],
    taskData: [],
    info: {}
  },
  effects: {
    * fetchInfo({ payload }, { call, put }) {

      try {
        const { success, message: msg, data } = yield call(queryInfo, payload);
        if (success) {
          yield put({
            type: 'save',
            payload: {
              info: getInfo(data)
            }
          });
        } else {

        }
      }catch (e) {
        console.log(e)
      }
    },
    * updateInfo({ payload, callback }, { call, put }) {
      const { xmbm = '' } = payload;
      const { success, message: msg } = yield call(updateInfo, payload);
      if (success) {
        yield put({
          type: 'fetchInfo',
          payload: {
            xmbm
          }
        });
        message.success(tips.updateSuccess);
        if (callback) callback();
      } else {
        message.error(msg);
      }
    },
    * updateProgress({ payload, callback }, { call, put }) {
      const { xmbm = '' } = payload;
      const { success, message: msg } = yield call(updateProgress, payload);
      if (success) {
        yield put({
          type: 'fetchInfo',
          payload: {
            xmbm
          }
        });
        message.success(tips.updateSuccess);
        if (callback) callback();
      } else {
        message.error(msg);
      }
    },
    * addVersion({ payload, callback }, { call, put }) {
      const { xmbm = '' } = payload;
      const { success, message: msg } = yield call(addVersion, payload);
      if (success) {
        yield put({
          type: 'fetchInfo',
          payload: {
            xmbm
          }
        });
        message.success(tips.createSuccess);
        if (callback) callback();
      } else {
        message.error(msg);
      }
    },
    * fetchList(_, { call, put }) {
      const response = yield call(queryList);
      yield put({
        type: 'save',
        payload: {
          list: response
        }
      });
    },
    * fetchMembers(_, { call, put }) {
      const response = yield call(queryMembers);
      yield put({
        type: 'save',
        payload: {
          members: response
        }
      });
    },
    * fetchCountry(_, { call, put }) {
      const response = yield call(queryCountry);
      yield put({
        type: 'save',
        payload: {
          country: response
        }
      });
    },
    * fetchTask(_, { call, put }) {
      const response = yield call(queryTask);
      yield put({
        type: 'save',
        payload: {
          taskData: appendImg(response)
        }
      });
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
