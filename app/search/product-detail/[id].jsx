import { View, Text, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { usePathname, useLocalSearchParams } from "expo-router";
import { getProductByID } from "../../../lib/appwrite";
import useAppwrite from "../../../lib/useAppwrite";

const ProductDetail = () => {
  const pathname = usePathname();
  const { id } = useLocalSearchParams();
  const { data: item } = useAppwrite(() => {
    return getProductByID(id);
  });

  return (
    <SafeAreaView className="bg-primary h-full p-4">
      <Text className="text-white font-pregular text-xl mx-auto">
        {item.productName}
      </Text>
      <View className="w-[50%] h-[25%] my-3 mx-auto border-2 border-white-20">
        <Image
          source={{ uri: item.itemImage }}
          className="h-full"
          resizeMode="contain"
        />
      </View>
      <View className="w-[80%] mx-auto my-1 px-3 flex-row justify-between">
        <Text className="text-white text-lg font-pregular">
          Price: ${item.price}
        </Text>
        <Text className="text-white text-lg font-pregular">
          Unit: {item.pricePerUnit}
        </Text>
      </View>
      <View className="mx-auto my-1 px-3">
        <Text className="text-white text-md font-plight">
          {item.productDesc}
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default ProductDetail;
