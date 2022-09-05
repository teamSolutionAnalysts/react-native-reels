import React from 'react';
import {Text, View, SafeAreaView, StyleSheet} from 'react-native';
import { string } from '../Utils/Constant';

const Stars = () => {

  const {safeAreaView, viewContainer} = styles

  return (
    <SafeAreaView style={safeAreaView}>
      <View style={viewContainer}>
        <Text>{string.stars}</Text>
      </View>
    </SafeAreaView>
  );
};

export default Stars;

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