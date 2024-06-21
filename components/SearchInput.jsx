import { useEffect, useState } from "react";
import { router, usePathname } from "expo-router";
import { View, TouchableOpacity, TextInput, Alert } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons/faMagnifyingGlass";
import { faX } from "@fortawesome/free-solid-svg-icons/faX";

const SearchInput = ({ initialQuery }) => {
  const pathname = usePathname();
  const [query, setQuery] = useState(initialQuery || "");

  return (
    <View className="flex flex-row items-center space-x-4 w-full h-16 px-4 bg-black-100 rounded-2xl border-2 border-black-200 focus:border-secondary">
      <TextInput
        className="text-base mt-0.5 text-white flex-1 font-pregular"
        value={query}
        placeholder="e.g. chicken"
        placeholderTextColor="#CDCDE0"
        onChangeText={(e) => setQuery(e)}
      />
      <View className="flex-row w-[25%] h-full justify-between items-center">
        <TouchableOpacity
          className="mx-2"
          onPress={() => {
            setQuery("");
          }}
        >
          <FontAwesomeIcon
            icon={faX}
            // style={{ marginRight: 6 }}
            resizeMode="contain"
            color="grey"
            size={20}
          />
        </TouchableOpacity>

        <TouchableOpacity
          className="h-full flex-row items-center ml-2 px-3 border-l border-secondary"
          onPress={() => {
            if (query === "")
              return Alert.alert(
                "Missing Query",
                "Please input something to search results across database"
              );

            if (pathname.startsWith("/search")) router.setParams({ query });
            else router.push(`/search/${query}`);
          }}
        >
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            resizeMode="contain"
            color="grey"
            size={20}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SearchInput;
