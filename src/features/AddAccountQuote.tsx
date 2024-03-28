import {faPlus} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import usePlaidLink from '@hooks/usePlaidLink';
import {getLayouts, paddings} from '@store/layoutStore';
import {useAppSelector} from '@store/store';
import {typography} from '@styles/globalStyles';
import {colors} from '@styles/styleVariables';
import {StyleSheet, View, Text} from 'react-native';
import PlaidLink, {PlaidLinkProps} from 'react-native-plaid-link-sdk';

type AddAccountQuoteProps = {
  quote: string;
};

export default function AddAccountQuote({quote}: AddAccountQuoteProps) {
  const plaidConfig = usePlaidLink();
  const layout = useAppSelector(getLayouts);

  return (
    <View
      style={[
        styles.addAccountQuote,
        {paddingBottom: layout?.BottomNavBar?.height},
      ]}>
      <Text style={[typography.h3, {textAlign: 'center'}]}>{quote}</Text>
      <PlaidLink {...(plaidConfig as PlaidLinkProps)}>
        <View style={[styles.button]}>
          <FontAwesomeIcon icon={faPlus} color={colors.white} />
          <Text
            style={[typography.b1, {fontWeight: 'bold', color: colors.white}]}>
            Add an account now!
          </Text>
        </View>
      </PlaidLink>
    </View>
  );
}

const styles = StyleSheet.create({
  addAccountQuote: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    rowGap: 20,
    padding: paddings.standard.h,
    backgroundColor: colors.gray[0],
  },
  button: {
    height: 50,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: colors.pistachio[30],
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    flexDirection: 'row',
    columnGap: 5,
  },
});
