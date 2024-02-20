import React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {faAdd} from '@fortawesome/free-solid-svg-icons';
import {useNavigation} from '@react-navigation/native';

import {typography} from '../styles/globalStyles';
import {colors} from '../styles/styleVariables';
import IconButton from '../components/IconButton';

export default function Header() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.left}>
        <Text style={[typography.h3, {color: colors.eggplant[20]}]}>ABBY</Text>
      </View>
      <View style={styles.right}>
        <IconButton
          icon={faAdd}
          type="text"
          onPressHandler={() => console.log('add')}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  left: {
    paddingTop: 5,
    paddingLeft: 15,
    paddingBottom: 5,
  },
  right: {
    paddingTop: 5,
    paddingRight: 15,
    paddingBottom: 5,
  },
});
