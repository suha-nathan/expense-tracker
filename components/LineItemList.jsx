import { View, Text, TouchableOpacity, FlatList } from "react-native";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons/faCirclePlus";
import { faCircleMinus } from "@fortawesome/free-solid-svg-icons/faCircleMinus";
import FormField from "./FormField";

const LineItemList = ({ lineItems, setLineItems, method, ...props }) => {
  const handleAddPress = () => {
    let newItem = {
      id: Date.now(),
      productName: "",
      price: 0,
      quantity: 0,
    };
    if (!lineItems) {
      setLineItems([newItem]);
    } else {
      setLineItems([...lineItems, newItem]);
    }
  };

  const handleRemovePress = (id) => {
    setLineItems(lineItems.filter((lineItem) => lineItem.id != id));
  };

  const handleLineItemChange = (id, field, value) => {
    setLineItems(
      lineItems.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  return (
    <View>
      <Text className="text-xl text-white font-psemibold mt-7">
        Items in Expense
      </Text>
      {lineItems?.map((item) => (
        <View key={item.id} className="mt-7">
          <View className="flex-row justify-centerx items-center">
            <FormField
              title="Item Name"
              value={item.productName}
              editable={props.editable}
              handleChangeText={(text) =>
                handleLineItemChange(item.id, "productName", text)
              }
              otherStyles="w-[80%] mr-4"
            />
            {props.editable ? (
              <TouchableOpacity
                onPress={() => {
                  handleRemovePress(item.id);
                }}
              >
                <FontAwesomeIcon icon={faCircleMinus} color="red" size={30} />
              </TouchableOpacity>
            ) : null}
          </View>
          <View className="w-full h-32 flex-row justify-between mt-3">
            <FormField
              title="Price"
              value={item.price}
              editable={props.editable}
              handleChangeText={(text) =>
                handleLineItemChange(item.id, "price", text)
              }
              otherStyles="w-[45%]"
              keyboardType="numeric"
            />
            <FormField
              title="Quantity"
              value={item.quantity}
              editable={props.editable}
              handleChangeText={(text) =>
                handleLineItemChange(item.id, "quantity", text)
              }
              otherStyles="w-[45%]"
              keyboardType="numeric"
            />
          </View>
        </View>
      ))}
      {props.editable ? (
        <View className="w-full">
          <TouchableOpacity
            className="flex-row justify-center items-center mt-3"
            onPress={handleAddPress}
          >
            <FontAwesomeIcon icon={faCirclePlus} color="green" size={30} />
            <Text className="text-white font-pextralight ml-2">
              Add Expense Item
            </Text>
          </TouchableOpacity>
        </View>
      ) : null}
    </View>
  );
};

export default LineItemList;
