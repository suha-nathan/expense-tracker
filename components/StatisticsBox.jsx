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
    // console.log("timeframe: ", chartTimeFrame);

    // generate labels for given time frame
    let data = {};
    let totalsInOrder = [];
    let labels = generateLabels();

    if (!isLoading && receipts) {
      let currDate = new Date();

      if (chartTimeFrame == "Week") {
        //initialise all the week's date totals to zero. curr date is always the latest data
        for (let i = 0; i < 7; i++) {
          data[i] = 0;
        }
        //for each receipt, add it's total to the corresponding data key value pair
        receipts.forEach((item) => {
          let itemDate = new Date(item.purchaseDate);
          data[itemDate.getDay()] += item.total;
        });
        for (let i = 0; i < 7; i++) {
          // Calculate the day we want to get the total for
          let day = (currDate.getDay() - i + 7) % 7;
          totalsInOrder.push(data[day]);
        }
      } else if (chartTimeFrame === "Month") {
        let weeklyTotals = [0, 0, 0, 0];

        // Iterate through receipts and add their totals to the corresponding week
        receipts.forEach((item) => {
          let itemDate = new Date(item.purchaseDate);
          let daysAgo = Math.floor(
            (currDate - itemDate) / (1000 * 60 * 60 * 24)
          );

          if (daysAgo < 7) {
            weeklyTotals[0] += item.total;
          } else if (daysAgo < 14) {
            weeklyTotals[1] += item.total;
          } else if (daysAgo < 21) {
            weeklyTotals[2] += item.total;
          } else if (daysAgo < 28) {
            weeklyTotals[3] += item.total;
          }
        });
        // Add the weekly totals in reverse order to match the current day-first order
        totalsInOrder = weeklyTotals;
      }
    } else if (chartTimeFrame === "Year") {
      //aggregate total by month and push to data
      let monthlyTotals = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

      // // Iterate through receipts and add their totals to the corresponding week
      // receipts.forEach((item) => {
      //   let itemDate = new Date(item.purchaseDate);
      //   let daysAgo = Math.floor(
      //     (currDate - itemDate) / (1000 * 60 * 60 * 24)
      //   );

      //   if (daysAgo < 7) {
      //     weeklyTotals[0] += item.total;
      //   } else if (daysAgo < 14) {
      //     weeklyTotals[1] += item.total;
      //   } else if (daysAgo < 21) {
      //     weeklyTotals[2] += item.total;
      //   } else if (daysAgo < 28) {
      //     weeklyTotals[3] += item.total;
      //   }
      // });
      // Add the weekly totals in reverse order to match the current day-first order
      totalsInOrder = monthlyTotals;
    }
    // console.log("totals in order", totalsInOrder);
    setChartData({ labels: labels, data: totalsInOrder });
  };

  useEffect(() => {
    refetch();
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
