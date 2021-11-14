import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { C008E9B, CFFF } from '../../utils/GolobalColors';
import { MostViewSelectBoxProps } from '../type';

const MostViewSelectBox = ({
   item,
   searchDays,
   setSearchDays,
}: MostViewSelectBoxProps) => {
   return (
      <Pressable
         onPress={() => setSearchDays(item)}
         style={[
            styles.selectDaysBox,
            {
               backgroundColor: searchDays === item ? CFFF : C008E9B,
            },
         ]}
      >
         <Text style={styles.selectDayText}>
            {item} 일간 많이본 뉴스
         </Text>
      </Pressable>
   );
};

export default MostViewSelectBox;

const styles = StyleSheet.create({
   selectDaysBox: {
      flex: 1,
      alignItems: 'center',

      height: 25,
      justifyContent: 'center',

      borderRadius: 10,
      marginRight: 4,
      paddingHorizontal: 5,
   },
   selectDayText: {
      fontSize: 13,
      fontWeight: 'bold',
   },
});
