import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
   axiosInstance,
   mostPopularUrl,
   myKey,
   searchUrl,
} from '../AxiosInstance';
import {
   DefaultStateType,
   GetArtibleType,
   GetArticlesAsyncType,
   GetMostViedArticlesAsyncType,
   GetMostViewArtibleType,
} from './reduxType';

export const getArticlesAsync = createAsyncThunk(
   'article/getArticlesAsync',
   async ({
      t,
      page,
      isInfinite,
   }: GetArtibleType): GetArticlesAsyncType => {
      const { data } = await axiosInstance.get(searchUrl, {
         params: {
            q: t,
            ['api-key']: myKey,
            page,
         },
      });

      return { data, isInfinite: isInfinite };
   }
);
export const getMostViewArticlesAsync = createAsyncThunk(
   'article/getMostViewArticlesAsync',
   async ({
      days,
   }: GetMostViewArtibleType): GetMostViedArticlesAsyncType => {
      const { data } = await axiosInstance.get(
         `${mostPopularUrl}${days}.json`,
         {
            params: {
               ['api-key']: myKey,
            },
         }
      );

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
      mostViews: [],
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
      // 모으트 뷰스
      builder.addCase(getMostViewArticlesAsync.pending, (state) => {
         state.apiState = 'pending';
      });
      builder.addCase(
         getMostViewArticlesAsync.fulfilled,
         (state, action) => {
            state.apiState = 'fulfilled';
            state.mostViews = action.payload.data.results;
         }
      );
      builder.addCase(getMostViewArticlesAsync.rejected, (state) => {
         state.apiState = 'rejected';
      });
   },
});
export const { setWebViewUrl, setSearchOption } =
   getArticleSlice.actions as any;
export default getArticleSlice.reducer;
