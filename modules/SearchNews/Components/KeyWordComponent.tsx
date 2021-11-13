import React from 'react';
import {
   Pressable,
   StyleSheet,
   Text,
   View,
   TouchableOpacity,
} from 'react-native';
import { KeyWordComponentProps } from '../types';
import Icon from 'react-native-vector-icons/EvilIcons';

const styles = StyleSheet.create({
   recentlyKeyWordContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      height: 20,
      marginBottom: 8,
   },
});

const KeyWordComponent = ({
   item,
   setKeyWord,
   deleteKeyword,
}: KeyWordComponentProps) => {
   return (
      <View key={item} style={styles.recentlyKeyWordContainer}>
         <Pressable
            onPress={() => setKeyWord(item)}
            style={{ flex: 1 }}
         >
            <Text>{item}</Text>
         </Pressable>
         <TouchableOpacity onPress={() => deleteKeyword(item)}>
            <Icon name="close" size={25} />
         </TouchableOpacity>
      </View>
   );
};

export default KeyWordComponent;
