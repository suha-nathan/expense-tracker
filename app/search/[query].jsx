import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, useLocalSearchParams, usePathname } from "expo-router";

import { searchProducts } from "../../lib/appwrite";
import useAppwrite from "../../lib/useAppwrite";
import SearchInput from "../../components/SearchInput";
import EmptyState from "../../components/EmptyState";

const SearchCard = ({ item }) => {
  const pathname = usePathname();

  const handlePress = () => {
    router.push(`search/product-detail/${item.$id}`);
  };

  return (
    <TouchableOpacity
      className="bg-secondary w-[35%] h-[30vh] my-2 rounded-3xl px-2 py-3 
    items-start border-white-20 border-2"
      onPress={handlePress}
    >
      <Text className="text-white font-extralight text-md">{item.store}</Text>
      <Image
        source={{ uri: item.itemImage }}
        className="w-full h-[80px] my-3"
        resizeMode="contain"
      />
      <View className="mx-auto my-1">
        <Text
          className="text-white font-pmedium text-md"
          numberOfLines={2}
          ellipsizeMode="tail"
        >
          {item.productName}
        </Text>
        <Text className="text-white font-light text-sm">
          Price: ${item.price}
        </Text>
        <Text
          className="text-white font-light text-xs"
          numberOfLines={2}
          ellipsizeMode="tail"
        >
          Unit: {item.pricePerUnit ? item.pricePerUnit : ""}
        </Text>
      </View>
    </TouchableOpacity>
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
            <View className="mt-6 mb-4">
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
        numColumns={2}
        columnWrapperStyle={{
          flex: 1,
          justifyContent: "space-evenly",
        }}
      />
    </SafeAreaView>
  );
};

export default Search;
