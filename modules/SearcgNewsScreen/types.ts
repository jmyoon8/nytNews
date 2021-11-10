import React from "react";
import { TextInput } from "react-native";

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
  //   keywords: [];
  //   abstract: string;
  //   byline: [];
  //   document_tpye: string;
  //   news_desk: string;
  //   section_name: string;
  //   source: string;
  //   type_of_material: string;
  //   multimedia: [];
};
export type axiosGetType = {
  copyright: string;
  response: {
    docs: ArticleType[];
    meta: {
      hits: number;
      offset: number;
      time: number;
    };
  };
  status: string;
};
// component type
export interface SearchNewsMainHeaderComponentProps {
  textInputRef: React.MutableRefObject<TextInput>;
  keyWord: string;
  setKeywordHandler: (t: string) => void;
}
export interface ArticleWebViewModalProps {
  setWebViewUrl: React.Dispatch<React.SetStateAction<string>>;
  webViewUrl: string;
}
export interface ArticleListProps {
  news: ArticleType[];
  setWebViewUrl: React.Dispatch<React.SetStateAction<string>>;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}
// 검색 결과에는 메인 헤드라인 제목(headline.main),기사 작성일(pub_date)가 포함되어야 한다.
