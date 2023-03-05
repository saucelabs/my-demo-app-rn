import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {Colors} from '../styles/Colors';
import I18n from '../config/I18n';
import {testProperties} from '../config/TestProperties';

const ReviewIcon = ({
  isActive,
  isDisabled = false,
  number,
  onPress,
}: {
  isActive: boolean;
  number: number;
  isDisabled?: boolean;
  onPress?: () => void;
}) => {
  return (
    <TouchableOpacity
      disabled={isDisabled}
      {...(!isDisabled && onPress ? {onPress: onPress} : {})}
      {...testProperties(`${I18n.t('reviewIcon.testId')} ${number}`)}
      style={styles.container}>
      <Icon
        name="star-circle"
        style={[styles.reviewIcon, isActive ? styles.activeReviewIcon : {}]}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 25,
    width: 25,
  },
  reviewIcon: {
    fontSize: 18,
    color: Colors.lightGray,
  },
  activeReviewIcon: {
    color: Colors.green,
  },
});

export default ReviewIcon;
