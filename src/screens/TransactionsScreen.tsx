import React, {useEffect} from 'react';
import {ScrollView, StyleSheet, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';

import {typography} from '../styles/globalStyles';
import {useAppDispatch, useAppSelector} from '@store/store';
import {RootStackParamList, setCurrentRoute} from '@store/generalStore';
import {getAccounts} from '@store/financialDataStore';
import AddAccountQuote from '@features/AddAccountQuote';

type TransactionsScreenProps = BottomTabScreenProps<
  RootStackParamList,
  'Transactions'
>;

export default function TransactionsScreen({route}: TransactionsScreenProps) {
  const dispatch = useAppDispatch();
  const accounts = useAppSelector(getAccounts);

  useEffect(() => {
    dispatch(setCurrentRoute(route.name));
  }, []);

  const hasAccounts = Object.entries(accounts).length > 0;

  if (hasAccounts)
    return (
      <ScrollView>
        <Text style={typography.h1}>Transactions</Text>
      </ScrollView>
    );

  return (
    <AddAccountQuote
      quote={`“Hey, big guy. Sun’s gettin’ real low” - Black Widow`}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
