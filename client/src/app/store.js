import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice'
import objectiveReducer from '../features/objective/objectiveSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    objectives: objectiveReducer
  },
});
