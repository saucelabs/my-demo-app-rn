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
import {MUSEO_SANS_500} from '../utils/Constants';
import {testProperties} from '../config/TestProperties';

const AboutPage = () => {
  return (
    <View style={styles.container} {...testProperties(I18n.t('about.testId'))}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <ContainerHeader
          title={I18n.t('about.header')}
          containerStyle={styles.containerHeader}
        />
        <Image
          source={require('../assets/images/my-demo-app-logo.png')}
          style={styles.myDemoAppLogo}
        />
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
        <Image
          source={require('../assets/images/swag-labs-bot.png')}
          style={styles.swagLabsBot}
        />
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
    fontFamily: MUSEO_SANS_500,
    fontSize: 16,
  },
  linkContainer: {},
  linkText: {
    color: Colors.slRed,
    fontFamily: MUSEO_SANS_500,
    fontSize: 16,
    textDecorationLine: 'underline',
  },
  myDemoAppLogo: {
    height: 20,
    marginVertical: 20,
    width: 148,
  },
  sauceLogo: {
    height: 20,
    marginVertical: 20,
    width: 143,
  },
  swagLabsBot: {
    height: 198,
    marginTop: 54,
    width: 226,
  },
});

export default AboutPage;
