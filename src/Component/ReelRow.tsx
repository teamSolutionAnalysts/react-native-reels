import React from 'react';
import {View} from 'react-native';
import { ReelSideBar } from './ReelSideBar';
import {VideoComponent} from './VideoComponent';

const ReelRow = ({item, isVisible, isNext} : {item: any, isVisible: boolean, isNext: boolean}) => {
  
  return (
    <View>
      <VideoComponent item={item} isNext={isNext} isVisible={isVisible} />
      <ReelSideBar item={item} />
    </View>
  );
};

export {ReelRow};
