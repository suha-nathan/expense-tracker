import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons/faMagnifyingGlass";
import { usePathname, router } from "expo-router";

const SearchInput = ({
  title,
  value,
  placeholder,
  handleChangeText,
  otherStyles,
  ...props
}) => {
  const pathname = usePathname();
  const [query, setQuery] = useState("");
  return (
    <View className="flex-row w-full h-16 px-4 border-2 border-black-200 bg-black-100 rounded-2xl focus:border-secondary items-center space-x-4">
      <TextInput
        className="text-base mt-0.5 text-white flex-1 font-pregular"
        value={query}
        placeholder="Search for a video topic"
        placeholderTextColor="#CDCDE0"
        onChangeText={(e) => setQuery(e)}
      />
      <TouchableOpacity
        onPress={() => {
          if (!query) {
            console.log("no query");
            return Alert.alert(
              "Missing Query",
              "Please input something to search for videos"
            );
          }
          if (pathname.startsWith("/search")) {
            console.log("pathname is ", pathname);
            return router.setParams({ query });
          } else {
            console.log("searching");
            return router.push(`/search/${query}`);
          }
        }}
      >
        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          resizeMode="contain"
          color="white"
          size={20}
        />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;
