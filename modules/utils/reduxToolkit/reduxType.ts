import { ArticleType } from '../../SearcgNewsScreen/types';

export type GetArtibleType = {
   t: string;
   page: number;
   isInfinite: boolean;
};
export type GetArticlesAsyncType = Promise<{
   data: GetArticleType;
   isInfinite: boolean;
}>;
// reduxTypes
export type ApiState = 'pending' | 'fulfilled' | 'rejected' | '';
export type DefaultStateType = {
   result: GetArticleType;
   apiState: ApiState;
   webViewUrl: string;
   searchOption: 'title' | 'content';
};
export type GetArticleType = {
   response: {
      docs: ArticleType[];
   };
   status: string;
   copyright: string;
};
