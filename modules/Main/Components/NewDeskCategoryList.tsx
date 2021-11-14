import React, { useEffect, useState } from 'react';
import {
   Pressable,
   StyleSheet,
   Text,
   TouchableOpacity,
} from 'react-native';

import { C000, C5EC2A4, Ceae649 } from '../../utils/GolobalColors';
import { NewDeskCategoryListProps } from '../type';
import Icon from 'react-native-vector-icons/AntDesign';
import {
   deleteClipNewsDeskData,
   getClipedNewsDesk,
   setClipNewSDeskData,
} from '../../utils/AsyncStorageHandler';

const styles = StyleSheet.create({
   categoryBox: {
      height: 50,
      paddingHorizontal: 12,
      borderBottomWidth: 1.5,
      marginBottom: 4,
      borderBottomColor: C5EC2A4,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
   },
   categoryText: {
      fontSize: 17,
   },
});

const NewDeskCategoryList = ({
   item,
   navigation,
   setMyClipedNewsDesk,
   myClipedNewsDesk,
}: NewDeskCategoryListProps) => {
   const [clipNewDesk, setClipNewsDesk] = useState(false);
   useEffect(() => {
      getClipedNewsDesk(item, (cbItem) => {
         if (cbItem) {
            setClipNewsDesk(true);
         } else {
            setClipNewsDesk(false);
         }
      });
   }, [item, myClipedNewsDesk]);
   const setNewsDeskClip = () => {
      if (!clipNewDesk) {
         setClipNewSDeskData(item).then(() => {
            setClipNewsDesk(!clipNewDesk);
            setMyClipedNewsDesk((prev) => [...prev, item]);
         });
      } else {
         deleteClipNewsDeskData(item).then(() => {
            setClipNewsDesk(!clipNewDesk);
            setMyClipedNewsDesk((prev) =>
               prev.filter((clipedItem) => clipedItem !== item)
            );
         });
      }
   };
   return (
      <Pressable
         onPress={() =>
            navigation.navigate('NewsDeskView', { deskType: item })
         }
         style={styles.categoryBox}
      >
         <Text style={styles.categoryText}>{item}</Text>
         <TouchableOpacity onPress={setNewsDeskClip}>
            <Icon
               name="paperclip"
               size={20}
               color={clipNewDesk ? Ceae649 : C000}
            />
         </TouchableOpacity>
      </Pressable>
   );
};

export default NewDeskCategoryList;
