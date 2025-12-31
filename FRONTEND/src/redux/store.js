import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice";
import UserReducer from "./user-slice";
import AiReducer from "./ai-slice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: UserReducer,
    ai: AiReducer,
  },
});

export default store;
