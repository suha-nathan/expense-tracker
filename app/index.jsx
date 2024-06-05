import { Text, View, Image } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Link } from "expo-router";

const homeImage = require("../assets/icons/home.png");

const App = () => {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-3xl font-pblack">Expense Tracker</Text>
      <StatusBar style="auto" />
      <Link href="/home" style={{ color: "blue" }}>
        Go to Home
      </Link>
      <Image
        source={homeImage}
        resizeMode="contain"
        style={{ width: 24, height: 24 }}
      />
    </View>
  );
};

export default App;
