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
import uuid from 'react-native-uuid';
import { Result } from '../../interfaces/results.interface';

/**
 * Screen for search results
 */
export default observer(function SearchResults() {
  const { ingredientsStore } = useStore();
  const { searchResultsCache, loader, searchValue, fetchResults, fetchPaginatedResults, paginateLoader } =
    ingredientsStore;

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
        <>
          <FlatList
            data={searchResultsCache}
            renderItem={({ item }) => (
              <SearchResultCard
                id={item.id.toString()}
                uri={item.image}
                title={item.title}
                summary={`${item.summary}`}
                diets={item.diets}
              />
            )}
            //@ts-ignore
            keyExtractor={(_, _2) => uuid.v4()}
            onScrollBeginDrag={Keyboard.dismiss}
            ListEmptyComponent={EmptyList}
            onEndReachedThreshold={0.4}
            onEndReached={fetchPaginatedResults}
          />

          {paginateLoader ? <LottieLoader /> : null}
        </>
      )}
    </RootView>
  );
});
