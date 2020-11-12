import appReducer from 'state/appSlice';
import { configureStore } from '@reduxjs/toolkit';
import loginReducer from 'state/loginSlice';

export default configureStore({
  reducer: {
    app: appReducer,
    login: loginReducer
  }
});