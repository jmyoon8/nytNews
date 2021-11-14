import moment from 'moment';
import React from 'react';
import {
   StyleSheet,
   Text,
   TouchableOpacity,
   View,
} from 'react-native';
import { Ca1a1a1 } from '../../utils/GolobalColors';
import { MostViewListProps } from '../type';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch } from 'react-redux';
import { setWebViewUrl } from '../../utils/reduxToolkit/getArticleSlice';

const styles = StyleSheet.create({
   articleContainer: {
      justifyContent: 'space-around',
      borderBottomColor: Ca1a1a1,
      borderBottomWidth: 1,
      flex: 1,
      paddingHorizontal: 10,
   },
   headerLineText: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: -8,
   },
   snippetText: {
      fontSize: 14,
   },
   pubDateText: {
      color: Ca1a1a1,
   },
   clipContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
   },
});

const MostViewList = ({
   abstract,
   published_date,
   title,
   url,
}: MostViewListProps) => {
   console.log(abstract, published_date, title, url);
   const dispatch = useDispatch();
   return (
      <View style={styles.articleContainer}>
         <Text style={styles.headerLineText}>{title}</Text>
         <Text style={styles.snippetText} numberOfLines={2}>
            {abstract}
         </Text>
         <View style={styles.clipContainer}>
            <Text style={styles.pubDateText}>
               작설일자 :{' '}
               {moment(published_date).format(
                  'YYYY년 MM월 DD일 HH:mm'
               )}
            </Text>
            <TouchableOpacity
               onPress={() => dispatch(setWebViewUrl(url))}
            >
               <MaterialCommunityIcons name="web" size={20} />
            </TouchableOpacity>
         </View>
      </View>
   );
};

export default MostViewList;
