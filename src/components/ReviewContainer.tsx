import {StyleSheet, View} from 'react-native';
import React from 'react';
import ReviewIcon from './ReviewIcon';

const ReviewContainer = ({
  amountOfStars,
  isDisabled = false,
  onPress,
  review,
}: {
  amountOfStars: number;
  isDisabled?: boolean;
  onPress?: (arg: number) => void;
  review: number;
}) => {
  const reviews = [];

  for (let i = 1; i <= amountOfStars; i++) {
    const isActive = i <= review;

    reviews.push(
      <ReviewIcon
        key={`star-${i}`}
        isActive={isActive}
        isDisabled={isDisabled}
        number={i}
        {...(!isDisabled && onPress ? {onPress: () => onPress(1)} : {})}
      />,
    );
  }

  return <View style={styles.reviewContainer}>{reviews}</View>;
};

const styles = StyleSheet.create({
  reviewContainer: {
    flexDirection: 'row',
  },
});

export default ReviewContainer;
