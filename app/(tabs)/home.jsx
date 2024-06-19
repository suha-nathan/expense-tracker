import { View, Text, Image } from "react-native";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import { useGlobalContext } from "../../context/GlobalProvider";
import TransactionList from "../../components/TransactionList";
import SearchInput from "../../components/SearchInput";

// scroll view doesnt support horizontal and vertical flat lists at the same time
// therefore use a flatlist (horizontal) within the header component of a flatlist (vertical)
const Home = () => {
  const { user } = useGlobalContext();

  return (
    <SafeAreaView className="bg-primary h-full">
      {/* Header */}
      <View className="justify-start items-start flex-row my-6 px-4 ">
        <View className="w-16 h-16 border-2 border-lightblue rounded-full justify-center items-center">
          <Image
            source={{ uri: user?.avatar }}
            className="w-[90%] h-[90%] rounded-full"
          />
        </View>
        <View className="mx-2">
          <Text className="text-white font-pmedium text-sm"> Welcome Back</Text>
          <Text className="text-gray-100 text-2xl font-psemibold">
            {user.username}
          </Text>
        </View>
      </View>
      <SearchInput />
      {/* List of transactions and Buttons to filter list */}
      <TransactionList />
    </SafeAreaView>
  );
};

export default Home;
