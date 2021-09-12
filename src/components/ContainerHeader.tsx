import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {MUSEO_SANS_700} from '../utils/Constants';
import {testProperties} from '../config/TestProperties';
import I18n from '../config/I18n';

const ContainerHeader = ({
  title,
  containerStyle = {},
  rightComponent,
}: {
  title: string;
  containerStyle?: {[key: string]: any};
  rightComponent?: {};
}) => {
  return (
    <View
      style={[styles.container, containerStyle]}
      {...testProperties(I18n.t('containerHeader.testId'))}>
      <Text style={styles.title}>{title}</Text>
      {rightComponent && (
        <View style={styles.rightComponent}>{rightComponent}</View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    paddingBottom: 25,
    paddingTop: 25,
    paddingLeft: 20,
    paddingRight: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 24,
    fontFamily: MUSEO_SANS_700,
  },
  rightComponent: {},
});

export default ContainerHeader;
