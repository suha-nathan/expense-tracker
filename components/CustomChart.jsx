import { View, Text } from "react-native";
import { LineChart } from "react-native-gifted-charts";

const CustomChart = ({ chartData, timeFrame }) => {
  //process data according to timeFrame
  const data2 = [
    { value: 50 },
    { value: 10 },
    { value: 45 },
    { value: 30 },
    { value: 45 },
    { value: 18 },
  ];
  return (
    <View
      //   style={{
      //     shadowColor: "#ffffff",
      //     shadowOffset: { width: 0, height: 10 },
      //     shadowOpacity: 0.5,
      //     shadowRadius: 20,
      //     elevation: 20,
      //   }}
      className="p-5 rounded-3xl bg-secondary mt-4"
    >
      <LineChart
        areaChart
        // curved
        isAnimated
        data={data2}
        hideDataPoints
        spacing={50}
        height={150}
        color="#56acce"
        startFillColor="#56acce"
        endFillColor="#56acce"
        startOpacity={0.9}
        endOpacity={0.2}
        initialSpacing={0}
        noOfSections={4}
        yAxisColor="white"
        yAxisThickness={0}
        rulesType="solid"
        rulesColor="gray"
        yAxisTextStyle={{ color: "lightgray" }}
        yAxisLabelPrefix="$"
        xAxisColor="lightgray"
        pointerConfig={{
          pointerStripUptoDataPoint: true,
          pointerStripColor: "lightgray",
          pointerStripWidth: 2,
          strokeDashArray: [2, 5],
          pointerColor: "lightgray",
          radius: 4,
          pointerLabelWidth: 100,
          pointerLabelHeight: 120,
          pointerLabelComponent: (items) => {
            return (
              <View className="bg-secondary border-white w-12 h-8 p-1 rounded-lg justify-center items-center">
                <Text style={{ color: "white", fontWeight: "bold" }}>
                  {items[0].value}
                </Text>
              </View>
            );
          },
        }}
      />
    </View>
  );
};

export default CustomChart;
