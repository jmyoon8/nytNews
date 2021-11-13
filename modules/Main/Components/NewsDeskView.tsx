import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import ArticleComponent from '../../SearchNews/Components/ArticleComponent';
import ArticleWebViewModal from '../../SearchNews/Components/ArticleWebViewModal';
import { ArticleType } from '../../SearchNews/types';
import { axiosInstance, myKey } from '../../utils/AxiosInstance';
import { NewDeskViewProps } from '../type';

const styles = StyleSheet.create({
   minHeight: {
      minHeight: 100,
   },
});

const NewDeskView = ({ deskType }: NewDeskViewProps) => {
   const [isLoading, setIsLoading] = useState(false);
   const [articles, setArticles] = useState<ArticleType[]>([]);

   useEffect(() => {
      const getNewsDeskAsync = async () => {
         setIsLoading(true);
         try {
            const { data } = await axiosInstance.get('', {
               params: {
                  fq: `news_desk:("${deskType}")`,
                  ['api-key']: myKey,
               },
            });
            setArticles(data.response.docs);
         } catch (error) {
            Alert.alert(
               '너무 많은 요청이 있습니다 잠시후 다시 시도해주세요'
            );
         } finally {
            setIsLoading(false);
         }
      };

      getNewsDeskAsync();
   }, [deskType]);

   return (
      <View style={styles.minHeight}>
         {isLoading ? (
            <Text>로딩중..</Text>
         ) : (
            articles.map((item: ArticleType) => (
               <ArticleComponent key={item._id} {...item} />
            ))
         )}
         <ArticleWebViewModal />
      </View>
   );
};

export default NewDeskView;
