import React from 'react';
import {
   Pressable,
   StyleSheet,
   Text,
   TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/EvilIcons';
import { ClipedCategoryProps } from '../type';

const styles = StyleSheet.create({
   clipedNewsDesk: {
      borderWidth: 1,
      paddingHorizontal: 4,
      borderRadius: 9,
      marginHorizontal: 4,
      flexDirection: 'row',
      alignItems: 'center',
   },
});
const ClipedCategory = ({
   item,
   navigation,
   deleteClipedNewsDesk,
}: ClipedCategoryProps) => {
   return (
      <Pressable
         key={item}
         onPress={() =>
            navigation.navigate('NewsDeskView', {
               deskType: item,
            })
         }
         style={styles.clipedNewsDesk}
      >
         <Text>{item}</Text>
         <TouchableOpacity onPress={() => deleteClipedNewsDesk(item)}>
            <Icon name="close" size={20} />
         </TouchableOpacity>
      </Pressable>
   );
};

export default ClipedCategory;
