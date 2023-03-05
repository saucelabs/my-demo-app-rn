import React from 'react';
import {Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Colors} from '../styles/Colors';
import {FONTS} from '../utils/Constants';
import {testProperties} from '../config/TestProperties';
import I18n from '../config/I18n';

const ReviewModal = ({
  visible,
  onPress,
}: {
  visible: boolean;
  onPress: () => void;
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      {...testProperties(I18n.t('reviewModal.testId'))}>
      <View style={styles.modalCenteredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>{I18n.t('reviewModal.text')}</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={onPress}
            {...testProperties(
              `${I18n.t('reviewModal.closeButton')} ${I18n.t('button.testId')}`,
            )}>
            <Text style={styles.buttonTextStyle}>
              {I18n.t('reviewModal.closeButton')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalCenteredView: {
    backgroundColor: Colors.transparentBlack,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: Colors.white,
    borderRadius: 4,
    padding: 35,
    alignItems: 'center',
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontFamily: FONTS.DM_SANS_REGULAR,
    color: Colors.dark,
    fontSize: 16,
  },
  button: {
    backgroundColor: Colors.green,
    borderRadius: 4,
    paddingVertical: 12,
    paddingHorizontal: 40,
    width: '100%',
  },
  buttonTextStyle: {
    color: Colors.dark,
    fontFamily: FONTS.DM_SANS_BOLD,
    fontSize: 16,
    textAlign: 'center',
  },
});

export default ReviewModal;
