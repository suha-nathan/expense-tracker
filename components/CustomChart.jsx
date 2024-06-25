import { View, Text } from "react-native";
// import { LineChart } from "react-native-gifted-charts";
import { LineChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";

const CustomChart = ({ chartData, timeFrame }) => {
  const screenWidth = Dimensions.get("window").width;

  const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(255,255,255, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
  };
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
  return (
    <View className="h-[70%] p-5 rounded-3xl bg-secondary mt-4 border-white-20 border-2">
      <LineChart
        data={data}
        width={screenWidth * 0.8}
        height={200}
        verticalLabelRotation={30}
        chartConfig={chartConfig}
        bezier
      />
    </View>
  );
};

export default CustomChart;
