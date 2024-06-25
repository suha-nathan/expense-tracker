import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import { useGlobalContext } from "../context/GlobalProvider";
import { getUserReceipts } from "../lib/appwrite";
import useAppwrite from "../lib/useAppwrite";
import CustomChart from "./CustomChart";
import ButtonItem from "./ButtonItem";

const StatisticsBox = () => {
  const { user } = useGlobalContext();
  const [chartTimeFrame, setChartTimeFrame] = useState("Week"); //week month year
  const [chartData, setChartData] = useState([]);

  const {
    data: receipts,
    isLoading,
    refetch,
  } = useAppwrite(() => getUserReceipts(user.$id, chartTimeFrame));

  const loadChartData = async () => {
    await refetch();
    if (!isLoading && receipts) {
      let reversedReceipts = receipts.reverse();
      let arr = reversedReceipts.map((item) => {
        let date = new Date(item.purchaseDate);
        return {
          label: `${date.getDate()}/${date.getMonth() + 1}`,
          value: item.total,
        };
      });
      setChartData(arr);
    }
  };

  useEffect(() => {
    loadChartData();
    // console.log("chart data is: ", chartData);
  }, [chartTimeFrame]);

  return (
    <View className="flex h-[350px] justify-start items-center">
      <View
        className="h-[20%] w-[90%] bg-secondary border-2 border-white-20 mt-2 
        justify-center rounded-3xl flex-row"
      >
        <ButtonItem
          itemStyles="w-1/3 rounded-3xl"
          timeFrame="Week"
          setTimeFrame={setChartTimeFrame}
          isActive={chartTimeFrame === "Week"}
        />
        <ButtonItem
          itemStyles="w-1/3 rounded-3xl"
          timeFrame="Month"
          setTimeFrame={setChartTimeFrame}
          isActive={chartTimeFrame === "Month"}
        />
        <ButtonItem
          itemStyles="w-1/3 rounded-3xl"
          timeFrame="Year"
          setTimeFrame={setChartTimeFrame}
          isActive={chartTimeFrame === "Year"}
        />
      </View>
      <CustomChart chartData={chartData} timeFrame={chartTimeFrame} />
    </View>
  );
};

export default StatisticsBox;
