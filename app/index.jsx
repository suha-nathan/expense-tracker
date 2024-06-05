import { ScrollView, Text, View, Image } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../constants";

const App = () => {
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="w-full justify-center items-center h-full px-4 ">
          <Image
            source={images.logo}
            className="w-[130px] h-[84px]"
            resizeMode="contain"
          />
          <Image
            source={images.cards}
            className="max-w-[380px] w-full h-[300px] "
            resizeMode="contain"
          />
          <View className="relative mt-5">
            <Text className="text-2xl text-white font-bold text-center">
              Track your expenses and groceries with
              <Text className=" text-secondary-200"> Cheap-ify </Text>
            </Text>
            <Image
              source={images.path}
              className=" w-[160px] h-[20px] absolute -bottom-4 -right-5"
              resizeMode="contain"
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default App;
