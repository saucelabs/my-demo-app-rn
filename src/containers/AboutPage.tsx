import React from 'react';
import {
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import VersionNumber from 'react-native-version-number';
import ContainerHeader from '../components/ContainerHeader';
import I18n from '../config/I18n';
import {Colors} from '../styles/Colors';
import {FONTS} from '../utils/Constants';
import {testProperties} from '../config/TestProperties';

const AboutPage = () => {
  return (
    <View style={styles.container} {...testProperties(I18n.t('about.testId'))}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <ContainerHeader
          title={I18n.t('about.header')}
          containerStyle={styles.containerHeader}
        />
        <Text style={styles.myDemoText}>
          MY<Text style={styles.myDemoTextBold}>DEMO</Text>APP
        </Text>
        <Text style={styles.text}>
          {I18n.t('about.versionBuild', {
            version: VersionNumber.appVersion,
            build: VersionNumber.buildVersion,
          })}
        </Text>
        <Image
          source={require('../assets/images/saucelabs-logo.png')}
          style={styles.sauceLogo}
        />
        <TouchableOpacity
          style={styles.linkContainer}
          onPress={() => Linking.openURL(I18n.t('about.url'))}>
          <Text style={styles.linkText}>{I18n.t('about.goTo')}</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  scrollContainer: {
    alignItems: 'center',
  },
  containerHeader: {
    paddingLeft: 0,
    paddingRight: 0,
    paddingBottom: 32,
    paddingTop: 70,
  },
  text: {
    color: Colors.black,
    fontFamily: FONTS.DM_SANS_REGULAR,
    fontSize: 16,
  },
  linkContainer: {},
  linkText: {
    color: Colors.dark,
    fontFamily: FONTS.DM_SANS_REGULAR,
    fontSize: 16,
    textDecorationLine: 'underline',
  },
  myDemoText: {
    color: Colors.dark,
    fontFamily: FONTS.DM_MONO_LIGHT,
    fontSize: 20,
    marginBottom: 20,
  },
  myDemoTextBold: {
    fontFamily: FONTS.DM_MONO_MEDIUM,
  },
  sauceLogo: {
    height: 28,
    marginVertical: 20,
    width: 140,
  },
});

export default AboutPage;
