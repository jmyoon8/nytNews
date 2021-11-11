import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { MainTab } from "./modules/utils/NavigatorsAndTypes";

import SearchNewsScreen from "./modules/SearcgNewsScreen/Screen/SearchNewsScreen";
import ClipNewsScreen from "./modules/ClipNewsScreen/ClipNewsScreen";
import Icon from "react-native-vector-icons/AntDesign";

export default function App() {
  return (
    <NavigationContainer>
      <MainTab.Navigator screenOptions={{ headerShown: false }}>
        <MainTab.Screen
          name="SearchNews"
          component={SearchNewsScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon name="search1" size={size} color={color} />
            ),
            title: "뉴스검색",
          }}
        />
        <MainTab.Screen
          options={{
            tabBarIcon: ({ size, color }) => (
              <Icon name="paperclip" color={color} size={size} />
            ),
            title: "내가 저장한 뉴스",
          }}
          name="ClipNews"
          component={ClipNewsScreen}
        />
      </MainTab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
