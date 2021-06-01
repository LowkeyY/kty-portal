import { queryList, queryTabList } from './service';

const Model = {
  namespace: 'resultTable',
  state: {
    list: [],
    columns: [],
    menuMap: []
  },
  effects: {

    * fetchList({ payload }, { call, put }) {
      const response = yield call(queryList, payload);
      yield put({
        type: 'save',
        payload: {
          columns: response
        }
      });
    },
    * fetchTabList({ payload }, { call, put }) {
      const response = yield call(queryTabList, payload);
      yield put({
        type: 'save',
        payload: {
          menuMap: response
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
