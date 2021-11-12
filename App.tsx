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
import {NavigationContainer} from '@react-navigation/native';
import {MainTab} from './modules/utils/NavigatorsAndTypes';
import Icon from 'react-native-vector-icons/AntDesign';
import SearchNewsScreen from './modules/SearcgNewsScreen/Screen/SearchNewsScreen';
import ClipNewsScreen from './modules/ClipNewsScreen/ClipNewsScreen';

const App = () => {
  return (
    <NavigationContainer>
      <MainTab.Navigator screenOptions={{headerShown: false}}>
        <MainTab.Screen
          name="SearchNews"
          component={SearchNewsScreen}
          options={{
            tabBarIcon: ({color, size}) => (
              <Icon name="search1" size={size} color={color} />
            ),
            title: '뉴스검색',
          }}
        />
        <MainTab.Screen
          options={{
            tabBarIcon: ({size, color}) => (
              <Icon name="paperclip" color={color} size={size} />
            ),
            title: '내가 저장한 뉴스',
          }}
          name="ClipNews"
          component={ClipNewsScreen}
        />
      </MainTab.Navigator>
    </NavigationContainer>
  );
};

export default App;
