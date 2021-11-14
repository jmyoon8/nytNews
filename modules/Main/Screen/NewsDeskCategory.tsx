import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import {
   deleteClipNewsDeskData,
   getClipedNewsDesks,
} from '../../utils/AsyncStorageHandler';
import { CFFF } from '../../utils/GolobalColors';
import { NewsDeskCategoryProps } from '../../utils/NavigatorsAndTypes';
import { deskArray } from '../../utils/NewsDesks';
import ClipedCategory from '../Components/ClipedCategory';
import NewDeskCategoryList from '../Components/NewDeskCategoryList';

import NewsDeskCategoryPageNation from '../Components/NewsDeskCategoryPageNation';

const styles = StyleSheet.create({
   container: {
      backgroundColor: CFFF,
      paddingVertical: 10,
      minHeight: '100%',
      paddingBottom: 10,
   },
});

const NewsDeskCategory = ({ navigation }: NewsDeskCategoryProps) => {
   const listMaxCount = 13;
   const [maxPage, setMaxPage] = useState(0);
   const [currentPage, setCurrentPage] = useState(0);
   const [myClipedNewsDesk, setMyClipedNewsDesk] = useState<string[]>(
      []
   );
   const pageNationHandler = (where: 'forward' | 'back') => {
      if (where === 'back' && currentPage !== maxPage - 1) {
         setCurrentPage((prev) => prev + 1);
      } else if (where === 'forward' && currentPage !== 0) {
         setCurrentPage((prev) => prev - 1);
      }
   };
   const deleteClipedNewsDesk = (item: string) => {
      deleteClipNewsDeskData(item).then(() => {
         setMyClipedNewsDesk((prev) =>
            prev.filter((clipedItem) => clipedItem !== item)
         );
      });
   };
   useEffect(() => {
      let maxp = Math.floor(deskArray.length / listMaxCount);
      if (deskArray.length % listMaxCount > 0) {
         maxp++;
      }
      setMaxPage(maxp);
      getClipedNewsDesks().then((item) => {
         setMyClipedNewsDesk(item);
      });
   }, []);

   return (
      <View style={styles.container}>
         <NewsDeskCategoryPageNation
            currentPage={currentPage}
            maxPage={maxPage}
            pageNationHandler={pageNationHandler}
         />
         <View style={{ marginTop: 10 }}>
            <Text>Cliped NewsDesk{'\n'}</Text>
            <ScrollView
               horizontal
               bounces={false}
               style={{ height: 25 }}
            >
               {myClipedNewsDesk.sort().map((item) => (
                  <ClipedCategory
                     deleteClipedNewsDesk={deleteClipedNewsDesk}
                     item={item}
                     navigation={navigation}
                     key={item}
                  />
               ))}
            </ScrollView>
            {deskArray
               .slice(
                  currentPage * listMaxCount,
                  currentPage * listMaxCount + listMaxCount
               )
               .map((item) => (
                  <NewDeskCategoryList
                     key={item}
                     navigation={navigation}
                     item={item}
                     setMyClipedNewsDesk={setMyClipedNewsDesk}
                     myClipedNewsDesk={myClipedNewsDesk}
                  />
               ))}
         </View>
      </View>
   );
};

export default NewsDeskCategory;
