/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { MainTab } from './modules/utils/NavigatorsAndTypes';
import Icon from 'react-native-vector-icons/AntDesign';
import MaterialsIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import SearchNewsScreen from './modules/SearchNews/Screen/SearchScreen';
import ClipNewsScreen from './modules/ClipNewsScreen/Screen/ClipNewsScreen';
import { Provider } from 'react-redux';
import configureStroe from './modules/utils/reduxToolkit/configureStroe';
import Main from './modules/Main/Screen/Main';

const App = () => {
   return (
      <Provider store={configureStroe}>
         <NavigationContainer>
            <MainTab.Navigator screenOptions={{ headerShown: false }}>
               <MainTab.Screen
                  name="Main"
                  component={Main}
                  options={{
                     tabBarIcon: ({ color, size }) => (
                        <MaterialsIcon
                           name="newspaper-variant-multiple-outline"
                           size={size}
                           color={color}
                        />
                     ),
                     title: '메인',
                  }}
               />
               <MainTab.Screen
                  name="SearchNews"
                  component={SearchNewsScreen}
                  options={{
                     tabBarIcon: ({ color, size }) => (
                        <Icon
                           name="search1"
                           size={size}
                           color={color}
                        />
                     ),
                     title: '뉴스검색',
                  }}
               />
               <MainTab.Screen
                  options={{
                     tabBarIcon: ({ size, color }) => (
                        <Icon
                           name="paperclip"
                           color={color}
                           size={size}
                        />
                     ),
                     title: '내가 저장한 뉴스',
                  }}
                  name="ClipNews"
                  component={ClipNewsScreen}
               />
            </MainTab.Navigator>
         </NavigationContainer>
      </Provider>
   );
};

export default App;
