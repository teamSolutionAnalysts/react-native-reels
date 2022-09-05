import React from 'react';
import {Text, View, SafeAreaView, StyleSheet} from 'react-native';
import { string } from '../Utils/Constant';

const Add = () => {

  const {safeAreaView, viewContainer} = styles

  return (
    <SafeAreaView style={safeAreaView}>
      <View style={viewContainer}>
        <Text>{string.add}</Text>
      </View>
    </SafeAreaView>
  );
};

export default Add;


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
