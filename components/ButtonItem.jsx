import { Text, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const ButtonItem = ({ timeFrame, setTimeFrame, isActive }) => {
  return (
    <>
      {isActive ? (
        <LinearGradient
          className="h-[100%] 
      w-1/3 justify-center items-center rounded-xl"
          colors={["#0DA6C2", "#7B78AA"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Text className="text-base text-white font-pbold">{timeFrame}</Text>
        </LinearGradient>
      ) : (
        <TouchableOpacity
          className="h-[100%] 
        w-1/3 justify-center items-center "
          onPress={() => {
            setTimeFrame(timeFrame);
          }}
        >
          <Text className="text-base text-white font-pbold">{timeFrame}</Text>
        </TouchableOpacity>
      )}
    </>
  );
};

export default ButtonItem;
