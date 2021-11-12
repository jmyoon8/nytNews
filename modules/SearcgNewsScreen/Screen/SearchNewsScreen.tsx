/* eslint-disable react-hooks/exhaustive-deps */
import React, {
   useCallback,
   useEffect,
   useLayoutEffect,
   useRef,
   useState,
} from 'react';
import {
   StyleSheet,
   Text,
   View,
   TextInput,
   Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { C000, C5EC2A4 } from '../../utils/GolobalColors';
import { GetArticleData } from '../types';
import _ from 'lodash';
import ArticleWebViewModal from '../Components/ArticleWebViewModal';
import ArticleList from '../Components/ArticleList';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { getArticlesAsync } from '../../utils/reduxToolkit/getArticleSlice';
import { globalStyles } from '../../utils/GlobalStyle';

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
      marginTop: 15,
      paddingHorizontal: 12,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-evenly',
   },
   textInputStyle: {
      width: '94%',
      height: '100%',
   },
});

const SearchNewsScreen = () => {
   const [keyWord, setKeyWord] = useState('');
   const [page, setPage] = useState(0);
   const [isLoading, setIsLoading] = useState(false);
   const dispatch = useDispatch();
   const getSelector: GetArticleData = useSelector(
      (state: any) => state.getArticleSlice
   );

   const debounceHandler = useCallback(
      _.debounce(
         (t: string, pageNumber: number, isInfinite: boolean) =>
            dispatch(
               getArticlesAsync({ t, page: pageNumber, isInfinite })
            ),
         400
      ),
      []
   );
   const textInputRef = useRef<TextInput>(null);
   const setKeywordHandler = (t: string) => {
      setKeyWord(t);
   };

   useLayoutEffect(() => {
      if (keyWord !== '') {
         debounceHandler(keyWord, page, false);
      }
   }, [page, keyWord]);
   useEffect(() => {
      if (keyWord !== '') {
         debounceHandler(keyWord, page, true);
      }
   }, [page]);
   useEffect(() => {
      if (getSelector.apiState === 'pending') {
         setIsLoading(true);
      }
      if (getSelector.apiState === 'fulfilled') {
         setIsLoading(false);
      }
      if (getSelector.apiState === 'rejected') {
         Alert.alert('서버에러');
      }
   }, [getSelector]);
   return (
      <View
         style={[
            globalStyles.container,
            { paddingTop: useSafeAreaInsets().top + 10 },
         ]}
      >
         <Text style={styles.title}>숨은 뉴스</Text>
         <View style={styles.welcomeTextContainer}>
            <Text style={globalStyles.welcomeText}>어떤 뉴스를</Text>
            <Text style={globalStyles.welcomeText}>
               보고 싶으신가요?
            </Text>
         </View>
         {isLoading ? <Text>로딩중입니다....</Text> : <Text> </Text>}
         <View style={styles.textInputContainer}>
            <TextInput
               ref={textInputRef}
               placeholder="어떤 뉴스를 찾으시나요?"
               style={styles.textInputStyle}
               value={keyWord}
               onChangeText={setKeywordHandler}
               autoCorrect={false}
            />
            <Icon name="search1" size={20} color={C000} />
         </View>

         <ArticleList
            news={getSelector?.result?.response?.docs}
            setPage={setPage}
         />

         <ArticleWebViewModal />
      </View>
   );
};

export default SearchNewsScreen;
