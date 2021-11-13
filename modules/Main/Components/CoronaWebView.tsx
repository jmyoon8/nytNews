import React, { useState } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import WebView, { WebViewNavigation } from 'react-native-webview';

const styles = StyleSheet.create({
   minHeight100: {
      minHeight: Dimensions.get('screen').height,
   },
});
const CoronaWebView = () => {
   const [isWebViewLoading, setIsWebViewLoading] = useState(false);
   return (
      <View style={styles.minHeight100}>
         {isWebViewLoading && <Text>로딩중...</Text>}
         <WebView
            source={{
               uri: 'https://www.nytimes.com/article/coronavirus-county-data-us.html',
            }}
            startInLoadingState={true}
            originWhitelist={['']}
            pagingEnabled={false}
            onNavigationStateChange={(event: WebViewNavigation) => {
               setIsWebViewLoading(event.loading);
            }}
         />
      </View>
   );
};

export default CoronaWebView;
