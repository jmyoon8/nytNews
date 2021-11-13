import { ArticleType } from '../../SearchNews/types';

export type GetArtibleType = {
   t: string;
   page: number;
   isInfinite: boolean;
};
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
   newsDesk: ArticleType[];
};
export type GetArticleType = {
   response: {
      docs: ArticleType[];
   };
   status: string;
   copyright: string;
};
