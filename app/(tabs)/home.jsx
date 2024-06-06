import { View, Text, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Home = () => {
  return (
    <SafeAreaView>
      <FlatList
        data={[{ $id: 1 }, { $id: 2 }, { $id: 3 }]}
        renderItem={({ item }) => (
          <Text key={item.$id} className="text-3xl">
            {item.$id}
          </Text>
        )}
      />
    </SafeAreaView>
  );
};

export default Home;
