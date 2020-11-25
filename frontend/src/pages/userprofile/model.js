import { queryCurrentUser, updateCurrentUser } from './service';

// https://dvajs.com/guide/getting-started.html#%E5%AE%9A%E4%B9%89-model
const Model = {
  // namespace 表示在全局 state 上的 key
  namespace: 'userProfile',
  // state 是初始值
  state: {
    currentUser: {},
    isLoading: false,
  },
  effects: {
    *fetchCurrentUser(_, { call, put }) {
      const response = yield call(queryCurrentUser);
      yield put({
        type: 'saveCurrentUser',
        payload: response.data,
      });
    },

    *updateCurrentUser({ payload }, { call, put }) {
      const response = yield call(updateCurrentUser, payload);
      yield put({
        type: 'saveCurrentUser',
        payload: response.data,
      });
    },

  },
  // reducers 等同于 redux 里的 reducer，接收 action，同步更新 state
  reducers: {
    saveCurrentUser(state, action) {
      return { ...state, currentUser: action.payload || {} };
    },
    changeLoading(state, action) {
      return { ...state, isLoading: action.payload };
    },
  },
};
export default Model;
