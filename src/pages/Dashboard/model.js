import { queryProjects, queryNotice } from './service';

const Model = {
  namespace: 'dashboard',
  state: {
    projects: [],
    notices: []
  },
  effects: {

    * fetchProjects(_, { call, put }) {
      const response = yield call(queryProjects);
      yield put({
        type: 'save',
        payload: {
          projects: response
        }
      });
    },
    * fetchNotice(_, { call, put }) {
      const response = yield call(queryNotice);
      yield put({
        type: 'save',
        payload: {
          notices: response
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
