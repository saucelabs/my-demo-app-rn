import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {DevicesInterface} from '../data/getDevices';
import {Colors} from '../styles/Colors';

const DeviceTile = ({
  device: {
    id,
    name: deviceName,
    os,
    osVersion,
    resolutionHeight,
    resolutionWidth,
  },
}: {
  device: DevicesInterface;
}) => {
  const imgUrl = `https://d3ty40hendov17.cloudfront.net/device-pictures/${id}_optimised.png`;
  return (
    <View style={[styles.container]}>
      <View style={styles.deviceDescription}>
        <Text style={styles.title}>{deviceName}</Text>
      </View>
      <View style={styles.imageTextWrapper}>
        <View style={styles.imageWrapper}>
          <View style={styles.horizontalContainer} />
          <View style={styles.verticalContainer} />
          <Image
            resizeMode="contain"
            style={styles.image}
            source={{uri: imgUrl}}
          />
        </View>
        <View style={styles.deviceDetails}>
          <Text style={styles.deviceDetailsText}>
            {os} {osVersion}
          </Text>
          <Text style={styles.deviceDetailsText}>
            {resolutionWidth}x{resolutionHeight}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 2,
    backgroundColor: Colors.white,
    borderColor: Colors.lightGray,
    borderWidth: 1,
    marginVertical: 5,
    flex: 1,
    padding: 6,
    flexDirection: 'column',
    marginHorizontal: 5,
  },
  imageTextWrapper: {
    flexDirection: 'row',
  },
  imageWrapper: {
    borderColor: Colors.lightGray,
    borderWidth: 1,
  },
  horizontalContainer: {
    backgroundColor: Colors.white,
    position: 'absolute',
    width: 72,
    height: 55,
    top: 7,
    bottom: 7,
    left: -1,
    right: -1,
  },
  verticalContainer: {
    backgroundColor: Colors.white,
    position: 'absolute',
    width: 55,
    height: 72,
    left: 7,
    right: 7,
    bottom: -1,
    top: -1,
  },
  image: {
    width: 70,
    height: 70,
    zIndex: 10,
  },
  deviceDescription: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
  },
  title: {
    color: Colors.black,
    fontSize: 12,
    fontWeight: '700',
    marginRight: 5,
    textAlign: 'center',
    flex: 1,
  },
  deviceDetails: {
    marginLeft: 10,
    paddingVertical: 10,
  },
  deviceDetailsText: {
    color: Colors.black,
    fontSize: 10,
  },
});

export default DeviceTile;
