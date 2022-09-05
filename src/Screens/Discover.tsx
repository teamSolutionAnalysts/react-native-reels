import React, {useRef, useState} from 'react';
import { View, Animated} from 'react-native';
import { ReelRow } from '../Component/ReelRow';
import CommonStyle from '../Theme/CommonStyle';
import { height } from '../Utils/Constant';
import videos from '../Utils/Videos';

const Discover = () => {
  const refFlatList = useRef(null);
  const [scrollY] = useState(new Animated.Value(0));
  const [scrollInfo, setScrollInfo] = useState({isViewable: true, index: 0});
  const viewabilityConfig = {viewAreaCoveragePercentThreshold: 80};
  const onViewableItemsChanged = useRef((viewableItems: any) => {
    const info = {
      isViewable: viewableItems.changed[0].isViewable,
      index: viewableItems.changed[0].index,
    };
    setScrollInfo(info);
  });  

  const getItemLayout = (item: any, index: number) => ({
    length: height,
    offset: height * index,
    index,
  });

  const onEndReached = () => {
    // make api call here
  };

  //Used to extract a unique key for a given item at the specified index.
  const keyExtractor = (item: any, index: number) => {
    return `${item._id}`;
  };

  //Takes an item from videos list and render
  const renderItem = ({item, index} : {item: any, index: number}) => {

    const scrollIndex = scrollInfo?.index || 0;
    const isNext = index >= scrollIndex - 1 && index <= scrollIndex + 1;
    return (
      <ReelRow
        item={item}
        isNext={isNext}
        isVisible={scrollIndex === index}
      />
    );
  };

  return (
    <View style={CommonStyle.flexContainer}>
      <Animated.FlatList
        pagingEnabled
        showsVerticalScrollIndicator={false}
        ref={refFlatList}
        automaticallyAdjustContentInsets={true}
        onViewableItemsChanged={onViewableItemsChanged.current}
        viewabilityConfig={viewabilityConfig}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {contentOffset: {y: scrollY}},
              
            },
          ],
          {
            useNativeDriver: false,
          },
        )}
        data={videos}
        renderItem={renderItem}
        getItemLayout={getItemLayout}
        keyExtractor={keyExtractor}
        onEndReachedThreshold={20}
        onEndReached={onEndReached}
        removeClippedSubviews={true}
        decelerationRate={0.9}
      />
    </View>
  );
};

export default Discover;
