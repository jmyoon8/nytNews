import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { Ca1a1a1 } from "../../utils/GolobalColors";
import { ArticleListProps } from "../types";
import ArticleComponent from "./ArticleComponent";

const styles = StyleSheet.create({
  flatStyle: {
    borderWidth: 1,
    marginTop: 8,
    borderColor: Ca1a1a1,
  },
});
const ArticleList = ({ news, setWebViewUrl, setPage }: ArticleListProps) => {
  return (
    <FlatList
      bounces={false}
      data={news}
      style={styles.flatStyle}
      onEndReachedThreshold={0.3}
      keyExtractor={({ _id }) => _id}
      onEndReached={() => setPage((prev) => prev + 1)}
      renderItem={({ item }) => (
        <ArticleComponent {...item} setWebViewUrl={setWebViewUrl} />
      )}
    />
  );
};

export default React.memo(ArticleList);
