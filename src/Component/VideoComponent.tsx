import React, {useEffect, useRef, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import Video from 'react-native-video';
import CommonStyle from '../Theme/CommonStyle';
import {height, width} from '../Utils/Constant';
import {ReelFooters} from './ReelFooter';
import {useAppSelector} from '../Store/Hooks';
import { Colors } from '../Theme/Colors';

//Function to create video component for reel
const VideoComponent = ({
  item,
  isNext,
  isVisible,
}: {
  item: any;
  isNext: boolean;
  isVisible: boolean;
}) => {
  const {uri} = item;
  const videoRef = useRef(null);
  const {videoOuter} = styles;
  const isMute = useAppSelector(state => state.isMute.isMute);
  const [VideoDimensions, SetVideoDimensions] = useState({
    width: width,
    height: height,
  });

  useEffect(() => {
    if (!isVisible && isNext && videoRef) {
      // videoRef.current.seek(0);
    }
  }, [isVisible, isNext]);

  const videoError = (error: any) => {
    // Manage error here
  };

  // function for getting video dimensions on load complete
  const onLoadComplete = (event: any) => {
    const {naturalSize} = event;

    try {
      const naturalWidth = naturalSize.width;
      const naturalHeight = naturalSize.height;
      if (naturalWidth > naturalHeight) {
        SetVideoDimensions({
          width: width,
          height: width * (naturalHeight / naturalWidth),
        });
      } else {
        SetVideoDimensions({
          width: height * (naturalWidth / naturalHeight),
          height: height,
        });
      }
    } catch (error) {}
  };

  return (
    <View style={[videoOuter, {height: height}]}>
      <Video
        ref={videoRef}
        fullscreenAutorotate={true}
        source={uri}
        repeat={true}
        onError={videoError}
        muted={(!isVisible && true) || isMute}
        style={VideoDimensions}
        playInBackground={false}
        paused={!isVisible}
        onLoad={onLoadComplete}
        ignoreSilentSwitch={'ignore'}
      />

      <ReelFooters />
    </View>
  );
};

export {VideoComponent};

const styles = StyleSheet.create({
  videoOuter: {
    width,
    backgroundColor:Colors.black,
    ...CommonStyle.center,
  },
});
