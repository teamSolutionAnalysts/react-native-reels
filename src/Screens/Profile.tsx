import React from 'react';
import {Text, View, SafeAreaView, StyleSheet} from 'react-native';
import { string } from '../Utils/Constant';

const Profile = () => {

  const {safeAreaView, viewContainer} = styles

  return (
    <SafeAreaView style={safeAreaView}>
      <View style={viewContainer}>
        <Text>{string.profile}</Text>
      </View>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1
  },
  viewContainer: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center'
  }
})