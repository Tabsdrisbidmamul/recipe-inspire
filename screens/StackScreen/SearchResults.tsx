import { observer } from 'mobx-react-lite';
import RootView from '../../components/Root/RootView';
import { KeyboardAvoidingView, StyleSheet, Image, View, Text } from 'react-native';
import SearchField from '../../components/Inputs/SearchField';
import React, { useEffect, useState } from 'react';
import BaseCard from '../../components/Cards/BaseCard';
import { globalStyles } from '../../constants/globalStyles';
import globalConstants from '../../constants/globalConstants';
import SearchResultCard from '../../components/Cards/SearchResultCard';
import useStore from '../../hooks/useStore';
import { Result } from '../../interfaces/results.interface';

/**
 * Screen for search results
 */
export default observer(function SearchResults() {
  const [results, setResults] = useState<Result[]>([]);

  const { ingredientsStore } = useStore();
  const { searchResults } = ingredientsStore;

  useEffect(() => {
    if (searchResults.results === undefined) return;

    setResults((current) => [...current, ...searchResults.results]);
    console.log('results ', results);
  }, [searchResults]);

  return (
    <RootView isScrollable isKeyboardDismissible>
      <SearchField mode="input" />
      <KeyboardAvoidingView>
        {results.map((el, i) => (
          <SearchResultCard key={i} id={el.id.toString()} uri={el.image} title={el.title} summary={`${el.summary}`} />
        ))}
      </KeyboardAvoidingView>
    </RootView>
  );
});
