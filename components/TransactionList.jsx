import { View, Text, FlatList, Image } from "react-native";
import useAppwrite from "../lib/useAppwrite";
import { getUserReceipts } from "../lib/appwrite";
import { useGlobalContext } from "../context/GlobalProvider";
import { useState } from "react";
import ButtonItem from "./ButtonItem";
import { images } from "../constants";

const TransactionList = () => {
  const [timeFrame, setTimeFrame] = useState("W");
  const { user } = useGlobalContext();
  const { data: filteredRecipts, isLoading } = useAppwrite(() =>
    getUserReceipts(user.$id, timeFrame)
  );
  if (!isLoading && filteredRecipts) {
    console.log("filtered receipts: ", filteredRecipts);
  }

  return (
    <FlatList
      data={filteredRecipts}
      keyExtractor={(item) => item.$id}
      renderItem={({ item }) => {
        let dateObj = new Date(item.purchaseDate);
        let dateString = dateObj.toDateString();
        return (
          <View className="w-[90%] h-[70px] mx-auto flex-row justify-between bg-secondary rounded-2xl my-2">
            <View className="w-10 h-10 rounded-full bg-white justify-center items-center ">
              <Image
                source={images.grocery}
                className="w-8 h-8"
                resizeMode="contain"
              />
            </View>
            <View className="justify-center items-start">
              <Text className="text-white font-psemibold">{item.category}</Text>
              <Text className="text-white-50 font-light ">{dateString}</Text>
            </View>
            <View>
              <Text className="text-white">{item.total}</Text>
            </View>
          </View>
        );
      }}
      ListHeaderComponent={() => (
        <View>
          <View>
            <Text className="text-white font-pextrabold text-2xl">
              Transactions
            </Text>
          </View>
        </View>
      )}
    />
  );
};

export default TransactionList;
