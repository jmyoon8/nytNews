import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SearchNewsProps } from "../utils/NavigatorsAndTypes";

const styles = StyleSheet.create({});

const ClipNewsScreen = ({ navigation, route }: SearchNewsProps) => {
  return (
    <SafeAreaView>
      <Text>클립</Text>
    </SafeAreaView>
  );
};

export default ClipNewsScreen;
