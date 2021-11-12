import {
   BottomTabScreenProps,
   createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import { axiosGetType } from '../SearcgNewsScreen/types';

// navigators
export const MainTab = createBottomTabNavigator<MainTabParamList>();

// navigationTypes
export type MainTabParamList = {
   SearchNews: { initParam: string };
   ClipNews: { initParam: string };
};
// screenTypes
export type SearchNewsProps = BottomTabScreenProps<MainTabParamList, 'SearchNews'>;

export type ClipNewsProps = BottomTabScreenProps<MainTabParamList, 'ClipNews'>;

// reduxTypes
export type ActionType = { type: string; payload: Promise<axiosGetType> };
export type DefaultStateType = {
   result: any;
   apiState: 'pending' | 'fulfilled' | 'rejected';
};
