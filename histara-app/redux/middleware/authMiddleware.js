import { setToken } from '../slice/authSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

const loadTokenMiddleware = store => next => async action => {
  if (action.type === '@@redux/INIT') {
    try {
      const token = await AsyncStorage.getItem('authToken');
      if (token) {
        store.dispatch(setToken(token));
      }
    } catch (error) {
      console.error('Failed to load token from storage', error);
    }
  }
  return next(action);
};

export default loadTokenMiddleware;
