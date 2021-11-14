import React, { useEffect, useLayoutEffect, useState } from 'react';
import {
   Alert,
   Pressable,
   StyleSheet,
   Text,
   View,
} from 'react-native';
import ArticleComponent from '../../SearchNews/Components/ArticleComponent';
import ArticleWebViewModal from '../../SearchNews/Components/ArticleWebViewModal';
import { ArticleType } from '../../SearchNews/types';
import {
   axiosInstance,
   myKey,
   searchUrl,
} from '../../utils/AxiosInstance';
import { CFFF } from '../../utils/GolobalColors';
import { NewsDeskViewProps } from '../../utils/NavigatorsAndTypes';
import Icon from 'react-native-vector-icons/Entypo';

const styles = StyleSheet.create({
   container: {
      minHeight: '100%',
      backgroundColor: CFFF,
   },
   headerContainer: {
      height: 44,
      backgroundColor: CFFF,

      flexDirection: 'row',
      alignItems: 'center',
      paddingLeft: 10,
   },
   headerText: {
      fontSize: 15,
      fontWeight: '600',
   },
});

const NewsDeskView = ({ route, navigation }: NewsDeskViewProps) => {
   const deskType = route.params.deskType;
   const [isLoading, setIsLoading] = useState(false);
   const [articles, setArticles] = useState<ArticleType[]>([]);
   useLayoutEffect(() => {
      navigation.setOptions({
         header: () => (
            <Pressable
               onPress={() => navigation.goBack()}
               style={styles.headerContainer}
            >
               <Icon name="chevron-thin-left" size={20} />
               <Text style={styles.headerText}>
                  카테고리 목록으로
               </Text>
            </Pressable>
         ),
      });
   }, [navigation]);
   useEffect(() => {
      const getNewsDeskAsync = async () => {
         setIsLoading(true);
         try {
            const { data } = await axiosInstance.get(searchUrl, {
               params: {
                  fq: `news_desk:("${deskType}")`,
                  ['api-key']: myKey,
               },
            });
            data.response.docs.length = 7;
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
      <View style={styles.container}>
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

export default NewsDeskView;
