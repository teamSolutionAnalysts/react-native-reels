import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Discover from '../Screens/Discover';
import Stars from '../Screens/Stars';
import Add from '../Screens/Add';
import Cart from '../Screens/Cart';
import Profile from '../Screens/Profile';
import {AppImages} from '../Theme/AppImages';
import {Image} from 'react-native';
import {Colors} from '../Theme/Colors';
import LinearGradient from 'react-native-linear-gradient';
import {string, width} from '../Utils/Constant';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import CartBottomTab from './Component/CartBottomTab';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

//Create Navigation Bottom TabBar
const AppNavigation = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({route, navigation}) => ({
          tabBarIcon: ({focused, color, size}) => {
            let iconName;

            if (route.name === string.discover) {
              iconName = AppImages.discover;
            } else if (route.name === string.stars) {
              iconName = AppImages.stars;
            } else if (route.name === string.add) {
              iconName = AppImages.add;
            } else if (route.name === string.cart) {
              iconName = AppImages.cart;
            } else if (route.name === string.profile) {
              iconName = AppImages.user;
            }

            if (route.name === string.cart) {
              return (
                <CartBottomTab
                  imageName={iconName}
                  color={color}
                  size={size}
                  focused={focused}
                />
              );
            } else {
              return (
                <Image
                  source={iconName}
                  style={{width: size, height: size, tintColor: color}}
                />
              );
            }
          },
          tabBarActiveTintColor: Colors.pink,
          tabBarInactiveTintColor: Colors.white,
          tabBarStyle: {
            borderTopWidth: 0,
            backgroundColor: 'transparent',
            position: 'absolute',
            // elevation: 0,//to get rid of a shadow problem on Android
          },
          tabBarBackground: () => (
            <LinearGradient
              colors={[Colors.tabBarTransparent, Colors.tabBarBlack]}
              style={{height: 60 + useSafeAreaInsets().bottom, width: width}}
              start={{x: 0.0, y: 0}}
              end={{x: 0, y: 0.3}}
            />
          ),
        })}>
        <Tab.Screen
          name={string.discover}
          component={Discover}
          options={{headerShown: false}}
        />
        <Tab.Screen
          name={string.stars}
          component={Stars}
          options={{headerShown: false}}
        />
        <Tab.Screen 
          name={string.add} 
         component={Add} 
          options={{headerShown: false}} 
        />
        <Tab.Screen
          name={string.cart}
          component={Cart}
          options={{headerShown: false}}
        />
        <Tab.Screen
          name={string.profile}
          component={Profile}
          options={{headerShown: false}}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
