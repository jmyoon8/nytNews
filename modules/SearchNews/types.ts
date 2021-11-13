import React from 'react';
import { TextInput } from 'react-native';
import { ApiState } from '../utils/reduxToolkit/reduxType';

// state type
export type ArticleType = {
   _id: string;
   headline: {
      content_kicker: any;
      kicker: string;
      main: string;
      name: string;
      print_headline: string;
      sub: any;
   };
   pub_date: string;
   web_url: string;
   snippet: string;
   // multimedia?: [];
   //   keywords: [];
   //   abstract: string;
   //   byline: [];
   //   document_tpye: string;
   //   news_desk: string;
   //   section_name: string;
   //   source: string;
   //   type_of_material: string;
};
export type GetArticleData = {
   apiState: ApiState;
   result: {
      response: {
         docs: ArticleType[];
      };
      status: string;
      copyright: string;
   };
};
// component type
export interface SearchNewsMainHeaderComponentProps {
   textInputRef: React.MutableRefObject<TextInput>;
   keyWord: string;
   setKeywordHandler: (t: string) => void;
}

export interface ArticleListProps {
   news: ArticleType[];
   setPage: React.Dispatch<React.SetStateAction<number>>;
   keyWord?: string;
   clipsLength?: number;
}
export interface RecentlyKeyWordComponentProps {
   keyword: string;
   setKeyWord: React.Dispatch<React.SetStateAction<string>>;
   setIsRecentlyItemVisible: React.Dispatch<
      React.SetStateAction<boolean>
   >;
}
export interface KeyWordComponentProps {
   item: string;
   setKeyWord: (item: string) => void;
   deleteKeyword: (item: string) => void;
}
// 검색 결과에는 메인 헤드라인 제목(headline.main),기사 작성일(pub_date)가 포함되어야 한다.
