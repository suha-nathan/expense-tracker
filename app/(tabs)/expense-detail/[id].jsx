import { useLocalSearchParams } from "expo-router";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faPenNib } from "@fortawesome/free-solid-svg-icons/faPenNib";

import { useState, useEffect } from "react";
import { useNavigation } from "expo-router";
import { getExpenseByID } from "../../../lib/appwrite";
import useAppwrite from "../../../lib/useAppwrite";
import ExpenseForm from "../../../components/ExpenseForm";

const ExpenseDetail = () => {
  const [viewState, setViewState] = useState("View");
  const { id } = useLocalSearchParams();
  const { data: expense, refetch } = useAppwrite(() => getExpenseByID(id));

  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  useEffect(() => {
    setViewState("View");
  }, []);

  useEffect(() => {
    refetch();
    setViewState("View");
  }, [id]);

  useEffect(() => {
    refetch();
  }, [viewState]);

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView className="px-4 my-6">
        <View className="flex-row justify-between">
          <Text className="text-2xl text-white font-psemibold">
            {viewState} Expense
          </Text>
          <TouchableOpacity
            className="flex-row items-center pr-3"
            onPress={() => {
              setViewState("Edit");
            }}
          >
            <FontAwesomeIcon icon={faPenNib} color="white" size={25} />
          </TouchableOpacity>
        </View>
        <ExpenseForm
          expenseInfo={expense}
          method={viewState}
          setViewState={setViewState}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default ExpenseDetail;
