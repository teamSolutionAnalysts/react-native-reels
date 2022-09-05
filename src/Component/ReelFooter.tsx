import React, {useState, useRef} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  Animated,
  Easing,
  Platform,
} from 'react-native';
import {AppImages} from '../Theme/AppImages';
import {Colors} from '../Theme/Colors';
import {fontSize, string, width} from '../Utils/Constant';
import AnimatedLottieView from 'lottie-react-native';
import {useAppSelector, useAppDispatch} from '../Store/Hooks';
import {increment} from '../Store/Slices/cartCounterSlice';

//Function to create product info footer
const ReelFooters = () => {
  const {
    bottomViewContainer,
    bottomView,
    regularText,
    boldText,
    imageView,
    descriptionView,
    addToCartView,
    addToCartButton,
    lottieView,
    imageAnimatedView,
  } = styles;

  const dispatch = useAppDispatch();
  const [animation, setAnimation] = useState(new Animated.Value(0));
  const [animationSuccess, setAnimationSuccess] = useState(new Animated.Value(0));
  const [animationFadeAndTransform, setAnimationFadeAndTransform] = useState(new Animated.Value(0));
  const [isVisibleProductImage, setIsVisibleProductImage] = useState(true);

  //Function to animation change background color of product view
  const addToCartHandler = () => {
    Animated.timing(animation, {
      toValue: 1,
      duration: 100,
      useNativeDriver: false,
    }).start(() => {
      setIsVisibleProductImage(false);
      handleSuccessAnimation()
      setTimeout(() => {
        // write your functions
        Animated.timing(animation, {
          toValue: 0,
          duration: 100,
          useNativeDriver: false,
        }).start(
          () => handleFadeAndTransformAnimation()
        );
      }, 800);
    });
  };

  //Function to animation of success image icon
  const handleSuccessAnimation = () => {
    Animated.timing(animationSuccess, {
      toValue: 1,
      duration: 800,
      useNativeDriver: false,
    }).start(
      () => {
        setAnimationSuccess(new Animated.Value(0));
      }
    )
  }

  //Function to animation of prodcut image is moving to cart with fade animation
  const handleFadeAndTransformAnimation = () => {
    dispatch(increment())
    Animated.timing(animationFadeAndTransform, {
      toValue: 1,
      duration: 1000,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start(() => {
      setTimeout(() => {
        setIsVisibleProductImage(true);
        setAnimationFadeAndTransform(new Animated.Value(0));
      }, 500);
    });
  };

  
  const animatedProductViewStyle = {
    backgroundColor: animation.interpolate({
      inputRange: [0, 1],
      outputRange: [Colors.opacityBlack, Colors.white],
    }),
  };

  const animatedTextStyle = {
    color: animation.interpolate({
      inputRange: [0, 1],
      outputRange: [Colors.white, Colors.black],
    }),
  };

  const animatedAddToCartStyle = {
    backgroundColor: animation.interpolate({
      inputRange: [0, 1],
      outputRange: [Colors.pink, Colors.white],
    }),
  };

  const animatedImageTransformStyles = {
    opacity: animationFadeAndTransform.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 0],
    }),
    transform: [
      {
        translateY: animationFadeAndTransform.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 80],
          extrapolate: 'clamp',
        }),
      },
    ],
  };

  return (
    <View style={bottomViewContainer}>
      <Animated.View style={{...bottomView, ...animatedProductViewStyle}}>
        {isVisibleProductImage ? (
          <Image source={AppImages.perfume} style={imageView} />
        ) : (
          <AnimatedLottieView
            style={lottieView}
            source={AppImages.animatedSuccessCheckmark}
            progress={animationSuccess}
            autoPlay={false}
            loop={false}
          />
        )}
        <View style={descriptionView}>
          <Animated.Text
            style={{...boldText, ...animatedTextStyle}}
            numberOfLines={1}>
            #Eau de parfum
          </Animated.Text>
          <Animated.Text
            style={{...regularText, ...animatedTextStyle}}
            numberOfLines={1}>
            Top Notes: Bergamot flower
          </Animated.Text>
          <Animated.Text
            style={{...boldText, ...animatedTextStyle}}
            numberOfLines={1}>
            $140
          </Animated.Text>
        </View>
        <Animated.View style={{...addToCartView, ...animatedAddToCartStyle}}>
          <TouchableOpacity
            style={addToCartButton}
            onPress={() => addToCartHandler()}>
            <Text style={[boldText,{textAlign:'center'}]}>{string.addToCart}</Text>
          </TouchableOpacity>
        </Animated.View>
      </Animated.View>

      {!isVisibleProductImage ? (
        <Animated.View
          style={{...imageAnimatedView, ...animatedImageTransformStyles}}>
          <Image
            style={{height: 40, width: 40, borderRadius: 20}}
            source={AppImages.perfume}
          />
        </Animated.View>
      ) : null}
    </View>
  );
};

export {ReelFooters};

const styles = StyleSheet.create({
  boldText: {
    fontWeight: '600',
    color: Colors.white,
    fontSize: fontSize.medium,
  },
  regularText: {
    fontWeight: '300',
    color: Colors.white,
    fontSize: fontSize.medium,
  },
  bottomViewContainer: {
    width: width,
    height: Platform.OS == 'ios' ? 230 : 210,
    position: 'absolute',
    bottom: 0,
    alignItems: 'center',
  },
  bottomView: {
    width: '90%',
    height: 100,
    backgroundColor: Colors.opacityBlack,
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    flexDirection: 'row',
  },
  imageView: {
    height: 60,
    width: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: Colors.pink,
  },
  lottieView: {
    height: 60,
    width: 60,
    borderRadius: 30,
  },
  descriptionView: {
    marginHorizontal: 8,
    flexShrink: 1,
  },
  addToCartView: {
    width: 70,
    height: 50,
    borderRadius: 5,
    backgroundColor: Colors.pink,
  },
  addToCartButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageAnimatedView: {
    marginTop: -20,
    right: -80,
  },
});
