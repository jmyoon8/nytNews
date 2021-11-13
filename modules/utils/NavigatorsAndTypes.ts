import {
   BottomTabScreenProps,
   createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';

// navigators
export const MainTab = createBottomTabNavigator<MainTabParamList>();

// navigationTypes
export type MainTabParamList = {
   Main: undefined;
   SearchNews: undefined;
   ClipNews: undefined;
};
// screenTypes
export type SearchNewsProps = BottomTabScreenProps<
   MainTabParamList,
   'SearchNews'
>;

export type ClipNewsProps = BottomTabScreenProps<
   MainTabParamList,
   'ClipNews'
>;
