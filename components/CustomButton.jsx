import { TouchableOpacity, Text } from "react-native";

const CustomButton = ({
  title,
  handlePress,
  containerStyles,
  textStyles,
  isLoading,
}) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpactity={0.7}
      disabled={isLoading}
      className={`bg-lightblue rounded-xl 
      min-h-[62px] justify-center items-center 
      ${containerStyles}
      ${isLoading ? "opacity-50" : ""}`}
    >
      <Text className={`text-white font-psemibold text-lg ${textStyles}`}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
