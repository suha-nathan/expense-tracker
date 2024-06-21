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
    <SafeAreaView className="bg-primary h-full">
      <Text>ProductDetail</Text>
      <Image
        source={{ uri: item.itemImage }}
        className="w-full h-[80px] my-3"
        resizeMode="contain"
      />
      <View className="mx-auto my-1">
        <Text className="text-white font-pmedium text-md">
          {item.productName}
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default ProductDetail;
