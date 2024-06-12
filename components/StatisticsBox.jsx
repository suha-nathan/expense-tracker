import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { useGlobalContext } from "../context/GlobalProvider";
import { getUserReceipts } from "../lib/appwrite";
import useAppwrite from "../lib/useAppwrite";
import CustomChart from "./CustomChart";

const ButtonItem = ({ timeFrame, setTimeFrame, isActive }) => {
  return (
    <>
      {isActive ? (
        <LinearGradient
          className="h-[100%] 
    w-1/3 justify-center items-center rounded-xl"
          colors={["#0DA6C2", "#7B78AA"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Text className="text-base text-white font-pbold">{timeFrame}</Text>
        </LinearGradient>
      ) : (
        <TouchableOpacity
          className="h-[100%] 
      w-1/3 justify-center items-center "
          onPress={() => {
            setTimeFrame(timeFrame);
          }}
        >
          <Text className="text-base text-white font-pbold">{timeFrame}</Text>
        </TouchableOpacity>
      )}
    </>
  );
};

const StatisticsBox = () => {
  const { user } = useGlobalContext();
  const [timeFrame, setTimeFrame] = useState("Week"); //week month year

  const { data: receipts, isLoading } = useAppwrite(() =>
    getUserReceipts(user.$id)
  );

  let chartData = [];
  if (!isLoading && receipts) {
    chartData = receipts?.map((item) => {
      let date = new Date(item?.purchaseDate);
      return { date: date, total: item?.total };
    });
  }

  return (
    <View className="flex h-1/2 justify-start items-center">
      <View
        className="h-[18%] w-[90%] border-2 border-white-20 mt-2 
        justify-center rounded-xl flex-row"
      >
        <ButtonItem
          timeFrame="Week"
          setTimeFrame={setTimeFrame}
          isActive={timeFrame === "Week"}
        />
        <ButtonItem
          timeFrame="Month"
          setTimeFrame={setTimeFrame}
          isActive={timeFrame === "Month"}
        />
        <ButtonItem
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
