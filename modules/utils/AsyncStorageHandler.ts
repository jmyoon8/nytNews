import AsyncStorage from '@react-native-async-storage/async-storage';
import { ArticleType } from '../SearcgNewsScreen/types';

// 아티클 저장
export const setClipData = async (item: ArticleType) => {
   try {
      let getClip: ArticleType[] | null = JSON.parse(
         (await AsyncStorage.getItem('clips')) as string
      );
      if (!getClip) {
         return await AsyncStorage.setItem(
            'clips',
            JSON.stringify([item])
         );
      } else {
         getClip.push(item);

         return await AsyncStorage.setItem(
            'clips',
            JSON.stringify(getClip)
         );
      }
   } catch (error) {
      console.log(error);
   }
};

// 아티클 지우기
export const deleteClipData = async (articleId: string) => {
   try {
      let getClip: ArticleType[] | null = JSON.parse(
         (await AsyncStorage.getItem('clips')) as string
      );
      if (getClip) {
         getClip = getClip.filter((item) => item._id !== articleId);
         await AsyncStorage.setItem('clips', JSON.stringify(getClip));
      }
   } catch (error) {}
};

// 클립에 파라미터로 넘겨준 ID의 기사가있는지 찾는다
export const getClipedArticle = async (
   articleId: string,
   cb: (item: null | ArticleType) => any
) => {
   const getItem: ArticleType[] = JSON.parse(
      (await AsyncStorage.getItem('clips')) as string
   );
   if (!getItem) {
      cb(null);
   } else {
      const getArticle = getItem.find(
         (item) => item._id === articleId
      );
      if (getArticle) {
         cb(getArticle);
      } else {
         cb(null);
      }
   }
};

export const getClipedArticles = async () => {
   const getItems: ArticleType[] = JSON.parse(
      (await AsyncStorage.getItem('clips')) as string
   );

   return getItems;
};
