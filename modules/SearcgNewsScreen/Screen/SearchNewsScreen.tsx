import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { StyleSheet, Text, View, TextInput, FlatList } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import { axiosInstance, myKey } from "../../utils/AxiosInstance";
import { C000, C5EC2A4, Ca1a1a1, CFFF } from "../../utils/GolobalColors";
import { ArticleType, axiosGetType } from "../types";
import _ from "lodash";
import ArticleComponent from "../Components/ArticleComponent";
import ArticleWebViewModal from "../Components/ArticleWebViewModal";
import ArticleList from "../Components/ArticleList";

const styles = StyleSheet.create({
  container: {
    backgroundColor: CFFF,
    height: "100%",
    paddingHorizontal: 12,
    paddingTop: 20,
  },
  title: {
    fontSize: 15,
    color: C5EC2A4,
    fontWeight: "bold",
    alignSelf: "flex-end",
  },
  welcomeTextContainer: {
    marginTop: 20,
    height: 75,
    justifyContent: "space-around",
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  textInputContainer: {
    borderWidth: 2,
    height: 44,
    borderColor: C5EC2A4,
    marginTop: 15,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  textInputStyle: {
    width: "94%",
    height: "100%",
  },
});

const SearchNewsScreen = () => {
  const [keyWord, setKeyWord] = useState("");
  const [page, setPage] = useState(0);
  const [news, setNews] = useState<ArticleType[]>([]);
  const [webViewUrl, setWebViewUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const getArticles = async (
    t: string,
    pageNumber: number,
    isInfinite: boolean
  ) => {
    try {
      setIsLoading(true);
      if (t === "") {
        setNews([]);
      }
      const getdata = await axiosInstance.get<axiosGetType>("", {
        params: {
          q: t,
          ["api-key"]: myKey,
          page: pageNumber,
        },
      });
      if (!isInfinite) {
        setNews(getdata.data.response.docs);
      } else {
        setNews((prev) => prev.concat(getdata.data.response.docs));
      }
    } catch (error) {
      console.log(error, "에러발생");
    } finally {
      setIsLoading(false);
    }
  };

  const debounceHandler = useCallback(
    _.debounce(
      (t: string, page: number, isInfinite: boolean) =>
        getArticles(t, page, isInfinite),
      400
    ),
    []
  );
  const textInputRef = useRef<TextInput>(null);
  const setKeywordHandler = (t: string) => {
    setKeyWord(t);
  };

  useLayoutEffect(() => {
    if (keyWord !== "") {
      debounceHandler(keyWord, 0, false);
    }
  }, [page, keyWord]);
  useEffect(() => {
    if (keyWord !== "") {
      debounceHandler(keyWord, page, true);
    }
  }, [page]);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>숨은 뉴스</Text>
      <View style={styles.welcomeTextContainer}>
        <Text style={styles.welcomeText}>어떤 뉴스를</Text>
        <Text style={styles.welcomeText}>보고 싶으신가요?</Text>
      </View>
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
        news={news}
        setWebViewUrl={setWebViewUrl}
        setPage={setPage}
      />
      {isLoading && <Text>로딩중입니다....</Text>}
      <ArticleWebViewModal
        webViewUrl={webViewUrl}
        setWebViewUrl={setWebViewUrl}
      />
    </View>
  );
};

export default SearchNewsScreen;
