import React, {useState, useEffect} from 'react';
import {Text, View, Image, Animated, Easing, StyleSheet} from 'react-native';
import {fontSize} from '../../Utils/Constant';
import AnimatedLottieView from 'lottie-react-native';
import {AppImages} from '../../Theme/AppImages';
import {useAppSelector} from '../../Store/Hooks';

//Custom cart tab button.
//Manage animation when clicked on AddToCart.
const CartBottomTab = (props: any) => {
  const [animationProgress, setAnimationProgress] = useState(
    new Animated.Value(0),
  );
  const count = useAppSelector(state => state.count.value);
  const {animatedCartView, badgeView, badgeText} = styles;

  //Cart button animation when count update.
  useEffect(() => {
    if (count != 0) {
      handleCartAnimation();
    }
  }, [count]);

  //Start cart animation
  const handleCartAnimation = () => {
    Animated.timing(animationProgress, {
      toValue: 1,
      duration: 1000,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start(() => {
      setTimeout(() => {
        setAnimationProgress(new Animated.Value(0));
      }, 500);
    });
  };

  return (
    <View style={{flexDirection: 'row'}}>
      {props.focused ? (
        <AnimatedLottieView
          style={animatedCartView}
          source={AppImages.pink_cartanimation}
          progress={animationProgress}
          autoPlay={false}
          loop={false}
        />
      ) : (
        <AnimatedLottieView
          style={animatedCartView}
          source={AppImages.cartanimation}
          progress={animationProgress}
          autoPlay={false}
          loop={false}
        />
      )}
      {count != 0 ? (
        <View style={badgeView}>
          <Text style={badgeText}>{count}</Text>
        </View>
      ) : null}
    </View>
  );
};

export default CartBottomTab;

const styles = StyleSheet.create({
  animatedCartView: {
    height: 40,
    width: 40,
  },
  badgeView: {
    width: 15,
    height: 15,
    borderRadius: 7.5,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: 'white',
    fontSize: fontSize.xsmall,
  },
});
