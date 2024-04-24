import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  TLoginData,
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  updateUserApi
} from '@api';
import { TUser } from '@utils-types';
import { setCookie, deleteCookie } from '../../src/utils/cookie';

//регистрация
export const registerUser = createAsyncThunk(
  'user/registerUser',
  registerUserApi
);

//вход в аккаунт
export const logIn = createAsyncThunk(
  'user/logIn',
  async (loginData: TLoginData) => {
    const res = await loginUserApi(loginData);
    setCookie('accessToken', res.accessToken);
    localStorage.setItem('refreshToken', res.refreshToken);
    return res;
  }
);

//выход
export const logOut = createAsyncThunk(
  'logoutUser/logoutApi',
  async function () {
    logoutApi().then(() => {
      localStorage.clear();
      deleteCookie('accessToken');
      localStorage.removeItem('refreshToken');
    });
  }
);

//обновление данных
export const updateUserProfile = createAsyncThunk(
  'user/updateUser',
  updateUserApi
);

//получение
export const userProfile = createAsyncThunk('user/getUserApi', getUserApi);

type IUser = {
  request: boolean; //запрос на что-то
  profileUser: TUser;
  isAuth: boolean;
};

const initialState: IUser = {
  request: false,
  profileUser: { name: '', email: '' },
  isAuth: false
};

const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userLogOut: (state) => {
      state.profileUser = { name: '', email: '' };
      state.isAuth = false;
    }
  },
  selectors: {
    getRequestFromUser: (state) => state.request,
    getProfileUser: (state) => state.profileUser,
    getIsAuth: (state) => state.isAuth
  },
  extraReducers: (builder) => {
    builder.addCase(logIn.pending, (state) => {
      state.isAuth = false;
      state.request = true;
    }),
      builder.addCase(logIn.fulfilled, (state, action) => {
        state.isAuth = true;
        state.request = false;
        state.profileUser = action.payload.user;
      }),
      builder.addCase(logIn.rejected, (state, action) => {
        state.isAuth = false;
        state.request = false;
      }),
      builder.addCase(registerUser.pending, (state) => {
        state.isAuth = false;
        state.request = true;
      }),
      builder.addCase(registerUser.fulfilled, (state, action) => {
        state.isAuth = true;
        state.request = false;
        state.profileUser = action.payload.user;
      }),
      builder.addCase(registerUser.rejected, (state) => {
        state.isAuth = false;
        state.request = false;
      }),
      builder.addCase(logOut.pending, (state) => {
        state.request = true;
        state.isAuth = true;
      }),
      builder.addCase(logOut.fulfilled, (state) => {
        state.isAuth = false;
        state.request = false;
        state.profileUser = { name: '', email: '' };
      }),
      builder.addCase(logOut.rejected, (state) => {
        state.isAuth = false;
        state.request = false;
      }),
      builder.addCase(updateUserProfile.pending, (state) => {
        state.request = true;
      }),
      builder.addCase(updateUserProfile.fulfilled, (state, action) => {
        state.isAuth = true;
        state.request = false;
        state.profileUser = action.payload.user;
      }),
      builder.addCase(updateUserProfile.rejected, (state, action) => {
        state.request = false;
      }),
      builder.addCase(userProfile.pending, (state) => {
        state.request = true;
        state.isAuth = false;
      }),
      builder.addCase(userProfile.fulfilled, (state, action) => {
        state.request = false;
        state.isAuth = true;
        state.profileUser = action.payload.user;
      }),
      builder.addCase(userProfile.rejected, (state) => {
        state.request = false;
        state.isAuth = false;
      });
  }
});

export const { userLogOut } = UserSlice.actions;
export const { getRequestFromUser, getProfileUser, getIsAuth } =
  UserSlice.selectors;
export const user = UserSlice.reducer;
