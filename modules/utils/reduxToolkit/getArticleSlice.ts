import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Alert } from 'react-native';
import { axiosInstance, myKey } from '../AxiosInstance';
import { DefaultStateType } from '../NavigatorsAndTypes';

export const getArticless = createAsyncThunk(
   'article/getArticless',
   async ({ t, page }: { t: string; page: number }) => {
      try {
         const { data } = await axiosInstance.get('', {
            params: {
               q: t,
               ['api-key']: myKey,
               page,
            },
         });
         return data;
      } catch (error) {
         return Alert.alert('서버에러!');
      }
   }
);
const getArticleslice = createSlice<DefaultStateType, any, any>({
   name: 'article',
   initialState: {
      apiState: 'pending',
      result: '',
   },
   reducers: {},
   extraReducers: (builder) => {
      builder.addCase(getArticless.pending, (state) => {
         state.apiState = 'pending';
      });
      builder.addCase(getArticless.fulfilled, (state, action) => {
         state.apiState = 'fulfilled';
         state.result = action.payload;
      });
      builder.addCase(getArticless.rejected, (state) => {
         state.apiState = 'rejected';
      });
   },
});
export default getArticleslice.reducer;
