import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { C000, C5EC2A4, CFFF } from '../../utils/GolobalColors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { globalStyles } from '../../utils/GlobalStyle';
import StickyParallaxHeader from 'react-native-sticky-parallax-header';
import CoronaWebView from '../Components/CoronaWebView';
import NewDeskView from '../Components/NewsDeskView';
import { deskArray } from '../../utils/NewsDesks';

const Main = () => {
   const inset = useSafeAreaInsets();
   const styles = StyleSheet.create({
      title: {
         fontSize: 15,
         color: C5EC2A4,
         fontWeight: 'bold',
         alignSelf: 'flex-end',
      },
      welcomeTextContainer: {
         marginTop: 20,
         justifyContent: 'space-around',
         height: 120,
      },
      header: {
         paddingTop: inset.top + 12,
         backgroundColor: CFFF,
         paddingRight: 12,
      },
      titleStyle: {
         color: C000,
         fontSize: 40,
         fontWeight: 'bold',
      },
      foreGroundContainer: {
         flex: 1,
         width: Dimensions.get('screen').width,
         justifyContent: 'flex-start',
         padding: 12,
      },
      activityTabContainer: {
         backgroundColor: CFFF,
         borderRadius: 15,
         height: 30,
      },
      tabTextStyle: {
         borderWidth: 0,
         paddingHorizontal: 12,
      },
      height: {
         height: 50,
      },
      tabTextContainerStyle: {
         height: 30,
         borderRadius: 15,
         marginHorizontal: 2,
         backgroundColor: C5EC2A4,
      },
   });
   // todo 최근 검색어 만들고 카테고리 정렬해보자(news_desk)

   return (
      <View style={{ flex: 1 }}>
         <StickyParallaxHeader
            backgroundImage={require('../Images/backGround.png')}
            headerType="TabbedHeader"
            headerHeight={80}
            parallaxHeight={200}
            decelerationRate={200}
            bounces={false}
            header={() => (
               <View style={styles.header}>
                  <Text style={styles.title}>숨은 기사</Text>
               </View>
            )}
            title="기사찾기"
            titleStyle={styles.titleStyle}
            foreground={() => (
               <View style={styles.foreGroundContainer}>
                  <View style={styles.welcomeTextContainer}>
                     <Text style={globalStyles.welcomeText}>
                        숨은 기사와 함께
                     </Text>
                     <Text style={globalStyles.welcomeText}>
                        어떤 뉴스를
                     </Text>
                     <Text style={globalStyles.welcomeText}>
                        보고 싶으신가요?
                     </Text>
                  </View>
               </View>
            )}
            tabsContainerStyle={styles.height}
            tabTextContainerActiveStyle={styles.activityTabContainer}
            tabTextActiveStyle={{
               color: C5EC2A4,
            }}
            tabTextStyle={styles.tabTextStyle}
            tabTextContainerStyle={styles.tabTextContainerStyle}
            contentContainerStyles={{
               backgroundColor: CFFF,
            }}
            tabs={[
               {
                  content: <CoronaWebView />,
                  title: 'NYT Corona News',
               },
            ].concat(
               deskArray.map((item) => ({
                  content: <NewDeskView key={item} deskType={item} />,
                  title: item,
               }))
            )}
         />
      </View>
   );
};

export default Main;
