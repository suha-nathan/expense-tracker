import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchInput from "../../components/SearchInput";

const Search = () => {
  return (
    <SafeAreaView className="bg-primary h-full">
      <Text className="text-base text-white font-psemibold">Search</Text>
      <SearchInput />
    </SafeAreaView>
  );
};

export default Search;
