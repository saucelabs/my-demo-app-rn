import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  Alert,
  Linking,
  PermissionsAndroid,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import appConfig from '../../app.json';
import {Colors} from '../styles/Colors';
import {
  IS_IOS,
  MUSEO_SANS_300,
  MUSEO_SANS_700,
  PLATFORM_VERSION,
} from '../utils/Constants';
import ContainerHeader from '../components/ContainerHeader';
import Button from '../components/Button';
import {MenuStackParamList} from '../navigation/types';
import {ROUTES} from '../navigation/Routes';
import {StackNavigationProp} from '@react-navigation/stack';
import I18n from '../config/I18n';
import {testProperties} from '../config/TestProperties';

type GeoLocationProps = {
  navigation: StackNavigationProp<MenuStackParamList, ROUTES.GEO_LOCATION>;
};

const GeoLocationPage = ({navigation}: GeoLocationProps) => {
  const [observing, setObserving] = useState(false);
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const watchId = useRef<number | null>(null);
  const hasPermissionIOS = async () => {
    const openSetting = () => {
      Linking.openSettings().catch(() => {
        Alert.alert(I18n.t('geoLocation.unableOpenSettings'));
      });
    };
    const status = await Geolocation.requestAuthorization('whenInUse');

    if (status === 'granted') {
      return true;
    }

    if (status === 'denied') {
      Alert.alert(I18n.t('geoLocation.denied'));
    }

    if (status === 'disabled') {
      Alert.alert(
        I18n.t('geoLocation.turnOn', {appName: appConfig.displayName}),
        '',
        [
          {text: I18n.t('geoLocation.goToSettings'), onPress: openSetting},
          {
            text: I18n.t('geoLocation.dontUseLocation'),
            onPress: () => {},
          },
        ],
      );
    }

    return false;
  };
  const hasLocationPermission = useCallback(async () => {
    if (IS_IOS) {
      return await hasPermissionIOS();
    }

    if (!IS_IOS && PLATFORM_VERSION < 23) {
      return true;
    }

    const hasPermission = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (hasPermission) {
      return true;
    }

    const status = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (status === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    }

    if (status === PermissionsAndroid.RESULTS.DENIED) {
      ToastAndroid.show(I18n.t('geoLocation.userDenied'), ToastAndroid.LONG);
    } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
      ToastAndroid.show(I18n.t('geoLocation.userRevoked'), ToastAndroid.LONG);
    }

    return false;
  }, []);
  const getLocationUpdates = useCallback(async () => {
    const hasPermission = await hasLocationPermission();

    if (!hasPermission) {
      return;
    }

    setObserving(true);

    watchId.current = Geolocation.watchPosition(
      position => {
        const {latitude: currentLatitude, longitude: currentLongitude} =
          position.coords;

        setLongitude(currentLongitude);
        setLatitude(currentLatitude);
      },
      error => {
        console.log(error);
      },
      {
        enableHighAccuracy: true,
        distanceFilter: 0,
        interval: 2000,
        fastestInterval: 500,
      },
    );
  }, [hasLocationPermission]);
  const removeLocationUpdates = useCallback(() => {
    if (watchId.current !== null) {
      Geolocation.clearWatch(watchId.current);
      watchId.current = null;
      setObserving(false);
    }
  }, []);
  useEffect(
    () => navigation.addListener('focus', () => getLocationUpdates()),
    [navigation, getLocationUpdates],
  );
  useEffect(
    () => navigation.addListener('blur', () => removeLocationUpdates()),
    [navigation, removeLocationUpdates],
  );

  return (
    <View
      style={styles.container}
      {...testProperties(I18n.t('geoLocation.testId'))}>
      <ScrollView style={styles.scrollContainer}>
        <ContainerHeader
          title={I18n.t('geoLocation.header')}
          containerStyle={styles.containerHeader}
        />
        <View style={styles.content}>
          <Text style={styles.text}>{I18n.t('geoLocation.description')}</Text>
          <Text style={styles.text}>
            {I18n.t('geoLocation.appium')}
            <Text
              style={styles.link}
              onPress={() => Linking.openURL(I18n.t('geoLocation.appiumLink'))}>
              {I18n.t('geoLocation.appiumThisLink')}
            </Text>
          </Text>
          {!IS_IOS && (
            <Text style={[styles.text, styles.italic]}>
              {I18n.t('geoLocation.androidPosition')}
            </Text>
          )}
          <View style={[styles.dataContainer, styles.row]}>
            <View style={styles.column}>
              <Text style={[styles.latitudeLongitudeText, styles.title]}>
                {I18n.t('geoLocation.latitude')}:
              </Text>
              <Text
                style={[styles.latitudeLongitudeText, styles.data]}
                {...testProperties(I18n.t('geoLocation.latitudeTestId'))}>
                {latitude}
              </Text>
            </View>
            <View style={styles.column}>
              <Text style={[styles.latitudeLongitudeText, styles.title]}>
                {I18n.t('geoLocation.longitude')}:
              </Text>
              <Text
                style={[styles.latitudeLongitudeText, styles.data]}
                {...testProperties(I18n.t('geoLocation.longitudeTestId'))}>
                {longitude}
              </Text>
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <View style={[styles.row, styles.buttons]}>
              <Button
                title={I18n.t('geoLocation.startObserving')}
                testId={I18n.t('geoLocation.startObserving')}
                onPress={getLocationUpdates}
                isDisabled={observing}
              />
              <View style={styles.verticalDivider} />
              <Button
                title={I18n.t('geoLocation.stopObserving')}
                testId={I18n.t('geoLocation.stopObserving')}
                onPress={removeLocationUpdates}
                isDisabled={!observing}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    backgroundColor: Colors.white,
  },
  containerHeader: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 32,
  },
  subText: {
    color: Colors.black,
    fontFamily: MUSEO_SANS_300,
    fontSize: 14,
    paddingLeft: 20,
    paddingRight: 20,
    width: '90%',
  },
  content: {
    padding: 20,
  },
  italic: {
    fontStyle: 'italic',
  },
  text: {
    color: Colors.black,
    fontFamily: MUSEO_SANS_300,
    fontSize: 14,
    marginBottom: 32,
  },
  link: {
    color: Colors.slRed,
    textDecorationLine: 'underline',
  },
  buttons: {
    marginVertical: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
  },
  column: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  verticalDivider: {
    width: 16,
  },
  latitudeLongitudeText: {
    fontFamily: MUSEO_SANS_700,
  },
  dataContainer: {
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderColor: Colors.lightGray,
    paddingVertical: 32,
  },
  title: {
    color: Colors.slRed,
    fontSize: 24,
    marginBottom: 24,
  },
  data: {
    color: Colors.gray,
    fontSize: 18,
  },
  buttonContainer: {
    marginTop: 32,
  },
});

export default GeoLocationPage;
