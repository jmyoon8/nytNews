import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import ArticleWebViewModal from '../../SearchNews/Components/ArticleWebViewModal';
import { MostViewArticleType } from '../../SearchNews/types';
import { C5EC2A4 } from '../../utils/GolobalColors';
import { getMostViewArticlesAsync } from '../../utils/reduxToolkit/getArticleSlice';
import MostViewList from './MostViewList';
import MostViewSelectBox from './MostViewSelectBox';

const styles = StyleSheet.create({
   container: {
      height: '100%',
      paddingTop: 12,
   },
   title: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 8,
      paddingHorizontal: 12,
   },
   selectDaysContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      backgroundColor: C5EC2A4,
      height: 40,
      alignItems: 'center',
      paddingHorizontal: 8,
   },
});

const days = [1, 7, 30];
const MostViewedArticle = () => {
   const disPatch = useDispatch();
   const getSelector = useSelector(
      (state: any) => state.getArticleSlice.mostViews
   );
   const [searchDays, setSearchDays] = useState(1);
   useEffect(() => {
      disPatch(getMostViewArticlesAsync({ days: searchDays }));
   }, [disPatch, searchDays]);

   return (
      <View style={styles.container}>
         <Text style={styles.title}>Most-View-Article</Text>
         <View style={styles.selectDaysContainer}>
            {days.map((item) => (
               <MostViewSelectBox
                  key={item}
                  item={item}
                  searchDays={searchDays}
                  setSearchDays={setSearchDays}
               />
            ))}
         </View>
         {getSelector
            ?.slice(0, 6)
            .map((item: MostViewArticleType) => (
               <MostViewList key={item.url} {...item} />
            ))}
         <ArticleWebViewModal />
      </View>
   );
};

export default MostViewedArticle;
