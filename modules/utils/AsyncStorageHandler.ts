import AsyncStorage from '@react-native-async-storage/async-storage';
import { ArticleType } from '../SearchNews/types';

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
// 클립한 데이터 가져오기
export const getClipedArticles = async () => {
   const getItems: ArticleType[] = JSON.parse(
      (await AsyncStorage.getItem('clips')) as string
   );
   if (getItems) {
      return getItems;
   } else {
      return [];
   }
};
// 키워드 저장
export const setRecentlyKeyword = async (keyWord: string) => {
   console.log(keyWord);
   if (!keyWord) {
      return;
   }
   const getKeyword: null | string[] = JSON.parse(
      (await AsyncStorage.getItem('keyword')) as string
   );
   if (getKeyword) {
      if (getKeyword.indexOf(keyWord) === -1) {
         // 키워드가 없으면 저장
         getKeyword.push(keyWord);
         await AsyncStorage.setItem(
            'keyword',
            JSON.stringify(getKeyword)
         );
      }
   } else {
      await AsyncStorage.setItem(
         'keyword',
         JSON.stringify([keyWord])
      );
   }
};
// 키워드 가져오기
export const getRecentlyKeyWord = async () => {
   const getKeyWords: null | string[] = JSON.parse(
      (await AsyncStorage.getItem('keyword')) as string
   );
   if (getKeyWords) {
      return getKeyWords;
   } else {
      return [];
   }
};
// 키워드 제거
export const removeRecentlyKeyword = async (
   deleteKey: string,
   cb: (isDeleted: boolean) => any
) => {
   let getKeyWords: string[] = JSON.parse(
      (await AsyncStorage.getItem('keyword')) as string
   );
   getKeyWords = getKeyWords.filter((item) => item !== deleteKey);

   AsyncStorage.setItem('keyword', JSON.stringify(getKeyWords))
      .then(() => cb(true))
      .catch(() => cb(false));
};
