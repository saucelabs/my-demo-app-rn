import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import ContainerHeader from '../components/ContainerHeader';
import I18n from '../config/I18n';
import {Colors} from '../styles/Colors';
import {testProperties} from '../config/TestProperties';
import DcButtons from '../components/DcButtons';
import {DcEnum, DevicesInterface, getDevices} from '../data/getDevices';
import DeviceTile from '../components/DeviceTile';
import {FONTS} from '../utils/Constants';

const ApiCallsPage = () => {
  const [dc, setDc] = useState(DcEnum.EU);
  const [devicesList, setDevicesList] = useState<DevicesInterface[] | null>(
    null,
  );
  const [errorMessage, setErrorMessage] = useState<Error | null>(null);
  const numColumns = 2;
  useEffect(() => {
    setErrorMessage(null);
    getDevices(dc)
      .then(devices => {
        if (devices) {
          setDevicesList(devices);
        }
      })
      .catch(error => {
        setErrorMessage(error);
      });
  }, [dc]);
  const selectDc = (dataCenter: DcEnum) => {
    setDevicesList(null);
    setDc(dataCenter);
  };

  return (
    <View
      style={styles.container}
      {...testProperties(I18n.t('apiCalls.testId'))}>
      <View style={styles.topContainer}>
        <ContainerHeader
          title={I18n.t('apiCalls.header')}
          containerStyle={styles.containerHeader}
        />
        <DcButtons dc={dc} selectDc={selectDc} />
      </View>
      <View style={styles.flatListContainer}>
        <FlatList
          data={devicesList}
          renderItem={({item}: {item: DevicesInterface}) => (
            <DeviceTile device={item} />
          )}
          key={`#-${numColumns}`}
          numColumns={numColumns}
          keyExtractor={item => item.id}
          ListEmptyComponent={
            errorMessage ? (
              <View style={styles.errorContainer}>
                <Text style={styles.errorText}>
                  {errorMessage?.message || 'Network request failed'}
                </Text>
              </View>
            ) : (
              <View style={styles.emptyContainer}>
                <Text style={styles.loadingText}>Loading devices</Text>
              </View>
            )
          }
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  topContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  containerHeader: {
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingHorizontal: 20,
    paddingVertical: 0,
    flex: 0,
  },
  errorContainer: {
    backgroundColor: Colors.slRed,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontFamily: FONTS.DM_MONO_REGULAR,
    color: Colors.white,
    fontSize: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  loadingText: {
    fontFamily: FONTS.DM_MONO_REGULAR,
    fontSize: 20,
  },
  flatListContainer: {
    flex: 3,
    paddingHorizontal: 15,
  },
});

export default ApiCallsPage;
