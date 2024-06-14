import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import { useGlobalContext } from "../context/GlobalProvider";
import { getUserReceipts } from "../lib/appwrite";
import useAppwrite from "../lib/useAppwrite";
import CustomChart from "./CustomChart";
import ButtonItem from "./ButtonItem";

const StatisticsBox = () => {
  const { user } = useGlobalContext();
  const [timeFrame, setTimeFrame] = useState("Week"); //week month year

  const { data: receipts, isLoading } = useAppwrite(() =>
    getUserReceipts(user.$id)
  );

  let chartData = [];
  if (!isLoading && receipts) {
    chartData = receipts.map((item) => {
      let date = new Date(item.purchaseDate);
      return { date: date, total: item?.total };
    });
  }

  return (
    <View className="flex h-1/2 justify-start items-center">
      <View
        className="h-[18%] w-[90%] bg-secondary border-2 border-white-20 mt-2 
        justify-center rounded-3xl flex-row"
      >
        <ButtonItem
          itemStyles="w-1/3"
          timeFrame="Week"
          setTimeFrame={setTimeFrame}
          isActive={timeFrame === "Week"}
        />
        <ButtonItem
          itemStyles="w-1/3"
          timeFrame="Month"
          setTimeFrame={setTimeFrame}
          isActive={timeFrame === "Month"}
        />
        <ButtonItem
          itemStyles="w-1/3"
          timeFrame="Year"
          setTimeFrame={setTimeFrame}
          isActive={timeFrame === "Year"}
        />
      </View>
      <CustomChart chartData={chartData} timeFrame={timeFrame} />
    </View>
  );
};

export default StatisticsBox;
