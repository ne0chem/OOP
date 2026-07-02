import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { authApi } from "../auth/api/authApi";
import { webinarsApi } from "../features/webinars/api/webinarsApi";
import { expertsApi } from "../features/experts/api/expertsApi";
import { socialsApi } from "../features/socials/api/socialsApi";

interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  token: localStorage.getItem("token"),
  isAuthenticated: !!localStorage.getItem("token"),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem("token");
    },
  },
});

export const { setToken, logout } = authSlice.actions;

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [webinarsApi.reducerPath]: webinarsApi.reducer,
    [expertsApi.reducerPath]: expertsApi.reducer,
    [socialsApi.reducerPath]: socialsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      webinarsApi.middleware,
      expertsApi.middleware,
      socialsApi.middleware,
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
