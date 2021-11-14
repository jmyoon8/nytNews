import React from 'react';
import {
   StyleSheet,
   Text,
   TouchableOpacity,
   View,
} from 'react-native';
import { NewsDeskCategoryPageNationProps } from '../type';

const styles = StyleSheet.create({
   pagenation: {
      flexDirection: 'row',
      alignItems: 'center',
      width: '35%',
      justifyContent: 'space-between',
      alignSelf: 'center',
   },
});

const NewsDeskCategoryPageNation = ({
   currentPage,
   maxPage,
   pageNationHandler,
}: NewsDeskCategoryPageNationProps) => {
   return (
      <View style={styles.pagenation}>
         <TouchableOpacity
            style={{
               width: 20,
               height: 20,
               alignItems: 'center',
            }}
            onPress={() => pageNationHandler('forward')}
         >
            <Text>{'<'}</Text>
         </TouchableOpacity>
         <Text>
            {currentPage + 1} / {maxPage}
         </Text>
         <TouchableOpacity
            style={{
               width: 20,
               height: 20,
               alignItems: 'center',
            }}
            onPress={() => pageNationHandler('back')}
         >
            <Text>{'>'}</Text>
         </TouchableOpacity>
      </View>
   );
};

export default NewsDeskCategoryPageNation;
