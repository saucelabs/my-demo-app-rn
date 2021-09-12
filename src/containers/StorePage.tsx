import React, {useContext, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {Colors} from '../styles/Colors';
import {SortOptionType} from '../utils/Sorting';
import StoreItem from '../components/StoreItem';
import Footer from '../components/Footer';
import ContainerHeader from '../components/ContainerHeader';
import SortModal from '../components/SortModal';
import ReviewModal from '../components/ReviewModal';
import {testProperties} from '../config/TestProperties';
import {StoreFlowStackParamList} from '../navigation/types';
import {ROUTES} from '../navigation/Routes';
import {StoreContext} from '../store/Store';
import {updateSorting} from '../store/actions/ProductStoreActions';
import I18n from '../config/I18n';

type StoreProps = {
  navigation: StackNavigationProp<StoreFlowStackParamList, ROUTES.STORE>;
};

const StorePage = ({navigation}: StoreProps) => {
  const {
    state: {
      products: {items, sortState, sortModalVisible},
    },
    dispatch,
  } = useContext(StoreContext);
  const [reviewModalVisible, setReviewModalVisible] = useState(false);
  const numColumns = 2;
  const closeSortModal = (sortOption: SortOptionType) =>
    dispatch(updateSorting(sortOption));
  const closeReviewModal = () => setReviewModalVisible(!reviewModalVisible);
  const openProductDetails = (id: number) =>
    navigation.push(ROUTES.PRODUCT, {id});

  return (
    <View
      style={styles.container}
      {...testProperties(I18n.t('catalog.testId'))}>
      <ReviewModal onPress={closeReviewModal} visible={reviewModalVisible} />
      <SortModal
        onPress={closeSortModal}
        sortOption={sortState}
        visible={sortModalVisible}
      />
      <FlatList
        data={items}
        keyExtractor={(item, index) => `${item.name}-${index}`}
        numColumns={numColumns}
        columnWrapperStyle={styles.columnWrapperStyle}
        contentContainerStyle={styles.contentContainerStyle}
        ListHeaderComponent={
          <ContainerHeader
            containerStyle={styles.containerHeaderStyle}
            title={I18n.t('catalog.header')}
          />
        }
        ListFooterComponent={<Footer />}
        scrollEnabled={true}
        renderItem={({item}) => (
          <StoreItem
            addReview={() => setReviewModalVisible(true)}
            openProductDetails={openProductDetails}
            item={item}
            numColumns={numColumns}
          />
        )}
        style={styles.flatListContainer}
        keyboardShouldPersistTaps="handled"
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Colors.white,
  },
  flatListContainer: {
    flex: 1,
    width: '100%',
  },
  containerHeaderStyle: {paddingLeft: 10},
  columnWrapperStyle: {justifyContent: 'space-around'},
  contentContainerStyle: {marginHorizontal: 10},
  modalCenteredView: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default StorePage;
