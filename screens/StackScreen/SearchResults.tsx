import { observer } from 'mobx-react-lite';
import RootView from '../../components/Root/RootView';
import { Text } from 'react-native';

export default observer(function SearchResults() {
  return (
    <RootView isScrollable>
      <Text>Search Results is working</Text>
    </RootView>
  );
});
