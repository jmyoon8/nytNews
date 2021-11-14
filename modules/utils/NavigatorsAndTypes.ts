import {
   BottomTabScreenProps,
   createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {
   createStackNavigator,
   StackScreenProps,
} from '@react-navigation/stack';

// navigators
//    tab
export const MainTab = createBottomTabNavigator<MainTabParamList>();
//    stack
export const NewsDeskStack =
   createStackNavigator<NewsDeskParamList>();

// navigationTypes
export type MainTabParamList = {
   Main: undefined;
   SearchNews: undefined;
   ClipNews: undefined;
};
export type NewsDeskParamList = {
   NewsDeskCategory: undefined;
   NewsDeskView: { deskType: string };
};
// screenTypes
//    mainTab
export type SearchNewsProps = BottomTabScreenProps<
   MainTabParamList,
   'SearchNews'
>;

export type ClipNewsProps = BottomTabScreenProps<
   MainTabParamList,
   'ClipNews'
>;
//    NewsDeskCategoryTypes
export type NewsDeskCategoryProps = StackScreenProps<
   NewsDeskParamList,
   'NewsDeskCategory'
>;

export type NewsDeskViewProps = StackScreenProps<
   NewsDeskParamList,
   'NewsDeskView'
>;
