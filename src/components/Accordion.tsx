import React, {useState} from 'react';
import {
  LayoutAnimation,
  Platform,
  Pressable,
  StyleSheet,
  UIManager,
  View,
} from 'react-native';
import {borders, colors} from '../styles/styleVariables';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faChevronDown} from '@fortawesome/free-solid-svg-icons';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

type AccordionProps = {
  children: React.JSX.Element[];
  header: React.JSX.Element;
  initialIsCollapsed: boolean;
  headerBackgroundColor?: string;
  caretColor?: string;
};

export default function Accordion({
  children,
  header,
  initialIsCollapsed,
  headerBackgroundColor = colors.white,
  caretColor = colors.eggplant[20],
}: AccordionProps) {
  const [isCollapsed, setIsCollapsed] = useState(initialIsCollapsed);

  const toggleAccordon = () => {
    LayoutAnimation.configureNext(
      LayoutAnimation.create(200, 'linear', 'opacity'),
    );
    setIsCollapsed(!isCollapsed);
  };

  return (
    <View style={styles.accordion}>
      <Pressable
        style={[
          styles.accordionHeader,
          isCollapsed && {
            borderEndStartRadius: borders.radius,
            borderEndEndRadius: borders.radius,
          },
          {backgroundColor: headerBackgroundColor},
        ]}
        onPress={toggleAccordon}>
        <View style={{flex: 1}}>{header}</View>
        <View>
          <FontAwesomeIcon
            icon={faChevronDown}
            size={16}
            color={caretColor}
            style={{transform: [{rotate: isCollapsed ? '0deg' : '180deg'}]}}
          />
        </View>
      </Pressable>
      {!isCollapsed && <View style={styles.accordionItems}>{children}</View>}
    </View>
  );
}

const styles = StyleSheet.create({
  accordion: {
    backgroundColor: colors.white,
    borderRadius: borders.radius,
  },
  accordionHeader: {
    height: 65,
    padding: 15,
    backgroundColor: colors.white,
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    columnGap: 5,
    borderTopStartRadius: borders.radius,
    borderTopEndRadius: borders.radius,
  },
  accordionItems: {
    width: '100%',
  },
});
