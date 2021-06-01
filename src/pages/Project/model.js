import { queryList, deleteProject } from './service';
import { tips } from '@/utils/prompt';
import { message } from 'antd';

const Model = {
  namespace: 'project',
  state: {
    list: []
  },
  effects: {

    * fetchList(_, { call, put }) {
      const { success, data, message: msg } = yield call(queryList);
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
    * deleteProject({payload}, { call, put }) {
      const { success, message: msg } = yield call(deleteProject,payload);
      if (success) {
        yield put({
          type: 'fetchList'
        });
        message.success(tips.deleteSuccess);
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
