import {
  View,
  Text,
  FlatList,
  Image,
  RefreshControl,
  TouchableOpacity,
} from "react-native";
import useAppwrite from "../lib/useAppwrite";
import { getUserReceipts } from "../lib/appwrite";
import { useEffect, useState } from "react";
import { router } from "expo-router";

import { useGlobalContext } from "../context/GlobalProvider";
import ButtonItem from "./ButtonItem";
import { images } from "../constants";
import StatisticsBox from "./StatisticsBox";
import SearchInput from "./SearchInput";

const TransactionList = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [listTimeFrame, setListTimeFrame] = useState("W");

  const { user } = useGlobalContext();

  const {
    data: filteredRecipts,
    isLoading,
    refetch,
  } = useAppwrite(() => getUserReceipts(user.$id, listTimeFrame));

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  useEffect(() => {
    onRefresh();
  }, [listTimeFrame]);

  useEffect(() => {
    onRefresh();
  }, []);

  return (
    <FlatList
      data={filteredRecipts}
      keyExtractor={(item) => item.$id}
      renderItem={({ item }) => {
        let dateObj = new Date(item.purchaseDate);
        let dateString = dateObj.toDateString();
        return (
          <TouchableOpacity
            className="w-[90%] h-[100px] mx-auto flex-row items-center 
            bg-secondary border-white-20 border-2 rounded-full mt-2"
            onPress={() => router.push(`(tabs)/expense-detail/${item.$id}`)}
          >
            <View className="w-[80%] flex-row justify-between">
              <View className="w-[70%] mx-4 flex-row items-center justify-center ">
                <View
                  className="w-16 h-16 mr-8 rounded-full 
                bg-white justify-center items-center"
                >
                  <Image
                    source={images.grocery}
                    className="w-4/6 h-4/6"
                    resizeMode="contain"
                  />
                </View>

                <View className="justify-center items-start  ">
                  <Text className="text-white font-psemibold">
                    {item.category}
                  </Text>
                  <Text className="text-white-50 font-light ">
                    {dateString}
                  </Text>
                </View>
              </View>
            </View>
            <View className=" ">
              <Text className="text-base text-white font-pmedium justify-between items-center">
                {item.total}
              </Text>
            </View>
          </TouchableOpacity>
        );
      }}
      ListHeaderComponent={
        <>
          {/* Search Bar */}
          <View className="w-[90%] mx-auto h-auto mb-4">
            <Text className="text-white font-pregular text-xl mb-2">
              Search for grocery items:
            </Text>
            <SearchInput />
          </View>

          {/* Chart and Buttons to change chart */}
          <StatisticsBox />

          {/* transactions list and buttons to filter list */}
          <View className="w-[90%] flex-row mx-auto justify-center items-center">
            <View className="w-1/2 h-20 justify-center items-center ">
              <Text className="text-white font-pextrabold text-xl">
                Transactions
              </Text>
            </View>
            <View
              className="h-[50px] w-[55%] bg-secondary border-2 border-white-20 mt-1 
        justify-center rounded-2xl flex-row"
            >
              <ButtonItem
                itemStyles="w-1/4 rounded-2xl"
                timeFrame="D"
                setTimeFrame={setListTimeFrame}
                isActive={listTimeFrame === "D"}
              />
              <ButtonItem
                itemStyles="w-1/4 rounded-2xl"
                timeFrame="W"
                setTimeFrame={setListTimeFrame}
                isActive={listTimeFrame === "W"}
              />
              <ButtonItem
                itemStyles="w-1/4 rounded-2xl"
                timeFrame="M"
                setTimeFrame={setListTimeFrame}
                isActive={listTimeFrame === "M"}
              />
              <ButtonItem
                itemStyles="w-1/4 rounded-2xl"
                timeFrame="Y"
                setTimeFrame={setListTimeFrame}
                isActive={listTimeFrame === "Y"}
              />
            </View>
          </View>
        </>
      }
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    />
  );
};
export default TransactionList;
