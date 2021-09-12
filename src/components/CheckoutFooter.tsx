import React from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import {MUSEO_SANS_300, MUSEO_SANS_700} from '../utils/Constants';
import Button from './Button';
import {Colors} from '../styles/Colors';
import I18n from '../config/I18n';
import {testProperties} from '../config/TestProperties';

const CheckoutFooter = ({
  isDisabled = false,
  onPress,
  showTotals = true,
  title,
  totalNumber,
  totalPrice,
}: {
  isDisabled?: boolean;
  onPress: () => void;
  showTotals?: boolean;
  title: string;
  totalNumber?: number;
  totalPrice?: number;
}) => {
  return (
    <View style={styles.bottomButtonContainer}>
      {showTotals && (
        <View
          style={[styles.row, styles.receiptContainer]}
          {...testProperties(I18n.t('checkoutFooter.testId'))}>
          <View style={styles.row}>
            <Text style={styles.totalText}>
              {I18n.t('checkoutFooter.total')}:
            </Text>
            <Text
              style={styles.totalNumber}
              {...testProperties(I18n.t('checkoutFooter.totalNumberTestId'))}>
              {totalNumber}{' '}
              {totalNumber && totalNumber > 1
                ? I18n.t('checkoutFooter.items')
                : I18n.t('checkoutFooter.item')}
            </Text>
          </View>
          {totalPrice && (
            <Text
              style={styles.totalPrice}
              {...testProperties(I18n.t('checkoutFooter.totalPriceTestId'))}>
              ${totalPrice.toFixed(2)}
            </Text>
          )}
        </View>
      )}
      <Button
        testId={title}
        title={title}
        onPress={onPress}
        isDisabled={isDisabled}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  bottomButtonContainer: {
    flexDirection: 'column',
    backgroundColor: Colors.white,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    shadowColor: Colors.black,
    shadowOpacity: 0.3,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 1,
    },
    elevation: 4,
    padding: 20,
    ...Platform.select({
      android: {
        borderBottomLeftRadius: 6,
        borderBottomRightRadius: 6,
        margin: 16,
      },
    }),
  },
  row: {flexDirection: 'row'},
  receiptContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  totalText: {
    fontFamily: MUSEO_SANS_700,
    marginRight: 5,
    fontSize: 16,
  },
  totalNumber: {
    fontFamily: MUSEO_SANS_300,
    fontSize: 16,
  },
  totalPrice: {
    fontFamily: MUSEO_SANS_700,
    fontSize: 18,
  },
});

export default CheckoutFooter;
