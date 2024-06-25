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
  /* 
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43],
        color: (opacity = 1) => `rgba(13, 166, 194, ${opacity})`, // optional
        strokeWidth: 3, // optional
      },
    ],
  };
    let duration = numDays * 24 * 60 * 60 * 1000; //duration in milliseconds
    let startDate = Date.now(); //current time in milliseconds
    let endDate = new Date(startDate - duration);

*/

  const numDaysInMonth = (year, month) => new Date(year, month, 0).getDate();

  const generateLabels = () => {
    let today = new Date();
    let todayInSec = Date.now();
    let oneDay = 24 * 60 * 60 * 1000;
    let labels = [];
    if (chartTimeFrame === "Week") {
      for (let i = 0; i < 7; i++) {
        let date = new Date(todayInSec - oneDay * i);
        labels.push(`${date.getDate()}/${date.getMonth() + 1}`);
      }
    } else if (chartTimeFrame === "Month") {
      for (let i = 0; i < 4; i++) {
        let date = new Date(todayInSec - oneDay * 7 * i);
        labels.push(`${date.getDate()}/${date.getMonth() + 1}`);
      }
    } else if (chartTimeFrame === "Year") {
      for (let i = 0; i < 12; i++) {
        //not correct
        let numDays = numDaysInMonth(
          today.getFullYear(),
          today.getMonth() - i + 1
        );
        let date = new Date(todayInSec - oneDay * numDays * i);
        labels.push(`${date.getDate()}/${date.getMonth() + 1}`);
      }
    }
    // console.log(labels);
    return labels;
  };

  const loadChartData = async () => {
    await refetch();

    // generate labels for given time frame
    let data = [];
    let labels = generateLabels();
    if (!isLoading && receipts) {
      let reversedReceipts = receipts.reverse();
      reversedReceipts.forEach((item) => {
        let date = new Date(item.purchaseDate);
        if (chartTimeFrame == "Week") {
          //aggregate total by day and push to data
        } else if (chartTimeFrame === "Month") {
          //aggregate total by week and push to data
        } else if (chartTimeFrame === "Year") {
          //aggrefate total by month and push to data
        }
      });
      setChartData({ labels: labels, data: data });
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
