import { ScrollView, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import ExpenseForm from "../../components/ExpenseForm";

const Create = () => {
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView className="px-4 my-6">
        <Text className="text-2xl text-white font-psemibold">
          Create Expense
        </Text>
        <ExpenseForm
          method="Create"
          expenseInfo={{
            store: "",
            image: null,
            subTotal: "",
            total: "",
            purchaseDate: "",
            category: "",
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Create;
