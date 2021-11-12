import React, { useEffect, useRef, useState } from 'react';
import { Animated, Easing, StyleSheet, Text } from 'react-native';
import { C5EC2A4, CFFF } from '../../utils/GolobalColors';
import { SearchOptionListProps } from '../types';

const styles = StyleSheet.create({
   searchOptionListContainer: {
      borderTopWidth: 0,
      borderWidth: 1.5,
      alignItems: 'center',
      paddingVertical: 5,
      justifyContent: 'space-between',
      height: 50,
      position: 'absolute',
      right: 0,
      width: 120,
      bottom: -20,
      backgroundColor: CFFF,
      borderColor: C5EC2A4,
   },
});
const SearchOptionList = ({
   setSeachOption,
}: SearchOptionListProps) => {
   const animatedRef = useRef(new Animated.Value(0)).current;
   useEffect(() => {
      Animated.timing(animatedRef, {
         easing: Easing.ease,
         toValue: 30,
         duration: 200,
         useNativeDriver: true,
      }).start();
   }, [animatedRef]);
   const [visible, setVisible] = useState(false);
   useEffect(() => {
      setTimeout(() => {
         setVisible(true);
      }, 110);
   }, []);
   return (
      <Animated.View
         style={[
            styles.searchOptionListContainer,
            {
               transform: [{ translateY: animatedRef }],
            },
         ]}
      >
         {visible && (
            <>
               <Text onPress={() => setSeachOption('title')}>
                  제목으로 검색
               </Text>
               <Text onPress={() => setSeachOption('content')}>
                  내용으로 검색
               </Text>
            </>
         )}
      </Animated.View>
   );
};

export default SearchOptionList;
