import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { axiosInstance, myKey } from '../AxiosInstance';
import {
   DefaultStateType,
   GetArtibleType,
   GetArticlesAsyncType,
} from './reduxType';

export const getArticlesAsync = createAsyncThunk(
   'article/getArticlesAsync',
   async ({
      t,
      page,
      isInfinite,
   }: GetArtibleType): GetArticlesAsyncType => {
      const { data } = await axiosInstance.get('', {
         params: {
            q: t,
            ['api-key']: myKey,
            page,
         },
      });
      console.log(data);
      return { data, isInfinite: isInfinite };
   }
);

const getArticleSlice = createSlice<DefaultStateType, any, any>({
   name: 'article',
   initialState: {
      apiState: '',
      result: {
         copyright: '',
         response: {
            docs: [],
         },
         status: '',
      },
      webViewUrl: '',
      searchOption: 'title',
   },

   reducers: {
      setWebViewUrl: (state: DefaultStateType, action: any) => {
         return { ...state, webViewUrl: action.payload };
      },
      setSearchOption: (state: DefaultStateType, action: any) => {
         return { ...state, searchOption: action.payload };
      },
   },

   extraReducers: (builder) => {
      builder.addCase(getArticlesAsync.pending, (state) => {
         state.apiState = 'pending';
      });
      builder.addCase(getArticlesAsync.fulfilled, (state, action) => {
         state.apiState = 'fulfilled';
         const {
            payload: { data, isInfinite },
         } = action;

         if (isInfinite) {
            state.result.response.docs =
               state.result.response.docs.concat(data.response.docs);
         } else {
            state.result = data;
         }
      });
      builder.addCase(getArticlesAsync.rejected, (state) => {
         state.apiState = 'rejected';
      });
   },
});
export const { setWebViewUrl, setSearchOption } =
   getArticleSlice.actions as any;
export default getArticleSlice.reducer;
