import React, { useEffect, useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArticleType } from '../../SearcgNewsScreen/types';
import { getClipedArticles } from '../../utils/AsyncStorageHandler';
import { CFFF } from '../../utils/GolobalColors';
import { SearchNewsProps } from '../../utils/NavigatorsAndTypes';

const styles = StyleSheet.create({
   container: {
      backgroundColor: CFFF,
      flex: 1,
      paddingHorizontal: 12,
   },
});

const ClipNewsScreen = ({ navigation, route }: SearchNewsProps) => {
   const [clip, setClip] = useState<ArticleType[]>([]);
   useEffect(() => {
      const getitem = async () => {
         setClip(await getClipedArticles());
      };
      getitem();
   }, []);

   useEffect(() => {
      console.log(clip);
   }, [clip]);
   return (
      <SafeAreaView style={styles.container}>
         <Text>내클립</Text>
      </SafeAreaView>
   );
};

export default ClipNewsScreen;
