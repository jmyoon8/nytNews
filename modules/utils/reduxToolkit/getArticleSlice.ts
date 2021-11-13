import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { axiosInstance, myKey } from '../AxiosInstance';
import {
   DefaultStateType,
   GetArtibleType,
   GetArticlesAsyncType,
   GetNewsDeskType,
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
export const getNewsDeskAsync = createAsyncThunk(
   'article/NewsDeskAsync',
   async ({ deskType }: { deskType: string }): GetNewsDeskType => {
      const { data } = await axiosInstance.get('', {
         params: {
            fq: `news_desk:("${deskType}")`,
            ['api-key']: myKey,
         },
      });

      return { data };
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
      newsDesk: [],
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
      builder.addCase(getNewsDeskAsync.pending, (state) => {
         state.apiState = 'pending';
      });
      builder.addCase(getNewsDeskAsync.fulfilled, (state, action) => {
         state.apiState = 'fulfilled';
         state.newsDesk = action.payload.data.response.docs;
      });
      builder.addCase(getNewsDeskAsync.rejected, (state) => {
         state.apiState = 'rejected';
      });
   },
});
export const { setWebViewUrl, setSearchOption } =
   getArticleSlice.actions as any;
export default getArticleSlice.reducer;
