import React from 'react';
import {
  Image,
  Modal,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Colors} from '../styles/Colors';
import {HAS_IOS_NOTCH, FONTS} from '../utils/Constants';
import {SORT_IMAGES, SORT_OPTIONS, SortOptionType} from '../utils/Sorting';
import {testProperties} from '../config/TestProperties';
import I18n from '../config/I18n';

const SortModal = ({
  onPress,
  sortOption,
  visible,
}: {
  onPress: (arg: SortOptionType) => void;
  sortOption: SortOptionType;
  visible: boolean;
}) => {
  const rows = [
    {
      label: I18n.t('sortModal.nameAsc'),
      rowOption: SORT_OPTIONS.NAME_ASC,
      uri: SORT_IMAGES[SORT_OPTIONS.NAME_ASC],
    },
    {
      label: I18n.t('sortModal.nameDesc'),
      rowOption: SORT_OPTIONS.NAME_DESC,
      uri: SORT_IMAGES[SORT_OPTIONS.NAME_DESC],
    },
    {
      label: I18n.t('sortModal.priceAsc'),
      rowOption: SORT_OPTIONS.PRICE_ASC,
      uri: SORT_IMAGES[SORT_OPTIONS.PRICE_ASC],
    },
    {
      label: I18n.t('sortModal.priceDesc'),
      rowOption: SORT_OPTIONS.PRICE_DESC,
      uri: SORT_IMAGES[SORT_OPTIONS.PRICE_DESC],
    },
  ];

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      {...testProperties(I18n.t('sortModal.testId'))}>
      <View style={styles.modalCenteredView}>
        <View style={styles.modalView}>
          <View style={styles.row}>
            <Text style={styles.headerText}>
              {I18n.t('sortModal.sortLabel')}:
            </Text>
          </View>
          {rows.map(({label, rowOption, uri}, index) => {
            const isActiveRow = sortOption === rowOption;

            return (
              <TouchableOpacity
                style={[styles.row, isActiveRow ? styles.activeRow : {}]}
                onPress={() => onPress(rowOption)}
                key={`sort${index}`}
                {...testProperties(rowOption, true)}>
                <View
                  style={styles.checkContainer}
                  {...(isActiveRow
                    ? testProperties(I18n.t('sortModal.activeOptionTestId'))
                    : {})}>
                  <Icon
                    name="check"
                    style={[
                      styles.check,
                      isActiveRow ? styles.activeCheck : {},
                    ]}
                  />
                </View>
                <View style={styles.labelContainer}>
                  <Image style={styles.sortIcon} source={uri} />
                  <Text style={styles.labelText}>{label}</Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalCenteredView: {
    backgroundColor: Colors.transparentBlack,
    flex: 1,
    ...Platform.select({
      ios: {
        justifyContent: 'flex-end',
      },
      android: {
        alignItems: 'center',
        justifyContent: 'center',
      },
    }),
  },
  modalView: {
    backgroundColor: Colors.white,
    borderRadius: 4,
    paddingVertical: 15,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
    flexDirection: 'column',
    ...Platform.select({
      ios: {
        paddingBottom: HAS_IOS_NOTCH ? 44 : 0,
        marginHorizontal: 8,
      },
    }),
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  activeRow: {
    backgroundColor: Colors.neutral,
  },
  headerText: {
    color: Colors.dark,
    fontFamily: FONTS.DM_SANS_BOLD,
    fontSize: 16,
  },
  checkContainer: {
    marginRight: 10,
  },
  check: {
    color: Colors.white,
    fontSize: 16,
  },
  activeCheck: {
    color: Colors.green,
  },
  labelContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  sortIcon: {
    marginRight: 10,
    height: 20,
    width: 20,
  },
  labelText: {
    color: Colors.dark,
    fontFamily: FONTS.DM_SANS_REGULAR,
    fontSize: 16,
    marginRight: 5,
  },
});

export default SortModal;
