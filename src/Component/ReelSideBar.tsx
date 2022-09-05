import React from 'react';
import {
  View,
  Animated,
  TouchableOpacity,
  Image,
  Text,
  StyleSheet,
  Platform,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {AppImages} from '../Theme/AppImages';
import { Colors } from '../Theme/Colors';
import {width} from '../Utils/Constant';
import {useAppSelector, useAppDispatch} from '../Store/Hooks';
import { volume } from '../Store/Slices/videoVolumeSlice';


//Function to used render side bar buttons
const RenderIcon = ({obj, onPress, exStyle = {}} : {obj: any, onPress:any, exStyle: object}) => {
  const {iconOuter, center, icon, text} = styles;
  const {type, imageIcon, size = 30, disText} = obj;

  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={() => onPress(type)}
      style={iconOuter}>
      <View style={center}>
        <Image
          source={imageIcon}
          style={[
            icon,
            {
              height: size,
              width: size,
              tintColor: Colors.white,
            },
            exStyle,
          ]}
          resizeMode={'contain'}
        />
        {(disText && (
          <Text style={[text, {color: Colors.white}]}>{`${disText}`}</Text>
        )) ||
          null}
      </View>
    </TouchableOpacity>
  );
};

//Function to create for sidebar button
const ReelSideBar = ({item} : {item: any}) => {
  const insets = useSafeAreaInsets();
  const {sideBar} = styles;
  const {like, comment, likeStatus} = item;
  const dispatch = useAppDispatch();
  const isMute = useAppSelector(state => state.isMute.isMute);


  //Function to create action for side bar buttons
  const makeAction = async (type: string) => {
    // Here perfom feed action based on Type
    if (type == "Volume") {
      dispatch(volume())
    }
  };

  return (
    <Animated.View
      style={[
        sideBar,
        {
          bottom: insets.bottom + 210,
        },
      ]}>
      <RenderIcon
        obj={{
          imageIcon: AppImages.heart,
          disText: like,
          size: 35,
          type: 'Like',
        }}
        exStyle={{tintColor: (likeStatus && Colors.pink) || Colors.white}}
        onPress={makeAction}
      />
      <RenderIcon
        obj={{imageIcon: AppImages.comment, disText: comment, type: 'Comment'}}
        onPress={makeAction}
        exStyle={{}}
      />
      <RenderIcon
        obj={{imageIcon: AppImages.share, type: 'Share'}}
        onPress={makeAction}
        exStyle={{}}
      />
      <RenderIcon
        obj={{imageIcon: isMute ? AppImages.mute : AppImages.volume, size: 35, type: 'Volume'}}
        onPress={makeAction}
        exStyle={{}}
      />
    </Animated.View>
  );
};

export {ReelSideBar};

const styles = StyleSheet.create({
  icon: {
    marginHorizontal: 10,
    marginVertical: 5,
  },
  text: {
    fontSize: 15,
    textAlign: 'center',
  },
  sideBar: {
    width: 80,
    position: 'absolute',
    zIndex: 1000,
    right: 0,
    alignItems: 'center',
  },
  iconOuter: {
    marginVertical: 8,
  },
  center: {
    alignItems: 'center',
  },
  imageOuter: {
    width,
    justifyContent: 'center',
  },
});