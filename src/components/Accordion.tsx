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
};

export default function Accordion({
  children,
  header,
  initialIsCollapsed,
}: AccordionProps) {
  const [isCollapsed, setIsCollapsed] = useState(initialIsCollapsed);

  const toggleAccordon = () => {
    LayoutAnimation.configureNext(
      LayoutAnimation.create(300, 'linear', 'opacity'),
    );
    setIsCollapsed(!isCollapsed);
  };

  return (
    <View style={styles.accordion}>
      <Pressable style={styles.accordionHeader} onPress={toggleAccordon}>
        <View style={{flex: 1}}>{header}</View>
        <View>
          <FontAwesomeIcon
            icon={faChevronDown}
            size={16}
            color={colors.eggplant[20]}
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
    overflow: 'hidden',
    width: '100%',
  },
  accordionHeader: {
    height: 65,
    padding: 15,
    backgroundColor: colors.white,
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    columnGap: 5,
  },
  accordionItems: {
    width: '100%',
  },
});
