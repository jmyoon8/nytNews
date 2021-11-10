import moment from "moment";
import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Pressable,
} from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import {
  deleteClipData,
  getClipedArticle,
  setClipData,
} from "../../utils/AsyncStorageHandler";
import { C000, Ca1a1a1, Ceae649 } from "../../utils/GolobalColors";
import { ArticleType } from "../types";

const styles = StyleSheet.create({
  articleContainer: {
    paddingLeft: 12,
    paddingRight: 40,
    marginBottom: 8,
    height: 100,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  articleBox: {
    justifyContent: "space-around",
    height: "100%",
  },
  headerLineText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: -8,
  },
  snippetText: {
    fontSize: 14,
  },
  pubDateText: {
    color: Ca1a1a1,
  },
});

const ArticleComponent = (props) => {
  const {
    _id,
    web_url,
    pub_date,
    headline,
    snippet,
    setWebViewUrl,
  }: ArticleType & {
    setWebViewUrl: React.Dispatch<React.SetStateAction<string>>;
  } = props;
  // keywords,
  // abstract,
  // byline,
  // document_tpye,
  // news_desk,
  // section_name,
  // source,
  // type_of_material,
  const [isClip, setIsClip] = useState(false);
  const setClip = async () => {
    if (!isClip) {
      setIsClip(true);
      await setClipData({ snippet, web_url, _id, headline, pub_date });
    } else {
      setIsClip(false);
      await deleteClipData(_id);
    }
  };
  useLayoutEffect(() => {
    // 클립채크
    getClipedArticle(_id, (item) => {
      if (item) {
        setIsClip(true);
      }
    });
  }, []);

  return (
    <TouchableOpacity
      onPress={() => setWebViewUrl(web_url)}
      style={styles.articleContainer}
    >
      <View style={styles.articleBox}>
        <Text numberOfLines={1} style={styles.headerLineText}>
          {headline.print_headline || "Title - Is - Missing"}
        </Text>
        <Text style={styles.snippetText} numberOfLines={2}>
          {snippet}
        </Text>
        <Text style={styles.pubDateText}>
          작설일자 : {moment(pub_date).format("YYYY년 MM월 DD일 HH:mm")}
        </Text>
      </View>
      <TouchableOpacity
        onPress={setClip}
        style={{ position: "absolute", right: 6 }}
      >
        <Icon name="paperclip" size={22} color={isClip ? Ceae649 : C000} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default ArticleComponent;
