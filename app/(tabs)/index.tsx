import React from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";
import { useInfiniteQuery } from "@tanstack/react-query";
import { NEWS_API_KEY } from "@/constants/constant";
import { NewsCard } from "@/components/NewsCard";
import { useQueryFocusAware } from "@/hooks/useFocusAware";
import SearchBar from "@/components/SearchBar";

export default function AboutScreen() {
  const isFocused = useQueryFocusAware();
  const [query, setQuery] = React.useState("bitcoin");

  const fetchNews = async ({ pageParam = 1 }) => {
    const response = await fetch(
      `https://newsapi.org/v2/everything?q=${query}&sortBy=publishedAt&page=${pageParam}&pageSize=20&apiKey=${NEWS_API_KEY}`
    );
    return response.json();
  };

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    isError,
    isLoading,
    status,
    refetch,
  } = useInfiniteQuery({
    queryKey: ["projects", query],
    queryFn: fetchNews,
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.articles.length < 20) return undefined;
      return pages.length + 1;
    },
    enabled: isFocused,
  });

  const newsData = data?.pages.flatMap((page) => page.articles) || [];

  const handleSearch = (newQuery: string) => {
    setQuery(newQuery || "bitcoin");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <SearchBar onSearch={handleSearch} />
        {isLoading ? (
          <View style={styles.container}>
            <ActivityIndicator size="large" color="#1e90ff" />
          </View>
        ) : isError ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>Error: An Error Occured</Text>
          </View>
        ) : (
          <FlatList
            data={newsData}
            renderItem={({ item }) => <NewsCard news={item} />}
            keyExtractor={(item, index) => index.toString()}
            onEndReached={() => hasNextPage && fetchNextPage()}
            onEndReachedThreshold={0.5}
            ListFooterComponent={
              isFetchingNextPage ? (
                <ActivityIndicator size="large" color="#1e90ff" />
              ) : null
            }
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#25292e",
  },
  container: {
    flex: 1,
    backgroundColor: "#25292e",
    padding: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#25292e",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#25292e",
  },
  errorText: {
    color: "#ff4c4c",
    fontSize: 16,
  },
});
