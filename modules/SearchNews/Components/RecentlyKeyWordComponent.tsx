import React, { useEffect, useState } from 'react';
import {
   Alert,
   Pressable,
   ScrollView,
   StyleSheet,
   Text,
   View,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {
   getRecentlyKeyWord,
   removeRecentlyKeyword,
} from '../../utils/AsyncStorageHandler';
import { C5EC2A4, CFFF } from '../../utils/GolobalColors';
import { RecentlyKeyWordComponentProps } from '../types';
import KeyWordComponent from './KeyWordComponent';

const styles = StyleSheet.create({
   container: {
      borderTopWidth: 0,
      borderWidth: 2,
      height: 100,
      width: '100%',
      bottom: '-169%',
      position: 'absolute',
      backgroundColor: CFFF,
      paddingVertical: 4,
      paddingHorizontal: 12,
      borderColor: C5EC2A4,
   },
   recentlyKeyWordTitleContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
   },
   recentlyKeyWordTitle: {
      fontWeight: '200',
      fontSize: 14,
   },
});

const RecentlyKeyWordComponent = ({
   keyword,
   setKeyWord,
   setIsRecentlyItemVisible,
}: RecentlyKeyWordComponentProps) => {
   const [keywords, setKeyWords] = useState<string[]>([]);
   const deleteKeyword = (paramKeyword: string) => {
      removeRecentlyKeyword(paramKeyword, (isDeleted) => {
         if (isDeleted) {
            setKeyWords((prev) =>
               prev.filter((item) => item !== paramKeyword)
            );
         } else {
            Alert.alert('일시적인 오류입니다.');
         }
      });
   };
   useEffect(() => {
      getRecentlyKeyWord().then((item) => setKeyWords(item));
   }, []);
   useEffect(() => {
      console.log(keywords);
   }, [keywords]);

   return (
      <View style={styles.container}>
         <View style={styles.recentlyKeyWordTitleContainer}>
            <Text style={styles.recentlyKeyWordTitle}>
               최근 검색어
            </Text>
            <TouchableOpacity
               onPress={() => setIsRecentlyItemVisible(false)}
            >
               <Text style={styles.recentlyKeyWordTitle}>닫기</Text>
            </TouchableOpacity>
         </View>
         <ScrollView>
            <Pressable style={{ marginTop: 10 }} onPress={() => {}}>
               {keywords.map((item) => {
                  if (item.includes(keyword)) {
                     return (
                        <KeyWordComponent
                           key={item}
                           item={item}
                           deleteKeyword={deleteKeyword}
                           setKeyWord={setKeyWord}
                        />
                     );
                  } else {
                     null;
                  }
               })}
            </Pressable>
         </ScrollView>
      </View>
   );
};

export default RecentlyKeyWordComponent;
