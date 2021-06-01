import { createSubmit } from './service';
import { tips } from '@/utils/prompt';
import { message } from 'antd';

const Model = {
  namespace: 'createProject',
  state: {
    current: 'info',
    formData: { 'cyzy': ['1', '2', '3', '4'] }
  },
  effects: {
    * submitStepForm({ payload, callback }, { call, put }) {
      const { success, message: msg } = yield call(createSubmit, payload);
      if (success) {
        yield put({
          type: 'save'
        });
        if (callback) callback();
        message.success(tips.createSuccess);
      } else {
        message.error(msg);
      }
    }
  },
  reducers: {
    saveCurrentStep(state, { payload }) {
      return { ...state, current: payload };
    },

    saveStepFormData(state, { payload }) {
      return { ...state, formData: { ...payload } };
    }
  }
};
export default Model;
