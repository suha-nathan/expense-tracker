import { View, Text, TouchableOpacity, FlatList } from "react-native";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons/faCirclePlus";
import { faCircleMinus } from "@fortawesome/free-solid-svg-icons/faCircleMinus";
import FormField from "./FormField";

const LineItemList = ({ lineItems, setLineItems }) => {
  const handleAddPress = () => {
    let newItem = {
      productName: "",
      price: 0,
      quantity: 0,
    };
    setLineItems([...lineItems, newItem]);
  };

  const handleRemovePress = (element) => {
    console.log(element);
    setLineItems(
      lineItems.filter((lineItem) => lineItem.productName != target)
    );
  };

  return (
    <View>
      <Text className="text-xl text-white font-psemibold mt-7">
        Items in Expense
      </Text>
      {lineItems.map((item, index) => {
        return (
          <View key={index} className="mt-7">
            <View className="flex-row justify-centerx items-center">
              <FormField
                title="Product Name"
                value={item.productName}
                // placeholder="Store where purchase was made"
                handleChangeText={(e) => setExpense({ ...expense, store: e })}
                otherStyles="w-[80%] mr-4"
              />
              <TouchableOpacity onPress={handleRemovePress}>
                <FontAwesomeIcon icon={faCircleMinus} color="red" size={30} />
              </TouchableOpacity>
            </View>
            <View className="w-full h-32 flex-row justify-between mt-3">
              <FormField
                title="Price"
                value={item.price}
                // placeholder="Category of purchase"
                // handleChangeText={(e) => setExpense({ ...expense, category: e })}
                otherStyles="w-[45%]"
              />
              <FormField
                title="Quantity"
                value={item.price}
                // placeholder="Category of purchase"
                // handleChangeText={(e) => setExpense({ ...expense, category: e })}
                otherStyles="w-[45%]"
              />
            </View>
          </View>
        );
      })}

      <View className="w-full">
        <TouchableOpacity
          className="flex-row justify-center items-center mt-7"
          onPress={handleAddPress}
        >
          <FontAwesomeIcon icon={faCirclePlus} color="green" size={30} />
          <Text className="text-white font-pextralight">Add Expense Item</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LineItemList;
