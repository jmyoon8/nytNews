import React from 'react';
import { Modal, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/EvilIcons';
import { CFFF } from '../../utils/GolobalColors';
import { TouchableOpacity } from 'react-native-gesture-handler';
import WebView, { WebViewNavigation } from 'react-native-webview';
import { useDispatch, useSelector } from 'react-redux';
import { DefaultStateType } from '../../utils/reduxToolkit/reduxType';
import { setWebViewUrl } from '../../utils/reduxToolkit/getArticleSlice';

const styles = StyleSheet.create({
   centeredView: {
      flex: 1,
   },
   headerContainer: {
      flexDirection: 'row',
      alignItems: 'center',

      height: 44,
   },
   container: {
      height: 44,
      backgroundColor: CFFF,
      justifyContent: 'center',
   },
});

const ArticleWebViewModal = () => {
   const selector: DefaultStateType = useSelector(
      (state: any) => state.getArticleSlice
   );
   const dispatch = useDispatch();

   return (
      <>
         <Modal
            animationType="slide"
            transparent={true}
            visible={selector.webViewUrl !== ''}
         >
            <SafeAreaView style={styles.centeredView}>
               <View style={styles.container}>
                  <TouchableOpacity
                     style={styles.headerContainer}
                     onPress={() => dispatch(setWebViewUrl(''))}
                  >
                     <Icon name="close" size={25} />
                     <Text>뒤로가기</Text>
                  </TouchableOpacity>
               </View>
               <WebView
                  source={{ uri: selector.webViewUrl }}
                  startInLoadingState={true}
                  originWhitelist={['']}
                  onNavigationStateChange={(
                     event: WebViewNavigation
                  ) => {
                     console.log(event);
                  }}
               />
            </SafeAreaView>
         </Modal>
      </>
   );
};

export default ArticleWebViewModal;
