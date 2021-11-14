import React from 'react';
import { StyleSheet, View } from 'react-native';
import { CFFF } from '../../utils/GolobalColors';
import { NewsDeskStack } from '../../utils/NavigatorsAndTypes';
import NewsDeskCategory from '../Screen/NewsDeskCategory';
import NewsDeskView from '../Screen/NewsDeskView';
import { NewsDeskStackNavigationProps } from '../type';

const styles = StyleSheet.create({
   container: {
      height: '100%',
      backgroundColor: CFFF,
   },
});
const NewsDeskStackNavigation = ({
   isClip,
}: NewsDeskStackNavigationProps) => {
   console.log(isClip, 'asdasd');
   return (
      <View style={styles.container}>
         <NewsDeskStack.Navigator>
            <NewsDeskStack.Screen
               options={{ headerShown: false }}
               name="NewsDeskCategory"
               component={NewsDeskCategory}
            />
            <NewsDeskStack.Screen
               name="NewsDeskView"
               component={NewsDeskView}
            />
         </NewsDeskStack.Navigator>
      </View>
   );
};

export default NewsDeskStackNavigation;
