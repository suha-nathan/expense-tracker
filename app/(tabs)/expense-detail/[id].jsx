import { useLocalSearchParams } from "expo-router";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import { getExpenseByID } from "../../../lib/appwrite";
import useAppwrite from "../../../lib/useAppwrite";
import Create from "../create";

const ExpenseDetail = () => {
  const [viewState, SetViewState] = useState("view");
  const { id } = useLocalSearchParams();
  const { data: expense } = useAppwrite(() => getExpenseByID(id));

  return <Create expense={expense} method="view" />;
};

export default ExpenseDetail;
