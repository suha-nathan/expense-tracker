import { View, Text, FlatList } from "react-native";
import { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams } from "expo-router";

import { searchProducts } from "../../lib/appwrite";
import useAppwrite from "../../lib/useAppwrite";
import SearchInput from "../../components/SearchInput";
import EmptyState from "../../components/EmptyState";

const SearchCard = ({ item }) => {
  return (
    <View className="bg-secondary w-[25%] h-auto my-2 rounded-3xl px-1 py-2 items-center justify-center">
      <Text className="text-white font-pmedium ">{item.productName}</Text>
    </View>
  );
};

const Search = ({ initialQuery }) => {
  const { query } = useLocalSearchParams();
  const { data: products, refetch } = useAppwrite(() => searchProducts(query));

  useEffect(() => {
    refetch();
  }, [query]);

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={products}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => <SearchCard item={item} />}
        ListHeaderComponent={() => (
          <View className="my-6 px-4">
            <Text className="font-pmedium text-sm text-gray-100">
              Search Results
            </Text>
            <Text className="text-2xl font-psemibold text-white">{query}</Text>
            <View className="mt-6 mb-8">
              <SearchInput initialQuery={query} />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Products Found"
            subtitle="No products found for this search query"
          />
        )}
        horizontal={false}
        numColumns={3}
        columnWrapperStyle={{
          flex: 1,
          justifyContent: "space-evenly",
        }}
      />
    </SafeAreaView>
  );
};

export default Search;
