import {
   ArticleType,
   MostViewArticleType,
} from '../../SearchNews/types';

export type GetArtibleType = {
   t: string;
   page: number;
   isInfinite: boolean;
};
export type GetMostViewArtibleType = {
   days: number;
};
export type GetMostViedArticlesAsyncType = Promise<{
   data: GetMostViewArticleType;
}>;
export type GetArticlesAsyncType = Promise<{
   data: GetArticleType;
   isInfinite: boolean;
}>;
export type GetNewsDeskType = Promise<{
   data: GetArticleType;
}>;
// reduxTypes
export type ApiState = 'pending' | 'fulfilled' | 'rejected' | '';
export type DefaultStateType = {
   apiState: ApiState;
   webViewUrl: string;
   searchOption: 'title' | 'content';
   result: GetArticleType;
   mostViews: MostViewArticleType[];
};
export type GetArticleType = {
   response: {
      docs: ArticleType[];
   };
   status: string;
   copyright: string;
};
export type GetMostViewArticleType = {
   results: MostViewArticleType[];
   status: string;
   copyright: string;
};
