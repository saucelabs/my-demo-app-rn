import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {DcEnum, LOCATION} from '../data/getDevices';
import {Colors} from '../styles/Colors';

const DcButtons = ({
  dc,
  selectDc,
}: {
  dc: string;
  selectDc: (dc: DcEnum) => void;
}) => {
  return (
    <View style={styles.dcButtonContainer}>
      <Pressable
        style={[
          styles.dcButton,
          styles.borderLeft,
          dc === DcEnum.EU ? styles.active : {},
        ]}
        onPress={() => selectDc(DcEnum.EU)}>
        <Text style={[dc === DcEnum.EU ? styles.activeText : {}]}>
          {LOCATION.EU.label}
        </Text>
      </Pressable>
      <Pressable
        style={[styles.dcButton, dc === DcEnum.US ? styles.active : {}]}
        onPress={() => selectDc(DcEnum.US)}>
        <Text style={[dc === DcEnum.US ? styles.activeText : {}]}>
          {LOCATION.US.label}
        </Text>
      </Pressable>
      <Pressable
        style={[
          styles.dcButton,
          dc === DcEnum.UNAUTHORIZED ? styles.active : {},
        ]}
        onPress={() => selectDc(DcEnum.UNAUTHORIZED)}>
        <Text style={[dc === DcEnum.UNAUTHORIZED ? styles.activeText : {}]}>
          {LOCATION.UNAUTHORIZED.label}
        </Text>
      </Pressable>
      <Pressable
        style={[
          styles.dcButton,
          styles.borderRight,
          dc === DcEnum.NOT_FOUND ? styles.active : {},
        ]}
        onPress={() => selectDc(DcEnum.NOT_FOUND)}>
        <Text style={[dc === DcEnum.NOT_FOUND ? styles.activeText : {}]}>
          {LOCATION.NOT_FOUND.label}
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  dcButtonContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginVertical: 10,
    justifyContent: 'space-between',
  },
  dcButton: {
    borderWidth: 1,
    borderColor: Colors.lightGray,
    paddingVertical: 12,
    justifyContent: 'center',
    alignItems: 'center',
    // flex: 1,
    flexGrow: 1,
    flexBasis: 1,
  },
  borderLeft: {
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
  },
  borderRight: {
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
  },
  active: {
    backgroundColor: Colors.slRed,
    borderWidth: 1,
    borderColor: Colors.slRed,
  },
  activeText: {
    color: Colors.white,
  },
});

export default DcButtons;
