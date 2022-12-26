// Grave, K., n.d. Detect swipe left in React Native (online). Stackoverflow. Available from: https://stackoverflow.com/questions/45854450/detect-swipe-left-in-react-native [Accessed 26/12/2022]

// adapted to pass parameters to callback

import { Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;

export function useSwipe(onSwipeLeft?: any, onSwipeRight?: any, rangeOffset = 4) {
  let firstTouch = 0;

  // set user touch start position
  function onTouchStart(e: any, ...args: any) {
    firstTouch = e.nativeEvent.pageX;
  }

  // when touch ends check for swipe directions
  function onTouchEnd(e: any, ...args: any) {
    // get touch position and screen size
    const positionX = e.nativeEvent.pageX;
    const range = windowWidth / rangeOffset;

    // check if position is growing positively and has reached specified range
    if (positionX - firstTouch > range) {
      onSwipeRight && onSwipeRight(...args);
    }
    // check if position is growing negatively and has reached specified range
    else if (firstTouch - positionX > range) {
      onSwipeLeft && onSwipeLeft(...args);
    }
  }

  return { onTouchStart, onTouchEnd };
}
