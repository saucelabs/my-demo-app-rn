import React, {useContext} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import StorePage from '../containers/StorePage';
import ProductPage from '../containers/ProductPage';
import AppHeader from '../components/AppHeader';
import {ROUTES} from './Routes';
import {StoreFlowStackParamList} from './types';
import SortButton from '../components/SortButton';
import {StoreContext} from '../store/Store';
import {toggleSortModal} from '../store/actions/ProductStoreActions';

const StoreStackNavigation = () => {
  const StoreStack = createStackNavigator<StoreFlowStackParamList>();
  const {
    state: {
      products: {sortState},
    },
    dispatch,
  } = useContext(StoreContext);

  return (
    <StoreStack.Navigator initialRouteName={ROUTES.STORE}>
      <StoreStack.Screen
        component={StorePage}
        options={({navigation}) => ({
          header: () => (
            <AppHeader
              navigation={navigation}
              rightComponent={
                <SortButton
                  sortOption={sortState}
                  onPress={() => dispatch(toggleSortModal())}
                />
              }
            />
          ),
        })}
        name={ROUTES.STORE}
      />
      <StoreStack.Screen
        component={ProductPage}
        name={ROUTES.PRODUCT}
        options={({navigation}) => ({
          header: () => <AppHeader navigation={navigation} />,
        })}
      />
    </StoreStack.Navigator>
  );
};

export default StoreStackNavigation;
