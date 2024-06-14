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
    // console.log("filtered receipts: ", filteredRecipts);
  }

  return (
    <FlatList
      data={filteredRecipts}
      keyExtractor={(item) => item.$id}
      renderItem={({ item }) => {
        let dateObj = new Date(item.purchaseDate);
        let dateString = dateObj.toDateString();
        return (
          <View className="w-[90%] h-[100px] mx-auto flex-row items-center bg-secondary border-white-20 border-2 rounded-full my-2">
            <View className="w-[80%] flex-row justify-between">
              <View className="w-[70%] mx-4 flex-row items-center justify-center ">
                <View className="w-16 h-16 mr-8 rounded-full mx- bg-white justify-center items-center">
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
          </View>
        );
      }}
      ListHeaderComponent={() => (
        <View classNmae="w-[90%] flex-row border-2 border-white">
          <View className="w-full h-20 mx-auto">
            <Text className="text-white font-pextrabold text-2xl">
              Transactions
            </Text>
          </View>
          <View
            className="h-[50px] w-[60%] bg-secondary border-2 border-white-20 mt-1 
        justify-center rounded-3xl flex-row"
          >
            <ButtonItem
              itemStyles="w-1/4"
              timeFrame="D"
              setTimeFrame={setTimeFrame}
              isActive={timeFrame === "D"}
            />
            <ButtonItem
              itemStyles="w-1/4"
              timeFrame="W"
              setTimeFrame={setTimeFrame}
              isActive={timeFrame === "W"}
            />
            <ButtonItem
              itemStyles="w-1/4"
              timeFrame="M"
              setTimeFrame={setTimeFrame}
              isActive={timeFrame === "M"}
            />
            <ButtonItem
              itemStyles="w-1/4"
              timeFrame="Y"
              setTimeFrame={setTimeFrame}
              isActive={timeFrame === "Y"}
            />
          </View>
        </View>
      )}
    />
  );
};

export default TransactionList;
