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
  const [chartData, setChartData] = useState({});
  const [receipts, setReceipts] = useState([{}]);
  const [isLoading, setIsLoading] = useState(false);

  // const {
  //   data: receipts,
  //   isLoading,
  //   refetch,
  // } = useAppwrite(() => getUserReceipts(user.$id, chartTimeFrame));
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

  const loadChartData = (timeFrame) => {
    // generate labels for given time frame
    let totalsInOrder = [];
    let labels = generateLabels();

    if (receipts) {
      let currDate = new Date();

      if (timeFrame == "Week") {
        // Initialize an array to store totals for each day of the week
        let dailyTotals = Array(7).fill(0);

        // Iterate through receipts and add their totals to the corresponding day
        receipts.forEach((item) => {
          let itemDate = new Date(item.purchaseDate); // Assuming item.date is the date of the receipt
          let daysAgo = Math.floor(
            (currDate - itemDate) / (1000 * 60 * 60 * 24)
          );

          if (daysAgo < 7) {
            dailyTotals[daysAgo] += item.total;
          }
        });
        totalsInOrder = dailyTotals;
      } else if (timeFrame === "Month") {
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
        // console.log("timeframe: month. ", weeklyTotals);
        totalsInOrder = weeklyTotals;
      } else if (timeFrame === "Year") {
        //aggregate total by month and push to data
        let monthlyTotals = Array(12).fill(0);

        // Iterate through receipts and add their totals to the corresponding day
        receipts.forEach((item) => {
          let itemDate = new Date(item.purchaseDate); // Assuming item.date is the date of the receipt
          let month = itemDate.getMonth();
          monthlyTotals[month] += item.total;
        });

        //reorder the monthly totals to start from current month
        let currMonth = currDate.getMonth();
        for (let i = 0; i < 12; i++) {
          let idx = (currMonth - i + 12) % 12;
          totalsInOrder.push(monthlyTotals[idx]);
        }
      }
    }
    console.log({ labels, totalsInOrder });
    setChartData({ labels: labels, data: totalsInOrder });
  };

  const getR = async () => {
    setIsLoading(true);
    try {
      let receiptsApp = await getUserReceipts(user.$id, chartTimeFrame);
      setReceipts(receiptsApp);
    } catch (error) {
      throw new Error(error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getR().then(() => {
      setChartData({});
      loadChartData(chartTimeFrame);
    });
  }, [chartTimeFrame]);

  useEffect(() => {
    getR().then(() => {
      loadChartData(chartTimeFrame);
    });
  }, []);
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
      {isLoading ? (
        <View>
          <Text className="text-white text-xl font-pextralight">
            Loading~~~
          </Text>
        </View>
      ) : (
        <CustomChart chartData={chartData} timeFrame={chartTimeFrame} />
      )}
    </View>
  );
};

export default StatisticsBox;
