import React from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import globalConstants from '../../constants/globalConstants';
import SearchButton from '../Buttons/SearchButton';
import SearchInput from './SearchInput';

interface IProps {
  mode: 'button' | 'input';
}

/**
 * Search input - 2 variants one is the button to take us to the search screen. the other is an actual input which does the searching
 *
 * as there is only one we make this component point to the ingredients store for searching
 *
 * @params props
 * @returns
 */
export default function SearchField({ mode }: IProps) {
  const insets = useSafeAreaInsets();

  const height = insets.top + globalConstants.insetHeight;

  let content = <></>;

  switch (mode) {
    case 'button': {
      content = <SearchButton />;
      break;
    }
    case 'input': {
      content = <SearchInput />;
    }
  }

  return <View style={[{ marginTop: height }]}>{content}</View>;
}
