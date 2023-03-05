import React from 'react';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import {CommonActions} from '@react-navigation/native';
import {ROUTES} from '../navigation/Routes';
import {StackNavigationProp} from '@react-navigation/stack';
import {CartStackParamList} from '../navigation/types';
import {Colors} from '../styles/Colors';
import {FONTS} from '../utils/Constants';
import Button from '../components/Button';
import I18n from '../config/I18n';
import {testProperties} from '../config/TestProperties';

type CheckoutCompleteProps = {
  navigation: StackNavigationProp<CartStackParamList, ROUTES.CHECKOUT_COMPLETE>;
};

const CheckoutCompletePage = ({navigation}: CheckoutCompleteProps) => {
  const continueShopping = () => {
    navigation.dispatch({
      ...CommonActions.reset({
        index: 0,
        routes: [{name: ROUTES.STORE_STACK_NAVIGATOR}],
      }),
    });
  };

  return (
    <View
      style={styles.container}
      {...testProperties(I18n.t('checkoutComplete.testId'))}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>{I18n.t('checkoutComplete.header')}</Text>
        <Image
          source={require('../assets/images/checkmark.png')}
          style={styles.image}
        />
        <Text style={styles.subTitle}>
          {I18n.t('checkoutComplete.order.lineOne')}
        </Text>
        <Text style={styles.text}>
          {' '}
          {I18n.t('checkoutComplete.order.lineThree')}
        </Text>
        <Button
          onPress={continueShopping}
          paddingHorizontal={32}
          title={I18n.t('checkoutComplete.submitButtonText')}
          testId={I18n.t('checkoutComplete.submitButtonText')}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    flex: 1,
  },
  scrollContainer: {
    backgroundColor: Colors.white,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  title: {
    color: Colors.dark,
    fontSize: 24,
    fontFamily: FONTS.DM_MONO_MEDIUM,
    marginTop: 70,
    marginBottom: 32,
  },
  subTitle: {
    color: Colors.dark,
    fontFamily: FONTS.DM_MONO_MEDIUM,
    fontSize: 18,
    marginBottom: 16,
    textAlign: 'center',
  },
  text: {
    color: Colors.dark,
    fontSize: 14,
    fontFamily: FONTS.DM_SANS_REGULAR,
    marginBottom: 60,
    textAlign: 'center',
  },
  image: {
    height: 100,
    width: 100,
    marginBottom: 32,
    marginTop: 16,
  },
});

export default CheckoutCompletePage;
