import { ScrollView, Text, View, Image } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Redirect, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import { images } from "../constants";
import CustomButton from "../components/CustomButton";
import { useGlobalContext } from "../context/GlobalProvider";

const App = () => {
  const { isLoading, isLoggedIn } = useGlobalContext();

  if (!isLoading && isLoggedIn) return <Redirect href="/home" />;

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="w-full flex justify-center items-center h-full px-4">
          <Image
            source={images.logoSmall}
            className="w-[150px] h-[150px] rounded-full"
            resizeMode="contain"
          />
          {/* <Image
            source={images.cards}
            className="max-w-[380px] w-full h-[300px] "
            resizeMode="contain"
          /> */}
          <View className="relative mt-5">
            <Text className="text-2xl text-white font-bold text-center">
              Track your expenses and groceries with
              <Text className=" text-secondary-200"> Cheap-ify </Text>
            </Text>
            <Image
              source={images.path}
              className=" w-[160px] h-[20px] absolute -bottom-4 -right-4 "
              resizeMode="contain"
            />
          </View>

          <Text className="text-gray-100 text-sm font-pregular mt-7">
            Transform Your Spending Habits with an Easy-to-Use Expense Tracker.
          </Text>
          <CustomButton
            title="Continue with Email"
            handlePress={() => {
              router.push("/sign-in");
            }}
            containerStyles="w-full mt-7"
          />
        </View>
      </ScrollView>
      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  );
};
export default App;
