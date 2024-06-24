import { useLocalSearchParams } from "expo-router";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useEffect } from "react";
import { useNavigation } from "expo-router";
import { getExpenseByID } from "../../../lib/appwrite";
import useAppwrite from "../../../lib/useAppwrite";
import ExpenseForm from "../../../components/ExpenseForm";

const ExpenseDetail = () => {
  const [viewState, SetViewState] = useState("View");
  const { id } = useLocalSearchParams();
  const { data: expense, refetch } = useAppwrite(() => getExpenseByID(id));

  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  useEffect(() => {
    refetch();
  }, [id]);

  return <ExpenseForm expenseInfo={expense} method={viewState} />;
};

export default ExpenseDetail;
