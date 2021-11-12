import {
  BottomTabScreenProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';

// navigators
export const MainTab = createBottomTabNavigator<MainTabParamList>();

// navigationType
export type MainTabParamList = {
  SearchNews: {initParam: string};
  ClipNews: {initParam: string};
};

export type SearchNewsProps = BottomTabScreenProps<
  MainTabParamList,
  'SearchNews'
>;
export type ClipNewsProps = BottomTabScreenProps<MainTabParamList, 'ClipNews'>;
