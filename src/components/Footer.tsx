import React from 'react';
import {View, StyleSheet, Text, Image} from 'react-native';
import {Colors} from '../styles/Colors';
import {FONTS} from '../utils/Constants';
import I18n from '../config/I18n';

const Footer = () => (
  <View style={[styles.footerContainer]}>
    <View style={[styles.iconContainer, styles.row]}>
      <Image
        source={require('../assets/images/twitter.png')}
        style={styles.footerIcon}
      />
      <Image
        source={require('../assets/images/facebook.png')}
        style={styles.footerIcon}
      />
      <Image
        source={require('../assets/images/linkedin.png')}
        style={styles.footerIcon}
      />
    </View>
    <Text style={styles.footerText}>
      &copy; {new Date().getFullYear()} {I18n.t('footer.text')}
    </Text>
  </View>
);
const styles = StyleSheet.create({
  footerContainer: {
    backgroundColor: Colors.dark,
    paddingVertical: 40,
    paddingHorizontal: 20,
    justifyContent: 'center',
    // alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
  },
  iconContainer: {
    flexShrink: 1,
    marginRight: 16,
  },
  footerIcon: {
    marginRight: 8,
    height: 20,
    width: 20,
  },
  footerText: {
    color: Colors.white,
    fontFamily: FONTS.DM_SANS_REGULAR,
    fontSize: 8,
    flexShrink: 1,
    marginTop: 10,
  },
});

export default Footer;
