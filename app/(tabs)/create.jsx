import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { faUpload } from "@fortawesome/free-solid-svg-icons/faUpload";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

import { createExpense } from "../../lib/appwrite";
import { useGlobalContext } from "../../context/GlobalProvider";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import LineItemList from "../../components/LineItemList";

const Create = () => {
  const { user } = useGlobalContext();
  const [uploading, setUploading] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [expense, setExpense] = useState({
    store: "",
    image: null,
    subTotal: 0,
    total: 0,
    purchaseDate: "",
    category: "",
  });
  const [lineItems, setLineItems] = useState([
    {
      id: Date.now(),
      productName: "",
      price: 0,
      quantity: 0,
    },
  ]);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  const handleConfirm = (date) => {
    // console.log("date has been picked: ", date);
    setExpense({ ...expense, purchaseDate: date.toString() });
    hideDatePicker();
  };

  const openPicker = async (selectType) => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setExpense({ ...expense, image: result.assets[0] });
    }
  };

  const submit = async () => {
    if (
      !expense.store ||
      !expense.category ||
      !expense.total ||
      !expense.subTotal
    ) {
      Alert.alert("Please fill in all the expense fields");
    } else if (
      lineItems.length > 0 &&
      lineItems.find(
        (item) => item.productName === "" || !item.price || !item.quantity
      )
    ) {
      Alert.alert(
        "Please enter all details for all items in expense or remove item from expense"
      );
    } else {
      setUploading(true);
      try {
        await createExpense({ ...expense, userId: user.$id }, lineItems);

        Alert.alert("success", "Expense uploaded successfully");
        router.push("/home");
      } catch (error) {
        Alert.alert("Error", error.message);
      } finally {
        setExpense({
          store: "",
          image: null,
          subTotal: 0,
          total: 0,
          purchaseDate: "",
          category: "",
        });
        setLineItems([]);
        setUploading(false);
      }
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView className="px-4 my-6">
        <Text className="text-2xl text-white font-psemibold">Add Expense</Text>

        <View className="mt-7 space-y-2">
          <Text className="text-base text-gray-100 text-pmedium">
            Upload Receipt Image
          </Text>
          <TouchableOpacity onPress={() => openPicker()}>
            {expense.image ? (
              <Image
                source={{ uri: expense.image.uri }}
                className="w-full h-32 rounded-2xl"
                resizeMode="cover"
              />
            ) : (
              <View
                className="w-full h-16 border-2 border-black-200 flex-row space-x-2 
              px-4 bg-black-100 rounded-2xl justify-center items-center"
              >
                <FontAwesomeIcon icon={faUpload} color="#FF9001" size={15} />
                <Text className="text-sm text-gray-100 font-pmedium">
                  Choose a File
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
        <View className="flex-row justify-between">
          <FormField
            title="Store"
            value={expense.store}
            // placeholder="Store where purchase was made"
            handleChangeText={(e) => setExpense({ ...expense, store: e })}
            otherStyles="mt-7 w-[45%]"
          />
          <FormField
            title="Category"
            value={expense.category}
            // placeholder="Category of purchase"
            handleChangeText={(e) => setExpense({ ...expense, category: e })}
            otherStyles="mt-7 w-[45%]"
          />
        </View>
        <View className="flex-row justify-between">
          <FormField
            title="Sub Total"
            value={expense.subTotal}
            placeholder="Before Tax"
            handleChangeText={(e) => setExpense({ ...expense, subTotal: e })}
            otherStyles="mt-7 w-[45%]"
            keyboardType="numeric"
          />
          <FormField
            title="Total"
            value={expense.total}
            placeholder="After Tax"
            handleChangeText={(e) => setExpense({ ...expense, total: e })}
            otherStyles="mt-7 w-[45%]"
            keyboardType="numeric"
          />
        </View>
        <View className="space-y-2 mt-7">
          <Text className="text-base text-gray-100 font-pmedium">
            Purchase Date
          </Text>
          <View className="flex-row items-center justify-between">
            <View className="flex-row w-[50%] h-16 px-4 border-2 border-black-200 bg-black-100 rounded-2xl items-center ">
              <Text className="flex-1 text-white font-psemibold text-base">
                {expense.purchaseDate.substring(0, 10)}
              </Text>
            </View>

            <CustomButton
              title="Choose Date"
              handlePress={showDatePicker}
              containerStyles="w-[40%]"
              textStyles="text-base"
              isLoading={uploading}
            />

            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
            />
          </View>
        </View>
        <LineItemList lineItems={lineItems} setLineItems={setLineItems} />

        <CustomButton
          title="Submit"
          handlePress={submit}
          containerStyles="mt-7"
          isLoading={uploading}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Create;
