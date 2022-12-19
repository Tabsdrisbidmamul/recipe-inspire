import { observer } from 'mobx-react-lite';
import RootView from '../../components/Root/RootView';
import { KeyboardAvoidingView, Text } from 'react-native';
import NavigationHeader from '../../components/Header/NavigationHeader';
import SearchField from '../../components/Inputs/SearchField';
import React from 'react';

/**
 * Screen for search results
 */
export default observer(function SearchResults() {
  return (
    <RootView isScrollable isKeyboardDismissible>
      <SearchField mode="input" />
      <KeyboardAvoidingView>
        <Text>Results</Text>
      </KeyboardAvoidingView>
    </RootView>
  );
});
