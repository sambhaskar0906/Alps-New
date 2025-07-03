import { configureStore } from '@reduxjs/toolkit';
import projectReducer from '../features/project/projectSlice';
import ticketReducer from '../features/ticket/ticketSlice';
import userReducer from "../features/user/userSlice";
export const store = configureStore({
  reducer: {
    project: projectReducer,
    ticket: ticketReducer,
    user: userReducer,
  },
});
