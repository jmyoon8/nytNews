import React, { useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArticleWebViewModalProps } from "../types";
import Icon from "react-native-vector-icons/EvilIcons";
import { CFFF } from "../../utils/GolobalColors";
import { TouchableOpacity } from "react-native-gesture-handler";
import WebView, { WebViewNavigation } from "react-native-webview";

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    borderWidth: 2,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",

    height: 44,
  },
});

const ArticleWebViewModal = ({
  setWebViewUrl,
  webViewUrl,
}: ArticleWebViewModalProps) => {
  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={webViewUrl !== ""}
      >
        <SafeAreaView style={styles.centeredView}>
          <View
            style={{
              height: 44,
              backgroundColor: CFFF,
              justifyContent: "center",
            }}
          >
            <TouchableOpacity
              style={styles.headerContainer}
              onPress={() => setWebViewUrl("")}
            >
              <Icon name="close" size={25} />
              <Text>뒤로가기</Text>
            </TouchableOpacity>
          </View>
          <WebView
            source={{ uri: webViewUrl }}
            startInLoadingState={true}
            originWhitelist={[""]}
            onNavigationStateChange={(event: WebViewNavigation) => {
              console.log(event);
            }}
          />
        </SafeAreaView>
      </Modal>
    </>
  );
};

export default ArticleWebViewModal;
