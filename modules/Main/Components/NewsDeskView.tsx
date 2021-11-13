import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import ArticleComponent from '../../SearchNews/Components/ArticleComponent';
import ArticleWebViewModal from '../../SearchNews/Components/ArticleWebViewModal';
import { ArticleType } from '../../SearchNews/types';
import { getNewsDeskAsync } from '../../utils/reduxToolkit/getArticleSlice';
import { DefaultStateType } from '../../utils/reduxToolkit/reduxType';
import { NewDeskViewProps } from '../type';

const styles = StyleSheet.create({
   minHeight: {
      minHeight: 100,
   },
});

const NewDeskView = ({ deskType }: NewDeskViewProps) => {
   const dispatch = useDispatch();
   const getSelect: DefaultStateType = useSelector(
      (state: any) => state.getArticleSlice
   );
   const [isLoading, setIsLoading] = useState(false);
   useEffect(() => {
      dispatch(getNewsDeskAsync({ deskType }));
   }, [deskType, dispatch]);
   useEffect(() => {
      if (getSelect.apiState === 'pending') {
         setIsLoading(true);
      }
      if (
         getSelect.apiState === 'fulfilled' ||
         getSelect.apiState === 'rejected'
      ) {
         setIsLoading(false);
      }
   }, [getSelect]);
   return (
      <View style={styles.minHeight}>
         {isLoading ? (
            <Text>로딩중..</Text>
         ) : (
            getSelect.newsDesk?.map((item: ArticleType) => (
               <ArticleComponent key={item._id} {...item} />
            ))
         )}
         <ArticleWebViewModal />
      </View>
   );
};

export default NewDeskView;
