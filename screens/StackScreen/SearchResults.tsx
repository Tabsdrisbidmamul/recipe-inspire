import { observer } from 'mobx-react-lite';
import RootView from '../../components/Root/RootView';
import { FlatList, Keyboard } from 'react-native';
import SearchField from '../../components/Inputs/SearchField';
import React, { useEffect, useState } from 'react';
import SearchResultCard from '../../components/Cards/SearchResultCard';
import useStore from '../../hooks/useStore';
import LottieLoader from '../../components/Loader/LottieLoader';
import EmptyList from '../../components/Message/EmptyList';
import SearchFilters from '../../components/Inputs/SearchFilters';

/**
 * Screen for search results
 */
export default observer(function SearchResults() {
  const { ingredientsStore } = useStore();
  const { searchResultsCache, loader, searchValue, fetchResults } = ingredientsStore;

  useEffect(() => {
    fetchResults();
  }, [searchValue]);

  return (
    <RootView>
      <SearchField mode="input" />

      <SearchFilters />

      {loader ? (
        <LottieLoader />
      ) : (
        <FlatList
          data={searchResultsCache}
          renderItem={({ item, index }) => (
            <SearchResultCard
              key={index}
              id={item.id.toString()}
              uri={item.image}
              title={item.title}
              summary={`${item.summary}`}
            />
          )}
          onScrollBeginDrag={Keyboard.dismiss}
          ListEmptyComponent={EmptyList}
        />
      )}
    </RootView>
  );
});
