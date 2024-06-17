import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faEye } from "@fortawesome/free-regular-svg-icons/faEye";
import { faEyeSlash } from "@fortawesome/free-regular-svg-icons/faEyeSlash";

const FormField = ({
  title,
  value,
  placeholder,
  handleChangeText,
  otherStyles,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className="text-base text-gray-100 font-pmedium">{title}</Text>
      <View className="flex-row w-full h-16 px-4 border-2 border-black-200 bg-black-100 rounded-2xl focus:border-lightblue items-center">
        <TextInput
          className="flex-1 text-white font-psemibold text-base"
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#7b7b8b"
          onChangeText={handleChangeText}
          secureTextEntry={title === "Password" && !showPassword}
          editable={props.editable === false ? false : true}
          selectTextOnFocus={props.selectTextOnFocus === false ? false : true}
          keyboardType={props.keyboardType === "numeric" ? "numeric" : "text"}
        />
        {title == "Password" && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <FontAwesomeIcon
              icon={showPassword ? faEye : faEyeSlash}
              resizeMode="contain"
              color="white"
              size={20}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;
