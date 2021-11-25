import _ from 'lodash';
import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { C5EC2A4 } from '../../utils/GolobalColors';
import { DefaultStateType } from '../../utils/reduxToolkit/reduxType';
import { ArticleListProps } from '../types';
import ArticleComponent from './ArticleComponent';

const styles = StyleSheet.create({
   flatStyle: {
      borderWidth: 2,
      marginTop: 8,
      borderColor: C5EC2A4,
      zIndex: -10,
   },
});
const ArticleList = ({
   news,
   setPage,
   keyWord,
   clipsLength,
}: ArticleListProps) => {
   const getSeletor: DefaultStateType = useSelector(
      (state: any) => state.getArticleSlice
   );

   const infiniteScrollHandler = () => {
      setPage((prev) => {
         let maxPage = 0;
         // 내가 저장한 뉴스에선 clipsLength을 넘겨준다.
         if (clipsLength) {
            maxPage = Math.floor(clipsLength / 10);
            if (clipsLength % 10 > 0) {
               maxPage = maxPage + 1;
            }
            if (prev === maxPage) {
               return prev;
            }
         }
         return prev + 1;
      });
   };
   const debounceHandler = _.debounce(
      () => infiniteScrollHandler(),
      400
   );

   return (
      <FlatList
         bounces={false}
         data={news}
         style={styles.flatStyle}
         onEndReachedThreshold={0.4}
         scrollEnabled
         keyExtractor={({ _id }) => _id}
         onEndReached={debounceHandler}
         renderItem={({ item }) => {
            if (
               getSeletor.searchOption === 'title'
                  ? keyWord &&
                    item.headline.print_headline?.includes(keyWord) // 헤드라인이 없는 경우 메인에서 찾아야한다 이부분을 간과함
                  : keyWord && item.snippet.includes(keyWord)
            ) {
               console.log(item.headline.print_headline);
               return <ArticleComponent {...item} />;
            }
            if (!keyWord || keyWord === '') {
               return <ArticleComponent {...item} />;
            }

            return null;
         }}
      />
   );
};

export default React.memo(ArticleList);
