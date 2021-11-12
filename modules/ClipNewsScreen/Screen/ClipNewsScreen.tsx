import React, {
   useCallback,
   useEffect,
   useRef,
   useState,
} from 'react';
import {
   StyleSheet,
   Text,
   View,
   TextInput,
   TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { C000, C5EC2A4, CFFF } from '../../utils/GolobalColors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { globalStyles } from '../../utils/GlobalStyle';
import { ArticleType } from '../../SearcgNewsScreen/types';
import ArticleList from '../../SearcgNewsScreen/Components/ArticleList';
import ArticleWebViewModal from '../../SearcgNewsScreen/Components/ArticleWebViewModal';
import { getClipedArticles } from '../../utils/AsyncStorageHandler';
import { useIsFocused } from '@react-navigation/core';
import { useDispatch, useSelector } from 'react-redux';
import { DefaultStateType } from '../../utils/reduxToolkit/reduxType';
import { setSearchOption } from '../../utils/reduxToolkit/getArticleSlice';
import SearchOptionList from '../Components/SearchOptionList';

const styles = StyleSheet.create({
   title: {
      fontSize: 15,
      color: C5EC2A4,
      fontWeight: 'bold',
      alignSelf: 'flex-end',
   },
   welcomeTextContainer: {
      marginTop: 20,
      height: 75,
      justifyContent: 'space-around',
   },
   welcomeText: {
      fontSize: 24,
      fontWeight: 'bold',
   },
   textInputContainer: {
      borderWidth: 2,
      height: 44,
      borderColor: C5EC2A4,
      paddingHorizontal: 12,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-evenly',
      marginBottom: 10,
   },
   textInputStyle: {
      width: '94%',
      height: '100%',
   },
   searchContainer: {
      alignSelf: 'flex-end',
      position: 'relative',
      backgroundColor: CFFF,
      width: 120,
   },
   searchOption: {
      borderWidth: 1.5,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-around',
      paddingHorizontal: 5,
      borderColor: C5EC2A4,
      height: 30,
      position: 'relative',
      backgroundColor: CFFF,
      zIndex: 10,
   },
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
      bottom: -50,
      backgroundColor: CFFF,
      borderColor: C5EC2A4,
   },
});

const ClipNewsScreen = () => {
   const [keyWord, setKeyWord] = useState('');
   const [page, setPage] = useState(0);
   const [isLoading, setIsLoading] = useState(false);
   const [isVisibleSearchOptions, setIsVisibleSearchOptions] =
      useState(false);
   const [clips, setClips] = useState<ArticleType[]>([]);
   const [sliceClip, setScliceClip] = useState<ArticleType[]>([]);
   const textInputRef = useRef<TextInput>(null);
   const dispatch = useDispatch();
   const getSelector: DefaultStateType = useSelector(
      (state: any) => state.getArticleSlice
   );
   const isFocus = useIsFocused();
   const setKeywordHandler = (t: string) => {
      setKeyWord(t);
   };
   const setSeachOption = useCallback(
      (whatOption: 'title' | 'content') => {
         dispatch(setSearchOption(whatOption));
         setIsVisibleSearchOptions(!isVisibleSearchOptions);
         setKeyWord('');
      },
      [dispatch, isVisibleSearchOptions]
   );
   useEffect(() => {
      const getitem = async () => {
         setIsLoading(true);
         setClips(await getClipedArticles());
         setIsLoading(false);
      };
      if (isFocus) {
         getitem();
         console.log('포커스 인');
      } else {
         setClips([]);
         setPage(0);
         console.log('포커스 아웃');
      }
   }, [isFocus]);
   useEffect(() => {
      if (clips.length > 0) {
         setScliceClip((prev) => {
            return prev.concat(
               clips.slice(page * 10, page * 10 + 10)
            );
         });
      } else {
         console.log(clips.length);
         setScliceClip([]);
      }
   }, [clips, page]);

   return (
      <View
         style={[
            globalStyles.container,
            { paddingTop: useSafeAreaInsets().top + 10 },
         ]}
      >
         <Text style={styles.title}>숨은 클립</Text>
         <View style={styles.welcomeTextContainer}>
            <Text style={globalStyles.welcomeText}>내 클립</Text>
         </View>
         {isLoading ? <Text>로딩중입니다....</Text> : <Text> </Text>}
         <View style={styles.textInputContainer}>
            <TextInput
               ref={textInputRef}
               placeholder="내클립에서 찾기"
               style={styles.textInputStyle}
               value={keyWord}
               onChangeText={setKeywordHandler}
               autoCorrect={false}
            />
            <Icon name="search1" size={20} color={C000} />
         </View>
         <View style={styles.searchContainer}>
            <TouchableOpacity
               activeOpacity={0.6}
               onPress={() =>
                  setIsVisibleSearchOptions(!isVisibleSearchOptions)
               }
               style={styles.searchOption}
            >
               <Text>
                  {getSelector?.searchOption === 'content'
                     ? '내용 '
                     : '제목 '}
                  검색
               </Text>
               <Icon name="caretdown" size={15} color={C000} />
            </TouchableOpacity>
            {isVisibleSearchOptions && (
               <SearchOptionList setSeachOption={setSeachOption} />
            )}
         </View>
         <ArticleList
            news={keyWord === '' ? sliceClip : clips}
            setPage={setPage}
            keyWord={keyWord}
            clipsLength={clips.length}
         />

         <ArticleWebViewModal />
      </View>
   );
};

export default ClipNewsScreen;
