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
import { ResizeMode, Video } from "expo-av";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";

import { faUpload } from "@fortawesome/free-solid-svg-icons/faUpload";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

import { createVideo } from "../../lib/appwrite";
import { useGlobalContext } from "../../context/GlobalProvider";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";

const Create = () => {
  const { user } = useGlobalContext();
  const [uploading, setUploading] = useState(false);
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
      productName: "",
      price: 0,
      quantity: 0,
    },
  ]);

  const openPicker = async (selectType) => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes:
        selectType === "image"
          ? ImagePicker.MediaTypeOptions.Images
          : ImagePicker.MediaTypeOptions.Videos,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      if (selectType === "image") {
        setForm({ ...form, thumbnail: result.assets[0] });
      }
      if (selectType === "video") {
        setForm({ ...form, video: result.assets[0] });
      }
    }
  };

  const submit = async () => {
    if (!form.prompt || !form.title || !form.thumbnail || !form.video) {
      Alert.alert("Please fill in all the fields");
    }
    setUploading(true);
    try {
      await createVideo({ ...form, userId: user.$id });

      Alert.alert("success", "Post uploaded successfully");
      router.push("/home");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setForm({ title: "", video: null, thumbnail: null, prompt: "" });
      setUploading(false);
    }
  };
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView className="px-4 my-6">
        <Text className="text-2xl text-white font-psemibold">Add Expense</Text>
        <FormField
          title="Store"
          value={expense.store}
          placeholder="Store where purchase was made"
          handleChangeText={(e) => setExpense({ ...expense, store: e })}
          otherStyles="mt-10"
        />
        <View className="mt-7 space-y-2">
          <Text className="text-base text-gray-100 text-pmedium">
            Upload Receipt Image
          </Text>
          <TouchableOpacity onPress={() => openPicker("image")}>
            {expense.image ? (
              <Image
                source={{ uri: expense.image.uri }}
                className="w-full h-64 rounded-2xl"
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
        <FormField
          title="Sub Total"
          value={expense.subTotal}
          placeholder="Sub total of all items (before tax)"
          handleChangeText={(e) => setExpense({ ...expense, subTotal: e })}
          otherStyles="mt-7"
        />
        <FormField
          title="Total"
          value={expense.total}
          placeholder="Total of all items (after tax)"
          handleChangeText={(e) => setExpense({ ...expense, total: e })}
          otherStyles="mt-7"
        />
        <FormField
          title="Purchase Date"
          value={expense.purchaseDate}
          placeholder="Date when purchase was made"
          handleChangeText={(e) => setExpense({ ...expense, purchaseDate: e })}
          otherStyles="mt-7"
        />
        <FormField
          title="Category"
          value={expense.category}
          placeholder="Category of purchase"
          handleChangeText={(e) => setExpense({ ...expense, category: e })}
          otherStyles="mt-7"
        />
        <CustomButton
          title="Submit & Publish"
          handlePress={submit}
          containerStyles="mt-7"
          isLoading={uploading}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Create;
